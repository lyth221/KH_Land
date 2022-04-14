import { Router } from "express";
import projectController from "../../controller/project.controller.js";

const router = new Router();

router.route("/project").post(projectController.createProject);

router.route("/project/list").get(projectController.getListProject);

router.route("/project/:id").get(projectController.getProjectById);

router.route("/project/:id").put(projectController.updateProjectById);

export default router;
