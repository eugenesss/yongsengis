import React from "react";
import { connect } from "react-redux";
import BgCard from "Components/BgCard";
import Comments from "Components/Widgets/Comments";

import { isSameDay, getTheDate, getTheTime } from "Helpers/helpers";
import EditableInput from "Components/Everyday/Profile/Details/EditableInput";
import ShowInput from "Components/Everyday/Profile/Details/ShowInput";

import { addNoteCustomer } from "Ducks/accounting/invoice";

import InvoiceProductInput from "Components/Form/Inputs/Accounting/InvoiceProductInput";
import ViewInvoiceReconcile from "../../components/tables/ViewInvoiceReconcile";

function QuotationOverviewTab(props) {

  const { quotation, payment, reconciledAmount} = props;
  
  return (
    <React.Fragment>
      <div className="row">
        <div className="col">
          
            <BgCard contentCustomClasses={"d-flex flex-column"}>

                <div className="d-flex flex-row justify-content-start">
                    <div className="col-9">                    
                        <ShowInput
                            label="Billing Address"
                            value={quotation.billing}
                        />

                        <ShowInput
                            label="Shipping Address"
                            value={quotation.shipping}
                        />

                        <ShowInput
                            label="Description"
                            value={quotation.description}
                        />

                    </div>

                    <div className="col-3  flex-column">
                        
                        <div className="d-flex  justify-content-end">
                            <EditableInput 
                                style={{color:'#464d69'}}
                                label="Date of Issue"
                                input=""
                                value={getTheDate(quotation.createdAt)}
                            />
                        </div>
                        
                        <div className="d-flex  justify-content-end">
                            <EditableInput 
                                style={{color:'#464d69'}}
                                label="Due Date"
                                value={getTheDate(quotation.dueDate)}
                            />
                        </div>

                        {quotation.state == "Confirmed" && 
                            <div className="d-flex  justify-content-end">
                                <EditableInput 
                                    style={{color:'#464d69'}}
                                    label="Amount Left"
                                    value={`$${reconciledAmount}`}
                                />
                            </div>
                        }

                    </div>
                </div>


                <div className="d-flex flex-row" style={{marginTop: 50}}>
                    <div className="col-12">
                        <InvoiceProductInput
                            products={quotation.quotationLine}
                            quotation={quotation}
                            edit={false}
                            // taxTable={taxTable}
                        />
                    </div>
                </div>


                {payment && 
                    <div>
                        {payment.length > 0 && 
                            <div className="d-flex flex-row">
                                <div className="col-12">
                                    <ViewInvoiceReconcile
                                        title={"Payment Records"}
                                        tableData={payment}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                }
                
                <div className="d-flex flex-row" style={{marginTop: 50}}>
                    <div className="col-12">
                        <ShowInput
                            label='Terms & Conditions'
                            value={quotation.terms}
                        />
                    </div>
                </div>
                
            
            </BgCard>

        </div>
      </div>
    </React.Fragment>
  );
}

export default connect(
    null,
    { addNoteCustomer }
)(QuotationOverviewTab);
  
  