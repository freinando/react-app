import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class IssueEdit extends Component
{
  render() {
    return (
      <div>
	      <p>This is a placeholder for editing issue {this.props.match.params.id} .</p>
	      <Link to="/">Back to issues list</Link>
      </div>
    );
  } 
}


