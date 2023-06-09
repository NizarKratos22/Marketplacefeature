const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 9091;
const userRouter = require("./Routes/UserRouter");
const seanceRouter = require("./Routes/SeanceRouter");
const salleRouter = require("./Routes/SalleRouter");
const eventRouter = require("./Routes/EventRouter");
const blogRouter = require("./Routes/BlogRouter");
const postRouter = require("./Routes/PostRouter");
const opportunityRouter = require("./Routes/OpportunityRouter");
const commentaireRouter = require("./Routes/CommentaireRouter");
const contactRouter = require("./Routes/ContactRouter");
const roleRouter = require("./Routes/RoleRouter");
const classRouter = require("./Routes/ClassRouter");
const filiereRouter = require("./Routes/FiliereRouter");
const niveauRouter = require("./Routes/NiveauRouter");
const specialiteRouter = require("./Routes/SpecialiteRoutes");
const matiereRouter = require("./Routes/MatiereRouter");
const Role = require("./Models/RoleModel");
const Salle = require("./Models/SalleModel");
const Event= require("./Models/EventModel");
const Post = require("./Models/PostModel");
const User = require("./Models/UserModel");
const Blog = require("./Models/BlogModel");
const Opportunity = require("./Models/OpportunityModel");
const Class = require("./Models/ClassModel");
const Commentaire = require("./Models/CommentaireModel");
const Filiere = require("./Models/FiliereModel");
const Niveau = require("./Models/NiveauModel");
const Specialite = require("./Models/SpecialiteModel");
const Matiere = require("./Models/MatiereModel");
const Seance = require("./Models/SeanceModel");
var bcrypt = require("bcryptjs");

mongoose
  .connect("mongodb://127.0.0.1:27017/StudentHub", { useNewUrlParser: true })
  .then(async () => {
    let rl = await initialeRole();
    initialeUser(rl);
  });
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("Images"));

app.get("/", (req, res) => {
  res.send("Hello Student Hub");
});
app.use("/User", userRouter);
app.use("/Blog", blogRouter);
app.use("/Post",postRouter);
app.use("/Commentaire", commentaireRouter);
app.use("/Contact", contactRouter);
app.use("/Role", roleRouter);
app.use("/Class", classRouter);
app.use("/Filiere", filiereRouter);
app.use("/Niveau", niveauRouter);
app.use("/Specialite", specialiteRouter);
app.use("/Salle", salleRouter);
app.use("/Matiere", matiereRouter);
app.use("/Seance", seanceRouter);
app.use("/Event", eventRouter);
app.use("/Opportunity",opportunityRouter);


app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

async function initialeRole() {
  Role.estimatedDocumentCount(async (err, count) => {
    if (!err && count === 0) {
      await new Role({
        nom: "ADMINISTRATEUR",
      }).save((err) => {
        if (err) {
          console.log(err);
        }
        console.log("Added Role ADMINISTRATEUR");
      });
      await new Role({
        nom: "UNIVERSITE",
      }).save((err) => {
        if (err) {
          console.log(err);
        }
        console.log("Added Role UNIVERSITE");
      });
      await new Role({
        nom: "ENSEIGNANT",
      }).save((err) => {
        if (err) {
          console.log(err);
        }
        console.log("Added Role ENSEIGNANT");
      });
      await new Role({
        nom: "ETUDIANT",
      }).save((err) => {
        if (err) {
          console.log(err);
        }
        console.log("Added Role ETUDIANT");
      });
      await new Role({
        nom: "CLUB",
      }).save((err) => {
        if (err) {
          console.log(err);
        }
        console.log("Added Role CLUB");
      });
    }
  });
  return await Role.findOne({ nom: "ADMINISTRATEUR" });
}

function initialeUser(role) {
  User.estimatedDocumentCount((err, count) => {
    Role.estimatedDocumentCount((err, countRole)=>{
      if (!err && count === 0 && countRole !==0) {
        new User({
          nom: "Admin",
          prenom: "Admin",
          titre: "Administrator of the application",
          email: "nizar.hajjouni7@gmail.com",
          tel: "+216 56 49 59 75",
          cin: "00480313",
          paye: "TUNISIA",
          ville: "Ariana",
          rue: "1642",
          codePostal: "2041",
          dateNaissance: "10-07-1996",
          mdp: bcrypt.hashSync("Admin", 8),
          confirmMdp: bcrypt.hashSync("Admin", 8),
          desactiver: false,
          accessToken: "",
          disponibilite: "",
          rang: 0,
          profileImage: "PROFILE.jpeg",
          coverImage: "COVER.jpeg" ,
          institutImage: "COVER.jpeg",
          bio: "Welcome To My Profile",
          softSkills: "Adminstrator of Android Club At ESEN",
          sex: "HOMME",
          institut: role._id,
          class: role._id,
          filiere: role._id,
          roles: role._id,
          
        }).save((err) => {
          if (err) {
            console.log(err);
          }
          console.log("Added ADMINISTRATOR");
        });
      }
    });
  })
}
