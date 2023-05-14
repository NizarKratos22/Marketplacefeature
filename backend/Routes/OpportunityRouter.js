const express = require("express");
const opportunityrouter = express.Router();
const Opportunity = require("../Models/OpportunityModel");
const User = require("../Models/UserModel");
const Commentaire = require("../Models/CommentaireModel");
const multer = require("multer");

//default storage of post images 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Images/Opportunity");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// filtrage de type de fichier 
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jfif" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("le fichier doit etre jpeg, jfif, jpg ou png"), null, false);
  }
};
// image size and resolution 
const image = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

  //http://localhost:9091/Opportunity/getAll
  opportunityrouter.route("/getAll").get((req, res) => {
    Opportunity.find({masquer: false}, (err, opportunities) => {
      if (err) {
        console.log(err)
        res.status(400).json(err);
       
      } else {
      res.status(200).json(opportunities);
      }
    }).populate("user", "nom prenom profileImage").populate("commentaires");
  });
  
  //http://localhost:9091/Opportunity/addOpportunity/idUser
opportunityrouter.route("/addOpportunity/:idUser").post((req, res) => {
  User.findById(req.params.idUser ,(err,user)=>{
    const opportunity = new Opportunity({
      title: req.body.title,
      description: req.body.description,
      email : req.body.email,
      numtlf:req.body.numtlf,
      image : req.body.filename ,
      masquer: false,
      user: req.params.idUser      
    });
    if(err){
      res.status(400)
      
    } else {
      opportunity.save();
    // return res.status(400).send("error in adding opportunity");
      return res.status(200).json(opportunity);
    }
  })
});

//http://localhost:9091/Opportunity/Image/idOpportunity
opportunityrouter.route("/Image/:idOpportunity").put(image.single("image"), (req, res) => {
  Opportunity.findById(req.params.idOpportunity, (err, opportunity) => {
    opportunity.image = req.file.originalname;
    opportunity.masquer = false;
    opportunity.save();
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      res.status(200).json(opportunity);
    }
  });
});

  //http://localhost:9091/Opportunity/update/idOpportunity
  opportunityrouter.route("/update/:idOpportunity").put((req, res) => {
    Opportunity.findById(req.params.idOpportunity, (err, opportunity) => {
      if (opportunity) {
        opportunity.title = req.body.title,
        opportunity.description = req.body.description,
        opportunity.email=req.body.email,
        opportunity.numtlf=req.body.numtlf,
        opportunity.date = new Date().toLocaleDateString();
        opportunity.save();       
        res.status(200);
      } else {
        opportunity = new Opportunity(req.body);        
        opportunity.save();
        res.status(201);
      }
      res.json(opportunity);
    });
  });

    //http://localhost:9091/Opportunity/getOpportunityById/idOpportunity
opportunityrouter.route("/getById/:idOpportunity").get((req, res) => {
    Opportunity.findById(req.params.idOpportunity, (err, opportunity) => {
      if (err) {
        res.status(401).json(err);
        console.log(err);
      } else {
        res.status(200).json(opportunity);
      }
    }).populate("user", "nom prenom profileImage");
  });

    //http://localhost:9091/Opportunity/getByUserId/idUser
opportunityrouter.route("/getByUserId/:idUser").get((req, res) => {
    Opportunity.find({user: req.params.idUser}, (err, opportunity) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json(opportunity);
      }
    }).populate("user", "nom prenom image");
  });

//http://localhost:9091/Opportunity/delete/idOpportunity
opportunityrouter.route("/delete/:idOpportunity").delete((req, res) => {
    Opportunity.findByIdAndDelete((req.params.idOpportunity),(err, opportunity) => {
      if(err){
        res.status(400).json(err);
      } else {
        Commentaire.deleteMany({opportunity: req.params.idOpportunity}, (errr, commentaire) => {
          if(errr) {
            res.status(400).json(errr)
          } else {
            
            res.status(200).json(opportunity);
          }
        });
      }
    });
  });

    //http://localhost:9091/Post/CountPostByIdUser/idUser
opportunityrouter.route("/CountOpportunityByIdUser/:idUser").get((req, res) => {
    Opportunity.count({user: req.params.idUser},(err, number) => {
        if(err){
            res.Status(400) 
        } else {
            return res.status(200).json(number);
        }
    });
});

//http://localhost:9091/Opportunity/CountOpportunity
opportunityrouter.route("/CountOpportunity").get((req, res) => {
    Opportunity.count({},(err, number) => {
        if(err){
            res.Status(400) 
        } else {
            return res.status(200).json(number);
        }
    });
});

 //http://localhost:9091/post/masquer/idOpportunity
 opportunityrouter.route("/masquer/:idOpportunity").put((req, res) => {
    Opportunity.findByIdAndUpdate(req.params.idOpportunity,{},{ new: true },(err, opportunity) => {
      if (!err) {
        opportunity.masquer = !opportunity.masquer;
        opportunity.save();
        res.send(opportunity);
      } else {
        console.log("Error in User Update :" + JSON.stringify(err, undefined, 2));
      }
    }
  ).populate("user", "-__v");
});


module.exports = opportunityrouter ;

