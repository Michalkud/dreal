import React, { Component } from 'react';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';


import Overview from './components/Overview';
import TaskCreationForm from './components/TaskCreationForm';
import './App.css';
import ImportanceSetter from './components/ImportanceSetter/ImportanceSetter';
import TimeTracker from './components/TimeTracker';

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
  // to a different host
  link: new HttpLink({
    //uri: 'https://api.graph.cool/simple/v1/cj7yfwulp1j710168atkx0492/api'
    uri: 'http://localhost:4467'
   }
  ),
  cache: new InMemoryCache(),
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <TaskCreationForm />
          <br />
          <br />
          <br />
          <TimeTracker />
          <br />
          <br />
          <br />
          <ImportanceSetter />
          <br />
          <br />
          <br />
          <Overview />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
