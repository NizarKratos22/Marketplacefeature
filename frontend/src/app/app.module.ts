import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaderResponse, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { BlogComponent } from './Components/blog/blog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { AuthentificationComponent } from './Components/authentification/authentification.component';
import { ContactComponent } from './Components/contact/contact.component';
import { RegisterComponent } from './Components/register/register.component';
import { BlogsComponent } from './Components/blogs/blogs.component';
import { EspaceAdminComponent } from './Components/espace-admin/espace-admin.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { HowItWorkComponent } from './Components/how-it-work/how-it-work.component';
import { EventsComponent } from './Components/events/events.component';
import { PartnerShipComponent } from './Components/partner-ship/partner-ship.component';
import { EventComponent } from './Components/event/event.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileSettingsComponent } from './Components/profile-settings/profile-settings.component';
import { TableComponent } from './Components/table/table.component';
import { AideComponent } from './Components/aide/aide.component';
import { ConfidentialiteComponent } from './Components/confidentialite/confidentialite.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { UpdateMDPComponent } from './Components/update-mdp/update-mdp.component';
import { TableEtudiantComponent } from './Components/table-etudiant/table-etudiant.component';
import { TableEnseignantComponent } from './Components/table-enseignant/table-enseignant.component';
import { TableClubComponent } from './Components/table-club/table-club.component';
import { GestionBlogComponent } from './Components/gestion-blog/gestion-blog.component';
import { FiliereComponent } from './Components/filiere/filiere.component';
import { SpecialiteComponent } from './Components/specialite/specialite.component';
import { UniversityComponent } from './Components/university/university.component';
import { NiveauComponent } from './Components/niveau/niveau.component';
import { ClassComponent } from './Components/class/class.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { SalleComponent } from './Components/salle/salle.component';
import { MatiereComponent } from './matiere/matiere.component';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { GestionCalendrierComponent } from './Components/gestion-calendrier/gestion-calendrier.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostsComponent } from './Components/marketplace/posts/posts.component';
import { PostComponent } from './components/marketplace/post/post.component';
import { UpdatepostComponent } from './Components/marketplace/updatepost/updatepost.component';
import { OpportunitiesComponent } from './Components/opportunities/opportunities.component';
import { OpportunityComponent } from './Components/opportunity/opportunity.component';
import { UpdateopportunityComponent } from './Components/updateopportunity/updateopportunity.component';
import { GestionAlumniComponent } from './Components/gestion-alumni/gestion-alumni.component';
import { RegisterStudentComponent } from './Components/register-student/register-student.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogComponent,
    HeaderComponent,
    FooterComponent,
    AuthentificationComponent,
    ContactComponent,
    RegisterComponent,
    BlogsComponent,
    EspaceAdminComponent,
    ProfileComponent,
    HowItWorkComponent,
    EventsComponent,
    PartnerShipComponent,
    EventsComponent,
    EventComponent,
    SidebarComponent,
    ProfileSettingsComponent,
    TableComponent,
    ConfidentialiteComponent,
    AideComponent,
    ForgotPasswordComponent,
    UpdateMDPComponent,
    TableEtudiantComponent,
    TableEnseignantComponent,
    TableClubComponent,
    GestionBlogComponent,
    FiliereComponent,
    SpecialiteComponent,
    UniversityComponent,
    NiveauComponent,
    ClassComponent,
    SalleComponent,
    MatiereComponent,
    CalendarComponent,
    GestionCalendrierComponent,
    PostsComponent,
    PostComponent,
    UpdatepostComponent,
    OpportunitiesComponent,
    OpportunityComponent,
    UpdateopportunityComponent,
    GestionAlumniComponent,
    RegisterStudentComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    FontAwesomeModule,
    /*CalendarModule.forRoot(
      {
        provide: DateAdapter,
        useFactory: adapterFactory
      }
    ),*/
    CommonModule,
    //FlatpickrModule.forRoot(),
    NgbModalModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
