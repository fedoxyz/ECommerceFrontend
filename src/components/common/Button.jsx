import React from "react";
import styled from "styled-components";

// Theme configuration
const theme = {
  blue: {
    default: "#3f51b5",
    hover: "#283593",
  },
  danger: {
    default: "#e91e63",
    hover: "#ad1457",
  },
  // You can add more themes here
};

// Base Button component
const StyledButton = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  border: 0; 
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

// Toggle version of the button
export const ButtonToggle = styled(StyledButton)`
  opacity: 0.7;
  ${({ active }) =>
    active &&
    `
    opacity: 1; 
  `}
`;

// Main Button component
const Button = ({ 
  children, 
  theme = "blue", 
  as, 
  active,
  ...rest 
}) => {
  // If "active" prop is passed, use ButtonToggle, otherwise use regular StyledButton
  const ButtonComponent = active !== undefined ? ButtonToggle : StyledButton;
  
  return (
    <ButtonComponent
      theme={theme}
      active={active}
      as={as}
      {...rest}
    >
      {children}
    </ButtonComponent>
  );
};

// ButtonGroup component for toggle functionality
export const ButtonGroup = ({ options, activeOption, onChange }) => {
  return (
    <div>
      {options.map((option) => (
        <ButtonToggle 
          key={option}
          theme="blue"
          active={activeOption === option} 
          onClick={() => onChange(option)}
        >
          {option}
        </ButtonToggle>
      ))}
    </div>
  );
};

export default Button;
