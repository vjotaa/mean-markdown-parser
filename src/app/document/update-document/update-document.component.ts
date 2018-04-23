import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MarkdownParserService } from '../../markdown-parser.service';
import { DataService } from '../../data.service';
import { Document } from '../document';
@Component({
  selector: 'app-update-document',
  templateUrl: './update-document.component.html',
  styleUrls: ['./update-document.component.css'],
  providers: [MarkdownParserService]
})
export class UpdateDocumentComponent implements OnInit {
  document: Document = {
    title: '',
    text: '',
    date: ''
  };
  public convertedText;
  constructor(
    private _route: ActivatedRoute,
    private md: MarkdownParserService,
    private _router: Router,
    private _dataService: DataService
  ) {}

  ngOnInit() {
    this.getDocument();
    this.paramsId();
  }

  updateOuput(mdText: string) {
    this.convertedText = this.md.convert(mdText);
  }

  onUpdate(): void {
    const id = this.paramsId();
    this._dataService.updateDocument(id, this.document).subscribe(response => {
      if (response) {
        if (response) {
          const documents = this._dataService.getDocuments().pipe();
          this._dataService.setState(documents);
        }
        this._router.navigate(['document/', id]);
      }
    });
  }

  getDocument(): void {
    const id = this.paramsId();
    this._dataService.getDocument(id).subscribe(
      doc => {
        this.document = doc;
        this.convertedText = this.md.convert(doc.text);
      },
      err => console.log(err)
    );
  }

  onCancel() {
    const id = this.paramsId();
    this._router.navigate(['document/', id]);
  }

  private paramsId() {
    const id = this._route.snapshot.paramMap.get('id');
    return id;
  }
}
