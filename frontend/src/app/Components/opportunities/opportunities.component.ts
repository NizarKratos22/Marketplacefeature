import { Component, OnInit } from '@angular/core';
import { OpportunityService } from 'src/app/Services/Opportunity/opportunity.service';
import { faThumbsUp, faThumbsDown, faTrash, faComment, faPlusCircle, faClosedCaptioning,faPencilAlt , faSlash } from '@fortawesome/free-solid-svg-icons';
import { CommentaireService } from 'src/app/Services/Commentaire/commentaire.service';
import { Opportunity } from 'src/app/Models/Opportunity';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Form, FormBuilder, NgModel } from '@angular/forms';
import { AlertService } from 'src/app/Services/User/alert.service';

@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.scss']
})
export class OpportunitiesComponent implements OnInit {

 id:any ; 
 ListOpportunity:any ; 
 title:string;
 date:string; 
 user:string; 
 faThumbsUp = faThumbsUp;
 faThumbsDown = faThumbsDown;
faTrash = faTrash;
faPencilAlt=faPencilAlt;
faComment = faComment;
nComment: any;
nOpportunity:any ;
hideformopportunity = true;
Opportunity:any={};
selectedFile: File = null;
hideimage = true;

hideform = false;
showmsg = true;
msg = '';
closeResult: string;
faAdd=faPlusCircle;
style1: string;
isOpened: boolean;
toggleStyle: string;
faClose=faSlash;




 
  constructor(private modelService:NgbModal,
    private opportunityService:OpportunityService,
    private router:Router,
    private formBuild:FormBuilder,
    private alertService:AlertService,
    private commantairesService:CommentaireService) { }

  ngOnInit(): void {
    this.getAllOpportunties();
    this.hideSupp(this.id);
    this.hideUpp(this.id);
    this.hideFormopportunity();

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
    this.modelService.open(contentalert, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
  getAllOpportunties() {
    this.opportunityService.getallOpportunities().subscribe(
      data => {
        this.ListOpportunity = data;
        this.nOpportunity = this.ListOpportunity.length;
        return this.ListOpportunity;
      },
      err=>{
        console.log(err);
      }
    )
  }
  setOpportunityId(id: any) {
    sessionStorage.setItem("IdOpportunity", id);
  }
  deleteOpportunity() {
    this.opportunityService.deleteOpportunity(sessionStorage.getItem("IdOpportunity")).subscribe(
      data => {
        return data;
      }
    );
  }
  updateOpportunity(opportunity:Opportunity , id:any){
    this.opportunityService.updateOpportunity(opportunity,this.id).subscribe(
      data =>{
        this.msg ="Opportunity Updated Successfully!"
        this.showmsg = false; 
        opportunity = data ;
        return opportunity ;
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
  hideFormopportunity() {
    if (localStorage.length != 0) {
      this.hideformopportunity = false;
    }
  }
  addOpportunity(opportunity: Opportunity) {
    this.id = localStorage.getItem("Id")
    this.opportunityService.addOpportunity(opportunity, this.id).subscribe(
      data => {
        opportunity = data;
        this.hideform = true;
        this.hideimage= false ; 
        sessionStorage.setItem("IdOpportunity", opportunity._id)
        return opportunity;
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
    this.id = sessionStorage.getItem("IdOpportunity");
    const file = new FormData();
    file.append('image', this.selectedFile, this.selectedFile.name)
    console.log(file);
    this.opportunityService.addImage(file, this.id).subscribe(
      data => {
        
        this.showmsg = false;
        this.msg = "Opportunity Added ! "
        this.router.navigate(['home/opportunities']);
        return data;
        
      },
      err=>{
        console.log(err);
      });
  }
  //scroll to top page
  topFunction() {
   
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }



}



