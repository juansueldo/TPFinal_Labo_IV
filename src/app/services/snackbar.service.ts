import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }
  showSnackBar(message: string, buttonText: string, duration: number){
    let sb = this.snackBar.open(message, buttonText, {
      duration: 3000 | duration,
      panelClass:'error-alert-snackbar'
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }
}
