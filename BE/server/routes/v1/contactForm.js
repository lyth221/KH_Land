import { Router } from "express";
import newsController from "../../controller/news.controller.js";
import formContactController from "../../controller/formContact.controller.js";

const router = new Router();

router.route("/contact-form").post(formContactController.createContactForm);

router
  .route("/contact-form/list")
  .get(formContactController.getListNewsByCategory);

router.route("/contact-form/:id").get(formContactController.getContactFormById);

router
  .route("/contact-form/:id")
  .put(formContactController.updateStatusContactForm);

export default router;
