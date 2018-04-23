import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../data.service';
import { Document } from '../document';
import { Subscription, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  errorMsg: string;
  documents$: Observable<Document[]>;
  private subscription: Subscription;
  message;
  constructor(private _dataService: DataService) {
    this.subscription = this._dataService.getState().subscribe(data => {
      this.documents$ = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.getDocuments();
  }

  getDocuments() {
    this.errorMsg = '';
    this.documents$ = this._dataService.getDocuments().pipe(
      catchError(errorMessage => {
        this.errorMsg = errorMessage;
        return [];
      })
    );
  }
}
