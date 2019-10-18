import React, { Component } from "react";
import { connect } from "react-redux";

// Sub components
import { Helmet } from "react-helmet";

// intl messages
import IntlMessages from "Util/IntlMessages";

// Page Components
import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";
import QuotationForm from "../components/QuotationForm";

// Actions
import { submitNewQuotation } from "Ducks/accounting/quotation";


class acct_new_quote extends Component {
  state = {};


  _quotationParent = (item) =>{
    this.props.submitNewQuotation(item)
  }


  render() {

    return (
      <React.Fragment>
        <Helmet>
          <title>Everyday | New Quotation</title>
          <meta name="description" content="Everyday Quotation Creation" />
        </Helmet>
        <QuotationForm 
          title="sidebar.newQuotation"
          handleSubmit={this._quotationParent}
          edit={false}
        />
      </React.Fragment>
    );
  }
}


const mapStateToProps = ({accountingState}) => {
  return {accountingState};
};

export default connect(
  mapStateToProps,
  { 
    submitNewQuotation
  }
)(acct_new_quote);



/* <React.Fragment>
<Helmet>
  <title>Everyday | New Quotation</title>
  <meta name="description" content="Everyday Quotations Creation" />
</Helmet>
<BgCard
  heading={<IntlMessages id="sidebar.newQuotation" />}
>
  <div className="row">
    <div className="col-md-1" />
    <div className="col-md-10">
      <QuotationForm
        accountPage={'Quotation'}
        status={this.props.accountingState.accountState}
        _quotationParent={this._quotationParent}
      />
    </div>
    <div className="col-md-1" />
  </div>
</BgCard>
</React.Fragment> */
