import CollectionServices from "../services/collection-services.mjs";
import Collection from "../model/collection.mjs";

export default function CollectionController() {
    async function insert(req, res) {
        try {
            const collection = new Collection();
            collection.userId = req.user.id;
            collection.funko.id = req.body.funkoId;
            collection.isExchange = req.body.isExchange;
            const services = new CollectionServices();
            const result = await services.insert(collection);
            if (result.error) {
                res.status(result.status || 500).json(result.error.message);
            } else {
                res.status(201).json(result.data);
            }
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async function update(req, res) {
        try {
            const collection = new Collection();
            collection.id = req.params.id;
            collection.isExchange = req.body.isExchange;
            const services = new CollectionServices();
            const result = await services.update(collection);
            if (result.error) {
                res.status(result.status || 500).json(result.error.message);
            } else {
                res.status(200).json(result.data);
            }
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async function remove(req, res) {
        try {
            const services = new CollectionServices();
            const result = await services.remove(req.params.id);
            if (result.error) {
                res.status(result.status || 500).json(result.error.message);
            } else {
                res.status(200).json(result.data);
            }
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async function list(req, res) {
        try {
            const services = new CollectionServices();
            const result = await services.list(req.user.id);
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

    async function listExchange(req, res){
        try {
            const services = new CollectionServices();
            const result = await services.listExchange();
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

    async function getExchangeble(req, res){
        try {
            const services = new CollectionServices();
            const result = await services.getExchangeble(req.params.id);
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

    return { insert, update, remove, list, listExchange, getExchangeble };
}
