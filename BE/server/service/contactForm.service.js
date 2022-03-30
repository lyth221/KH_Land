import contactFormModel from "../models/contactForm.model.js";

const createFormContact = async (data) => {
  try {
    const result = await contactFormModel.create(data);
    console.log("result", result);
    return result;
  } catch (error) {
    throw error;
  }
};

const getFormContactById = async (newsId) => {
  try {
    const result = await contactFormModel.findOne({
      contactFormId: contactFormId,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const getListContactForm = async (params) => {
  try {
    const skip = (parseInt(params.page) - 1) * parseInt(params.size);
    const result = await contactFormModel
      .find({ category: params.category })
      .skip(skip)
      .limit(parseInt(params.size));
    return result;
  } catch (error) {
    throw error;
  }
};

export default {
  createFormContact,
  getFormContactById,
  getListContactForm,
};
