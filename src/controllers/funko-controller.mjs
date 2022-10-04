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
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async function update(req, res){
        try {
            const funko = new Funko();
            funko.id = req.params.id;
            funko.name = req.body.name;
            funko.category = req.body.category;
            funko.description = req.body.description;
            const result = await services.update(funko, file);
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

    async function get(req, res){
        try {
            const result = await services.get(req.params.id);
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
            const result = await services.list();
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



    return { create, update, remove, get, list };
}
