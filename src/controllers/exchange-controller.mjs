import ExchangeServices from "../services/exchange-services.mjs";

export default function exchangeController() {
    const services = new ExchangeServices();

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
    return { countExchange };
}