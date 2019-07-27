/**
 * Page Title Bar Component
 * Used To Display Page Title & Breadcrumbs
 */
import React from "react";

const PageTitleBar = ({ title }) => {
  return (
    <div className="page-title d-flex justify-content-between align-items-center">
      {title && (
        <div className="page-title-wrap text-left">
          <h2 className="ml-5">{title}</h2>
        </div>
      )}
    </div>
  );
};

export default PageTitleBar;
