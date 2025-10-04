import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const configCORS = (app) => {
  app.use(
    cors({
      origin: [process.env.FE_URL, "https://mydomain.com"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
};

export default configCORS;
