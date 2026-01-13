import Header from "./components/layout/Header";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import AddButton from "./components/ui/AddButton";
import { useTodos } from "./hooks/useTodos";

export default function App() {
	const { todos, addTodo, toggleTodo, editTodo, deleteTodo, clearCompleted, completeAll, clearAll } = useTodos();

	// Time
	let clock = new Date().getHours();
	const twelveHourFormat = clock % 12;

	return (
		<div className="w-screen flex flex-col bg-bg min-h-screen">
			<Header />
			<div className="p-10 ">
				<div className="header-con">
					<h1 className="todo-header text-5xl font-bold ">TO DO LIST</h1>
				</div>

				{/* Time */}
				<div className="clock py-5">
					<p>
						{twelveHourFormat} {clock >= 12 ? "PM" : "AM"}
					</p>
				</div>

				<TodoInput onAddTodo={addTodo} />

				<div className="flex w-max gap-3">
					<AddButton className="text-xs px-2" label="Clear Completed" size="xs" onClick={clearCompleted} />
					<AddButton className="text-xs px-2" label="Complete All" size="xs" onClick={completeAll} />
					<AddButton className="text-xs px-2" label="Delete All" size="xs" onClick={clearAll} />
				</div>

				{/* <TodoApp /> */}
				<TodoList todos={todos} onToggle={toggleTodo} onEdit={editTodo} onDelete={deleteTodo} />
			</div>
		</div>
	);
}
