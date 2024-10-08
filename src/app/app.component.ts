import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatList, MatListModule } from '@angular/material/list';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { Contact } from '../contact.interface';
import { MatToolbarModule } from '@angular/material/toolbar';
//import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AirtableService } from '../airtable.service';
import { ClipboardModule, ClipboardService } from 'ngx-clipboard';
import { PopupService } from './popup/popup.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    MatList,
    MatInput,
    MatIcon,
    NgFor,
    NgIf,
    ClipboardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  contacts : Contact[] = [];
  searchText: string = '';
  message = 'Password changed!';
  timeoutId: any;

  constructor(private airtable: AirtableService,private clipboardService: ClipboardService, 
    private popupService : PopupService) { }

  ngOnInit(): void {
    this.contacts = this.airtable.getContacts();
  }


  ngOnDestroy() {
    clearTimeout(this.timeoutId);
  }
  searchContacts() : Contact[] {
    return this.contacts.filter(contact => {
      const searchTerms = this.searchText.toLowerCase().split(' ');
      return searchTerms.every(term => {
        return contact.name.toLowerCase().includes(term) 
        || contact.email.toLowerCase().includes(term)
        || contact.mobile.toLowerCase().includes(term) 
        || contact.phone.toLowerCase().includes(term);
      });
    });
  }

 
  shareContact(contact: any) {
    // Implement share functionality here
    console.log(`Sharing ${contact.name} contact information`);
  }

  
  makeCall(text : string) {
    window.open(`tel:${text}`, '_self');
  }
  copyToClipboard(text : string){
    this.clipboardService.copyFromContent(text);
    this.popupService.openPopup();
  }
}