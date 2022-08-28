import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../actions";

import Header from "./Header";
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
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/surveys/new" element={<SurveyNew />} />
            <Route path="/surveys/:userId" element={<Contents />} />
            <Route path="/surveys/" element={<Contents />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps({ surveys, auth }) {
  return { surveys, auth };
}

export default connect(mapStateToProps, actions)(App);
