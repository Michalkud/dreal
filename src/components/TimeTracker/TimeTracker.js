import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo';
import { adopt } from 'react-adopt';
import gql from 'graphql-tag';
import moment from 'moment';

const GET_TIMELOGS_ORDERED_BY_ID = gql`
  query {
    timeLogs(orderBy: id_ASC) {
      id
      task {
        id
      }
      startDate
      endDate
    }
  }
`;

const CREATE_TIMELOG = gql`
  mutation {
    createTimeLog(data: { startDate task }) {
      id
      task {
        id
      }
      startDate
      endDate
    }
  }
`;

const UPDATE_TIMELOG_ENDDATE = gql`
  mutation($endDate: String!, $id: ID!) {
    updateTimeLog(data: { endDate: $endDate }, where: { id: $id }) {
      id
      task {
        id
      }
      startDate
      endDate
    }
  }
`;

const TimeLogManagement = adopt({
  createTimelog: <Mutation mutation={CREATE_TIMELOG} />, 
  updateTimelogEndDate: <Mutation mutation={UPDATE_TIMELOG_ENDDATE} />,
  timeLogsById: <Query query={GET_TIMELOGS_ORDERED_BY_ID} />
});
export default class TimeTracker extends Component {

  switchWork = () => {

    this.setState({ workStartDate: this.state.workStartDate ? null : moment().subtract(1, 'hour') });
  }
  
  render() {
    return (
      <Query query={CREATE_TIMELOG} >
        <TimeLogManagement>
          {({ 
            createTimelog,
            updateTimelogEndDate,
            timeLogsById: {
              data: { timeLogs },
              loading,
              error
            }
          }) => {

            if (error) return 'Error...';
            if (loading) return 'Loading...';
            
            return (<div>
              { timeLogs &&
                timeLogs.length > 0 &&
                timelogs[0].endDate ? 
                <div 
                  onClick={() => 
                    updateTimeLogEndDate(moment().format(), timeLogs[0].id)
                }>
                  Stop work
                </div> :
                <div onClick={() => createTimelog(moment().format())}>
                  Start work
                </div>
              }
            </div>)
          }}
        </TimeLogManagement>
      </Query>
    )
  }
}
