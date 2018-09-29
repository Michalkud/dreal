import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';

const CREATE_TASK = gql`
mutation createTask($data: TaskCreateInput!) {
  createTask(data: $data) {
    id
    description
    estimation
    importance
  }
}`; 

const GET_TASKS = gql`
  {
    tasks {
      id
      description
      importance
      estimation
    }
  }
`;

class TaskCreationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {description: null, estimation: 0, importance: 0};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (fieldName) => (event) => {
    this.setState({[fieldName]: event.target.value});
  }

  handleSubmit = (createTask) => (event) => {
    
    createTask({ variables: { data: { ...this.state, estimation: parseInt(this.state.estimation, 10) } } });
    event.preventDefault();
  }

  render() {
  
    return (<Mutation 
      mutation={CREATE_TASK}
      update={(cache, { data: { createTask }}) => {
        const { tasks } = cache.readQuery({ query: GET_TASKS });
        cache.writeQuery({
          query: GET_TASKS,
          data: { tasks: tasks.concat([createTask]) }
        });
      }}
    >
    {(createTask) =>
      <form onSubmit={this.handleSubmit(createTask)}>
        <label>
          Task:
          <input type="text" value={this.state.value} name="descrition" onChange={this.handleChange('description')} />
        </label>
        <label>
          Estimation:
          <input type="number" value={this.state.value} name="estimation" onChange={this.handleChange('estimation')} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    }
    </Mutation>);
  }


};

export default TaskCreationForm;