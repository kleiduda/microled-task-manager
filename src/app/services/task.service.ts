import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks = signal<Task[]>([]);

  addTask(task: Task) {
    this.tasks.update(currentTasks => [...currentTasks, task]);
  }

  removeTask(index: number) {
    this.tasks.update(currentTasks => currentTasks.filter((_, i) => i !== index));
  }

  exportToExcel() {
    const data = this.tasks();
    const exportData = data.map(t => ({
      'Dia': t.dia,
      'Período': t.periodo,
      'Horas': t.horas,
      'Descrição': t.descricao,
      'Custeio': t.custeio,
      'Status': t.status,
      'OS': t.os,
      'Projeto': t.projeto,
      'Cliente': t.cliente,
      'Despesas autorizadas': t.despesasAutorizadas,
      'Alimentação': t.alimentacao,
      'Viagem': t.viagem,
      'In Loco (S/N)': t.inLoco,
      'Tipo Atendimento (S- Suporte , L-Levantamento, D-Desenvolvimento , M-Manutenção , I-Implantação, E-erro run-time)': t.tipoAtendimento,
      'Nome do Executavel Alterado': t.executavelAlterado,
      'Versão (ddmmyyyy)': t.versao,
      'Solicitante': t.solicitante
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tarefas');

    worksheet['!cols'] = [{ wch: 10 }, { wch: 15 }, { wch: 8 }, { wch: 40 }, { wch: 10 }];

    XLSX.writeFile(workbook, `Tabela_Atividades_${new Date().getTime()}.xlsx`);
  }
}