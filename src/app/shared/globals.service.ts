import { Injectable } from '@angular/core';
import {HttpHeaders,HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ConfirmationDialogModel, ConfirmationDialogComponent } from '../common/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
	apiURL='https://devza.com/tests/tasks/';
	public httpOptions = {
         headers: new HttpHeaders({
                  'AuthToken': 'oC0wsrG6dUGiFuLtKYet3Bb9P1zHe3sM'
            }),
    }		
  constructor(private http: HttpClient, public _snackBar: MatSnackBar,private dialog : MatDialog) { }

  getUserList(){
  	return this.http.get(`${this.apiURL}listusers`,this.httpOptions);
  }
  showSuccess(message: string) {
      this._snackBar.open(message,'x', {
        duration: 2000,
        panelClass: 'showSuccess'
      });
    }
    showError(message: string) {
      this._snackBar.open(message,'x', {
        duration: 2000,
        panelClass: 'showError'
      });
    }
     //confirm dialog promise
    confirmDialog(msg1,msg2){
      if(!msg1)
        msg1=`Are you sure you want to do this?`;
      if(!msg2)
        msg2="Confirm Action";
      
      return new Promise(function(resolve,reject){
       const message = msg1;
         const dialogData = new ConfirmationDialogModel(msg2, message);
         const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
           maxWidth: "400px",
           data: dialogData
         });
         dialogRef.afterClosed().subscribe(dialogResult => {
           resolve(dialogResult);
         });
      }.bind(this));
    }
}
