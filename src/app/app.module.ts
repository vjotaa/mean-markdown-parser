import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DocumentsComponent } from './document/documents/documents.component';
import { DataService } from './data.service';
import { DocumentDetailComponent } from './document/document-detail/document-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateDocumentComponent } from './document/create-document/create-document.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { UpdateDocumentComponent } from './document/update-document/update-document.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentsComponent,
    DocumentDetailComponent,
    CreateDocumentComponent,
    TimeAgoPipe,
    UpdateDocumentComponent
  ],
  imports: [BrowserModule, HttpModule, FormsModule, AppRoutingModule],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
