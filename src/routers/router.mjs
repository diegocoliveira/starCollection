import team from "../controllers/team-controller.mjs";
import funko from "../controllers/funko-controller.mjs";
import user from "../controllers/user-controller.mjs";
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
    router.get("/funko", funko().list);
    router.get("/funko/:id", funko().get);
    router.put("/funko/:id", funko().update);
    router.delete("/funko/:id", funko().remove);

    router.post("/user", user().create);
    router.get("/user-list", user().list);

    router.post("/authentication", user().authenticate);
    router.get("/authorization", user().verifyToken, user().decodeToken);
    router.get("/logout", user().logout);

    return router;
}
