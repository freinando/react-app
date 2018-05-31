import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class IssueFilter extends Component { 
	render() {
	    return (
			<DropdownButton
				bsStyle={"primary"}
				title={this.props.title}
				key={this.props.i}
				id={`dropdown-basic-${this.props.i}`}
				onSelect={(evt)=>{this.props.callback(evt)}}>
					{this.props.title !== "Open Issues" ? <MenuItem eventKey="1">Open Issues</MenuItem> : null}
					{this.props.title !== "Assigned Issues" ? <MenuItem eventKey="2">Assigned Issues</MenuItem> : null}
					{this.props.title !== "All Issues" ? <MenuItem eventKey="3">All Issues</MenuItem> : null}
			</DropdownButton>
    	);
	} 
}

/*
const Separator = () => <span> | </span>;
	    return (
		      <div>
		        <Link to="/issues">All Issues</Link>
		        <Separator />
		        <Link to="/issues?status=Open">
		        	Open Issues
		        </Link>
		        <Separator />
		        <Link to="/issues?status=Assigned">Assigned Issues</Link>
	    	</div> 
	    );*/