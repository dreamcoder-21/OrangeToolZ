import React from "react";

import { get_tasks_types, add_task } from "./library/TasksHelper";
import Tasks from "./Tasks";
import "./style.scss";


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			task_name: "",

			task_types: [
				// {
				// 	name: "To Do",
				// 	type: "to_do",
				// 	tasks: [],
				// },
				// {
				// 	name: "In Progress",
				// 	type: "in_progress",
				// 	tasks: [],
				// },
				// {
				// 	name: "Done",
				// 	type: "done",
				// 	tasks: [],
				// },
			],
		};
	}

	componentDidMount() {
		get_tasks_types().then(result => {
			if(!result.status) {
				return;
			}

			let type_tasks = {};
			result.tasks.map(task => {
				if(type_tasks[task.type_id] === undefined) {
					type_tasks[task.type_id] = [];
				}

				type_tasks[task.type_id].push(task);
			});

			result.task_types.map(task_type => {
				if(type_tasks[task_type.id] === undefined) {
					task_type.tasks = [];
				}
				else {
					task_type.tasks = type_tasks[task_type.id];
				}
			});

			this.setState({ task_types: result.task_types });
		});
	}

	set_task_types = (task_types) => {
		this.setState({ task_types });
	}

	handle_key_down = (e) => {
		if(e.key === "Enter") {
			this.add_task();
		}
	}

	add_task = () => {
		if(this.state.task_name.trim().length > 0) {
			let task_types = this.state.task_types;
			let task_type = task_types[0];
			let tasks = task_types[0].tasks;
			
			let post_data = {
				name: this.state.task_name.trim(),
				type_id: task_type.id,
				order: tasks[tasks.length - 1].ordering + 1,
			};

			add_task(post_data).then(result => {
				if(!result.status) {
					return;
				}

				tasks.push(result.data);
				this.setState({ task_name: "", task_types });
			});
		}
	}

	render() {
		return <React.Fragment>
			<div className="container">
				<div className="row text-center">
					<span>
						<input
							onChange={e => { this.setState({ task_name: e.target.value }); }}
							onKeyDown={this.handle_key_down}
							className="form-control"
							value={ this.state.task_name }
							type="text"
							style={{ width: "300px" }}
							placeholder="Write your task ..."
						/>
					</span>

					<span className="ml-6">
						<button onClick={e => this.add_task()} className="btn btn-white" style={{ width: "100px" }}>
							Add
						</button>
					</span>
				</div>

				<Tasks
					task_types={ this.state.task_types }
					set_task_types={ this.set_task_types }
				/>
			</div>
		</React.Fragment>;
	}
}

export default App;
