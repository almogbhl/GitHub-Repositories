import React, { Component } from "react";
import GlobalStyle from "./styles/Global/Global.style";
import styled from "styled-components";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Browse from "./components/Browse/Browse";
import Repository from "./components/Repository/Repository";

class App extends Component {
  render() {
    return (
      <Wrapper>
        <GlobalStyle />

        <Router>
          <Route exact path="/" render={() => <Browse />} />
          <Route path="/repository/:id" component={Repository} />
        </Router>
      </Wrapper>
    );
  }
}

export default App;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
