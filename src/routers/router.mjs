import team from "../controllers/team-controller.mjs";

export default function Router(express) {
    const router = express.Router();
    router.post("/team", team().create);
    router.get("/team", team().list);
    router.get("/team/:id", team().getById);
    router.put("/team/:id", team().update);
    router.delete("/team/:id", team().remove);

    return router;
}
