import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/Services/Post/post.service';
import { faThumbsUp, faThumbsDown, faTrash, faComment, faPlusCircle, faClosedCaptioning,faPencilAlt , faSlash } from '@fortawesome/free-solid-svg-icons';
import { CommentaireService } from 'src/app/Services/Commentaire/commentaire.service';
import { Post } from 'src/app/Models/Post';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Form, FormBuilder, NgModel } from '@angular/forms';
import { AlertService } from 'src/app/Services/User/alert.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {


   id:any ; 
   ListPost : any ; 
   titre:string  ; 
   date : string ; 
   user :string ; 
   faThumbsUp = faThumbsUp;
   faThumbsDown = faThumbsDown;
  faTrash = faTrash;
  faPencilAlt=faPencilAlt;
  faComment = faComment;
  nComment: any;
  nPosts: any;
  hideformpost = true;
  hideformupdatepost = true ; 
  Post: any={};
  selectedFile: File = null;
  hideimage = true;
  hideform = false;
  hideformupdate =false ;
  showmsg = true;
  msg = '';
  closeResult: string;
  faAdd=faPlusCircle;
  style1: string;
  isOpened: boolean;
  toggleStyle: string;
  faClose=faSlash;
  constructor(private modalService:NgbModal,
    private postService:PostService,
    private router:Router,
    private formBuilder:FormBuilder,
    private alertService:AlertService,
    private commantaireservice:CommentaireService) { }

  ngOnInit(): void {
    this.getAllPosts();
    this.hideSupp(this.id);
    this.hideUpp(this.id);
    this.hideFormPost();
    this.HideFormUpdatePost();
  }
  toggle(){
    this.style1="flex";
    // this.style2="none";
    this.isOpened=true;
    this.toggleStyle="flex";
  }
  closeNote(){
    this.style1="none"
    this.isOpened=false;
  }
  openalert(contentalert) {
    this.modalService.open(contentalert, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  getAllPosts() {
    this.postService.getAllPost().subscribe(
      data => {
        this.ListPost = data;
        this.nPosts = this.ListPost.length;
        return this.ListPost;
      },
      err=>{
        console.log(err);
      }
    )
  }
  setPostId(id: any) {
    sessionStorage.setItem("IdPost", id);
  }
  SearchPostByTitre() {
    if (this.titre != "") {
      this.ListPost = this.ListPost.filter(res => {
        return res.titre.toLowerCase().match(this.titre.toLowerCase());
      });
    }
    else if (this.titre == "") {
      this.getAllPosts();
    }
  }
  SearchPostByDate() {
    if (this.date != "") {
      this.ListPost = this.ListPost.filter(res => {
        return res.date.toLowerCase().match(this.date.toLowerCase());
      });
    }
    else if (this.date == "") {
      this.getAllPosts();
    }
  }
  deletePost() {
    this.postService.deletePost(sessionStorage.getItem("IdPost")).subscribe(
      data => {
        return data;
      }
    );
  }
  updatePost(post:Post , id:any){
    this.postService.updatePost(post,this.id).subscribe(
      data =>{
        this.msg ="Post Updated Successfully!"
        this.showmsg = false; 
        post = data ;
        alert("post Updated! enjoy");
        return post ;
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
  hideUpp(id: any) {
    if (id == localStorage.getItem("Id")) {
      return false
    } else {
      return true
    }
  }
  CountCommentaireByPostId(id: any) {
    return this.commantaireservice.countCommentaireByPostId(id).subscribe(
      data => {
        this.nComment = data;
        return this.nComment;
      }
    );
  }

  likePost(id: any) {
    this.postService.likePost(id).subscribe(
      data => {
        let hidelike = true;
        let hidedislike = false;
        return data;
      }
    )
  }
  dislikePost(id: any) {
    this.postService.disLikePost(id).subscribe(
      data => {
        let hidelike = false;
        let hidedislike = true;
        return data;
      }
    )
  }
  hideFormPost() {
    if (localStorage.length != 0) {
      this.hideformpost = false;
    }
  }
  HideFormUpdatePost(){
    if (localStorage.length != 0) {
      this.hideformupdatepost = false;
    }
  }

  addPost(post: Post) {
    this.id = localStorage.getItem("Id")
    this.postService.addPost(post, this.id).subscribe(
      data => {
        post = data;
        this.hideform = true;
        this.hideimage = false;
        sessionStorage.setItem("IdPost", post._id)
        alert("post added! enjoy");
        this.router.navigate(['/home/posts']);

        return post;
      },
      err=>{
        console.log(err);
      }
    )
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }
  addImage() {
    this.id = sessionStorage.getItem("IdPost");
    const file = new FormData();
    file.append('image', this.selectedFile, this.selectedFile.name)
    console.log(file);
    this.postService.addImage(file, this.id).subscribe(
      data => {
        
        this.showmsg = false;
        this.msg = "Post Added Gl in promoting your post ! "
        this.router.navigate(['home/posts']);
        return data;
        
      },
      err=>{
        console.log(err);
      });
  }

  //scroll up 
  topFunction() {
   
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }


}
