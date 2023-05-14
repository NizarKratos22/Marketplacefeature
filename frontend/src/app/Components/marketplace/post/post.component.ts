import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { PostService } from 'src/app/Services/Post/post.service';
import { CommentaireService } from 'src/app/Services/Commentaire/commentaire.service';
import { faHeart, faTrash, faComment, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/User/user.service';
import { Commentaire } from 'src/app/Models/Commentaire';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  id: any;
  idUser = localStorage.getItem("Id");
  commentaire: any;
  post: any;
  user: any;
  reponse: any;
  nComment: number;
  faHeart = faHeart;
  faTrash = faTrash;
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faThumbsDown = faThumbsDown;
  comment: any = {};
  listReponse: any;
  hideCommentform = true;

  hamClick: boolean
  hamburgerClick(){
    this.hamClick = !this.hamClick;
  }
  constructor(private postservice:PostService, private renderer:Renderer2 , private commentaireservice:CommentaireService, private router: Router, private userservice: UserService) { }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentaireByPostId();
    this.CountCommentaireByPostId();
    this.findUserById(localStorage.getItem("Id"));
    this.hideSupp(this.id);
    this.hideCommentForm();
  }

  getPostById() {
    this.id = sessionStorage.getItem("IdPost")
    this.postservice.getPostById(this.id).subscribe(
      data => {
        this.post = data;
        return this.post;
      }
    )
  }

  getCommentaireByPostId() {
    this.id = sessionStorage.getItem("IdPost")
    this.commentaireservice.getCommentaireByPostId(this.id).subscribe(
      data => {
        this.commentaire = data;
        return this.commentaire;
      }
    )
  }
  CountCommentaireByPostId() {
    this.id = sessionStorage.getItem("IdPost");
    this.commentaireservice.countCommentaireByPostId(this.id).subscribe(
      data => {
        this.nComment = data;
        return this.nComment;
      }
    )
  }
  @ViewChild('like') like: ElementRef;
  likePost() {
    const buttonLike = this.like.nativeElement.classList.contains('is-active');
    if(buttonLike) {
      this.renderer.removeClass(this.like.nativeElement, 'is-active');
    } else {
      this.renderer.addClass(this.like.nativeElement, 'is-active');
    }
    this.hamClick = !this.hamClick;
    this.id = sessionStorage.getItem("IdPost");
    this.postservice.likePost(this.id).subscribe(
      data => {
        return data;
      }
    )
  }

  dislikePost() {
    this.id = sessionStorage.getItem("IdPost");
    this.postservice.disLikePost(this.id).subscribe(
      data => {
        return data;
      }
    )
  }

  findUserById(id: any) {
    this.id = localStorage.getItem("Id");
    this.userservice.findById(this.id).subscribe(
      data => {
        this.user = data;
        return this.user;
      }
    )
  }

  addComment(comment: Commentaire) {
    this.id = sessionStorage.getItem("IdPost");
    this.idUser = localStorage.getItem("Id")
    this.commentaireservice.addCommentairePost(this.id, this.idUser, comment).subscribe(
      data => {
        comment = data;
        console.log(comment)
        return comment;
      }
    )
  }

  deleteCommentaire(id: any) {
    this.commentaireservice.deleteCommentaire(id).subscribe(
      data => {
        return data;
      }
    )
  }

  hideSupp(id: any) {
    if (id == localStorage.getItem("Id")) {
      return false
    } else {
      return true
    }
  }

  hideCommentForm() {
    if (localStorage.length > 2) {
      this.hideCommentform = false;
    }
  }
}
