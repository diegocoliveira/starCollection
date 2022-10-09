import CollectionServices from "../services/collection_services.mjs";
import Collection from "../model/collection.mjs";

export default function CollectionController() {
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

    return { list };
}
