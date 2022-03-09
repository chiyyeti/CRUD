import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  

  constructor(private http:HttpClient) { }


postEmploye(data:any){
 
  return this.http.post<any>('http://localhost:3000/posts',data).pipe(map(res=>{
    return res ;
  }))
}
getEmployee(){

  const myHeader= new HttpHeaders({
    'content-type' : 'application/json',
    'Authorization' : 'crudheaderchecking12434156'
  });
  
  return this.http.get<any>('http://localhost:3000/posts',{headers : myHeader}).pipe(map(res=>{
    return res ;
  }))
}
updateEmploye(data:any,id:number){
  
  return this.http.put<any>('http://localhost:3000/posts/'+id,data).pipe(map(res=>{
    return res ;
  }))
}
deleteEmploye(id :number){
  
  return this.http.delete<any>('http://localhost:3000/posts/'+id).pipe(map(res=>{
    return res ;
  }))
}
 isLog(){
  return true;
 }

 }



