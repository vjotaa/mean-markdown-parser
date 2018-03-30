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
  public document;
  public convertedText;
  public url;
  constructor(
    private md: MarkdownParserService,
    private _dataService: DataService,
    private _router: Router
  ) {
    this.url = 'http://localhost:3000/api/';
    this.document = new Document('', '', '');
  }
  updateOuput(mdText: string) {
    this.convertedText = this.md.convert(mdText);
  }
  ngOnInit() {}

  onSubmit() {
    this._dataService.createDocument(this.document).subscribe(response => {
      if (response) {
        this._dataService.getDocuments().subscribe(response => {
          if (response) {
            this._dataService.setState(response.documents);
          }
        });
      }
    });
    this.convertedText = '';
    this.document.title = '';
    this.document.text = '';
    this._router.navigate(['/']);
  }
}
