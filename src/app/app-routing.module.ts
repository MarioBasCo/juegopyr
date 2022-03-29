import { StartGuard } from './guards/start.guard';
import { GameGuard } from './guards/game.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canLoad: [AutoLoginGuard]
  },
  {
    path: 'start',
    loadChildren: () => import('./pages/start/start.module').then( m => m.StartPageModule),
    canLoad: [AutoLoginGuard, StartGuard]
  },
  {
    path: 'game',
    loadChildren: () => import('./pages/game/game.module').then( m => m.GamePageModule),
    canLoad: [AutoLoginGuard, GameGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canLoad: [AutoLoginGuard]
  },
  {
    path: 'singup',
    loadChildren: () => import('./pages/singup/singup.module').then( m => m.SingupPageModule),
    canLoad: [AutoLoginGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'play',
    loadChildren: () => import('./pages/play/play.module').then( m => m.PlayPageModule)
  },
  {
    path: 'comodin',
    loadChildren: () => import('./pages/comodin/comodin.module').then( m => m.ComodinPageModule)
  },
  {
    path: 'congratulations',
    loadChildren: () => import('./pages/congratulations/congratulations.module').then( m => m.CongratulationsPageModule)
  },
  {
    path: 'recover',
    loadChildren: () => import('./pages/recover/recover.module').then( m => m.RecoverPageModule)
  },
  {
    path: 'confirm-recover',
    loadChildren: () => import('./pages/confirm-recover/confirm-recover.module').then( m => m.ConfirmRecoverPageModule)
  },
  {
    path: 'comodin-question',
    loadChildren: () => import('./pages/comodin-question/comodin-question.module').then( m => m.ComodinQuestionPageModule)
  },
  {
    path: 'comodin-result',
    loadChildren: () => import('./pages/comodin-result/comodin-result.module').then( m => m.ComodinResultPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
