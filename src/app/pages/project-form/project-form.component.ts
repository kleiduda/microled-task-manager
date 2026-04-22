import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <div class="card shadow-sm mb-4">
        <div class="card-header bg-dark text-white"><h5>Cadastrar Novo Projeto</h5></div>
        <div class="card-body">
          <form [formGroup]="projectForm" (ngSubmit)="salvar()">
            <div class="row g-3">
              <div class="col-md-5">
                <label class="form-label fw-bold">Nome do Projeto</label>
                <input type="text" class="form-control" formControlName="nome" placeholder="Ex: BAND BDDC">
              </div>
              <div class="col-md-3">
                <label class="form-label fw-bold">Número da OS</label>
                <input type="text" class="form-control" formControlName="os" placeholder="030385217">
              </div>
              <div class="col-md-2">
                <label class="form-label fw-bold">Cód. Cliente</label>
                <input type="text" class="form-control" formControlName="cliente" placeholder="0079">
              </div>
              <div class="col-md-2 d-flex align-items-end">
                <button type="submit" class="btn btn-primary w-100" [disabled]="projectForm.invalid">Salvar</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="card shadow-sm">
        <div class="card-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Projeto</th>
                <th>OS</th>
                <th>Cliente</th>
                <th class="text-end">Ações</th>
              </tr>
            </thead>
            <tbody>
              @for (p of projectService.projects(); track $index) {
                <tr>
                  <td>{{ p.nome }}</td>
                  <td>{{ p.os }}</td>
                  <td>{{ p.cliente }}</td>
                  <td class="text-end">
                    <button class="btn btn-sm btn-outline-danger" (click)="projectService.removeProject($index)">Remover</button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class ProjectFormComponent {
  projectService = inject(ProjectService);
  private fb = inject(FormBuilder);

  projectForm: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    os: ['', Validators.required],
    cliente: ['', Validators.required]
  });

  salvar() {
    if (this.projectForm.valid) {
      this.projectService.addProject(this.projectForm.value);
      this.projectForm.reset();
      Swal.fire({ icon: 'success', title: 'Projeto Salvo!', timer: 800, showConfirmButton: false });
    }
  }
}