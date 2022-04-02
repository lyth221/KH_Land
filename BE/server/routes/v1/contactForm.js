import { Router } from "express";
import newsController from "../../controller/news.controller.js";
import formContactController from "../../controller/formContact.controller.js";

const router = new Router();

router.route("/contact-form").post(formContactController.createContactForm);
router
  .route("/contact-form/list")
  .get(formContactController.getListContactForm);
router.route("/contact-form/:id").get(formContactController.getContactFormById);

router
  .route("/contact-form/:id")
  .put(formContactController.updateStatusContactFormById);

export default router;
