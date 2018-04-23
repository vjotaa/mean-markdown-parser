import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { MarkdownParserService } from '../../markdown-parser.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Document } from '../document';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
  providers: [MarkdownParserService]
})
export class DocumentDetailComponent implements OnInit {
  url;
  document: Document;
  edit = false;
  convertedText: string;
  errorMsg;
  constructor(
    private _route: ActivatedRoute,
    private md: MarkdownParserService,
    private _router: Router,
    private _dataService: DataService
  ) {}

  getDocument(): void {
    this._route.params.forEach((params: Params) => {
      const id = params['id'];
      this._dataService.getDocument(id).subscribe(
        doc => {
          this.document = doc;
          this.convertedText = this.md.convert(doc.text);
        },
        err => console.log(err)
      );
    });
  }

  ngOnInit() {
    this.getDocument();
  }
  onDelete() {
    this._route.params.forEach((params: Params) => {
      const id = params['id'];
      this._dataService.deleteDocument(id).subscribe(response => {
        if (response) {
          if (response) {
            const documents = this._dataService.getDocuments().pipe();
            this._dataService.setState(documents);
          }
          this._router.navigate(['/']);
        }
      });
    });
  }

  onEdit() {
    this._router.navigate(['update-document/' + this.document._id]);
  }

  updateOuput(mdText: string) {
    this.convertedText = this.md.convert(mdText);
  }
}
