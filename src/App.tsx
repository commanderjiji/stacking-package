import React from "react";
import "./App.css";
import TodoApp from "./TodoApp";

import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

export default function App() {
	return (
		<div className="container">
			<div className="header-con">
				<h1 className="header">TO DO LIST</h1>
			</div>

			{/* FOR LATER FORM */}
			{/* <form action="" className="form">
				<button className="add-btn">+ Add Task</button>
				

				<ul className="list-con">
					<li className="items">
						<div className="task-item">
							<div className="task-desc">
								<h3>Buy groceries</h3>
								<p>Due: Today at 6 PM</p>
							</div>
							<div className="task-check">
								<input type="checkbox" name="option1" value="Option1" className="check"></input>
							</div>
						</div>
					</li>
					<li className="items">Item 2</li>
					<li className="items">Item 3</li>
					<li className="items">Item 4</li>
				</ul>
			</form> */}

			<TodoInput />
			<TodoApp />
			<TodoList />
		</div>
	);
}
