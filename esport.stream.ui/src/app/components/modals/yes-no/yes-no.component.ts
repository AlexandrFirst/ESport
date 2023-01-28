import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-yes-no',
  templateUrl: './yes-no.component.html',
  styleUrls: ['./yes-no.component.scss']
})
export class YesNoComponent {

  message: string;
  constructor(public dialogRef: MatDialogRef<YesNoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
    this.message = data.message;
  }

  okClick(){
    this.dialogRef.close({
      ok: true
    });
  }

  cancelClick(){
    this.dialogRef.close({
      ok: false
    })
  }
}
