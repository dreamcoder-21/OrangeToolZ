import React from "react";

import { edit_task } from "./library/TasksHelper";


export default class Tasks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dragging: false,
			drag_type_index: null,
			drag_task_index: null,
		};

		this.drag_item = React.createRef();
		this.drag_item_node = React.createRef();
		this.target_item = React.createRef();
		this.target_item_node = React.createRef();
	}

	get_drag_item_style = (type_index, task_index) => {
		if(type_index === this.state.drag_type_index && task_index === this.state.drag_task_index) {
			return {
				opacity: "0.25",
			};
		}
		return {};
	}

	handle_drag_start = (e, item) => {
		this.drag_item_node.current = e.target;
        this.drag_item_node.current.addEventListener("dragend", this.handle_drag_end);
        this.drag_item.current = item;

		this.setState({
			dragging: true,
			drag_type_index: item.task_type_index,
			drag_task_index: item.task_index,
		});
	}

	handle_drag_enter = (e, target_item) => {
		this.target_item_node.current = e.target;
		this.target_item.current = target_item;
	}

	handle_drag_end = (e) => {
        this.setState({
			dragging: false,
			drag_type_index: null,
			drag_task_index: null,
		});

		let task_types = this.props.task_types;
		let target_item = this.target_item.current;
		let target_task_type = task_types[target_item.task_type_index];
		let target_tasks = target_task_type.tasks;
		let target_index = -1;

		if(this.target_item_node.current.classList.contains("task-card") || this.target_item_node.current.classList.contains("tasks")) {
			target_index = target_tasks.length;
		}
		else if(this.target_item_node.current.classList.contains("task")) {
			var data_index = Number(this.target_item_node.current.attributes.getNamedItem("data-index").value);
			if(!isNaN(data_index)) {
				target_index = data_index + 1;
			}
		}
		
		if(this.drag_item_node.current !== this.target_item_node.current && target_index > -1) {
			let drag_item = this.drag_item.current;
			let current_tasks = task_types[drag_item.task_type_index].tasks;

			let post_data = {
				task_id: current_tasks[drag_item.task_index].id,
				type_id: target_task_type.id,
			};
			
			if(target_index === 0) {
				post_data.order = current_tasks[drag_item.task_index].ordering;
			}
			else {
				post_data.order = target_tasks[target_index - 1].ordering + 1;
			}

			edit_task(post_data).then(result => {
				if(result.status) {
					current_tasks[drag_item.task_index].type_id = post_data.type_id;
					current_tasks[drag_item.task_index].ordering = post_data.order;
					
					target_tasks.splice(target_index, 0, current_tasks.splice(drag_item.task_index, 1)[0]);
					this.drag_item.current = target_item;
		
					this.props.set_task_types(task_types);
				}
			});
        }

        this.drag_item.current = null;
        this.drag_item_node.current.removeEventListener("dragend", this.handle_drag_end);
        this.drag_item_node.current = null;
    }

	render() {
		let task_types = this.props.task_types;
		let dragging = this.state.dragging;
		
		return <div className="row mt-4 drag-drop">
			<div style={{ display: "flex", justifyContent: "center", }}>
				{ task_types.map((task_type, task_type_index) => {
					return <div
						key={ task_type_index }
						className={"task-card " + (task_type_index > 0 ? " ml-6" : "") }
						onDragEnter={ dragging ? (e) => this.handle_drag_enter(e, { task_type_index, task_index: 0 }) : null }
					>
						<div className="header text-center mb-12">
							{ task_type.name }
						</div>
			
						<div className="tasks">
							{ task_type.tasks.map((task, task_index) => {
								return <div
									key={ task_index }
									data-index={ task_index }
									draggable
									className="task mb-12 ml-12 mr-12 text-center"
									onDragStart={ e => this.handle_drag_start(e, { task_type_index, task_index }) }
									onDragEnter={ dragging ? (e) => { this.handle_drag_enter(e, { task_type_index, task_index }) } : null }
									style={ this.get_drag_item_style(task_type_index, task_index) }
								>
									{ task.name }
								</div>;
							}) }
						</div>
					</div>;
				}) }
			</div>
		</div>;
	}
}
