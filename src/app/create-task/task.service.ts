import { Injectable,ViewChild } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {FormControl,FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GlobalsService} from '../shared/globals.service';
import {CreateTaskComponent} from '../create-task/create-task.component';
import { MatDialog } from '@angular/material/dialog';
import {TaskListComponent} from '../task-list/task-list.component';

@Injectable({
  providedIn: 'root'
})


export class TaskService {
	tblMsg="Loading";
	constructor(private GlobalsService:GlobalsService,private http: HttpClient, private fb: FormBuilder, private dialog:MatDialog) { }
	tskCreateForm=this.fb.group({
		"message":['',Validators.required],
		"due_date":[''],
		"priority":[''],
		"assigned_to":['']
	});
	title="Create Task";
	tskId:any;
	tskDta="C";
	p1Task=[];
	p2Task=[];
	p3Task=[];
	@ViewChild(TaskListComponent) taskLstComp:TaskListComponent;
	 openTskModl(dta){
	 	this.tskDta=dta;
	 	if(dta=='C'){
	 		this.tskCreateForm.reset();
	 		this.title="Create Task";
	 	}
	 	else{
	  		this.title="Update Task";
	  		let dt:any;
	  		if(dta.due_date!=null){
	  			let date = new Date(dta.due_date);
	  			dt=new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('.')[0];
	  		}else
	  			dt='';
	  		this.tskCreateForm.patchValue({
	  			"message":dta.message,
				"due_date":dt,
				"priority":dta.priority,
				"assigned_to":dta.assigned_to
	  		})
	  		this.tskId=dta.id;
	 	}

	    this.dialog.open(CreateTaskComponent);   
	 }
	createTask(){
		console.log(this.taskLstComp);
	  	let formObj=this.tskCreateForm.value;
	  	let formData = new FormData;
	  	formData.append('message', formObj.message);
	  	formData.append('due_date', formObj.due_date.split('T').join(' ')+':00');
	  	formData.append('priority', formObj.priority);
	  	formData.append('assigned_to', formObj.assigned_to);
	  	console.log(formData);
	  	if(this.tskDta=='C'){
	  		
  			this.http.post(`${this.GlobalsService.apiURL}create`,formData,this.GlobalsService.httpOptions).subscribe(res=>{
		  		let response=<any>res;
		      if(response.status=="success"){
		        this.tskCreateForm.reset();
		        this.GlobalsService.showSuccess('Task Created Successfuly');
		        this.getTaskList();
		      }else{
		        this.GlobalsService.showError(response.error);
		      }
		  	});
	  	}else{
	  		formData.append('taskid',this.tskId);
	  		this.http.post(`${this.GlobalsService.apiURL}update`,formData,this.GlobalsService.httpOptions).subscribe(res=>{
		  		let response=<any>res;
		      if(response.status=="success"){
		        this.GlobalsService.showSuccess('Task Updated Successfuly');
		        this.getTaskList();
		      }else{
		        this.GlobalsService.showError(response.error);
		      }
		  	});
	  	}
	  
  }
  getTaskList(){
  	this.http.get(`${this.GlobalsService.apiURL}list`,this.GlobalsService.httpOptions).subscribe(res=>{
  		let response=<any>res;
  		let tskList:any;
  		if(response.status="success"){
  			tskList=response.tasks;
  			this.p1Task=tskList.filter(function(t){return t.priority==1});
  			this.p2Task=tskList.filter(function(t){return t.priority==2});
  			this.p3Task=tskList.filter(function(t){return t.priority==3});
  			this.tblMsg="No Task";
  		}
  	})
  }
}