import { Router } from "express";
import news from "./news.js";

const router = new Router();

router.use(news);

export default router;
