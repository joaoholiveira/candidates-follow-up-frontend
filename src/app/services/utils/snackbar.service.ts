import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(private _snackBar: MatSnackBar) { }


  showSnackBar(message: string, duration: number
    , panelClass: string){
    this._snackBar.open(message, "", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: duration, 
      panelClass: panelClass
    });
  }

  exibirErro(error: any){
    (error["error"]["message"] === undefined) ? this.showSnackBar("Erro o realizar requisição!", 5000, "error-snackbar") : 
    this.showSnackBar(error["error"]["message"], 5000, "error-snackbar");
  }

}
