const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SEX = require("./SexModel");

const userModel = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  titre: { type: String },
  email: { type: String , required:true },
  tel: { type: Number },
  cin: { type: String },
  paye: { type: String },
  ville: { type: String },
  rue: { type: String },
  codePostal: { type: Number },
  university:{type:String},
  dateNaissance: { type: String ,  default: new Date().toLocaleDateString()},
  mdp: { type: String, default: new Date().toLocaleDateString() },
  category:{type:String , default:"Category"},
  confirmMdp: { type: String ,default: new Date().toLocaleDateString() },
  desactiver: { type: Boolean, default: false },
  accessToken: [{ type: String, default: "" }],
  disponibilite: { type: String },
  rang: { type: Number },
  profileImage: { type: String, default: "PROFILE.jpeg" },
  coverImage: { type: String, default: "COVER.jpeg" },
  institutImage: { type: String, default: "COVER.jpeg" },
  //alumni suggestion
  alumni:{type:Number,default:0},
  connect: { type: Boolean, default: false },
  activated: { type: Boolean, default: false },
  verifmail: { type: Boolean, default: false },
  otp: { type: String, required: false },
  bio: { type: String },
  softSkills: { type: String },
  sex: {type: String, default: "NOt_SPECIFIED",},
  alumni:{type:Number , default:0},
  activities:{type:String},
  institut: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
  },
  class: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  filiere:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Filiere",
  },
  skills: 
    {
      type : new Array(6),
      default : ["skills1", "skills2","skills3", "skills4","skills5", "skills6"],
    },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

module.exports = mongoose.model("User", userModel);
