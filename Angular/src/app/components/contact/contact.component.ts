import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Contact } from 'src/app/models/contact';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm:FormGroup;
  contact = new Contact();
  submitted:boolean;

  constructor(private fb:FormBuilder, private helperService:HelperService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.createContactForm();
  }

  createContactForm(){
    this.contactForm= this.fb.group({
      name:["",Validators.required],
      email:["", [Validators.email, Validators.required]],
      subject:["", Validators.required],
      message:["", Validators.required]
    })
  }

  onSubmit(){
    this.submitted = true
     if (this.contactForm.valid) {
       this.mapContact()
       this.helperService.sendContactEmail(this.contact).subscribe(success =>{
            this.toastr.success("Your message has been received, we will get back to you as soon as possible.")
            this.onReset()
       },error =>{
            this.toastr.error("Some unknown error occured")
       })
     }
  }

  onReset(){
    this.submitted=false
    this.contactForm.reset()   
  }
  
  mapContact(){
    this.contact.name = this.contactForm.value.name;
    this.contact.email = this.contactForm.value.email;
    this.contact.subject = this.contactForm.value.subject;
    this.contact.message = this.contactForm.value.message;

  }





}
