import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Repo = ({ data }) => {
  const address = `repository/${data.full_name}`;

  return (
    <Link to={{pathname: address, state: {name: data.full_name, link: data.html_url}}}>
      <Li>
        <InfoList>
          <InfoItem>Repo: {data.full_name}</InfoItem>
          <InfoItem>Description: {data.description}</InfoItem>
          <InfoItem>Stars: {data.stargazers_count}</InfoItem>
        </InfoList>
      </Li>
    </Link>
  );
};

export default Repo;

const Li = styled.li`
  padding: 2rem 2.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:nth-child(even) {
    background: honeydew;
  }
  &:nth-child(odd) {
    background: white;
  }

  &:hover {
    background: paleturquoise;
  }
`;

const InfoList = styled.ul`
  padding: 1rem;
`;

const InfoItem = styled.li`
  font-size: 1.8rem;
`;
