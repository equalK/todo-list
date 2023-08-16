import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { ToDoListItem } from './models/todo-list.models';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoListComponent],
    });
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('add', () => {
    it('should show alert if input title is empty', () => {
      spyOn(window, 'alert');

      component.inputTitle = '';
      component.add();

      expect(window.alert).toHaveBeenCalledWith('You must write something!');
    });

    it('should add new item by input title', () => {
      const expected: ToDoListItem = {
        id: 1,
        title: 'test',
        checked: false,
      };
      component.inputTitle = expected.title;
      component.add();

      expect(component.todoList.pop()).toEqual(expected);
    });
  });

  describe('delete', () => {
    it('should delete selected item', () => {
      const deletedItem: ToDoListItem = {
        id: 1,
        title: 'test1',
        checked: false,
      };

      const testItem2: ToDoListItem = {
        id: 2,
        title: 'test2',
        checked: false,
      };

      component.inputTitle = deletedItem.title;
      component.add();
      component.inputTitle = testItem2.title;
      component.add();

      component.delete(1);

      expect(
        component.todoList.find(
          (listItem) => listItem.title === deletedItem.title
        )
      ).toBeFalsy();
    });
  });

  describe('toggleStatus', () => {
    it('should checked be true if click unchecked item', () => {
      const testItem: ToDoListItem = {
        id: 1,
        title: 'test',
        checked: false,
      };
      component.inputTitle = testItem.title;
      component.add();

      const targetItem = component.todoList.find(
        (listItem) => listItem.title === testItem.title
      );

      component.toggleStatus(1);

      expect(targetItem?.checked).toBeTruthy();
    });

    it('should checked be false if click checked item', () => {
      const testItem: ToDoListItem = {
        id: 1,
        title: 'test',
        checked: false,
      };
      component.inputTitle = testItem.title;
      component.add();

      component.toggleStatus(1);
      component.toggleStatus(1);

      const targetItem = component.todoList.find(
        (listItem) => listItem.id === testItem.id
      );
      expect(targetItem?.checked).toBeFalsy();
    });
  });
});
