import OfferServices from "../services/offer-services.mjs";
import Offer from "../model/offer.mjs";

export default function OfferController(){
    const services = new OfferServices();

    async function create(req, res){
        if (req.user.type !== "administrador" && req.user.type !== "cliente") {
            res.status(403).json({ error: "Not Allowed" });
            return;
        }
        try {
            const offer = new Offer();
            offer.target = req.body.target;
            offer.offered = req.body.offered;
            const result = await services.create(offer);
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
    return { create };
}