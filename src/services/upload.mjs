import Multer from "multer";
import { v4 as uuid } from "uuid";

export default function Upload() {
    const limits = {
        files: 1, // allow only 1 file per request
        fileSize: 5 * 1024 * 1024, // 5 MB (max file size)
    };

    const storage = Multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "repository/images");
        },
        filename: function (req, file, cb) {
            const ext = file.originalname.split(".").pop();
            const filename = `${uuid()}.${ext}`;
            cb(null, filename);
        },
    });

    function fileFilter(req, file, cb) {
        if (req.user.type !== "administrador") {
            cb(null, false);
            return;
        }
        
        if (file.mimetype.split("/")[0] === "image") {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }

    const upload = Multer({ storage: storage, fileFilter: fileFilter, limits: limits });

    return upload;
}
