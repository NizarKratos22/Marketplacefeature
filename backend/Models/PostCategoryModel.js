const mongoose = require('mongoose');
const postCategorySchema = new mongoose.Schema({ 

  // Define common fields for all post categories
});

const productPostCategorySchema = new mongoose.Schema({
   price: { type: Number, required: true },
  state: { type: String, required: true },
});

const projectPostCategorySchema = new mongoose.Schema({
    impact: { type: String, required: true },
    mainGoal: { type: String, required: true },
});

const servicePostCategorySchema = new mongoose.Schema({
    pricePerHour: { type: Number, required: true },
    experience: { type: String, required: true },
    ratings: { type: Number, required: true },
});

const PostCategory = mongoose.model('PostCategory', postCategorySchema);

module.exports = {
  PostCategory,
  ProductPostCategory: PostCategory.discriminator('ProductPostCategory', productPostCategorySchema),
  ProjectPostCategory: PostCategory.discriminator('ProjectPostCategory', projectPostCategorySchema),
  ServicePostCategory: PostCategory.discriminator('ServicePostCategory', servicePostCategorySchema),
};
