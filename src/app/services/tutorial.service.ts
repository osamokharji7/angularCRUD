import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { of, Observable } from 'rxjs';


const baseUrl = 'http://localhost:8080/api/tutorials';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  tutorials:any[];
  constructor(private http: HttpClient) { 
   
    this.tutorials=[
      {username:"USER1",role:"MANAGER"},
      {username:"USER2",role:"OPERATOR"},
      {username:"USER3",role:"ADMIN"},
      {username:"OPERATOR",role:"OPERATOR"},
      {username:"VIEW",role:"ADMIN"},
      {username:"VIEW USER",role:"MANAGER"},
      {username:"USER 4 ",role:"OPERATOR"},
  ];
  }

  getAll() {
    //return this.http.get(baseUrl);
    return of(this.tutorials);
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data) {
    return this.http.post(baseUrl, data);
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }

  findByTitle(title) {
    return this.http.get(`${baseUrl}?title=${title}`);
  }
}
