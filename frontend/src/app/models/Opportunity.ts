import {Image} from"./Image";

export class Opportunity{
    _id:any ; 
    titre:String; 
    description:String ; 
    image:String ; 
    email:String ; 
    numtlf:Number;
    user: any;
    commentaires: any[];
    nombreCommentaire: number;
    date: Date = new Date;
}