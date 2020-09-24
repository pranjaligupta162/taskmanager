import { Component, OnInit,ElementRef,Input } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
// import {FormsModule, FormGroup} from '@angular/forms';
import {GlobalsService} from '../shared/globals.service';
import {CreateTaskComponent} from '../create-task/create-task.component';
import { MatDialog } from '@angular/material/dialog';
import {TaskService} from '../create-task/task.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() srchQry:String;
  constructor(private GlobalsService:GlobalsService,private http: HttpClient,public TaskService:TaskService) { }
  ngOnInit(): void {
  	this.TaskService.getTaskList();
  }

  dltTask(id){
  	let formData= new FormData;
  	formData.append('taskid',id);
  	let msg1=`Are you sure?`;
	  	let msg2='Delete';
	   	this.GlobalsService.confirmDialog(msg1,msg2).then(function(data){
	    	if(data==true){
			  	this.http.post(`${this.GlobalsService.apiURL}delete`,formData,this.GlobalsService.httpOptions).subscribe(res=>{
			  		let response=<any>res;
			  		if(response.status="success"){
			  			 this.GlobalsService.showSuccess("Task Deleted Successfuly");
			  			 this.TaskService.getTaskList();
			  		}
			  		else
			  			this.GlobalsService.showError(response.error);
			  	})
			 }
	   	}.bind(this));
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
       console.log(event.container.data[event.currentIndex],event.container.id);
       let dta=event.container.data[event.currentIndex];
       let formData= new FormData;
       formData.append('taskid',dta['id']);
       formData.append('priority',event.container.id.split('')[1]);
        this.http.post(`${this.GlobalsService.apiURL}update`,formData,this.GlobalsService.httpOptions).subscribe(res=>{
          let response=<any>res;
          if(response.status=="success"){
            this.GlobalsService.showSuccess('Task Moved Successfuly');
          }else{
            this.GlobalsService.showError(response.error);
          }
        });
    }
  }

}
