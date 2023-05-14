const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {PostCategory} = require('./PostCategoryModel')
const postmodel =  new Schema({
    titre: { type: String },
    description: { type: String },
    date: { type: String, default: new Date().toLocaleDateString() },
    image: { type: String, default: "nawarashop.png", required: false },
    like: {type: Number, default: 0},
    email:{type:String},
    masquer: {type: Boolean, default: true}, 
    numtlf:{type:String},
    insta:{type:String},
    tiktok:{type:String},
    linked:{type:String},
    fb:{type:String},
    ba9chich:{type:String},
    /*product category
    price: { type: Number },
    state: { type: String },
    //Project category
    impact: { type: String },
    mainGoal: { type: String },
    //Service Category 
    pricePerHour: { type: Number},
    experience: { type: String},
    */
    ratings: { type: Number},
    /*category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostCategory',
        
      },*/
    nombreCommentaire: {type: Number, default:0},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      commentaires: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Commentaire",
        }
      ],
     
     /* ProductCategorie:[{
         
            type: mongoose.Schema.Types.ObjectId,
            ref:"ProductPostCategorie"
         
      }]*/
      

});

module.exports = mongoose.model("Post", postmodel);
