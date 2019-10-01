import React, { Component } from "react";
import Moment from "moment";

const paymentOption = [
  { name: "Paypal", value: "Paypal" },
  { name: "Stripe", value: "Stripe" },
  { name: "Bank FAST", value: "Bank FAST" }
];
const paymentDifferenceOptions = [
  { name: "Keep Open", value: "Keep Open" },
  { name: "Fully Reconcile", value: "Fully Reconcile" }
];

import AmountInput from "Components/Form/Components/Inputs/AmountInput";
import FormInput from "Components/Form/Components/FormInput";
import DatePickerInput from "Components/Form/Components/Pickers/DatePicker";

import EditableInput from "Components/Everyday/Profile/Details/EditableInput";


export default class ViewPayment extends Component {
  // constructor(props) {
  //     super(props)
  // }

  state = {
    customer: this.props.invoice.customerName,
    invoiceId: this.props.invoice.id,
    paidAmount: this.props.invoice.paidAmount,
    paymentMethod: this.props.invoice.paymentMethod,
    date: new Date(this.props.invoice.createdAt),
    paymentRef: this.props.invoice.paymentRef,
    memo: this.props.invoice.memo,
    paymentDifference: this.props.invoice.paymentDifference
  };

  handleChange = (a, b) => {
    this.setState({ [a]: b });

    // if all items are filled, send to parent
    // this.props.preparePayment()
  };

  render() {
    const { invoice } = this.props;


    return (
      <div className="row">
        <div className="col-md-6" />
        <div className="col-md-6">
       
          <EditableInput label="Payment Date" value={Moment(this.state.date).format("LLL")} />

        </div>

        <div className="col-md-6">
          {/* <div style={{marginTop: 15, display:'flex', flexDirection:'row', alignItems:'center'}}> */}
          {/* <FormInput label="Company" value={this.state.customer} disabled={true} /> */}
          <EditableInput label="Company" value={this.state.customer} />
          {/* </div> */}

          {/* <div style={{marginTop: 15, display:'flex', flexDirection:'row', alignItems:'center'}}> */}

         
          <EditableInput label="Payment Method" value={this.state.paymentMethod} />

          <EditableInput label="Payment Difference" value={this.state.paymentDifference} />

          {/* </div> */}

          {/* <div style={{marginTop: 15, display:'flex', flexDirection:'row', alignItems:'center'}}> */}

    
          {/* </div> */}
        </div>

        <div className="col-md-6">
          {/* <div style={{marginTop: 15, display:'flex', flexDirection:'row', alignItems:'center'}}> */}
          
          <EditableInput label="Paid Amount" value={`$${this.state.paidAmount}`} />

          {/* </div> */}

          {/* <div style={{marginTop: 15, display:'flex', flexDirection:'row', alignItems:'center'}}> */}

          <EditableInput label="Payment Refernece" value={this.state.paymentRef} />

          {/* </div> */}

          {/* <div style={{marginTop: 15, display:'flex', flexDirection:'row', alignItems:'center'}}> */}

          <EditableInput label="Memo" value={this.state.memo} />

    
          {/* </div> */}
        </div>
      </div>
    );
  }
}
