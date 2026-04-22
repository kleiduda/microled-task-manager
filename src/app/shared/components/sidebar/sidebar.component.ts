import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="d-flex flex-column p-3 bg-white border-end h-100" style="width: 280px;">
      <div class="mb-4 text-center">
        <h3 class="h4 fw-bold text-primary">Task Manager</h3>
        <small class="text-muted text-uppercase">Preenchimento de Excel</small>
      </div>
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item mb-2">
          <a routerLink="/projetos" routerLinkActive="active" class="nav-link py-3 shadow-sm border">
            <i class="bi bi-folder-plus me-2"></i> Cadastrar Projetos
          </a>
        </li>
        <li class="nav-item mb-2">
          <a routerLink="/tarefa" routerLinkActive="active" class="nav-link py-3 shadow-sm border">
            <i class="bi bi-plus-circle me-2"></i> Lançar Tarefa
          </a>
        </li>
        <li class="nav-item">
          <a routerLink="/listagem" routerLinkActive="active" class="nav-link py-3 shadow-sm border">
            <i class="bi bi-table me-2"></i> Ver Tabela & Exportar
          </a>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .nav-link { color: #333; transition: all 0.2s; }
    .nav-link.active { background-color: #0d6efd !important; color: white !important; }
    .nav-link:hover:not(.active) { background-color: #f8f9fa; transform: translateX(5px); }
  `]
})
export class SidebarComponent {}