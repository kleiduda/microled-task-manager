import { Routes } from '@angular/router';
import { projectGuard } from './guards/project.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'novo', pathMatch: 'full' },
  { 
    path: 'projetos', 
    loadComponent: () => import('./pages/project-form/project-form.component').then(m => m.ProjectFormComponent) 
  },
  { 
    path: 'novo', 
    canActivate: [projectGuard],
    loadComponent: () => import('./pages/task-form/task-form.component').then(m => m.TaskFormComponent) 
  },
  { 
    path: 'listagem', 
    loadComponent: () => import('./pages/task-list/task-list.component').then(m => m.TaskListComponent) 
  }
];