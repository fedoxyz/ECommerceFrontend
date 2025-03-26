import styled from "styled-components";
import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";

const InputWrapper = styled.div`
  background-color: white;
  border-radius: 10px;
  height: 2.5rem;
  padding: 0 15px;
  box-shadow: 0px 0px 0px #ddd;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #efefef;
  }
`;

const StyledInput = styled.input`
  background-color: transparent;
  border: none;
  height: 100%;
  font-size: 1.25rem;
  width: 100%;
  margin-left: 5px;
  &:focus {
    outline: none;
  }
`;


export const SearchBar = () => {
  const [input, setInput] = useState("");

  const fetchData = async (value) => {
    //
      //
    }

  const handleChange = async (value) => {
    setInput(value);
    await fetchData(value);
  };

  return (
    <InputWrapper className="">
      <FaSearch id="search-icon" />
      <StyledInput value={input} onChange={handleChange} placeholder="Type to search..." />
    </InputWrapper>
);
};
