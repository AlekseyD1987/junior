import React from 'react'
import './AddForm.css'

type FormData = {
  onAdd(data: any, viewModal: boolean): void,
  modalHandler(): void  
}
interface InputData {
  currentTarget: HTMLInputElement | HTMLTextAreaElement;
}
class AddForm extends React.Component<FormData> {

  state = {
    row: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      streetAddress: '',
      city: '',
      state: '',
      zip: '',
      description: ''
    },
    isFormValid: false
  }
  validate = (obj: object) => {
    let validate = true
    Object.values(obj).forEach(value => {       
      if (!value) {
        validate = false
      }  
    })
    return validate
  }

  onEditInput = (e:InputData) => {	
    const {value} = e.currentTarget 
    this.setState({row: {...this.state.row, [e.currentTarget.name]: value}}, () => {
      this.setState({isFormValid: this.validate(this.state.row)}) 
    });
    
  }
  modalClose = () => {
    this.props.modalHandler()
  }

  onAddHandler = () => {	
    document.querySelector('[id=form]')!.innerHTML = '<b>Successfull</b>'
    setTimeout(() => {    
      this.props.onAdd(
      {
        id: this.state.row.id,
        firstName: this.state.row.firstName,
        lastName: this.state.row.lastName,
        email: this.state.row.email,
        phone: this.state.row.phone,
        address: {
          streetAddress: this.state.row.streetAddress,
          city: this.state.row.city,
          state: this.state.row.state,
          zip: this.state.row.zip
        },
        description: this.state.row.description
      }     
      ,false);
    }, 2000) 
  }
  render() {
    return (
      <div className="FormBg">
        <div className="AddForm">
          <div className="Close" onClick={this.modalClose}>
            ×
          </div>
          <div className="TitleForm">
            Add new entry
          </div>
          <div id="form" className="Data"> 
            <div className="Field form-group">
              <input type="number" className="form-control" name="id" placeholder="ID" value={this.state.row.id} onChange={this.onEditInput} />
            </div>   
            <div className="Field form-group">
              <input type="text" className="form-control" name="firstName" placeholder="First Name" value={this.state.row.firstName} onChange={this.onEditInput}/>
            </div>  
            <div className="Field form-group">
              <input type="text" className="form-control" name="lastName" placeholder="Last Name" value={this.state.row.lastName} onChange={this.onEditInput}/>
            </div> 
            <div className="Field form-group">
              <input type="email" className="form-control" name="email" placeholder="E-mail" value={this.state.row.email} onChange={this.onEditInput}/>
            </div>  
            <div className="Field form-group">
              <input className="form-control"  name="phone" placeholder="Phone" value={this.state.row.phone} onChange={this.onEditInput}/>     
            </div> 
            <div className="Field form-group">
              <textarea className="form-control" name="description"  placeholder="Desctiption" value={this.state.row.description} onChange={this.onEditInput}></textarea>
            </div>
            <div className="SubTitle">Address</div>
            <div className="Field form-group">
              <input type="text" className="form-control" name="streetAddress" placeholder="Street Address" value={this.state.row.streetAddress} onChange={this.onEditInput}/>
            </div>
            <div className="Field form-group">
              <input type="text" className="form-control" name="city" placeholder="City" value={this.state.row.city} onChange={this.onEditInput}/>
            </div>
            <div className="Field form-group">
              <input type="text" className="form-control" name="state"  placeholder="State" value={this.state.row.state} onChange={this.onEditInput}/>
            </div>
            <div className="Field form-group">
              <input type="number" className="form-control" name="zip"  placeholder="ZIP" value={this.state.row.zip} onChange={this.onEditInput}/>
            </div>            
            <button className="Field btn btn-primary mb-2" onClick={this.onAddHandler} disabled={!this.state.isFormValid}>Добавить</button>        
          </div>
        </div>
      </div>

    )
  }
}
export default AddForm
