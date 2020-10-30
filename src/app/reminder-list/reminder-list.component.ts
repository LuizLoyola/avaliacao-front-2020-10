import {Component, OnInit, TemplateRef} from '@angular/core';
import {ReminderService} from '../reminder.service';
import {Reminder} from '../reminder';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";

@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.css']
})
export class ReminderListComponent implements OnInit {
  private hasTried: boolean;

  constructor(private reminderService: ReminderService,
              private modalService: NgbModal) {
  }

  reminders: Reminder[];
  selectedReminder: Reminder;
  showModal = false;
  dynamicForm: FormGroup;
  priorities: string[] = ['Baixa', 'Média', 'Alta'];

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList = () => {
    this.reminders = this.reminderService.list();
  }

  priorityIcon = (priority: string) => {
    switch (priority) {
      case 'Baixa':
        return 'arrow-down';
      case 'Média':
        return 'minus';
      case 'Alta':
        return 'arrow-up';
    }
  }

  newReminder = (content: TemplateRef<any>) => {
    this.showModal = true;
    this.hasTried = false;

    this.dynamicForm = new FormGroup({
      title: new FormControl(this.selectedReminder?.title ?? '', Validators.required),
      priority: new FormControl(this.selectedReminder?.priority ?? 'Baixa', Validators.required),
      content: new FormControl(this.selectedReminder?.content ?? '', Validators.required)
    })

    this.modalService.open(content).result.then(result => {
      this.refreshList();
    }, reason => {
      this.refreshList()
    })
  }

  editReminder(reminder: Reminder, content: TemplateRef<any>) {
    this.selectedReminder = reminder;
    this.newReminder(content);
  }

  save() {
    this.hasTried = true;
    if (!this.dynamicForm.valid) return;

    this.reminderService.update({id: (this.selectedReminder ?? {}).id, ...this.dynamicForm.value});

    this.modalService.dismissAll();
    this.selectedReminder = null;
  }

  hasErrors(name: string) {
    return (this.hasTried || this.dynamicForm.controls[name].touched) && !this.dynamicForm.controls[name].valid;
  }

  deleteReminder(reminder: Reminder, deleteModal: TemplateRef<any> = null) {
    this.selectedReminder = reminder;
    this.modalService.open(deleteModal).result.then(result => {
      if (result) this.reminderService.delete(reminder.id)
      this.selectedReminder = null;
    }, () => this.selectedReminder = null);
  }
}
