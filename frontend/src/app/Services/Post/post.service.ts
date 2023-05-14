import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseURL="http://localhost:9091/Post";
  constructor(private posthttp:HttpClient) { }

    getPostByUserId(id:any):Observable<any>{
      return this.posthttp.get<any>(this.baseURL +"/getByUserId/"+id);
    }

    getAllPost(): Observable<any> {
      return this.posthttp.get(this.baseURL + "/getAll");
    }
  
    addPost(post: any, id: any): Observable<any> {
  
      return this.posthttp.post<any>(this.baseURL + "/addPost/" + id, post);
    }

    ajouterPost(post: any, id: any): Observable<any> {

      return this.posthttp.post<any>(this.baseURL + "/ajouterPost/" + id, post);
    }
  
    deletePost(id: any): Observable<any> {
      return this.posthttp.delete(this.baseURL + "/delete/" + id);
    }
  
    getPostById(id: any): Observable<any> {
      return this.posthttp.get<any>(this.baseURL + "/getById/" + id);
    }

    
  
    countPostByIdUser(id: any): Observable<any> {
      return this.posthttp.get(this.baseURL + "/CountPostByIdUser/" + id);
    }
  
    countPost(): Observable<any> {
      return this.posthttp.get(this.baseURL + "/CountPost");
    }
  
    likePost(id: any): Observable<any> {
      return this.posthttp.put<any>(this.baseURL + "/LikePost/" + id, null);
    }
    disLikePost(id: any): Observable<any> {
      return this.posthttp.put<any>(this.baseURL + "/disLikePost/" + id, null);
    }
    addImage(file: any, id: any): Observable<any> {
      return this.posthttp.put<any>(this.baseURL + "/Image/" + id, file);
    }
  
    masquerPost(id: any): Observable<any> {
      return this.posthttp.put(this.baseURL + "/masquer/" + id, null);
    }
  
    updatePost(id: any, post: any): Observable<any> {
      return this.posthttp.put(this.baseURL + "/update/" + id, post);
    }

}
