import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from './contact/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  url: string = environment.apiUrlBase;

  constructor(
    private http: HttpClient
  ) { }

  insertClient(contact: Contact) : Observable<Contact> {
    return this.http.post<Contact>(this.url, contact);
  }
}
