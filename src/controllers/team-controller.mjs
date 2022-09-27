import TeamServices from "../services/team-services.mjs";
import Team from "../model/team.mjs";

export default function TeamConTroller() {
    const services = new TeamServices();

    async function create(req, res) {
        try {
            const team = new Team();
            team.name = req.body.name;
            const result = await services.create(team);
            if (result.error) {
                res.status(result.status || 500).json({ error: result.error.message });
                return;
            }
            res.status(201).json(result.data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async function update(req, res) {
        try {
            const team = new Team();
            team.id = req.params.id;
            team.name = req.body.name;
            const result = await services.update(team);
            if (result.error) {
                res.status(result.status || 500).json({ error: result.error.message });
                return;
            }
            if (result.data.length == 0) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.status(200).json(result.data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async function remove(req, res) {
        try {
            const result = await services.remove(req.params.id);
            if (result.error) {
                res.status(result.status || 500).json({ error: result.error.message });
                return;
            }
            if (result.data.length == 0) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.status(200).json(result.data);
        } catch (error) {
            res.status(500).json({ error: err.message });
        }
    }

    async function list(req, res) {
        try {
            const result = await services.list();
            if (result.error) {
                res.status(result.status).json({ error: result.error.message });
                return;
            }
            res.status(200).json(result.data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async function getById(req, res) {
        try {
            const result = await services.getById(req.params.id);
            if (result.error) {
                res.status(result.status || 500).json({ error: result.error.message });
                return;
            }
            if (result.data.length == 0) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.status(200).json(result.data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    return { create, update, remove, list, getById };
}
