import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import User from "../model/user.mjs";
import UserServices from "../services/user-services.mjs";

dotenv.config({ path: "./env/.env" });

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
            user.type = req.body.type;
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

    async function updateName(req, res) {
        if (req.user.type !== "administrador" && req.user.type !== "cliente") {
            res.status(403).json({ error: "Not Allowed" });
            return;
        }

        try {
            const user = new User();
            user.id = req.params.id;
            user.name = req.body.name;
            const result = await services.updateName(user);
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

    async function updateEmail(req, res) {
        if (req.user.type !== "administrador" && req.user.type !== "cliente") {
            res.status(403).json({ error: "Not Allowed" });
            return;
        }

        try {
            const user = new User();
            user.id = req.params.id;
            user.email = req.body.email;
            const result = await services.updateEmail(user);
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

    async function updatePassword(req, res) {
        if (req.user.type !== "administrador" && req.user.type !== "cliente") {
            res.status(403).json({ error: "Not Allowed" });
            return;
        }

        try {
            const user = new User();
            user.id = req.params.id;
            user.password = req.body.password;
            const result = await services.updatePassword(user);
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

    async function updateCity(req, res) {
        if (req.user.type !== "administrador" && req.user.type !== "cliente") {
            res.status(403).json({ error: "Not Allowed" });
            return;
        }

        try {
            const user = new User();
            user.id = req.params.id;
            user.city = req.body.city;
            user.state = req.body.state;
            const result = await services.updateCity(user);
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

    async function remove(req, res) {
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

    async function authenticate(req, res) {
        try {
            const result = await services.authenticate(req.body.email, req.body.password);
            if (result.error) {
                res.status(result.status || 500).json({ error: result.error.message });
                return;
            }
            if (result.data.length == 0) {
                res.status(401).json({ error: "incorrect username or password" });
                return;
            }
            const token = jwt.sign({ user: result.data }, process.env.JWT_SECRET);
            res.cookie("session", token, { secure: true, httpOnly: true, maxAge: process.env.MAXAGE, sameSite: "Strict" });
            res.status(200).json(result.data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async function verifyToken(req, res, next) {
        try {
            const token = req.cookies.session;
            if (!token) {
                res.status(401).json({ error: "not authorized" });
                return;
            }
            const data = jwt.verify(token, process.env.JWT_SECRET);
            req.user = data.user;
            next();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async function decodeToken(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ error: "not authorized" });
                return;
            }
            res.status(200).json(req.user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async function logout(req, res) {
        try {
            res.clearCookie("session");
            res.status(200).json({ message: "logged out" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    return { create, list, updateName, updateEmail, updatePassword, updateCity, remove, authenticate, verifyToken, decodeToken, logout };
}
