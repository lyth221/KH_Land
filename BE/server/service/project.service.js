import projectModel from "../models/project.model.js";

const createProject = async (data) => {
  try {
    const result = await projectModel.create(data);
    return result;
  } catch (error) {
    throw error;
  }
};

const getListProject = async (params) => {
  try {
    const skip = (parseInt(params.page) - 1) * parseInt(params.size);
    const total = await projectModel.count();
    const result = await projectModel
      .find()
      .skip(skip)
      .limit(parseInt(params.size))
      .sort({ createdAt: -1 });
    return {
      result,
      total,
    };
  } catch (error) {
    throw error;
  }
};

const updateProjectById = async (projectCode, data) => {
  try {
    const result = await projectModel.updateOne(
      { projectCode: projectCode },
      data
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export default {
  createProject,
  getListProject,
  updateProjectById,
};
