import React, { useState } from "react";

import BgCard from "Components/BgCard";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";

function TabsWrapper(props) {
  const [activeIndex, setactiveIndex] = useState(0);

  //Tabs Header
  function handleChange(value) {
    setactiveIndex(value);
  }

  const { children } = props;
  return (
    <BgCard
      fullBlock
      heading={
        <Tabs
          value={activeIndex}
          onChange={(e, value) => handleChange(value)}
          variant="fullWidth"
        >
          {children.length > 1 ? (
            children.map((child, key) => (
              <Tab
                key={key}
                icon={child.props && child.props.icon}
                label={child.props && child.props.label}
              />
            ))
          ) : (
            <Tab
              icon={children.props && children.props.icon}
              label={children.props && children.props.label}
            />
          )}
        </Tabs>
      }
    >
      <SwipeableViews
        axis={"x"}
        index={activeIndex}
        onChangeIndex={index => handleChange(index)}
      >
        {children.length ? (
          children.map((child, key) => (
            <div key={key} className="px-40 py-10">
              {child}
            </div>
          ))
        ) : (
          <div className="px-40 py-10">{children}</div>
        )}
      </SwipeableViews>
    </BgCard>
  );
}

export default TabsWrapper;
