import React from "react";
import ImageRenderer from "Components/Image";

const ViewCardTitle = ({ name, subHeading, image }) => {
  return (
    <div className="text-center pb-10">
      <ImageRenderer image={image} />
      <h1 className="mb-5 mt-20">{name}</h1>
      {subHeading.length > 1 ? (
        subHeading.map((child, key) => {
          return (
            <p key={key} className="mb-1">
              {child}
            </p>
          );
        })
      ) : (
        <div className="mb-0 d-block">{subHeading}</div>
      )}
    </div>
  );
};

export { ViewCardTitle };
