import React, { Component } from "react";
import { connect } from "react-redux";

// Inputs
import InvoiceFields from "Components/Form/Components/Inputs/Accounting/InvoiceFields";
import AddressFormInput from "Components/Form/Components/Inputs/AddressFormInput";
import InvoiceTotalTableInput from "Components/Form/Components/Inputs/Accounting/InvoiceTotalTableInput";
import InvoiceProductInput from "Components/Form/Components/Inputs/Accounting/InvoiceProductInput";
import Button from '@material-ui/core/Button';

// Form Layout
import FormWrapper from "Components/Form/Components/Layout/FormWrapper";
import FormInputLayout from "Components/Form/Components/Layout/FormInputLayout";


// Input Components
import FormInput from "Components/Form/Components/FormInput";
import FormMultiInput from "Components/Form/Components/FormMultiInput";
import AmountInput from "Components/Form/Components/Inputs/AmountInput";
import DatePickerInput from "Components/Form/Components/Pickers/DatePicker";


// Actions
import { 
    clearSingleQuotation, 
    addNewProdQuote, 
    removeProdQuote, 
    handleProdQuote,  
    handleChangeQuote, 
    getAllAccount, 
    getAllUsers, 
    submitNewQuote,

    accountingClearState,
    submitAccountQuotationInvoice,
    HandleQuotationAccounts,
    restartUploadStatus
} from "Actions";

const formFieldsProducts =  {
  description: "",
  quantity: 0,
  price: 0,
  discount: 0,
  tax_id: "",
  tax_rate: 0,
  tax_amount: 0,
  amount: 0
}

const formFields = {
  date: new Date(),
  currency: "",
  currency_rate: "",
  version: "",
  subtotal: 0,
  tax_amount: 0,
  discount_total: 0,
  totalAmt: 0,
  discount: "",
  discount_rate: 0,
  description: "",
  owner: "",
  accountId:"",
  attn_toId:"",
  billing: '',
  shipping:'',
  sent_date: "",
  quoteID: "",
  state: "Draft",
  sentOn: new Date(),
  dueDate: new Date(),
  userId: localStorage.getItem("user_id"),
}



class InvoiceForm extends Component {
  
  constructor(props) {
    super(props);

    if (this.props.edit){
      this.state = {
        formFields: {...this.props.invoiceData},
        formFieldsProducts: [...this.props.invoiceData.quotationLine],
        attn_to_array : []
      };
      this.edit = this.props.edit
    } else {
      this.state = {
        formFields: {...formFields},
        formFieldsProducts: [{...formFieldsProducts}],
        attn_to_array : []
      };
    }

  }

  componentWillUnmount(){
    this.props.accountingClearState()
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
      if(prevProps.uploaded != this.props.uploaded){
        if(this.props.uploaded){
          return true
        }
      }
      return null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {


      if(snapshot){
        this.setState({
          formFields: {...formFields},
          formFieldsProducts: [{...formFieldsProducts}],
          attn_to_array : []
        });
        this.props.restartUploadStatus()
      }
  }

  // quotationForm
  
  componentDidMount() {
    this.props.HandleQuotationAccounts()
  }

  _handleChangeFormField = (e, value) => {

    let StateformFields = {...this.state.formFields}

    switch(e){
        case "accountId":
          
              StateformFields[e] = value
              StateformFields.billing = value.address
              StateformFields.shipping = value.address
           
            return this.setState({formFields: StateformFields, attn_to_array: value.customer})

        case "currency":
              StateformFields.currency_rate = value.rate
            break

        case "discount":
              StateformFields.discount_rate = value.rate
            break

        default :
              StateformFields[e] = value
            break 

    }

    this.setState({formFields: StateformFields})
    this._tabluteTaxDiscountTotal(StateformFields)
  }

  _handleProdQuote =(element, value, key) => {

    let StateformFieldsProducts = [...this.state.formFieldsProducts]
    let formFields = {...this.state.formFields}

    // calculate tax
    switch(element){

        case "tax_id":
            StateformFieldsProducts[key].tax_id = value   
            StateformFieldsProducts[key].tax_rate = value.value
            break

        default:
            StateformFieldsProducts[key][element] = value
          break
    }
 

    const productSingleSubTotal = getSingleProductTotal(StateformFieldsProducts[key])
    StateformFieldsProducts[key].tax_amount = productSingleSubTotal[1]
    StateformFieldsProducts[key].amount = productSingleSubTotal[0]

    this.setState({formFieldsProducts: StateformFieldsProducts})
    this._tabluteTaxDiscountTotal(formFields)
  }

  _addNewProdQuote = () => {
    let StateformFieldsProducts = [...this.state.formFieldsProducts]
    StateformFieldsProducts.push({...formFieldsProducts})
    this.setState({formFieldsProducts: StateformFieldsProducts})
  }

  _removeProdQuote =(key) =>{
    let StateformFieldsProducts = [...this.state.formFieldsProducts]
    StateformFieldsProducts.splice(key, 1)
    this.setState({formFieldsProducts: StateformFieldsProducts})
  }

  _tabluteTaxDiscountTotal(thisFormFields) {

    let StateformFieldsProducts = [...this.state.formFieldsProducts]
 
    const productSubTotal = getSubTotal(StateformFieldsProducts, 'amount')
    thisFormFields.subtotal = productSubTotal

    const productTax = getTax(StateformFieldsProducts)
    thisFormFields.tax_amount = productTax
 
    let totalAmt = productSubTotal + productTax
    const productTotal = getTotal(totalAmt, thisFormFields.discount_rate)
    thisFormFields.totalAmt = productTotal

    this.setState({formFields: thisFormFields})

  }

  _submitFormFieldsDB = () =>{

    var today = new Date();
    var duedate = new Date();
    duedate.setDate(today.getDate()+5);

    // payload: {item: item, products: products}
    const postData = {...this.state.formFields}
    const quotationLine = [...this.state.formFieldsProducts]

    let modifiedPostData = {...postData}
    modifiedPostData.quotationLine = quotationLine
    modifiedPostData.sent_date = postData.date,
    modifiedPostData.due_date = duedate,
    modifiedPostData.companyName = postData.accountId.name,
    modifiedPostData.accountId = {
      name: modifiedPostData.accountId.name,
      value: modifiedPostData.accountId.value
    }

    this.props.handleSubmit(modifiedPostData)

  }

  _restart = () =>{
    console.log('restart')

    let restartFormFieldsProducts = this.state.formFieldsProducts
    restartFormFieldsProducts = [{...formFieldsProducts}]


    let restartFormFields = this.state.formFields
    restartFormFields.subtotal = 0
    restartFormFields.tax_amount = 0
    restartFormFields.discount_total = 0
    restartFormFields.totalAmt = 0
    restartFormFields.discount = ''
    restartFormFields.discount_rate = 0
  
    this.setState({formFieldsProducts: restartFormFieldsProducts, formFields : restartFormFields})

  }


  // checkDisabled() {
  //   const {
  //     name,
  //     userId,
  //     amount,
  //     stageId,
  //     closingDate,
  //     accountId
  //   } = this.state.deal;
  //   const disabled =
  //     name && userId && amount && stageId && closingDate && accountId;
  //   return disabled;
  // }

  render() {

    // const { products, quotation, attn_to_array } = this.props.quotationForm;
    const {currencyTable, taxTable, discountTable, accountsList, owner} = this.props.quotationList

    const {formFields} = this.state;
    
    return (

      <FormWrapper
        onSave={this._submitFormFieldsDB}
        disabled={true}
        // edit={edit}
        title={this.edit? 'Edit Invoice' : 'New Invoice'}
      >
      
        {/* {loading && <RctSectionLoader />} */}

        <form autoComplete="off">
          <FormInputLayout
            title="Key Information"
            desc="The key fields to get you started with quotation"
          >
            <div className="row">
              <div className="col-5 d-block">
                
                {/* <FormMultiInput
                  label="Company"
                  value={formFields.accountId}
                  required={!formFields.accountId}
                  selectValues={accountsList}
                  target="accountId"
                  handleChange={this._handleChangeFormField}
                />

                <FormInput
                  label="Attention to"
                  value={formFields.attn_toId}
                  required={!formFields.attn_toId}
                  selectValues={this.state.attn_to_array}
                  target="attn_toId"
                  handleChange={this._handleChangeFormField}
                /> */}

                {this.edit && 
                  <FormInput
                    label="Company"
                    value={formFields.accountId.name}
                    target="accountId"
                    disabled={true}
                  />
                }

                {!this.edit && 
                  <FormMultiInput
                    label="Company"
                    value={formFields.accountId}
                    required={!formFields.accountId}
                    selectValues={accountsList}
                    target="accountId"
                    handleChange={this._handleChangeFormField}
                  />
                }

                {this.edit && 
                  <FormMultiInput
                    label="Attention to"
                    value={formFields.attn_toId.name}
                    target="attn_toId"
                    disabled={true}
                  />
                }

                {!this.edit && 
                  <FormMultiInput
                    label="Attention to"
                    value={formFields.attn_toId}
                    required={!formFields.attn_toId}
                    selectValues={this.state.attn_to_array}
                    target="attn_toId"
                    handleChange={this._handleChangeFormField}
                  />
                }


              </div>

              <div className="col-5 d-block offset-md-1">
              
                <DatePickerInput
                  label="Date"
                  value={''}
                />

                <FormInput
                  label="Owner"
                  value={formFields.owner}
                  required={!formFields.owner}
                  selectValues={owner}
                  target="owner"
                  handleChange={this._handleChangeFormField}
                />

              </div>
            </div>
          </FormInputLayout>

          <FormInputLayout
            title="Key Information"
            desc="Billing address with additional notes if required"
          >
              <div className="row">
                <div className="col-5 d-block">
                  <FormInput
                    multiline
                    rows={4}
                    label="Billing Address"
                    value={formFields.billing}
                    target="billing"
                    handleChange={this._handleChangeFormField}
                  />
                </div>

                <div className="col-5 d-block offset-md-1">
                  <FormInput
                    multiline
                    rows={4}
                    label="Shipping Address"
                    value={formFields.shipping}
                    target="shipping"
                    handleChange={this._handleChangeFormField}
                  />
                </div>  
            </div>


            <div className="row">
                <div className="col-11">
                  <FormInput
                    multiline
                    rows={4}
                    label="Additional notes"
                    value={formFields.description}
                    target="description"
                    handleChange={this._handleChangeFormField}
                  />
                </div>
            </div>


          </FormInputLayout>
      
      
          <FormInputLayout
            title="Invoice List"
            desc="Please state down the description, unit, price and tax option clearly"
          >
       
          </FormInputLayout>

          <div className="row border-top py-30 px-30 justify-content-md-center">
              <div className="col-11">
                <InvoiceProductInput
                  products={this.state.formFieldsProducts}
                  taxTable={taxTable}
                  handleChange={this._handleProdQuote}
                  handleAdd={this._addNewProdQuote}
                  handleRemove={this._removeProdQuote}
                  restart={this._restart}
                />
              </div>
          </div>
         
          <FormInputLayout
            title="Executive Summary"
            desc="All items have been calculated with taxes. Ensure all information are keyed correct, especially taxation."
          >
            <div className="row" style={{display:'flex', justifyContent:"flex-end"}}>
                <div className="col-6">
                  <InvoiceTotalTableInput invoice={this.state.formFields} />
                </div>
            </div>
          </FormInputLayout>


        </form>

      </FormWrapper>

    );
  }
}

const mapStateToProps = ({ accountingState, crmState, usersState }) => {
  const { quotationState, invoiceState} = accountingState;
  const { quotationList } = quotationState;
  const { uploaded } = invoiceState.invoiceList
  const { users } = usersState;

  return { users, quotationList, uploaded};
};

export default connect(
  mapStateToProps,
  { 
    addNewProdQuote, 
    clearSingleQuotation, 
    removeProdQuote, 
    handleProdQuote, 
    handleChangeQuote, 
    getAllAccount, 
    getAllUsers, 
    submitNewQuote,

    accountingClearState,
    submitAccountQuotationInvoice,
    HandleQuotationAccounts,
    restartUploadStatus
  }
)(InvoiceForm);




function getSubTotal(array, key) {
    return array.reduce((a, b) => a + (b[key] || 0), 0);
}

function getSingleProductTotal(product) {
    var subtotal = product.price * product.quantity;
    let total
    let tax

    if(product.tax_rate != "0"){
        tax = product.tax_rate/100 * subtotal
    } else {
        tax = 0
    }

    total = subtotal - product.discount;

    if(total < 0) {
        total = 0
    }

    return [total, tax];
}

function getTotal(subTotal, discount) {

    var total = (subTotal) * (1-(discount/100));

    return total;

}

function getTax (product) {
    // let subTotal = 0
    let totalTax = 0
    // let total = 0
    if (product.length > 0) {
        product.forEach(element =>{
        totalTax = totalTax + element.tax_amount
    })
        return totalTax
    }
}




/*

  {/* <InvoiceFields 
          handleChange  = {this._handleChangeFormField}
          edit={this.props.edit}
          tableData={tableData}
          currencyTable={currencyTable}
          discountTable={discountTable}
          quotation={this.state.formFields}
          attn_to_array={this.state.attn_to_array}
          users={users}
        />

        <div style={{marginTop: 20, marginBottom: 20}}>
          <InvoiceProductInput
            products={this.state.formFieldsProducts}
            taxTable={taxTable}
            handleChange={this._handleProdQuote}
            handleAdd={this._addNewProdQuote}
            handleRemove={this._removeProdQuote}
          />

          <div className="row">
            <div className="col-md-6"/>
            <div className="col-md-6">
              <InvoiceTotalTableInput invoice={this.state.formFields} />
            </div>
          </div>

        </div> 
        
        {/* <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop: 20}}> */
            /* <Button variant="contained" color="secondary" className="mr-10" style={{color:'white'}}>
              Save Draft
            </Button> */

            /* <Button onClick={() => {
                this.props.submitNewQuote(quotation, products, '', this.props.type)
              }} variant="contained" color="primary"  className="mr-10">
              Save
            </Button> 

             <Button onClick={this._submitFormFieldsDB} variant="contained" color="primary"  className="mr-10">
              Save
            </Button>
            
         </div> 
     
     
  */
    