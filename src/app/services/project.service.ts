import { Injectable, signal, effect } from '@angular/core';

export interface Project {
  nome: string;
  os: string;
  cliente: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects = signal<Project[]>(JSON.parse(localStorage.getItem('projects') || '[]'));

  constructor() {
    effect(() => {
      localStorage.setItem('projects', JSON.stringify(this.projects()));
    });
  }

  addProject(project: Project) {
    this.projects.update(prev => [...prev, project]);
  }

  removeProject(index: number) {
    this.projects.update(prev => prev.filter((_, i) => i !== index));
  }
}