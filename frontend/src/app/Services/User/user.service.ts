import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/Models/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { Authentification } from 'src/app/Models/Authentification';
import { UpdatePassword } from 'src/app/Models/UpdatePassword';
import { changePassword } from 'src/app/Models/changePassword';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const TOKEN = 'Token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public baseURL = "http://localhost:9091/User";

  constructor(private userhttp: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem(TOKEN));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  /////////////////////////////////IMAGE////////////////////////////////

  changeProfileImage(file: any, id: any): Observable<any> {
    return this.userhttp.put<any>(this.baseURL + "/Image/profile/" + id, file);
  }
  changeCoverImage(file: any, id: any): Observable<any> {
    return this.userhttp.put<any>(this.baseURL + "/Image/cover/" + id, file);
  }

  changeInstitutImage(file: any, id: any): Observable<any> {
    return this.userhttp.put<any>(this.baseURL + "/Image/institut/" + id, file);
  }

  ///////////////////////////////////////USER/////////////////////////////////

  signIn(authentification: Authentification) {
    return this.userhttp.post<User>(this.baseURL + "/signin", authentification, httpOptions)
  }

  signIn2(authentification: Authentification) {
    return this.userhttp.post<User>(this.baseURL + "/signin2", authentification, httpOptions)
  }

  updateMDP(updatePassword: UpdatePassword): Observable<any> {
    return this.userhttp.put<any>(this.baseURL + "/forgotPassword", updatePassword);
  }

  changeMDP(changepassword: changePassword, id: any) {
    return this.userhttp.put(this.baseURL + "/updateMDP/" + id, changepassword);
  }

  getAllUsers(): Observable<any> {
    return this.userhttp.get(this.baseURL + "/getAll");
  }

  findById(id: any): Observable<User> {
    return this.userhttp.get<User>(this.baseURL + "/getById/" + id);
  }

  deleteUser(id: any): Observable<any> {
    return this.userhttp.delete(this.baseURL + "/delete/" + id);
  }

  updateUser(user: User, id: any): Observable<User> {
    return this.userhttp.put<User>(this.baseURL + "/update/" + id, user);
  }

  updateProfile(user: User, id: any): Observable<User> {
    return this.userhttp.put<User>(this.baseURL + "/updateProfile/" + id, user);
  }

  countUsers(): Observable<any> {
    return this.userhttp.get(this.baseURL + "/Count");
  }

  activerUser(id: any): Observable<any> {
    return this.userhttp.put(this.baseURL + "/activer/" + id, null);
  }

  //////////////////////////////////////ADMIN////////////////////////////////

  addAdmin(user: User): Observable<User> {
    return this.userhttp.post<User>(this.baseURL + "/signupAdmin", user);
  }

  getAllAdmin(): Observable<any> {
    return this.userhttp.get(this.baseURL + "/getAllAdmin");
  }

  getCountAdmin(): Observable<any> {
    return this.userhttp.get(this.baseURL + "/CountAdmin")
  }

  /////////////////////////////////////UNIVERSITE///////////////////////////


  getAllUniversities(): Observable<any> {
    return this.userhttp.get(this.baseURL + "/getAllUniversities");
  }

  addUniversite(user: User): Observable<User> {
    return this.userhttp.post<User>(this.baseURL + "/signupUniversite", user);
  }

  getCountUniversities(): Observable<any> {
    return this.userhttp.get(this.baseURL + "/CountUniversite")
  }

  ////////////////////////////////////ETUDIANT/////////////////////////////

  getAllEtudiants(): Observable<any> {
    return this.userhttp.get(this.baseURL + "/getAllEtudiant");
  }

  getEtudiantsByClass(id: any): Observable<any> {
    return this.userhttp.get(this.baseURL + "/getEtudiantByClassId/" + id);
  }

  addEtudiant(user: User, idU: any, idC: any, institutImage: any): Observable<User> {
    return this.userhttp.post<User>(this.baseURL + "/signupEtudiant/" + idU + "/" + idC + "/" + institutImage, user);
  }
  registerstudent(user:User):Observable<User>{
    return this.userhttp.post<User>(this.baseURL+ "/signupEtudiant2" , user);
  }

  getCountEtudiant(): Observable<any> {
    return this.userhttp.get(this.baseURL + "/CountEtudiant")
  }

  getCountEtudiantByClassId(id: any): Observable<any> {
    return this.userhttp.get(this.baseURL + "/countEtudiantByClassId/" + id);
  }

  ///////////////////////////////////ENSEIGNANT///////////////////////////

  getAllEnseignant(): Observable<any> {
    return this.userhttp.get(this.baseURL + "/getAllEnseignant");
  }

  addEnseignant(user: User, id: any, institutImage: any): Observable<User> {
    return this.userhttp.post<User>(this.baseURL + "/signupEnseignant/" + id + "/" + institutImage, user);
  }

  getCountEnseignant(): Observable<any> {
    return this.userhttp.get(this.baseURL + "/CountEnseignant")
  }

  getCountEnseignantByUniversiteId(id: any): Observable<any> {
    return this.userhttp.get(this.baseURL + "/CountEnseignantByUniversiteId/" + id)
  }

  getEnseignantByUniversiteId(id: any): Observable<any> {
    return this.userhttp.get(this.baseURL + "/getEnseignantByUniversiteId/" + id)
  }

  //////////////////////////////////CLUB/////////////////////////////////

  getAllClub(): Observable<any> {
    return this.userhttp.get(this.baseURL + "/getAllClub");
  }
  
  addClub(user: User, idU: any, institutImage: any): Observable<User> {
    return this.userhttp.post<User>(this.baseURL + "/signupClub/" + idU + "/" + institutImage, user);
  }

  signupClub(user: User): Observable<User> {
    return this.userhttp.post<User>(this.baseURL + "/signupClub2", user);
  }

  getCountClub(): Observable<any> {
    return this.userhttp.get(this.baseURL + "/CountClub")
  }

  getCountClubByUniversiteId(id: any): Observable<any> {
    return this.userhttp.get(this.baseURL + "/CountClubByUniversiteId/" + id)
  }

  getClubByUniversiteId(id: any): Observable<any> {
    return this.userhttp.get(this.baseURL + "/getClubByUniversiteId/" + id)
  }

}
