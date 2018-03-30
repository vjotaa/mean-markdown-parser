import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../data.service';
import { Document } from '../document';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  convertedText: string;
  create: boolean = false;
  viewDetail: boolean = false;
  public documents: Document;
  public document: Document;
  private subscription: Subscription;
  message;
  url;
  constructor(private _dataService: DataService) {
    this.subscription = this._dataService
      .getState()
      .subscribe(selectionFormatState => {
        this.documents = selectionFormatState;
      });

    this.url = 'http://localhost:3000/api/';
    this.document = new Document('', '', '');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    console.log(this.message);
    this.getDocuments();
  }

  getDocuments() {
    this._dataService.getDocuments().subscribe(response => {
      !response.documents
        ? console.error('error')
        : (this.documents = response.documents);
    });
  }
}
