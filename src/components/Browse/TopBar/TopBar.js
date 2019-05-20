import React, { Component } from "react";
import styled from "styled-components";

class TopBar extends Component {
  state = {
    input: "",
    sort: "stars"
  };

  componentDidMount() {
    this.getItemFromLocalstorage();
  }

  handleInput = e => {
    const input = e.target.value;
    this.setState({ input });
  };
  handleOptions = e => {
    const sort = e.target.value;
    this.setState({ sort });
  };

  searchRepos = () => {
    const { input, sort } = this.state;

    this.validateInput(input, sort);
    this.saveItemToLocalstorage(input, sort);
  };

  validateInput = (input, sort) => {
    if (input.length === 0) {
      return this.sendData("");
    }

    return this.fetchData(input, sort);
  };

  fetchData = async (input, sort) => {
    const API = `https://api.github.com/search/repositories?q=${input}&sort=${sort}&order=desc&per_page=10`;
    this.loadingProcces("true");

    const result = await fetch(API);
    const data = await result.json();

    this.validateStatus(data);
    this.loadingProcces("false");
  };

  validateStatus = data => {
    const errMsg = data.message;

    if (errMsg) {
      return this.sendData(errMsg);
    }

    if (data.items.length === 0) {
      return this.sendData("Sorry.. i didn't find it :(");
    }

    this.sendData(data.items);
  };

  saveItemToLocalstorage = (input, sort) => {
    localStorage.setItem("input", input);
    localStorage.setItem("sort", sort);
  };

  getItemFromLocalstorage = () => {
    const input = localStorage.getItem("input");
    const sort = localStorage.getItem("sort");

    if (input && sort) {
      this.setState({ input, sort });
    }
  };

  sendData = data => {
    this.props.data(data);
  };

  loadingProcces = isLoading => {
    this.props.loading(isLoading);
  };

  render() {
    return (
      <Header>
        <SearchBar>
          Search:{" "}
          <SearchInput
            type="text"
            value={this.state.input}
            onChange={this.handleInput}
          />
        </SearchBar>

        <SortBar>
          Sort By:{" "}
          <SortSelect
            onChange={this.handleOptions}
            onFocus={this.handleOptions}
          >
            <Option>stars</Option>
            <Option>forked</Option>
            <Option>updated</Option>
          </SortSelect>
        </SortBar>

        <ButtonBox>
          <Button onClick={this.searchRepos}>Search</Button>
        </ButtonBox>
      </Header>
    );
  }
}

export default TopBar;

const Header = styled.header`
  flex-basis: 20%;
  background-color: tomato;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchBar = styled.div`
  margin-left: 3rem;
  width: calc(33% - 9rem);
  font-size: 2.5rem;
  color: white;
  display: flex;
  align-items: center;
  height: 5rem;
`;
const SearchInput = styled.input`
  margin-left: 1rem;
  border-color: transparent;
  border-radius: 1rem;
  height: 3rem;
  font-size: 1.8rem;
  padding: 1rem;
`;

const SortBar = styled.div`
  margin-left: 3rem;
  width: calc(33% - 9rem);
  font-size: 2.5rem;
  color: white;
  display: flex;
  align-items: center;
  height: 5rem;
`;

const SortSelect = styled.select`
  width: 20rem;
  margin-left: 1rem;
  border-color: transparent;
  border-radius: 1rem;
  height: 3rem;
  font-size: 1.8rem;
  padding: 0.2rem;
`;
const Option = styled.option``;

const ButtonBox = styled.div``;

const Button = styled.button`
  padding: 1rem;
  width: 13rem;
  background-color: white;
  border: 1px solid transparent;
  border-radius: 10px;
  margin-right: 3rem;
  color: black;
  font-size: 1.8rem;
  line-height: 1rem;
  cursor: pointer;
`;
