import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material';
import { DataService } from '../data.service';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  sucessAPI = false;
  message: string;

  constructor(private formBuilder: FormBuilder,
              private data: DataService, 
              public dialog: MatDialog ) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      email: ['', Validators.required],
      subject: ['', Validators.required],
      body: ['', Validators.required]
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {message: this.message}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });
  }

  onSubmit() {

    this.submitted = true;

    if (this.messageForm.invalid) {
        return;
    }
   
    this.data.getAPIResponse(this.messageForm.get("email").value,this.messageForm.get("subject").value,this.messageForm.get("body").value).subscribe(data => {
      if(data["message"]){
        this.sucessAPI = true;
        console.log("Successful API Response");
        this.message = data["message"];
        this.openDialog();
        return;
        
      }

      console.log("No Feedback from API")

    });    
  }
}
