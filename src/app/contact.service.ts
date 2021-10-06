import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from './contact/contact';
import { PageContact } from './contact/pageContact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  url: string = environment.apiUrlBase;

  constructor(
    private http: HttpClient
  ) { }

  insertClient(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.url, contact);
  }

  findAllContacts(page: number, pageSize: number): Observable<PageContact> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);
    return this.http.get<any>(`${this.url}?${params.toString()}`);
  }

  favoriteContact(contact: Contact): Observable<any> {
    return this.http.patch(`${this.url}/${contact.idContact}/favorite`, null);
  }

  uploadPhoto(contact: Contact, formData: FormData): Observable<any> {
    return this.http.put(`${this.url}/${contact.idContact}/photo`, formData, { responseType: 'blob' });
  }
}
