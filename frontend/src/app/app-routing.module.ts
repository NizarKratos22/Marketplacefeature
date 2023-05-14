import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthentificationComponent } from './Components/authentification/authentification.component';
import { BlogComponent } from './Components/blog/blog.component';
import { BlogsComponent } from './Components/blogs/blogs.component';
import { ContactComponent } from './Components/contact/contact.component';
import { HomeComponent } from './Components/home/home.component';
import { RegisterComponent } from './Components/register/register.component';
import { EspaceAdminComponent } from './Components/espace-admin/espace-admin.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { HowItWorkComponent } from './Components/how-it-work/how-it-work.component';
import { EventsComponent } from './Components/events/events.component';
import { PartnerShipComponent } from './Components/partner-ship/partner-ship.component';
import { EventComponent } from './Components/event/event.component';
import { ProfileSettingsComponent } from './Components/profile-settings/profile-settings.component';
import { GuardVisitorService } from './Services/GuardVisitor/guard-visitor.service';
import { TableComponent } from './Components/table/table.component';
import { ConfidentialiteComponent } from './Components/confidentialite/confidentialite.component';
import { AideComponent } from './Components/aide/aide.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { UpdateMDPComponent } from './Components/update-mdp/update-mdp.component';
import { GuardAdminOrUniversiteService } from './Services/GuardAdminOrUniversite/guard-admin-or-universite.service';
import { TableEnseignantComponent } from './Components/table-enseignant/table-enseignant.component';
import { TableEtudiantComponent } from './Components/table-etudiant/table-etudiant.component';
import { TableClubComponent } from './Components/table-club/table-club.component';
import { GestionBlogComponent } from './Components/gestion-blog/gestion-blog.component';
import { FiliereComponent } from './Components/filiere/filiere.component';
import { SpecialiteComponent } from './Components/specialite/specialite.component';
import { UniversityComponent } from './Components/university/university.component';
import { NiveauComponent } from './Components/niveau/niveau.component';
import { ClassComponent } from './Components/class/class.component';
import { SalleComponent } from './Components/salle/salle.component';
import { MatiereComponent } from './matiere/matiere.component';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { GestionCalendrierComponent } from './Components/gestion-calendrier/gestion-calendrier.component';
import { PostsComponent } from './Components/marketplace/posts/posts.component';
import { PostComponent } from './components/marketplace/post/post.component';
import { UpdatepostComponent } from './Components/marketplace/updatepost/updatepost.component';
import { OpportunitiesComponent } from './Components/opportunities/opportunities.component';
import { OpportunityComponent } from './Components/opportunity/opportunity.component';
import { UpdateopportunityComponent } from './Components/updateopportunity/updateopportunity.component';
import { GestionAlumniComponent } from './Components/gestion-alumni/gestion-alumni.component';
const routes: Routes = [
  {path:'updatepost/:id',component:UpdatepostComponent},
  {path:'updateopportunity/:id',component:UpdateopportunityComponent},
  //Accueil:
  {
    
    path: 'home',
    children: [
      { path: '', component: HomeComponent }, //http://localhost:4200/home
      { path: 'contact', component: ContactComponent }, //http://localhost:4200/home/contact
      { path: 'Register', component: RegisterComponent }, //http://localhost:4200/Register
      { path: 'howitwork', component: HowItWorkComponent }, //http://localhost:4200/home/howitwork
      { path: 'partnership', component: PartnerShipComponent }, //http://localhost:4200/home/partnership
      {
        path: '',
        children: [
          { path: 'profile', component: ProfileComponent, canActivate: [GuardVisitorService] },//http://localhost:4200/home/profile/:id
          { path: 'profile/settings', component: ProfileSettingsComponent, canActivate: [GuardVisitorService] }, //http://localhost:4200/home/profile/:id/settings
          { path: 'universities', component: EspaceAdminComponent, canActivate: [GuardAdminOrUniversiteService] }, //http://localhost:4200/home/profile/:id/admin
          { path: 'table', component: TableComponent, canActivate: [GuardAdminOrUniversiteService] }, //http://localhost:4200/home/profile/:id/table
          { path: 'table-enseignant', component: TableEnseignantComponent }, //http://localhost:4200/home/table-enseignant
          { path: 'table-etudiant', component: TableEtudiantComponent }, //http://localhost:4200/home/table-etudiant
          { path: 'table-club', component: TableClubComponent }, //http://localhost:4200/home/table-club
          { path: 'gestion-blog', component: GestionBlogComponent }, //http://localhost:4200/home/gestion-blog
          { path: 'filiere', component: FiliereComponent }, //http://localhost:4200/home/filiere
          { path: 'specialite', component: SpecialiteComponent }, //http://localhost:4200/home/specialite
          { path: 'university', component: UniversityComponent }, //http://localhost:4200/home/university
          { path: 'niveau', component: NiveauComponent }, //http://localhost:4200/home/niveau
          { path: 'class', component: ClassComponent }, //http://localhost:4200/home/class
          { path: 'salle', component: SalleComponent },//http://localhost:4200/home/salle
          { path: 'matiere', component: MatiereComponent },//http://localhost:4200/home/matiere
          { path: 'calendar', component: CalendarComponent },//http://localhost:4200/home/calendar
          { path: 'gestion-calendrier', component: GestionCalendrierComponent },
          {path:'gestion-alumni',component:GestionAlumniComponent}//http://localhost:4200/home/gestion-calendrier
        ],
      },
      {
        path: 'login',
        children: [
          { path: '', component: AuthentificationComponent },//http://localhost:4200/home/login
          { path: 'confidentialite', component: ConfidentialiteComponent },//http://localhost:4200/home/login/confidentialite
          { path: 'aide', component: AideComponent },//http://localhost:4200/home/login/aide
          { path: 'forgotpassword', component: ForgotPasswordComponent },//http://localhost:4200/home/login/forgotpassword
          { path: 'updateMDP', component: UpdateMDPComponent, canActivate: [GuardVisitorService] },//http://localhost:4200/home/login/updateMDP
        ],
      },
      {
        path:'opportunities',
        children:[
          {path:'',component:OpportunitiesComponent},//http://localhost:4200/home/opportunities
          {path:'opportunity',component:OpportunityComponent}//http://localhost:4200/home/opportunities/opportunity
        ]
      },
      {
        path:'posts',
        children:[
          {path:'',component:PostsComponent},//http://localhost:4200/home/posts
          {path:'post',component:PostComponent}//http://localhost:4200/home/posts/post
        ]
      },
      {
        path: 'blogs',
        children: [
          { path: '', component: BlogsComponent }, //http://localhost:4200/home/blogs
          { path: 'blog', component: BlogComponent }, //http://localhost:4200/home/blogs/blog
        ]
      },
      {
        path: 'events',
        children: [
          { path: '', component: EventsComponent }, //http://localhost:4200/home/events
          { path: 'event', component: EventComponent }, //http://localhost:4200/home/events/event
        ]
      },

    ]
  },

  { path: '**', component: HomeComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
