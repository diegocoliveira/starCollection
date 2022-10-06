import dotenv from "dotenv";
import Express from "express";
import Router from "./src/routers/router.mjs";
import cookieParser from "cookie-parser";

dotenv.config({ path: "./env/.env" });

const port = process.env.PORT || 8080;
const app = Express();
const router = Router(Express);

const jsonErrorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ error: err.message });
};

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", Express.static("public"));
app.use("/repository", Express.static("repository"));
app.use("/api", router);
app.use(jsonErrorHandler);

//Status 404 - caso nenhum endpoint seja encontrado
app.use(function (req, res, next) {
    const html = `<html> <head> <meta charset="utf-8" /> <title>Meu Redirect</title>
        <meta http-equiv="refresh" content="0; URL='${req.baseUrl}/404/index.html'" /> </head>
        <body>... </body> </html>`;

    res.status(404);
    const contentType = req.get("Content-Type");

    // response with json
    if (req.get("Content-Type") === "application/json") {
        res.json({ error: "Not found" });
        return;
    }
    // response with html page
    if (req.accepts("html")) {
        res.send(html);
        return;
    }

    // default to plain-text. send()
    res.type("txt").send("Not found");
});

app.listen(port, () => {
    console.log(`Servidor criado no ambiente:${process.env.NODE_ENV} na porta:${port}`);
});
