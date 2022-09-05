import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { Flasher } from "react-universal-flash";
import * as actions from "../actions";
import Message from "./Message";
import Header from "./Header";
import Introduction from "./Introduction";
import Contents from "./Contents";
import SurveyNew from "./surveys/SurveyNew";

class App extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    await this.props.fetchUser();
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/surveys/new" element={<SurveyNew />} />
            <Route path="/surveys/:userId" element={<Contents />} />
            <Route path="/surveys/" element={<Contents />} />
            <Route path="/" element={<Introduction />} />
          </Routes>
        </BrowserRouter>
        <Flasher>
          <Message />
        </Flasher>
      </>
    );
  }
}

function mapStateToProps({ surveys, auth }) {
  return { surveys, auth };
}

export default connect(mapStateToProps, actions)(App);
