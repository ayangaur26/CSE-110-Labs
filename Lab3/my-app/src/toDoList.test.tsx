import { render, screen, fireEvent } from '@testing-library/react';
import { ToDoList } from './toDoList';

describe('To Do List Tests', () => {
  test('should display all items in the list', () => {
    render(<ToDoList />);

    expect(screen.getByText('Apples')).toBeInTheDocument();
    expect(screen.getByText('Bananas')).toBeInTheDocument();
  });

  test('should update the number of checked items in the title', () => {
    render(<ToDoList />);

    const checkbox = screen.getAllByRole('checkbox')
  
    fireEvent.click(checkbox[0]);

    expect(screen.getByText('Items bought: 1')).toBeInTheDocument();
  });

  test('should ensure the unchecked item count matches the number in the title', () => {
    render(<ToDoList />);

    const title = screen.getByText(/Items bought:/i);
    expect(title).toHaveTextContent('Items bought: 0');
  });

  test('should ensure the form input and displayed item match', () => {
    render(<ToDoList />);

  });
});