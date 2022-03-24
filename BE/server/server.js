import Express from "express";
import mongoose from "mongoose";
import v1 from "./routes/v1/index.js";
import morgan from "morgan";

const app = new Express();

mongoose.connect("mongodb://localhost/urlShortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(Express.json({ limit: "20mb" }));
app.use(Express.urlencoded({ limit: "20mb", extended: false }));
app.use("/api/v1", v1);

app.listen(process.env.PORT || 8000);

export default app;
