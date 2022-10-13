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

    async function accepted(req, res) {
        try {
            const result = await services.accepted(req.params.id);
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

    async function canceled(req, res) {
        try {
            const result = await services.canceled(req.params.id);
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

    async function list(req, res) {
        try {
            let result;
            if (req.user.type == "administrador") {
                result = await services.list();
            } else {
                result = await services.listByStatus(req.query.status, req.user.id);
            }
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
    return { create, accepted, canceled, list, countExchange };
}
