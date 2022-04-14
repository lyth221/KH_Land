import projectService from "../service/project.service.js";

const createProject = async (req, res) => {
  try {
    const result = await projectService.createProject(req.body);
    if (result) {
      return res.status(200).send({
        success: "successful",
        errorCode: 1,
        result: result,
      });
    } else {
      return res.status(500).send({
        success: "false",
        errorCode: 0,
        result: null,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: "false",
      errorCode: 0,
      result: null,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const newsId = req.params.id;
    const newsDetails = await projectService.getProjectById(newsId);
    if (newsDetails) {
      return res.status(200).send({
        success: "successful",
        errorCode: 1,
        result: newsDetails,
      });
    } else {
      return res.status(500).send({
        success: "false",
        errorCode: 0,
        result: null,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: "false",
      errorCode: 0,
      result: null,
    });
  }
};

const getListProject = async (req, res) => {
  try {
    const params = {
      page: req.query.page || 1,
      size: req.query.size || 10,
    };
    const result = await projectService.getListProject(params);
    if (result) {
      return res.status(200).send({
        success: "successful",
        errorCode: 1,
        result: result,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: "false",
      errorCode: 0,
      result: null,
    });
  }
};

const updateProjectById = async (req, res) => {
  try {
    const dataUpdate = req.body;
    const projectId = req.params.id;
    const result = await projectService.updateProjectById(
      projectId,
      dataUpdate
    );
    if (result) {
      return res.status(200).send({
        success: "successful",
        errorCode: 1,
        result: result,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: "false",
      errorCode: 0,
      result: null,
    });
  }
};

export default {
  createProject,
  updateProjectById,
  getListProject,
  getProjectById,
};
