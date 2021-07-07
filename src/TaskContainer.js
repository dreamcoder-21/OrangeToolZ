import React from "react";

import Task from "./Task";


export default class TaskContainer extends React.Component {
	handle_drag_enter = (e, target_item) => {
		console.log("Bipul Roy");
	}
	
	render() {
		let dragging = this.props.client.state.dragging;
		let tasks = this.props.tasks;
		let type = this.props.type;
		
		return <div
			className={"droppable task-card " + this.props.extra_classes}
			onDragEnter={ dragging && !tasks.length ? (e) => this.handle_drag_enter(e, { type, index: 0 }) : null }
		>
			<div className="header text-center">
				{ this.props.title }
			</div>

			{ tasks.map((value, index) => {
				return <Task
					key={index}
					task={value}
					type={this.props.type}
					client={this}
				/>
			}) }
		</div>;
	}
}
