import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentDetailComponent } from './document/document-detail/document-detail.component';
import { CreateDocumentComponent } from './document/create-document/create-document.component';
const routes: Routes = [
  {
    path: 'create-document',
    component: CreateDocumentComponent
  },
  {
    path: 'document/:id',
    component: DocumentDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
