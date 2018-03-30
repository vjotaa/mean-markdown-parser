import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { MarkdownParserService } from '../../markdown-parser.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
  providers: [MarkdownParserService]
})
export class DocumentDetailComponent implements OnInit {
  public url;
  public document;
  public edit: boolean = false;
  public convertedText: string;
  constructor(
    private _route: ActivatedRoute,
    private md: MarkdownParserService,
    private _router: Router,
    private _dataService: DataService
  ) {
    this.url = 'http://localhost:3000/api/';
  }
  getDocument() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._dataService.getDocument(id).subscribe(
        response => {
          if (!response.document) {
            this._router.navigate(['/']);
          } else {
            this.document = response.document;
            this.convertedText = this.md.convert(response.document.text);
          }
        },
        error => {
          var errorMessage = <any>error;
          if (errorMessage != null) {
            var body = JSON.parse(error._body);
            //this.alertMessage = body.message;
            console.log(error);
          }
        }
      );
    });
  }

  ngOnInit() {
    this.getDocument();
  }
  onDelete() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._dataService.deleteDocument(id).subscribe(response => {
        if (response) {
          this._dataService.getDocuments().subscribe(response => {
            if (response) {
              this._dataService.setState(response.documents);
            }
          });
          this._router.navigate(['/']);
        }
      });
    });
  }

  onEdit() {
    this.edit = true;
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
                this._dataService.setState(response.documents);
              }
            });
            this._router.navigate(['document/', this.document._id]);
            this.edit = false;
            this.getDocument();
          }
        });
    });
  }

  onCancel() {
    this.edit = false;
    this.getDocument();
  }
}
