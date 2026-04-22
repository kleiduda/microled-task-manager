import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent {
  public taskService = inject(TaskService);
  private router = inject(Router);

  dataInicio: string = '';
  dataFim: string = '';

  get tasks() {
    return this.taskService.tasks();
  }

  get tasksFiltradas() {
    const todas = this.taskService.tasks();
    
    if (!this.dataInicio && !this.dataFim) {
      return todas;
    }

    return todas.filter(task => {
      const dataTarefa = task.dia; 
      
      const inicio = this.dataInicio || '0000-00-00';
      const fim = this.dataFim || '9999-12-31';

      return dataTarefa >= inicio && dataTarefa <= fim;
    });
  }

  remover(task: any) {
    const indexReal = this.taskService.tasks().findIndex(t => t === task);
    
    Swal.fire({
      title: 'Remover tarefa?',
      text: "Esta ação não pode ser desfeita.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, remover'
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.removeTask(indexReal);
      }
    });
  }

  gerarExcel() {
    if (this.tasksFiltradas.length === 0) {
      Swal.fire('Ops!', 'Não há dados filtrados para exportar.', 'warning');
      return;
    }

    let mesStr = 'GERAL';
    let anoStr = 'GERAL';

    if (this.dataInicio) {
      const dataRef = new Date(this.dataInicio + 'T00:00:00');
      
      const meses = ["JANEIRO", "FEVEREIRO", "MARCO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
      mesStr = meses[dataRef.getMonth()];
      anoStr = dataRef.getFullYear().toString();
    }

    const nomeUsuario = "Kleiton";
    const nomeArquivo = `RA_${mesStr}_${anoStr}_${nomeUsuario}.xlsx`;
    this.taskService.exportToExcel(this.tasksFiltradas, nomeArquivo);
    
    Swal.fire('Sucesso!', `Arquivo ${nomeArquivo} gerado.`, 'success');
  }

  editar(task: any) {
    const indexReal = this.taskService.tasks().findIndex(t => t === task);
    this.taskService.editingIndex.set(indexReal);
    this.router.navigate(['/tarefa']);
  }
}