import { Component, OnInit } from '@angular/core';
import {TaskService} from '../create-task/task.service';
@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {
  serchQry='';
  constructor(public TaskService:TaskService) { 
    
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
  	
  }
  search(strng){
    this.serchQry=strng;
    console.log(this.serchQry);
  }

}
