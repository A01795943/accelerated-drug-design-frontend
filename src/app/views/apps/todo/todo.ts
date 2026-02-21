import { Component, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { TodoData, type TodoType } from './data';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TableService } from '@core/services/table.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule, FormsModule],
  templateUrl: './todo.html',
  styles: ``,
})
export class Todo {
  title = 'Todo';
  todo$: Observable<TodoType[]>;
  total$: Observable<number>;

  public tableService = inject(TableService<TodoType>);

  constructor() {
    this.todo$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.tableService.setItems(TodoData, 10);
  }
}
