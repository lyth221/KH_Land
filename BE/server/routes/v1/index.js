import { Router } from "express";
import news from "./news.js";
import contactForm from "./contactForm.js";
import project from "./manageProject.js";

const router = new Router();

router.use(news);
router.use(contactForm);
router.use(project);

export default router;
