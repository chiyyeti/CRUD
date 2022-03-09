import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../Shared/api.service';
// import { NgToastService } from 'ng-angular-popup'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  public loginForm !:FormGroup;
  constructor(private fb:FormBuilder,private http:HttpClient, private router:Router,private service:ApiService) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    }) 
  }

  login(){
    this.http.get<any>('http://localhost:3000/signupUsers').subscribe(res=>{
      const user=res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password

      });
      if(user){
        alert("Login SUCCESS!!");
        // this.toast.success({detail:"Success Message",summary:'Login is Success!!', duration:3000})
        this.loginForm.reset();
    
        this.router.navigate(['dashboard'])
      }else{
        alert('user not found !!')
        
        
      }

    },err=>{
      alert('Something went WRONG !!')
      // this.toast.success({detail:"Error Message",summary:'Login Failed, Try again later!', duration:3000})
    })
  }
  

}
