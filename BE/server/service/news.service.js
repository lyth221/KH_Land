import newsModel from "../models/news.model.js";

const createNews = async (data) => {
  try {
    const result = await newsModel.create(data);
    return result;
  } catch (error) {
    throw error;
  }
};

const getNewsById = async (newsId) => {
  try {
    const result = await newsModel.findOne({ newsId: newsId });
    return result;
  } catch (error) {
    throw error;
  }
};

const getListNewsByCategory = async (params) => {
  try {
    const skip = (parseInt(params.page) - 1) * parseInt(params.size);
    const total = await newsModel.count();
    const result = await newsModel
      .find()
      .skip(skip)
      .limit(parseInt(params.size));
    return {
      result,
      total,
    };
  } catch (error) {
    throw error;
  }
};

export default {
  createNews,
  getNewsById,
  getListNewsByCategory,
};
