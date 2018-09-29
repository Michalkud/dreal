import React, { Component } from 'react'
import moment from 'moment';

export default class TimeTracker extends Component {

  state = {
    workStartDate: null
  }

  switchWork = () => {

    this.setState({ workStartDate: this.state.workStartDate ? null : moment().subtract(1, 'hour') });
  }
  
  render() {
    return (
      <div onClick={this.switchWork}>
        {this.state.workStartDate ? `Stop work` : `Start work`}
      </div>
    )
  }
}
