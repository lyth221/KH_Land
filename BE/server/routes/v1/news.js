import { Router } from "express";
import newsController from "../../controller/news.controller.js";

const router = new Router();

router.route("/news").post(newsController.createNews);

router.route("/news/list").get(newsController.getListNewsByCategory);

router.route("/news/:id").get(newsController.getNewsById);

router.route("/news/id").put(newsController.updateNewsById);

export default router;
