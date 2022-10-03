import team from "../controllers/team-controller.mjs";
import funko from "../controllers/funko-controller.mjs";
import Upload from "../services/upload.mjs";

export default function Router(express) {
    const router = express.Router();
    const upload = Upload();

    router.post("/team", team().create);
    router.get("/team", team().list);
    router.get("/team/:id", team().getById);
    router.put("/team/:id", team().update);
    router.delete("/team/:id", team().remove);

    router.post("/funko", upload.single("file"), funko().create);

    return router;
}
