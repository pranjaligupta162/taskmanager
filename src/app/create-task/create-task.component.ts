import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {FormControl,FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GlobalsService} from '../shared/globals.service';
import {TaskService} from './task.service';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  userList:any;
  constructor(private http: HttpClient, private GlobalsService:GlobalsService,public TaskService:TaskService) { 

  }

  ngOnInit(){
  	this.getUsers();
  }

 getUsers=()=>{
	this.http.get(`${this.GlobalsService.apiURL}listusers`,this.GlobalsService.httpOptions).subscribe(res=>{
		let response=<any>res;
  		if(response.status=="success")
  			this.userList=response.users;
  		else
  			this.GlobalsService.showError(response.error);

      console.log(response,this.userList);
  	});
 }
}
