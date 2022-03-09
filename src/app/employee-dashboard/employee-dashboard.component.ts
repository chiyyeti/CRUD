import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../Shared/api.service';
import { EmployeeModel } from './employee-dashboard.modle';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
 empObj : EmployeeModel= new EmployeeModel();

 showAdd !:boolean;
 showUpdate !:boolean;

 employeeData !:any;

  constructor(private fb:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.fb.group({
      firstName : ['',[Validators.required,Validators.pattern('/^[A-Za-z]+$/')]],
      lastName : ['',Validators.required],
      email : ['',Validators.required],
      mobile : ['',Validators.minLength(10)],
      salary : ['',Validators.maxLength(6)],
    }),
    this.getAllEmployee();

  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
    postEmployeeDetails(){
      this.empObj.firstName=this.formValue.value.firstName;
      this.empObj.lastName=this.formValue.value.lastName;
      this.empObj.email=this.formValue.value.email;
      this.empObj.mobile=this.formValue.value.mobile;
      this.empObj.salary=this.formValue.value.salary;
    
this.api.postEmploye(this.empObj).subscribe(res=>{console.log(res);
  alert("Employee Added Successfully !")

  let ref=document.getElementById('cancel')
  ref?.click();
  this.formValue.reset();
  this.getAllEmployee();
},err=>{
  alert("Something went WRONG!")
})

    }
getAllEmployee(){
  this.api.getEmployee().subscribe(res=>{
    this.employeeData=res;
  })
}

deleteEmployee(row :any){
  this.api.deleteEmploye(row.id).subscribe(res=>{  
    alert("Employee Deleted!");
    this.getAllEmployee();
  })
}

onEdit(row :any){

  this.showAdd=false;
  this.showUpdate=true;
  this.empObj.id=row.id;
  this.formValue.controls['firstName'].setValue(row.firstName);
  this.formValue.controls['lastName'].setValue(row.lastName);
  this.formValue.controls['email'].setValue(row.email);
  this.formValue.controls['mobile'].setValue(row.mobile);
  this.formValue.controls['salary'].setValue(row.salary);
 
}

updateEmployeeDetails(){
  this.empObj.firstName=this.formValue.value.firstName;
  this.empObj.lastName=this.formValue.value.lastName;
  this.empObj.email=this.formValue.value.email;
  this.empObj.mobile=this.formValue.value.mobile;
  this.empObj.salary=this.formValue.value.salary;

  this.api.updateEmploye(this.empObj,this.empObj.id).subscribe(res=>{
    alert('Employee Data Updated Successfully!');

    let ref=document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllEmployee();

  })
}



}
