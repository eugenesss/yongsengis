import React, { Component } from "react";
import { connect } from "react-redux";

// Sub components
import { Helmet } from "react-helmet";

// intl messages
import IntlMessages from "Util/IntlMessages";

// Page Components
import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";

import PageErrorMessage from "Components/Everyday/Error/PageErrorMessage";
import RctPageLoader from "Components/RctPageLoader";

import InvoiceFields from "Components/Form/Inputs/Accounting/InvoiceFields";
import AddressFormInput from "Components/Form/Inputs/AddressFormInput";
import InvoiceProductInput from "Components/Form/Inputs/Accounting/InvoiceProductInput";
import Button from "@material-ui/core/Button";

import InvoiceForm from "../components/InvoiceForm";

// Actions
import {
  getSingleQuotation,
  clearSingleQuotation,
  deleteSingleQuote,
  addNewProdQuote,
  removeProdQuote,
  handleProdQuote,
  handleChangeQuote,
  submitNewQuote,
  submitInvoice,
  getSingleInvoice
} from "Ducks/accounting/invoice";




class acct_edit_quotation extends Component {

  UNSAFE_componentWillMount() {
    var id = this.props.match.params.id;
    this.props.getSingleInvoice(id);
  }

  componentWillUnmount() {
    this.props.clearSingleQuotation();
  }

  _quotationParent = item => {
    this.props.submitInvoice(item);
  };

  render() {
    // const {currencyTable, taxTable, discountTable} = this.props.quotationList
    // const {products, quotation} = this.props.quotationForm
    const { loading, invoice } = this.props.invoiceToView;

    return loading ? (
      <RctPageLoader />
    ) : invoice ? (
      <React.Fragment>
        <Helmet>
          <title>Everyday | New Invoice</title>
          <meta name="description" content="Everyday Invoices Creation" />
        </Helmet>
        <InvoiceForm
          title="sidebar.newQuotation"
          handleSubmit={this._quotationParent}
          edit={true}
          invoiceData={invoice}
        />
      </React.Fragment>
    ) : (
      <PageErrorMessage
        heading="Not Found"
        message="This could be because of a network problem or the record might have been deleted"
      />
    );
  }
}
// const mapStateToProps = ({ crmState }) => {
//   const { dealState } = crmState;
//   const { dealForm } = dealState;
//   return { dealForm };
// };

// export default connect(
//   mapStateToProps,
//   { submitEditDeal }
// )(acct_edit_quotation);

const mapStateToProps = ({ accountingState }) => {
  const { invoiceState } = accountingState;
  const { invoiceToView, invoiceList } = invoiceState;
  return { invoiceToView, invoiceList };
};

// deleted

export default connect(
  mapStateToProps,
  {
    getSingleInvoice,
    submitInvoice,
    getSingleQuotation,
    clearSingleQuotation,
    deleteSingleQuote,
    addNewProdQuote,
    removeProdQuote,
    handleProdQuote,
    handleChangeQuote,
    submitNewQuote
  }
)(acct_edit_quotation);

// const mapStateToProps = ({ accountingState, crmState, usersState }) => {
//   const {tableData, } = crmState.accountState.accountList
//   const { quotationState,} = accountingState;
//   const { quotationForm, quotationList, quotationToView } = quotationState;
//   const { users } = usersState;
//   return { quotationForm, tableData, users, quotationList, quotationToView};
// };

// export default connect(
//   mapStateToProps,
//   { addNewProdQuote, removeProdQuote, handleProdQuote, handleChangeQuote, getAllAccount, getAllUsers, submitNewQuote, getSingleQuotation, clearSingleQuotation, deleteSingleQuote }
// )(acct_edit_quotation);
