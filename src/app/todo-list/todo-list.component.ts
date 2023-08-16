import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToDoListItem } from './models/todo-list.models';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  private idAccumulate: number = 0;
  public inputTitle: string = '';
  public todoList: ToDoListItem[] = [];

  public add(): void {
    if (this.inputTitle === '') {
      alert('You must write something!');
      return;
    }

    const newItem: ToDoListItem = {
      id: ++this.idAccumulate,
      title: this.inputTitle,
      checked: false,
    };

    this.todoList.push(newItem);
    this.inputTitle = '';
  }

  public delete(id: number): void {
    const index = this.todoList.findIndex((listItem) => listItem.id === id);
    const beforeArr = [...this.todoList].splice(0, index);
    const afterArr = [...this.todoList].splice(index + 1, this.todoList.length);

    this.todoList = beforeArr.concat(afterArr);
  }

  public toggleStatus(id: number): void {
    let selectedItem = this.todoList.find((listItem) => listItem.id === id);

    if (selectedItem) {
      selectedItem.checked = !selectedItem.checked;
    }
  }
}
