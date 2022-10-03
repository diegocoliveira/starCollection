import FunkoServices from "../services/funko-services.mjs";
import Funko from "../model/funko.mjs";

export default function FunkoController() {
    const services = new FunkoServices();

    async function create(req, res) {
        try {
            const funko = new Funko();
            funko.name = req.body.name;
            funko.category = req.body.category;
            funko.description = req.body.description;
            const file = req.file;
            const result = await services.create(funko, file);
            if (result.error) {
                res.status(result.status || 500).json({ error: result.error.message });
                return;
            }
            res.status(201).json(result.data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    return { create };
}
