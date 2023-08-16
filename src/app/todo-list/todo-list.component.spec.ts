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
        title: 'test1',
        checked: false,
      };

      const testItem2: ToDoListItem = {
        title: 'test2',
        checked: false,
      };

      component.inputTitle = deletedItem.title;
      component.add();
      component.inputTitle = testItem2.title;
      component.add();

      component.delete(deletedItem);

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
        title: 'test',
        checked: false,
      };
      component.inputTitle = testItem.title;
      component.add();

      const targetItem = component.todoList.find(
        (listItem) => listItem.title === testItem.title
      );

      component.toggleStatus(targetItem!);

      expect(targetItem?.checked).toBeTruthy();
    });

    it('should checked be false if click checked item', () => {
      const testItem: ToDoListItem = {
        title: 'test',
        checked: true,
      };
      component.inputTitle = testItem.title;
      component.add();

      component.toggleStatus(testItem);

      const targetItem = component.todoList.find(
        (listItem) => listItem.title === testItem.title
      );
      expect(targetItem?.checked).toBeFalsy();
    });
  });
});
