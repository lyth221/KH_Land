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

const getFormContactById = async (contactFormId) => {
  try {
    const result = await contactFormModel.findOne({
      _id: contactFormId,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const getListContactForm = async (params) => {
  try {
    const skip = (parseInt(params.page) - 1) * parseInt(params.size);
    const total = await contactFormModel.count();
    const result = await contactFormModel
      .find({})
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

const updateStatusContactFormById = async (contactFormId) => {
  try {
    const result = contactFormModel.updateOne(
      { _id: contactFormId },
      { isSolved: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export default {
  createFormContact,
  getFormContactById,
  getListContactForm,
  updateStatusContactFormById,
};
