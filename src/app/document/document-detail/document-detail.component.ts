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
  ) {}

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
              this._dataService.setState(response);
            }
          });
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
