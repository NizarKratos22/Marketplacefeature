import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/Services/Post/post.service';

@Component({
  selector: 'app-updatepost',
  templateUrl: './updatepost.component.html',
  styleUrls: ['./updatepost.component.scss']
})
export class UpdatepostComponent  {

  post: any ; 
  id : any ; 
  style1: string;
  isOpened: boolean;
  toggleStyle: string;
  msg = '';
  showmsg = true;
  

  constructor(private act: ActivatedRoute ,private _shared:PostService , private router:Router) { }

  update() {
    this._shared.updatePost(this.id,this.post).subscribe(
      res=>{
        console.log(res);
        this.isOpened= true;
        this.msg ="Post Updated Successfully!"
        this.showmsg = false; 
        this.router.navigate(['/home/posts']);
      },err=>{
        console.log(err);
      }
    )
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

  ngOnInit():void{

    this.id = this.act.snapshot.paramMap.get('id');
    this._shared.getPostById(this.id).
    subscribe(
      res=>{
        this.post = res ;
      },err=>{
        console.log(err);
      }
    )
  }
   

}
