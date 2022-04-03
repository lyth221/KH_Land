import { Router } from "express";
import news from "./news.js";
import contactForm from "./contactForm.js";

const router = new Router();

router.use(news);
router.use(contactForm);

export default router;
