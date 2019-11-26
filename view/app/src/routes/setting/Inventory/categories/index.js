import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";

import RctSectionLoader from "Components/RctSectionLoader";
import CategoryTable from "./components/CategoriesTable";
import CategoryForm from "./components/CategoryForm";

// actions
import { getAllCategories } from "Ducks/setting/inventory/category";

class Setting_Categories extends Component {
  constructor(props) {
    super(props);
    this.openNewDialog = this.openNewDialog.bind(this);
  }
  componentDidMount() {
    this.props.getAllCategories();
  }

  openNewDialog() {
    this.props.show("category_form");
  }

  render() {
    const { allCategory, loading } = this.props;
    return (
      <React.Fragment>
        {loading && <RctSectionLoader />}
        <CategoryTable newCat={this.openNewDialog} data={allCategory} />
        <CategoryForm />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ settingState }) => {
  const { categoryState } = settingState;
  const { allCategory, loading } = categoryState;
  return { allCategory, loading };
};

export default connect(mapStateToProps, { show, getAllCategories })(
  Setting_Categories
);
