import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Document } from './document/document';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class DataService {
  private selectionFormatState = new Subject<any>();

  setState(state: any) {
    this.selectionFormatState.next(state);
  }

  getState(): Observable<any> {
    return this.selectionFormatState.asObservable();
  }
  public url: string;
  constructor(private http: Http) {
    this.url = 'http://localhost:3000/';
  }

  getDocument(id: string) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('document/' + id, options).map(res => res.json());
  }
  updateDocument(id: string, document: Document) {
    let params = JSON.stringify(document);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .put('update-document/' + id, params, { headers: headers })
      .map(res => res.json());
  }

  createDocument(document: Document) {
    let params = JSON.stringify(document);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post('create-document', params, { headers: headers })
      .map(res => res.json());
  }

  getDocuments() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('documents/', options).map(res => res.json());
  }

  deleteDocument(id: string) {
    let headers = new Headers({
      'Content-type': 'application/json'
    });

    let options = new RequestOptions({ headers: headers });
    return this.http
      .delete('delete-document/' + id, options)
      .map(res => res.json());
  }
}
