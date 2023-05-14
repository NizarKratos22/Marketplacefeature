import {Image} from "./Image"; 


export  class Post{
    _id: any;
  
  titre: String;
  description: String;
  image: String;
  email :String;
  fb :String ;
  insta:String ; 
  tiktok :String ; 
  ba9chich : String ; 
  linked : String ; 
  user: any;
  date: Date = new Date;
  like: number;
  commentaires: any[];
  nombreCommentaire: number;

  constructor(){}
}