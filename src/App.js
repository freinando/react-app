import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import IssueAdd from './IssueAdd.js';
import IssueFilter from './IssueFilter.js';
import IssueTable from './IssueTable.js';
import axios from 'axios';
import queryString from 'query-string'

/*const issues = [
                { owner:"Yerri", 
                  title:"Oscar", 
                  effort:2, 
                  created:new Date(), 
                  completion:new Date(), 
                  _id:1, 
                  status:"New"
                }
];*/

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {issues : []};


      this.createIssue = this.createIssue.bind(this);
  }

  componentWillMount() {
      this.loadData();
  }

  componentDidUpdate(prevProps) {
    const oldQuery = queryString.parse(prevProps.location.search);
    const newQuery = queryString.parse(this.props.location.search);
    if (oldQuery.status !== newQuery.status) {
      this.loadData();
    }
    
  }


  async loadData() {
    const values = queryString.parse(this.props.location.search);
    try{
      const res = await axios.get('/api/issues', {params: values});
      if(!res.status===200){
        return alert("Failed to fetch issues: " + res.statusText);
      }

      res.data.records.forEach(issue => {
        issue.created = new Date(issue.created);
        issue.completion= new Date(issue.completion);
      });
      this.setState({ issues: res.data.records });

      }catch(err){ 
        console.log('errorazo '+err);
      }
      
  }
  //callback function for issueadd
  async createIssue(newIssue) {
    let res;
    try{
      res = await axios.post('/api/issues', newIssue);
    }
    catch(err){
      alert("Error in sending data to server: " + err.message);
    }

    if(!res.status === 200){
      return alert("Failed to add issue: " + res.statusText);
    }
    
    res.data.created = new Date(res.data.created);
    res.data.completion = new Date(res.data.completion);

    const newIssues = this.state.issues.concat(res.data);
    this.setState({ issues: newIssues });
  }

  render() {
    return (
      <div>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={this.state.issues}/>
        <hr />
        <IssueAdd createIssue={this.createIssue}/>
      </div>
    ); 
  }

}

export default App;
