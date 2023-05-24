import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { User } from './Models/User';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  menuMode = 'static';
  title = 'STUDENTHUBFRONT';
  showHead: boolean = false;
  showSidebar: boolean = false;
  id: any = null;

  ngOnInit() {
    // this.primengConfig.ripple = true;
    // document.documentElement.style.fontSize = '14px';
    AOS.init();
  }

  constructor(private router: Router) {
    // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if ((event['url'] == '/home/Register') || (event['url'] == '/home/login') ||  (event['url'] == '/home/Register-student')
        ||(event['url']=='/home/login/forgotpassword') ) {
          this.showHead = false;
        } else 
        {
          // console.log("NU")
          this.showHead = true;
        }

      }
   

    });
    // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      this.id = localStorage.getItem('Id');
      if (event instanceof NavigationStart) {
        if ((event['url'] == "/home/profile") ||
          (event['url'] == "/home/profile/settings") ||
          (event['url'] == "/home/universities") ||
          (event['url'] == "/home/table") ||
          (event['url'] == "/home/table-club") ||
          (event['url'] == "/home/table-enseignant") ||
          (event['url'] == "/home/table-etudiant") ||
          (event['url'] == "/home/filiere") ||
          (event['url'] == "/home/specialite") ||
          (event['url'] == "/home/university") ||
          (event['url'] == "/home/niveau") ||
          (event['url'] == "/home/class") ||
          (event['url'] == "/home/salle") ||
          (event['url'] == "/home/gestion-blog") ||
          (event['url'] == "/home/matiere") ||
          (event['url'] == "/home/event") ||
          (event['url'] == "/home/calendar") ||
          (event['url'] == "/home/gestion-calendrier")) {
          this.showSidebar = true;
        } else {
          // console.log("NU")
          this.showSidebar = false;
        }
      }
    });
  }


}

