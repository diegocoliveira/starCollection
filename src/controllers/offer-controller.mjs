import OfferServices from "../services/offer-services.mjs";
import Offer from "../model/offer.mjs";

export default function OfferController() {
    const services = new OfferServices();

    async function create(req, res) {
        try {
            const offer = new Offer();
            offer.target = req.body.target;
            offer.offered = req.body.offered;
            const result = await services.create(offer, req.user.id);
            if (result.error) {
                res.status(result.status || 500).json({ error: result.error.message });
                return;
            }
            res.status(201).json(result.data);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async function remove(req, res){
        try {
            const result = await services.remove(req.params.id);
            if (result.error) {
                res.status(result.status || 500).json({ error: result.error.message });
                return;
            }
            res.status(200).json(result.data);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async function listReceived(req, res) {
        try {
            const result = await services.listReceived(req.user.id);
            if (result.error) {
                res.status(result.status || 500).json({ error: result.error.message });
                return;
            }
            res.status(200).json(result.data);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async function listSent(req, res) {
        try {
            const result = await services.listSent(req.user.id);
            if (result.error) {
                res.status(result.status || 500).json({ error: result.error.message });
                return;
            }
            res.status(200).json(result.data);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async function countOffer(req, res) {
        if (req.user.type !== "administrador") {
            res.status(403).json({ error: "Not Allowed" });
            return;
        }
        try {
            const result = await services.countOffer();
            if (result.error) {
                res.status(result.status || 500).json({ error: result.error.message });
                return;
            }
            res.status(200).json(result.data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    return { create, remove, listReceived, listSent, countOffer };
}
