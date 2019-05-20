import React, { Component } from "react";
import styled from "styled-components";
import TopBar from "./TopBar/TopBar";
import List from "./List/List";

class Browse extends Component {
  state = {
    data: null,
    isLoading: "false"
  };

  componentWillUnmount() {
    this.saveItemToLocalstorage(this.state.data);
  }

  componentDidMount() {
    this.getItemFromLocalstorage();
  }

  saveItemToLocalstorage = data => {
    const reposList = JSON.stringify(data);
    localStorage.setItem("reposList", reposList);
  };

  getItemFromLocalstorage = () => {
    const data = localStorage.getItem("reposList");
    const reposList = JSON.parse(data);

    if (reposList) {
      this.setState({ data: reposList });
    }
  };

  getData = data => {
    this.setState({ data });
  };

  loadingProccess = isLoading => {
    this.setState({ isLoading });
  };

  render() {
    return (
      <Container>
        <TopBar
          data={data => this.getData(data)}
          loading={isLoading => this.loadingProccess(isLoading)}
        />
        <List data={this.state.data} loading={this.state.isLoading} />
      </Container>
    );
  }
}

export default Browse;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #2c3e50;
  display: flex;
  flex-direction: column;
`;
