import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrutaComparadorComponent } from './components/fruta-comparador/fruta-comparador.component';
import { BackofficeComponent } from './components/backoffice/backoffice.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { BackofficeGuard } from './guards/backoffice.guard';
import { FrutaEditableComponent } from './components/fruta-editable/fruta-editable.component';

const routes: Routes = [

  { path: 'privado', component: BackofficeComponent, canActivate:[BackofficeGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'detalle-fruta-editable/:id', component: FrutaEditableComponent },
  { path: 'home', component: FrutaComparadorComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: FrutaComparadorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
