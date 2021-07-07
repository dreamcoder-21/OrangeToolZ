import React from "react";


export default class Task extends React.Component {
	render() {
		return <div draggable className="task mt-12 ml-12 mr-12 text-center">
			{ this.props.task.name }
		</div>;
	}
}
