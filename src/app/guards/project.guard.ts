import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import Swal from 'sweetalert2';

export const projectGuard: CanActivateFn = (route, state) => {
  const projectService = inject(ProjectService);
  const router = inject(Router);

  if (projectService.projects().length === 0) {
    Swal.fire({
      title: 'Nenhum projeto encontrado!',
      text: 'Você precisa cadastrar pelo menos um projeto antes de lançar tarefas.',
      icon: 'warning',
      confirmButtonText: 'Ir para Cadastrar Projetos',
      allowOutsideClick: false
    }).then(() => {
      router.navigate(['/projetos']);
    });
    return false;
  }
  return true;
};