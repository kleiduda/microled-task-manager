import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent {
  public taskService = inject(TaskService);

  get tasks() {
    return this.taskService.tasks();
  }

  remover(index: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Deseja remover esta tarefa da lista?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, remover',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.removeTask(index);
      }
    });
  }

  gerarExcel() {
    if (this.tasks.length === 0) {
      Swal.fire('Ops!', 'Não há dados para exportar.', 'info');
      return;
    }
    
    this.taskService.exportToExcel();
    
    Swal.fire('Sucesso!', 'Seu Excel foi gerado com sucesso.', 'success');
  }
}