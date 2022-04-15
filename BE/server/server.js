import Express from "express";
import mongoose from "mongoose";
import v1 from "./routes/v1/index.js";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = new Express();

if (process.env.ENV == "production") {
  mongoose.connect(
    `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@khland_mongo:27017/${process.env.MONGODB_DATABASE_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error) => {
      if (error) {
        console.log("Mongodb", "WBC Connection failed!!");
        throw error;
      }
      console.log("Mongodb", "WBC Mongodb connected!!!");
    }
  );
} else {
  mongoose.connect(
    "mongodb://localhost/KH_LAND",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error) => {
      if (error) {
        console.log("Mongodb", "WBC Connection failed!!");
        throw error;
      }
      console.log("Mongodb", "WBC Mongodb connected!!!");
    }
  );
}

app.use(morgan("dev"));
app.use(cors());
app.set("view engine", "ejs");
app.use(Express.json({ limit: "20mb" }));
app.use(Express.urlencoded({ limit: "20mb", extended: false }));
app.use("/api/v1", v1);

app.listen(process.env.EXPRESS_PORT || 8080, () => {
  console.log("Server listen on port: ", process.env.EXPRESS_PORT || 8081);
});

export default app;
