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
        <thead className="table-head">
          <tr>
            <th className="table-cell">Id</th>
            <th className="table-cell">Status</th>
            <th className="table-cell">Owner</th>
            <th className="table-cell">Created</th>
            <th className="table-cell">Effort</th>
            <th className="table-cell">Completion</th>
            <th className="table-cell">Title</th>
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
			<th className="table-cell">
        <Link to={`/issues/${issue._id}`}>
          {issue._id.substr(-10)} 
        </Link>
			</th>
			<td className="table-cell">{issue.status}</td>
			<td className="table-cell"> {issue.owner}</td> 
			<td className="table-cell">{issue.created.toLocaleDateString()}</td> 
			<td className="table-cell">{issue.effort}</td> 
			<td className="table-cell">{issue.completion ? issue.completion.toLocaleDateString(): ''}</td>
			<td className="table-cell">{issue.title}</td>
		</tr> 
	);
};