import React from "react";

const ViewCardTitle = ({ name, subHeading, image }) => {
  return (
    <div className="text-center pb-10">
      <div
        className="mx-auto"
        style={{
          width: "200px",
          height: "300px",
          background: "#e6e6e6"
        }}
      >
        image placeholder 200x300
      </div>
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
