import { Injectable } from '@angular/core';
import * as marked from 'marked';
@Injectable()
export class MarkdownParserService {
  private md;

  constructor() {
    this.md = marked;
    this.md.setOptions({
      gfm: true,
      breaks: true
    });
  }

  convert(markdown: string) {
    return this.md.parse(markdown);
  }
}
