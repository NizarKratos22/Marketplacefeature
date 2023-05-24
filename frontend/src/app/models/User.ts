import { Image } from "./Image";
import { Sex } from "./Sex";


export class User {
  id: any;
  nom: string;
  prenom: string;
  titre: string;
  email: string;
  activities:string ; 
  university:string ; 
  category:string ; 
  
  tel: string;
  cin: string;
  paye: string;
  ville: string;
  rue: string;
  codePostal: string;
  mdp: string;
  confirmMdp: string;
  dateNaissance: Date;
  desactiver: Boolean;
  profileImage: Image;
  coverImage: Image;
  institutImage: Image;
  institut: any;
  bio: string;
  sex: Sex;
  roles: string[];
  disponibilite: string;
  rang: number;
  skills: string[];
  softSkills: string;
  accessToken: string;
  class: any;
  filiere: any;

  constructor(email?: string, nom?: string, prenom?: string) { }
}
