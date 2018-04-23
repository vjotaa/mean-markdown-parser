import { Component, OnInit } from '@angular/core';
import { MarkdownParserService } from '../../markdown-parser.service';
import { Document } from '../document';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.css'],
  providers: [MarkdownParserService]
})
export class CreateDocumentComponent implements OnInit {
  document: Document = {
    title: '',
    text: '',
    date: ''
  };
  convertedText;
  url;

  constructor(
    private md: MarkdownParserService,
    private _dataService: DataService,
    private _router: Router
  ) {
    this.url = 'http://localhost:3000/api/';
  }
  updateOuput(mdText: string) {
    this.convertedText = this.md.convert(mdText);
  }
  ngOnInit() {}

  onSubmit() {
    this._dataService
      .createDocument(this.document as Document)
      .subscribe(response => {
        if (response) {
          const documents = this._dataService.getDocuments().pipe();
          this._dataService.setState(documents);
        }
      });
    this._router.navigate(['/']);
  }
}
