import React, { Component } from 'react';
//import logo from './logo.svg';
import './stylesheets/App.css';
import IssueAdd from './IssueAdd.js';
import IssueFilter from './IssueFilter.js';
import IssueTable from './IssueTable.js';
import axios from 'axios';
import queryString from 'query-string'
import SweetAlert from 'react-bootstrap-sweetalert';
import { Button, Grid, Row, Col, PageHeader } from 'react-bootstrap';

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

export default class App extends Component {
  constructor(props) {
      super(props);
      this.state = {issues : [],
                    alert: null, 
                    filter:""};


      this.createIssue = this.createIssue.bind(this);
      this.showAlert = this.showAlert.bind(this);
      this.hideAlert = this.hideAlert.bind(this);
      this.updateFilter = this.updateFilter.bind(this);
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

  async updateFilter(eventKey){
      let path;
      if(eventKey==="1"){
        await this.setState({ filter: "Open Issues" });
        path = "/issues?status=Open";
      }
      else if(eventKey==="2"){
        await this.setState({ filter: "Assigned Issues" });
        path = "/issues?status=Assigned";
      }
      else {
        await this.setState({ filter: "All Issues" });
        path = "/issues";
      }

      this.props.history.push(path);
  }

  async loadData() {
    const values = queryString.parse(this.props.location.search);
    let filterVal = "Assigned Items";
    if(values.status){
      if(values.status === "Open")
        filterVal= "Open Items";
      else if(values.status === "Assigned")
        filterVal= "Assigned Items";
    }

    try{
      const res = await axios.get('/api/issues', {params: values});
      if(!res.status===200){
        return alert("Failed to fetch issues: " + res.statusText);
      }

      res.data.records.forEach(issue => {
        issue.created = new Date(issue.created);
        issue.completion= new Date(issue.completion);
      });
      this.setState({ issues: res.data.records, filter: filterVal });

      }catch(err){ 
        return alert("Error: " + err);
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

  showAlert() {
    const getAlert = () => (
      <SweetAlert 
        warning 
        btnSize="md"
        showCancel 
        closeOnClickOutside
        title="Mark this review for account 12345 as remove from trial?"
        confirmBtnText="Save"
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="link"
        onConfirm={this.hideAlert}
        onCancel={this.hideAlert}>
      </SweetAlert>
    );

    this.setState({
      alert: getAlert()
    });
  }

  hideAlert() {
    console.log('Hiding alert...');
    this.setState({
      alert: null
    });
  }

  render() {
    return (
      <div>
        <Grid>
          <Row xs={12} md={6}>
            <Col >
              <PageHeader>Issue Tracker</PageHeader>
              <IssueFilter i="issueFilter" title={this.state.filter} callback={this.updateFilter}/>
              <hr />
              <IssueTable issues={this.state.issues}/>
              <hr />
              <IssueAdd createIssue={this.createIssue}/>
              <Button onClick={this.showAlert}>Do it</Button>
              {this.state.alert}
            </Col>
          </Row>
        </Grid>
      </div>
    ); 
  }

}

