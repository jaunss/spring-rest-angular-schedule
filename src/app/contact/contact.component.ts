import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';
import { Contact } from './contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form!: FormGroup;
  contacts: Contact[] = [];
  columnsTable = ['nameContact', 'emailContact', 'favoriteContact'];

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.assembleForm();
    this.findAllContacts();
  }

  assembleForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    const formValues = this.form.value;
    const contact: Contact = new Contact(formValues.name, formValues.email);
    this.contactService.insertClient(contact).subscribe(response => {
      this.contacts.push(response);
      console.log(this.contacts);
    });
  }

  findAllContacts() {
    this.contactService.findAllContacts().subscribe(response => {
      this.contacts = response;
    })
  }

}
