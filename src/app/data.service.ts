import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Document } from './document/document';
// tslint:disable-next-line:import-blacklist
import { Observable, Subject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DocumentDetailComponent } from './document/document-detail/document-detail.component';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class DataService {
  public url = 'http://localhost:5000';
  private selectionFormatState = new Subject<any>();

  setState(state: any) {
    this.selectionFormatState.next(state);
  }

  getState(): Observable<any> {
    return this.selectionFormatState.asObservable();
  }
  constructor(private http: HttpClient) {}

  getDocument(id: string): Observable<Document> {
    const url = `${this.url}/document/${id}`;
    return this.http
      .get<Document>(url)
      .pipe(
        tap(_ => console.log(`fetched document id=${id}`)),
        catchError(this.handleError<Document>(`getDoc id=${id}`))
      );
  }

  getDocuments(): Observable<Document[]> {
    const url = `${this.url}/documents`;
    return this.http
      .get<Document[]>(url)
      .pipe(
        tap(docs => console.log(`fetched docs`)),
        catchError(this.handleError('getDocs', []))
      );
  }

  createDocument(document: Document): Observable<Document> {
    const url = `${this.url}/create-document`;
    return this.http
      .post<Document>(url, document, httpOptions)
      .pipe(
        tap((doc: Document) => console.log(`added doc`)),
        catchError(this.handleError<Document>('addDoc'))
      );
  }

  updateDocument(id: string, document: Document): Observable<any> {
    const url = `${this.url}/update-document/${id}`;
    return this.http
      .put(url, document, httpOptions)
      .pipe(
        tap(_ => console.log(`updated document id=${id}`)),
        catchError(this.handleError<any>('updateDoc'))
      );
  }

  deleteDocument(id: string): Observable<Document> {
    const url = `${this.url}/delete-document/${id}`;
    return this.http
      .delete<Document>(url, httpOptions)
      .pipe(
        tap(_ => console.log(`deleted doc id=${id}`)),
        catchError(this.handleError<Document>('deleteHero'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
