import newsService from "../service/news.service.js";
import contactFormService from "../service/contactForm.service.js";

const createContactForm = async (req, res) => {
  try {
    console.log("body full", req.body);
    const data = req.body;
    const result = await contactFormService.createFormContact(data);
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

const getContactFormById = async (req, res) => {
  try {
    const contactFormId = req.params.id;
    console.log("news id", newsId);
    const contactFormDetails = await contactFormService.getFormContactById(
      contactFormId
    );
    if (contactFormDetails) {
      return res.status(200).send({
        success: "successful",
        errorCode: 1,
        result: contactFormDetails,
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

const getListNewsByCategory = async (req, res) => {
  try {
    const params = {
      page: req.query.page || 1,
      size: req.query.size || 10,
    };
    const result = await contactFormService.getListContactForm(params);
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

const updateStatusContactForm = async (req, res) => {
  try {
  } catch (error) {}
};

export default {
  createContactForm,
  getContactFormById,
  getListNewsByCategory,
  updateStatusContactForm,
};
