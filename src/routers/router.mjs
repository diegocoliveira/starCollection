import team from "../controllers/team-controller.mjs";
import funko from "../controllers/funko-controller.mjs";
import user from "../controllers/user-controller.mjs";
import collection from "../controllers/collection-controller.mjs";
import offer from "../controllers/offer-controller.mjs";
import Upload from "../services/upload.mjs";

export default function Router(express) {
    const router = express.Router();
    const upload = Upload();

    router.post("/team", team().create);
    router.get("/team", team().list);
    router.get("/team/:id", team().getById);
    router.put("/team/:id", team().update);
    router.delete("/team/:id", team().remove);

    router.post("/funko", user().verifyToken, upload.single("file"), funko().create);
    router.get("/funko", user().verifyToken, funko().list);
    router.get("/funko/:id", user().verifyToken, funko().get);
    router.put("/funko/:id", user().verifyToken, funko().update);
    router.delete("/funko/:id", user().verifyToken, funko().remove);

    router.post("/user", user().create);
    router.get("/user", user().verifyToken, user().list);
    router.put("/user_name/:id", user().verifyToken, user().updateName);
    router.put("/user_email/:id", user().verifyToken, user().updateEmail);
    router.put("/user_password/:id", user().verifyToken, user().updatePassword);
    router.put("/user_city/:id", user().verifyToken, user().updateCity);
    router.delete("/user/:id", user().verifyToken, user().remove);

    router.post("/collection", user().verifyToken, collection().insert);
    router.get("/collection", user().verifyToken, collection().list);
    router.put("/collection/:id", user().verifyToken, collection().update);
    router.delete("/collection/:id", user().verifyToken, collection().remove);

    router.get("/tradeable", collection().listExchange);
    router.get("/tradeable/:id", user().verifyToken, collection().getExchangeble);
    router.get("/user_funko/:id", user().verifyToken, funko().getUserFunko);

    router.post("/offer", user().verifyToken, offer().create);

    router.post("/authentication", user().authenticate);
    router.get("/authorization", user().verifyToken, user().decodeToken);
    router.get("/logout", user().logout);

    return router;
}
