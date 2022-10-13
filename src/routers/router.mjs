import team from "../controllers/team-controller.mjs";
import funko from "../controllers/funko-controller.mjs";
import user from "../controllers/user-controller.mjs";
import collection from "../controllers/collection-controller.mjs";
import exchange from "../controllers/exchange-controller.mjs";
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
    router.get("/collection/:id", user().verifyToken, collection().get);
    router.put("/collection/:id", user().verifyToken, collection().update);
    router.delete("/collection/:id", user().verifyToken, collection().remove);

    router.get("/tradeable", collection().listTradeable);
    router.get("/tradeable/user", user().verifyToken, collection().getTradeableByUser);

    router.post("/offer", user().verifyToken, offer().create);
    router.get("/offer/received", user().verifyToken, offer().listReceived);
    router.get("/offer/sent", user().verifyToken, offer().listSent);
    router.delete("/offer/:id", user().verifyToken, offer().remove);

    router.post("/exchange", user().verifyToken, exchange().create);
    router.get("/exchange", user().verifyToken, exchange().list);
    router.get("/exchange?status", user().verifyToken, exchange().list);
    router.put("/exchange/canceled/:id", user().verifyToken, exchange().canceled);
    router.put("/exchange/accepted/:id", user().verifyToken, exchange().accepted);

    router.post("/authentication", user().authenticate);
    router.get("/authorization", user().verifyToken, user().decodeToken);
    router.get("/logout", user().logout);

    router.get("/count_user", user().verifyToken, user().countUser);
    router.get("/count_Offer", user().verifyToken, offer().countOffer);
    router.get("/count_exchange", user().verifyToken, exchange().countExchange);

    return router;
}
