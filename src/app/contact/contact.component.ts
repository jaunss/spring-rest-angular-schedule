import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from './contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    const contact: Contact = new Contact();
    contact.nameContact = 'Joaozim';
    contact.emailContact = 'joaozim@joaozim.com';
    contact.favoriteContact = false;

    this.contactService.insertClient(contact).subscribe(response => {
      console.log(response);
    });
  }

}
