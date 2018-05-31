import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import './stylesheets/App.css';

export default class IssueTable extends Component {           

  render(){
    const issueRows = this.props.issues.map(issue => {
                          return(<IssueRow key={issue._id} issue={issue} />);
              });        
    return (
      <Table bordered hover responsive striped>
        <thead >
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Status</th>
            <th scope="col">Owner</th>
            <th scope="col">Created</th>
            <th scope="col">Effort</th>
            <th scope="col">Completion</th>
            <th scope="col">Title</th>
          </tr>
        </thead>
        <tbody>
          {issueRows}
        </tbody>
      </Table>
    );
  }
}


const IssueRow = (props) => {
	const issue = props.issue;
	return (
		<tr>
			<th scope="row">
        <Link to={`/issues/${issue._id}`}>
          {issue._id.substr(-6)} 
        </Link>
			</th>
			<td>{issue.status}</td>
			<td>{issue.owner}</td> 
			<td>{issue.created.toLocaleDateString()}</td> 
			<td>{issue.effort}</td> 
			<td>{issue.completion ? issue.completion.toLocaleDateString(): ''}</td>
			<td>{issue.title}</td>
		</tr> 
	);
};