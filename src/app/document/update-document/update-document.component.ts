import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MarkdownParserService } from '../../markdown-parser.service';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-update-document',
  templateUrl: './update-document.component.html',
  styleUrls: ['./update-document.component.css'],
  providers: [MarkdownParserService]
})
export class UpdateDocumentComponent implements OnInit {
  public convertedText;
  public document;
  constructor(
    private _route: ActivatedRoute,
    private md: MarkdownParserService,
    private _router: Router,
    private _dataService: DataService
  ) {}

  ngOnInit() {
    this.getDocument();
  }

  updateOuput(mdText: string) {
    this.convertedText = this.md.convert(mdText);
  }

  onUpdate() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._dataService
        .updateDocument(id, this.document)
        .subscribe(response => {
          if (response) {
            this._dataService.getDocuments().subscribe(response => {
              if (response) {
                this._dataService.setState(response);
              }
            });
            this._router.navigate(['document/', id]);
          }
        });
    });
  }

  getDocument() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._dataService.getDocument(id).subscribe(
        response => {
          if (!response) {
            this._router.navigate(['/']);
          } else {
            this.document = response;
            this.convertedText = this.md.convert(response.text);
          }
        },
        error => {
          const errorMessage = <any>error;
          if (errorMessage != null) {
            const body = JSON.parse(error._body);
          }
        }
      );
    });
  }

  onCancel() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._router.navigate(['document/', id]);
    });
  }
}
