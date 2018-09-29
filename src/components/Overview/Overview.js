import React, { Component } from 'react'
import gql from "graphql-tag";
import { Query } from "react-apollo";
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

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

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer


class Overview extends Component {
  render() {
    return (
        <Query query={GET_TASKS}>{
        ({ loading, error, data: { tasks } }) => { 
          console.log(tasks);
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          const start = moment();
          const myEventsList = [];
          tasks.sort((a, b) => a.importance - b.importance).forEach((task) => {
            myEventsList.push({
              title: task.description,
              start: start.toDate(),
              end: start.add(task.estimation, 'minutes').toDate()
            });
          })

          return <div>
            <BigCalendar
              defaultView={'week'}
              localizer={localizer}
              events={myEventsList}
              startAccessor="start"
              endAccessor="end"
            />
          </div>;
        }
        }</Query>
    )
  }
}


export default Overview;
