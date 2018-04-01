import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentDetailComponent } from './document/document-detail/document-detail.component';
import { CreateDocumentComponent } from './document/create-document/create-document.component';
import { UpdateDocumentComponent } from './document/update-document/update-document.component';
const routes: Routes = [
  {
    path: 'create-document',
    component: CreateDocumentComponent
  },
  {
    path: 'document/:id',
    component: DocumentDetailComponent
  },
  {
    path: 'update-document/:id',
    component: UpdateDocumentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
