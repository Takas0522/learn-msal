import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { AccessDenyComponent } from './components/access-deny/access-deny.component';
import { ReaderComponent } from './components/reader/reader.component';
import { WriterComponent } from './components/writer/writer.component';

const routes: Routes = [
  { path: 'reader', component: ReaderComponent, canActivate: [AuthGuardService] },
  { path: 'writer', component: WriterComponent, canActivate: [AuthGuardService] },
  { path: 'access-deny', component: AccessDenyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
