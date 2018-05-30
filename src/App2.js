import React from 'react';
import ReactDOM from 'react-dom';

import IssueList from './IssueList.js';
import IssueEdit from './IssueEdit.js';


//import { Router, Route, Redirect, hashHistory } from 'react-router';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
const NoMatch = () => <p>Page Not Found</p>;

const RoutedApp = () => (
  <BrowserRouter>
  	<div>
	  	<Route path="/" component={IssueList} />
	    <Route path="/issues" component={IssueList} />
	    <Route path="/issueEdit:id" component={IssueEdit} />
	    <Route path="*" component={NoMatch} />
    </div>
  </BrowserRouter> 
);




ReactDOM.render(<IssueList />, document.getElementById('contents'));