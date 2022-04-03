import newsService from "../service/news.service.js";

const createNews = async (req, res) => {
  try {
    const data = req.body;
    const result = await newsService.createNews(data);
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

const getNewsById = async (req, res) => {
  try {
    const newsId = req.params.id;
    console.log("news id", newsId);
    const newsDetails = await newsService.getNewsById(newsId);
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

const getListNewsByCategory = async (req, res) => {
  try {
    const params = {
      page: req.query.page || 1,
      size: req.query.size || 10,
    };
    const result = await newsService.getListNewsByCategory(params);
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

const updateNewsById = async (req, res) => {
  try {
  } catch (error) {}
};

export default {
  createNews,
  getNewsById,
  getListNewsByCategory,
  updateNewsById,
};
