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
import QuotationForm from "../components/QuotationForm";

import InvoiceFields from "Components/Form/Inputs/Accounting/InvoiceFields";
import AddressFormInput from "Components/Form/Inputs/AddressFormInput";
import InvoiceProductInput from "Components/Form/Inputs/Accounting/InvoiceProductInput";
import Button from "@material-ui/core/Button";

// Actions
import {
  getSingleQuotation,
  clearSingleQuotation,
  submitNewQuote
} from "Ducks/accounting/quotation";

class acct_edit_quotation extends Component {
  componentDidMount() {
    var id = this.props.match.params.id;
    this.props.getSingleQuotation(id, true);
  }

  componentWillUnmount() {
    this.props.clearSingleQuotation();
  }

  // _quotationParent = (element, item) =>{
  //   this.props.submitNewQuote(element, item)
  // }

  _quotationParent = item => {
    this.props.submitNewQuote(item);
  };

  render() {
    const { currencyTable, taxTable, discountTable } = this.props.quotationList;

    const { loading, quotation } = this.props.quotationToView;

    return loading ? (
      <RctPageLoader />
    ) : quotation ? (
      <React.Fragment>
        <Helmet>
          <title>Everyday | New Quotation</title>
          <meta name="description" content="Everyday Quotation Creation" />
        </Helmet>

        <QuotationForm
          title="sidebar.newQuotation"
          handleSubmit={this._quotationParent}
          edit={true}
          quotationData={quotation}
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

const mapStateToProps = ({ accountingState, crmState, usersState }) => {
  const { quotationState } = accountingState;
  const { quotationToView, quotationList, quotationForm } = quotationState;

  return { quotationToView, quotationList, quotationForm };
};

// deleted

export default connect(
  mapStateToProps,
  { getSingleQuotation, clearSingleQuotation, submitNewQuote }
)(acct_edit_quotation);
