import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardUsuario } from './shared/services/guard/usuario/auth-guard-usuario.service';
import { HomeAdminComponent } from './home-admin/home-admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardUsuario] },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: HomeAdminComponent }
];
