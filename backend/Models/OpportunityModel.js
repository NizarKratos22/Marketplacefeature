const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OpportunityModel = new Schema ({
    title : {type: String},
    description :{ type:String},
    date:{type:String,default: new Date().toLocaleDateString() },
    email :{type:String , required: false},
    numtlf:{type:Number},
    image :{type: String, default: "BLOG.jpeg", required: false },
    masquer: {type: Boolean, default: true},
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
      ]

});
module.exports = mongoose.model("Opportunity",OpportunityModel);
