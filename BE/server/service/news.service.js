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
    let total = await newsModel.count();
    let result = [];
    if (params.category) {
      total = await newsModel.find({ category: `${params.category}` }).count();
      result = await newsModel
        .find({ category: `${params.category}` })
        .skip(skip)
        .limit(parseInt(params.size))
        .sort({ createdAt: -1 });
    } else {
      result = await newsModel
        .find()
        .skip(skip)
        .limit(parseInt(params.size))
        .sort({ createdAt: -1 });
    }
    return {
      result,
      total,
    };
  } catch (error) {
    throw error;
  }
};

const updateNewsById = async (newsId, dataUpdate) => {
  try {
    const result = await newsModel.updateOne({ newsId: newsId }, dataUpdate);
    return result;
  } catch (error) {
    throw error;
  }
};
export default {
  createNews,
  getNewsById,
  getListNewsByCategory,
  updateNewsById,
};
