import ExchangeServices from "../services/exchange-services.mjs";

export default function exchangeController() {
    const services = new ExchangeServices();

    async function create(req, res) {
        try {
            const result = await services.create(req.body.offerId);
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

    async function list(req, res) {
        try {
            const result = await services.list(req.user.id);
            if (result.error) {
                res.status(result.status || 500).json({ error: result.error.message });
                return;
            }
            res.status(201).json(result.data);
            res.status(200).json(result.data);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async function countExchange(req, res) {
        if (req.user.type !== "administrador") {
            res.status(403).json({ error: "Not Allowed" });
            return;
        }
        try {
            const result = await services.countExchange();
            if (result.error) {
                res.status(result.status || 500).json({ error: result.error.message });
                return;
            }
            res.status(200).json(result.data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    return { create, list, countExchange };
}
