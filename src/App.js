import React from "react";

import Tasks from "./Tasks";
import "./style.scss";


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			task_name: "",

			task_types: [
				{
					title: "To Do",
					type: "to_do",
					tasks: [],
				},
				{
					title: "In Progress",
					type: "in_progress",
					tasks: [],
				},
				{
					title: "Done",
					type: "done",
					tasks: [],
				},
			],
		};
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
			let tasks = task_types[0].tasks;

			tasks.push({
				id: tasks.length + 1,
				name: this.state.task_name,
			});
	
			this.setState({ task_name: "", task_types });
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
