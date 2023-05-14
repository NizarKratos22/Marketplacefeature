import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { OpportunityService } from 'src/app/Services/Opportunity/opportunity.service';
import { faHeart, faTrash, faComment, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/Services/User/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.scss']
})
export class OpportunityComponent implements OnInit {

  id: any;
  idUser = localStorage.getItem("Id");
  opportunity : any ; 
  user : any ; 
  faHeart = faHeart;
  faTrash = faTrash;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  hamClick: boolean
  hamburgerClick(){
    this.hamClick = !this.hamClick;
  }
  constructor(private opportunityService:OpportunityService,
    private renderer :Renderer2,
    private router :Router ,
    private userservice :UserService) { }


  ngOnInit(): void {

    this.getOpportunityById();
    this.findUserById(localStorage.getItem("Id"));
    this.hideSupp(this.id);
  }

  getOpportunityById() {
    this.id = sessionStorage.getItem("IdOpportunity")
    this.opportunityService.getOpportunityById(this.id).subscribe(
      data => {
        this.opportunity = data;
        return this.opportunity;
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
  hideSupp(id: any) {
    if (id == localStorage.getItem("Id")) {
      return false
    } else {
      return true
    }
  }



}
