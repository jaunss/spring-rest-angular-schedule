import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';
import { Contact } from './contact';
import { MatDialog } from '@angular/material/dialog';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form!: FormGroup;
  contacts: Contact[] = [];
  columnsTable = ['photoContact', 'nameContact', 'emailContact', 'favoriteContact'];
  totalElements = 0;
  page = 0;
  size = 1;
  pageSizeOptions: number[] = [1];

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.assembleForm();
    this.findAllPageContacts(this.page, this.size);
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
      this.findAllPageContacts();
      this.snackBar.open('Contact was added!', 'Success!', {
        duration: 2000
      });
      this.form.reset();
    });
  }

  findAllPageContacts(page = 0, pageSize = 10) {
    this.contactService.findAllContacts(page, pageSize).subscribe(response => {
      this.contacts = response.content;
      this.totalElements = response.totalElements;
      this.page = response.number;
    });
  }

  favorite(contact: Contact) {
    this.contactService.favoriteContact(contact).subscribe(response => {
      contact.favoriteContact = !contact.favoriteContact;
    });
  }

  uploadPhoto(event: any, contact: Contact) {
    const files = event.target.files;
    if (files) {
      const photo = files[0];
      const formData: FormData = new FormData();
      formData.append("photoContact", photo);

      this.contactService.uploadPhoto(contact, formData).subscribe(response => this.findAllPageContacts());
    }
  }

  viewContact(contact: Contact) {
    this.dialog.open(ContactDetailComponent, {
      width: '400px',
      height: '400px',
      data: contact
    });
  }

  pagination(event: PageEvent) {
    this.page = event.pageIndex;
    this.findAllPageContacts(this.page, this.size);
  }

}
