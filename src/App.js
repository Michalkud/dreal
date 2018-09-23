import React, { Component } from "react";
import "./styles/main.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "home"
    };
  }

  render() {
    return (
      <div className="App">
        {this.state.page === "home" && (
          <section className="formSection">
            <form className="mainForm">
              <div className="mainForm__holder">
                <label>Title</label>
                <input />
              </div>

              <div className="mainForm__holder">
                <label>Estimation</label>
                <input />
              </div>

              <div className="mainForm__holder">
                <button onClick={() => this.setState({ page: "swipe" })}>
                  submit
                </button>
              </div>
            </form>
          </section>
        )}

        {this.state.page === "swipe" && (
          <section className="swipeSection">
            <div className="swipe">
              <div className="swipeBlock swipeBlock--left" >
                  <h2>Eat a hamburguer</h2>
               </div>
              <div className="swipeDivider"> OR</div>
              <div className="swipeBlock swipeBlock--right" >
                  <h2>Walk the dog</h2>
               </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default App;
