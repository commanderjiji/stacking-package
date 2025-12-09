import React from "react";

export default function TodoList() {
	return (
		<div>
			<ul className="todo-list">
				<li className="todo-item">
					<div>
						<h3 className="todo-title">Buy Groceries</h3>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, eum.</p>
					</div>

					<div>
						<input type="checkbox" className="todo-check" />
					</div>
				</li>
				<li className="todo-item">
					<div>
						<h3>We've been promising</h3>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, eum.</p>
					</div>

					<div>
						<input type="checkbox" className="todo-check" />
					</div>
				</li>
				<li className="todo-item">
					<div>
						<h3>Last month, two months ago</h3>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, eum.</p>
					</div>

					<div>
						<input type="checkbox" className="todo-check" />
					</div>
				</li>
				<li className="todo-item">
					<div>
						<h3>But hey, it's a pilot episode</h3>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, eum.</p>
					</div>

					<div>
						<input type="checkbox" className="todo-check" />
					</div>
				</li>
			</ul>
		</div>
	);
}
