import React, { Component } from "react";
import styled from "styled-components";

class Repository extends Component {
  state = {
    isLinkAllowed: true
  };

  componentWillUnmount() {
    this.setState({ isLinkAllowed: true });
  }

  handleClicks = (e, type) => {
    if (type === "github") {
      if (!this.state.isLinkAllowed) {
        return e.preventDefault();
      }
      this.setState({ isLinkAllowed: false });
    } else {
      this.props.history.goBack();
    }
  };

  render() {
    const title = this.props.location.state.name;
    const isLinkAllowed = this.state.isLinkAllowed;
    const githubURL = this.props.location.state.link;

    return (
      <Container>
        <Title>{title}</Title>
        <Links>
          <Link
            href={githubURL}
            target="_blank"
            onClick={e => this.handleClicks(e, "github")}
          >
            <GithubLink linkAllowed={isLinkAllowed}> Open in GitHub</GithubLink>
          </Link>

          <GoBackLink onClick={() => this.handleClicks("back")}>
            Back
          </GoBackLink>
        </Links>
      </Container>
    );
  }
}

export default Repository;

const Container = styled.div`
  margin: auto;
  width: 50rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 28px;
  margin-bottom: 5rem;
`;

const Links = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GithubLink = styled.button`
  padding: 1rem;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  width: 20rem;
  color: black;
  font-size: 1.8rem;
  line-height: 1.5rem;
  cursor: ${props => (props.linkAllowed ? "pointer" : "not-allowed")};
  transition: all 1s;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const GoBackLink = styled(GithubLink)`
  cursor: pointer;
`;

const Link = styled.a``;
