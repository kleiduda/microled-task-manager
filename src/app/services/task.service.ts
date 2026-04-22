import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  tasks = signal<Task[]>([]);
  editingIndex = signal<number | null>(null);

  addTask(task: Task) {
    this.tasks.update(currentTasks => [...currentTasks, task]);
  }

  removeTask(index: number) {
    this.tasks.update(currentTasks => currentTasks.filter((_, i) => i !== index));
  }

  exportToExcel(tasksToExport: Task[], fileName: string = 'Relatorio_Tarefas.xlsx') {
    if (tasksToExport.length === 0) return;

    const exportData = tasksToExport.map(t => ({
      'Dia': this.formatarDiaExcel(t.dia),
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

    XLSX.writeFile(workbook, fileName);
  }

  private formatarDiaExcel(dataIso: string): string {
    if (!dataIso.includes('-')) return dataIso;
    const [ano, mes, dia] = dataIso.split('-');
    const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    return `${dia}/${meses[parseInt(mes) - 1]}`;
  }

  updateTask(index: number, updatedTask: Task) {
    this.tasks.update(currentTasks => {
      const newList = [...currentTasks];
      newList[index] = updatedTask;
      return newList;
    });
    this.editingIndex.set(null);
  }
}