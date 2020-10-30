/* tslint:disable:quotemark */
import {Injectable} from '@angular/core';
import {Reminder} from "./reminder";

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  private static reminders: Reminder[] = [
    {
      id: 1,
      title: 'Projeto',
      priority: "Alta",
      content: "Finalizar projeto da avaliação"
    },
    {
      id: 2,
      title: "Tarefas de casa",
      priority: "Média",
      content: "- Levar lixo para fora\n- Lavar louça\n- Alimentar pets"
    },
    {
      id: 3,
      title: "Cliente ABC",
      priority: "Média",
      content: "Enviar e-mail para cliente informando progresso"
    }
  ]

  constructor() {
  }

  public list = (): Reminder[] => ReminderService.reminders;

  public update = (reminder: Reminder) => {
    if (reminder.id)
      ReminderService.reminders[ReminderService.reminders.findIndex(r => r.id === reminder.id)] = reminder;
    else {
      reminder.id = Math.max(...ReminderService.reminders.map(r => r.id)) + 1;
      ReminderService.reminders.push(reminder);
    }
  }

  public delete = (id: number) => {
    ReminderService.reminders.splice(ReminderService.reminders.findIndex(r => r.id === id), 1);
  };
}

