import React, { useState } from "react";
import styled from "styled-components";

// Styled Tab component
const StyledTab = styled.button`
  padding: 10px 30px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  border-bottom: 2px solid transparent;
  transition: ease border-bottom 250ms;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;

// TabPanel component to show content when tab is selected
const TabPanel = ({ children, value, index }) => {
  return value === index ? <div>{children}</div> : null;
};

// Tabs component
const Tabs = ({ 
  tabs = [], 
  defaultTab = 0,
  onChange
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultTab);
  
  const handleTabChange = (index) => {
    setActiveTabIndex(index);
    if (onChange) {
      onChange(index);
    }
  };
  
  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <StyledTab
            key={index}
            active={activeTabIndex === index}
            onClick={() => handleTabChange(index)}
          >
            {tab.label}
          </StyledTab>
        ))}
      </div>
      <div className="tabs-content">
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={activeTabIndex} index={index}>
            {tab.content}
          </TabPanel>
        ))}
      </div>
    </div>
  );
};

// TabGroup component similar to your original implementation
export const TabGroup = ({ options, activeOption, onChange, renderContent }) => {
  return (
    <>
      <div>
        {options.map((option) => (
          <StyledTab
            key={option}
            active={activeOption === option}
            onClick={() => onChange(option)}
          >
            {option}
          </StyledTab>
        ))}
      </div>
      {renderContent && renderContent(activeOption)}
    </>
  );
};

export default Tabs;
