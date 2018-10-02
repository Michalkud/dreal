import React, { Component } from 'react'
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

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

const UPDATE_IMPORTANCE_OF_TASK = gql`
  mutation updateImportanceOfTask($importance: Int, $id: ID) {
    updateTask(
      data: {
        importance: $importance
      }
      where: {
        id: $id
      }
    ) {
      id
      description
      estimation
      importance
    }
  }
`

class ImportanceSetter extends Component {
  render() {
    return (
    <Mutation mutation={UPDATE_IMPORTANCE_OF_TASK}>
      {(updateImportanceOfTask) =>
      (<Query query={GET_TASKS}>{
          ({ loading, error, data: { tasks } }) => {


            if (loading) return 'Loading...';

            let [ optionOne, optionTwo ] = this.getImmediateUnsortedTasks(tasks);
            console.log(optionOne, optionTwo);
            return (<div>
              <h2>What is more important?</h2>
              {optionOne && optionTwo &&
              <div>
                <div onClick={this.setTaskAsLessImportant(updateImportanceOfTask, optionTwo)}>{optionOne.description}</div>
                  or
                <div onClick={this.setTaskAsLessImportant(updateImportanceOfTask, optionOne)}>{optionTwo.description}</div>
              </div>}
            </div>);
          }
      }</Query>)}
    </Mutation>)
  }

  setTaskAsLessImportant = (updateImportanceOfTask, task) => () => {
    return updateImportanceOfTask({
      variables: {
        importance: task.importance + 1,
        id: task.id
      }
    });
  }

  getImmediateUnsortedTasks(tasks) {
    let optionOne;
    let optionTwo;

    const sortedTasks = tasks.sort((a, b) => a.importance - b.importance);
    for(let i = 1; i < sortedTasks.length; i++) {
      if (sortedTasks.length >= 2 && sortedTasks[i - 1].importance === sortedTasks[i].importance) {
        [optionOne, optionTwo] = [sortedTasks[i - 1], sortedTasks[i]];
        break;
      }
    }
    return [optionOne, optionTwo];
  }
}

export default ImportanceSetter;
