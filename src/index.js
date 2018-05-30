import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import IssueEdit from './IssueEdit';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


//import queryString from 'query-string'
/*for qery string params
const values = queryString.parse(this.props.location.search)
  console.log(values.filter) // "top"
  console.log(values.origin) // "im"*/

const NoMatch = () =><p>Page Not Found</p>;

ReactDOM.render(<BrowserRouter>
    				<div>
    					<Switch>
	        				<Route exact path="/issues" component={App} />
	    					<Route exact path="/issues/:id" component={IssueEdit} />
	    					<Redirect from="/" to="/issues" />
	    					<Route path="*" component={NoMatch} />
    					</Switch>
      				</div>
  				</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
