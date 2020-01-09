import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";

import RctSectionLoader from "Components/RctSectionLoader";
import CategoryTable from "./components/CategoriesTable";
import CategoryForm from "./components/CategoryForm";

// actions
import {
  getAllCategories,
  newCategories,
  editCategories,
  deleteCategories
} from "Ducks/setting/inventory/category";

class Setting_Categories extends Component {
  constructor(props) {
    super(props);
    this.openNewDialog = this.openNewDialog.bind(this);
    this.openEditDialog = this.openEditDialog.bind(this);
  }
  componentDidMount() {
    this.props.getAllCategories();
  }

  openNewDialog() {
    this.props.show("category_form", { submitForm: this.props.newCategories });
  }
  openEditDialog(id) {
    const editWh = this.props.allCategory.find(cat => cat.cid == id);
    this.props.show("category_form", {
      edit: editWh,
      submitForm: this.props.editCategories
    });
  }

  deleteDialog(id) {
    this.props.show("alert_delete", {
      name: "",
      action: () => this.props.deleteCategories(id)
    });
  }
  render() {
    const { allCategory, loading } = this.props;
    return (
      <React.Fragment>
        {loading && <RctSectionLoader />}
        <CategoryTable
          newCat={this.openNewDialog}
          data={allCategory}
          editCat={this.openEditDialog}
          deleteCat={this.deleteDialog}
        />
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

export default connect(mapStateToProps, {
  show,
  getAllCategories,
  newCategories,
  editCategories,
  deleteCategories
})(Setting_Categories);
