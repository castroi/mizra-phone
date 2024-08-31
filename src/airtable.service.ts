import { Injectable } from '@angular/core';
import Airtable from 'airtable'
import { Contact } from './contact.interface';
import { environment } from './environments/environment';


    
@Injectable({
  providedIn: 'root'
})
export class AirtableService {
  AIRTABLE_KEY = environment.AIRTABLE_KEY;
  BASE_ID = environment.AIRTABLE_BASE_ID;
  TABLE_NAME = 'Imported table'
  VIEW_NAME = 'Grid view'
  MAX_SIZE = 500
  airtable = new Airtable({
    apiKey: this.AIRTABLE_KEY
  }).base(this.BASE_ID);

  
  constructor() { }

  getContacts() : Contact[]{
    var tmpContacts : Contact[] = [];
    this.airtable(this.TABLE_NAME)
      .select({view: this.VIEW_NAME , maxRecords: this.MAX_SIZE})
      .eachPage(function page(records, fetchNextPage) {
          records.map((record) => {
            var cellPhone = record.get('CellPhone');
            tmpContacts.push({
              name: record.get('FullName')?.toString() || '', 
              phone : record.get('PhoneNumber')?.toString() || '',
              email : record.get('Email')?.toString() || '', 
              mobile : cellPhone?.toString().replace(")", "")
                      .replace("(", "")
                      .replace("-", "")
                      .replace(" ", "") ||''})}),
          fetchNextPage();
        });
    return tmpContacts;         
  }
}
