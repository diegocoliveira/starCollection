import User from "../model/user.mjs";
import UserServices from "../services/user-services.mjs";

export default function UserController() {
    const services = new UserServices();

    async function create(req, res) {
        try {
            const user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;
            user.city = req.body.city;
            user.state = req.body.state;
            user.description = req.body.description;
            user.userType = req.body.userType;

            const result = await services.create(user);
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
