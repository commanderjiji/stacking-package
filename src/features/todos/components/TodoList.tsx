import type { Todo } from "../todos.type";
import TodoItems from "./TodoItems";

type TodoListProps = {
	todos: Todo[];
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
	onEdit: (id: number, newText: string) => void;
};

export default function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
	if (todos.length === 0) {
		return <p className="py-5">No Task Yet</p>;
	}

	return (
		<ul className="list-container my-5">
			{todos.map((todo) => (
				<TodoItems key={todo.id} todo={todo} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
			))}
		</ul>
	);
}
