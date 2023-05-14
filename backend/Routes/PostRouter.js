const express = require("express");
const postRouter =express.Router();
const Post = require("../Models/PostModel");
const User = require("../Models/PostModel");
const Commentaire = require("../Models/CommentaireModel");
const multer = require("multer");

//default storage of post images 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./Images/Post");
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

  // get all fonction
  //http://localhost:9091/Post/getAll
  postRouter.route("/getAll").get((req, res) => {
    Post.find({masquer: false}, (err, posts) => {
      if (err) {
        console.log(err)
        res.status(400).json(err);
      } else {
        res.status(200).json(posts);
      }
    }).populate("user", "nom prenom profileImage").populate("commentaires");
  });


  //create by id user 
  //http://localhost:9091/Post/addPost/id
postRouter.route("/addPost/:idUser").post((req, res) => {
    User.findById(req.params.idUser ,(err,user)=>{
      const post = new Post({
        titre: req.body.titre,
        description: req.body.description,
        email:req.body.email,
        numtlf:req.body.numtlf,
        fb:req.body.fb,
        insta:req.body.insta,
        tiktok:req.body.tiktok,
        linked:req.body.linked,
        ba9chich:req.body.ba9chich,
        user: req.params.idUser,
        masquer: true
      });
      if(err){
        res.status(400)
      } else {
        post.save();
        return res.status(200).json(post)
      }
    })
  });

  //http://localhost:9091/Post/ajouterpost/idUser
  postRouter.route("/ajouterPost/:idUser").post((req, res) => {
    User.findById(req.params.idUser ,(err,user)=>{
      const post = new Post({
        titre: req.body.titre,
        description: req.body.description,
        email:req.body.email,
        numtlf:req.body.numtlf,
        insta:req.body.insta,
        fb:req.body.fb,
        tiktok:req.body.tiktok,
        linked:req.body.linked,
        ba9chich:req.body.ba9chich,
        masquer: false,
        user: req.params.idUser,
      });
      if(err){
        res.status(400)
      } else {
        post.save();
        return res.status(200).json(post)
      }
    })
  });

  //http://localhost:9091/Post/Image/idPost
postRouter.route("/Image/:idPost").put(image.single("image"), (req, res) => {
    Post.findById(req.params.idPost, (err, post) => {
    post.image = req.file.originalname;
    post.masquer = false;
    post.save();
      if (err) {
        res.status(400).json(err);
        console.log(err);
      } else {
        res.status(200).json(post);
      }
    });
  });

  //http://localhost:9091/Post/update/idPost
postRouter.route("/update/:idPost").put((req, res) => {
    Post.findById(req.params.idPost, (err, post) => {
      if (post) {
        post.titre = req.body.titre,
        post.description = req.body.description,
        post.email=req.body.email,
        post.numtlf=req.body.numtlf,
        post.fb = req.body.fb,
        post.insta=req.body.insta,
        post.tiktok=req.body.tiktok,
        post.linked=req.body.linked,
        post.ba9chich=req.body.ba9chich,
        post.date = new Date().toLocaleDateString();
        post.save();
        res.status(200);
      } else {
        post = new Post(req.body);
        post.save();
        res.status(201);
      }
      res.json(post);
    });
  });
  //http://localhost:9091/Post/getPostById/idPost
postRouter.route("/getById/:idPost").get((req, res) => {
    Post.findById(req.params.idPost, (err, post) => {
      if (err) {
        res.status(401).json(err);
        console.log(err);
      } else {
        res.status(200).json(post);
      }
    }).populate("user", "nom prenom profileImage");
  });

  //http://localhost:9091/post/getByUserId/idUser
postRouter.route("/getByUserId/:idUser").get((req, res) => {
    Post.find({user: req.params.idUser}, (err, post) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json(post);
      }
    }).populate("user", "nom prenom image");
  });

  //http://localhost:9091/Post/delete/idPost
postRouter.route("/delete/:idPost").delete((req, res) => {
    Post.findByIdAndDelete((req.params.idPost),(err, post) => {
      if(err){
        res.status(400).json(err);
      } else {
        Commentaire.deleteMany({post: req.params.idPost}, (errr, commentaire) => {
          if(errr) {
            res.status(400).json(errr)
          } else {
            res.status(200).json(post);
          }
        });
      }
    });
  });
  

  //http://localhost:9091/Post/CountPostByIdUser/idUser
postRouter.route("/CountPostByIdUser/:idUser").get((req, res) => {
    Post.count({user: req.params.idUser},(err, number) => {
        if(err){
            res.Status(400) 
        } else {
            return res.status(200).json(number);
        }
    });
});


//http://localhost:9091/Post/CountPost
postRouter.route("/CountPost").get((req, res) => {
    Post.count({},(err, number) => {
        if(err){
            res.Status(400) 
        } else {
            return res.status(200).json(number);
        }
    });
});

//http://localhost:9091/Post/LikePost/idPost
postRouter.route("/LikePost/:idPost").put((req, res) => {
    Post.findByIdAndUpdate(req.params.idPost,{},{ new: true },(err, post) => {
      if(err){
        res.status(400) 
      } else {
        post.like = post.like + 1;
        post.save();
        res.status(200).json(post);
      }
    });
  });

  
//http://localhost:9091/Post/DislikePost/idPost
postRouter.route("/disLikePost/:idPost").put((req, res) => {
  Post.findByIdAndUpdate(req.params.idPost,{},{ new: true },(err, post) => {
    if(err){
      res.Status(400) 
    } else {
      post.like = post.like - 1;
      post.save();
      res.status(200).json(post);
    }
  });
});

  //http://localhost:9091/post/masquer/idPost
postRouter.route("/masquer/:idPost").put((req, res) => {
    Post.findByIdAndUpdate(req.params.idPost,{},{ new: true },(err, post) => {
      if (!err) {
        post.masquer = !post.masquer;
        post.save();
        res.send(post);
      } else {
        console.log("Error in User Update :" + JSON.stringify(err, undefined, 2));
      }
    }
  ).populate("user", "-__v");
});


module.exports = postRouter;
