import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './task-form.component.html'
})

export class TaskFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  taskService = inject(TaskService);
  private router = inject(Router);
  projectService = inject(ProjectService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    const indexParaEditar = this.taskService.editingIndex();
    
    if (indexParaEditar !== null) {
      const lista = this.taskService.tasks();
      const tarefa = lista[indexParaEditar];

      if (tarefa) {
        console.log('Editando tarefa:', tarefa);
        const partes = tarefa.periodo.split(' - ');
        const hIni = partes[0] ? partes[0].replace(/:/g, '') : '';
        const hFim = partes[1] ? partes[1].replace(/:/g, '') : '';

        setTimeout(() => {
          this.taskForm.patchValue({
            ...tarefa,
            horaInicio: hIni,
            horaFim: hFim
          });

          this.taskForm.get('os')?.setValue(tarefa.os);
          this.taskForm.get('cliente')?.setValue(tarefa.cliente);
          
          this.cdr.detectChanges();
        }, 0);
      }
    }
  }

  taskForm: FormGroup = this.fb.group({
    dia: [new Date().toISOString().substring(0, 10), Validators.required],
    horaInicio: ['', Validators.required],
    horaFim: ['', Validators.required],
    horas: [0, Validators.required],
    descricao: [''],
    custeio: ['2'],
    status: ['Em andamento'],
    os: [{ value: '', disabled: true }],
    projeto: ['', Validators.required],
    cliente: [{ value: '', disabled: true }],
    despesasAutorizadas: [''],
    alimentacao: [''],
    viagem: [''],
    inLoco: ['N'],
    tipoAtendimento: ['D'],
    executavelAlterado: [''],
    versao: [''],
    solicitante: ['']
  });

  atualizarCalculo() {
    const inicio = this.taskForm.get('horaInicio')?.value;
    const fim = this.taskForm.get('horaFim')?.value;

    if (inicio?.length === 4 && fim?.length === 4) {
      const h1 = parseInt(inicio.substring(0, 2));
      const m1 = parseInt(inicio.substring(2, 4));
      const h2 = parseInt(fim.substring(0, 2));
      const m2 = parseInt(fim.substring(2, 4));

      const iniMin = h1 * 60 + m1;
      const fimMin = h2 * 60 + m2;

      if (fimMin > iniMin) {
        let diff = fimMin - iniMin;

        if (iniMin <= 720 && fimMin >= 780) {
          diff -= 60;
        }

        const resultado = diff / 60;
        
        this.taskForm.get('horas')?.setValue(resultado);
      }
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const raw = this.taskForm.getRawValue();
      const fIn = raw.horaInicio;
      const fFi = raw.horaFim;
      const periodoExcel = `${fIn.substring(0,2)}:${fIn.substring(2,4)} - ${fFi.substring(0,2)}:${fFi.substring(2,4)}`;

      const tarefaProcessada = { 
        ...raw,
        periodo: periodoExcel,
        dia: raw.dia
      };

      const index = this.taskService.editingIndex();
      
      if (index !== null) {
        this.taskService.updateTask(index, tarefaProcessada);
        Swal.fire('Atualizado!', 'Tarefa editada com sucesso.', 'success');
      } else {
        this.taskService.addTask(tarefaProcessada);
        Swal.fire('Salvo!', 'Nova tarefa adicionada.', 'success');
      }

      this.router.navigate(['/listagem']);
    }
  }

  cancelarEdicao() {
    this.taskService.editingIndex.set(null);
    this.router.navigate(['/listagem']);
  }

  onProjectSelect(event: any) {
    const nomeProjeto = event.target.value;
    const projetoEncontrado = this.projectService.projects().find(p => p.nome === nomeProjeto);

    if (projetoEncontrado) {
      this.taskForm.patchValue({
        os: projetoEncontrado.os,
        cliente: projetoEncontrado.cliente
      });
    } else {
      this.taskForm.patchValue({ os: '', cliente: '' });
    }
  }
}