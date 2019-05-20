import React from "react";
import styled from "styled-components";
import BubbleLoader from "../../../styles/BubbleLoader/BubbleLoader";
import Repo from './Repo/Repo';

const printItems = data => (
  <Ul>
    {data.map(repo => (
     <Repo key={repo.node_id} data={repo} />
    ))}
  </Ul>
);

const printDefault = () => <Ul />;
const printLoader = () => <BubbleLoader />;
const printErrors = data => <ErrMsg>{data}</ErrMsg>;

const filterUi = (data, loading) => {
  if (!data) return printDefault();
  if (!Array.isArray(data)) return printErrors(data);
  if (loading === "true") return printLoader();
  return printItems(data);
};

const List = ({ data, loading }) => {
  return filterUi(data, loading);
};

export default List;

const Ul = styled.ul`
  padding: 3rem;
  height: 75vh;
  border-radius: 0.4rem;
  overflow-x: hidden;
  overflow-y: scroll;
  box-shadow: 0 0.2rem 0.8rem DimGrey;

  ::-webkit-scrollbar {
    width: 20px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: tomato;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: darkred;
  }
`;


const ErrMsg = styled.h1`
  margin: 0 auto;
  margin-top: 10%;
  color: tomato;
`;
