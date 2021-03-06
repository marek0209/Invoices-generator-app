import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import './inputs-form.css';

class InputsForm extends Component {
  state = {
    name: '',
    invoiceID: 0,
    price1: 0,
    price2: 0,
  }

  handleChange = ({ target: { value, name }}) => this.setState({ [name]: value })

  createAndDownloadPdf = () => {
    axios.post('/create-pdf', this.state)
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'newPdf.pdf');
      })
  }

  render() {
    return (
      <div className="Inputs">
        <input type="text" placeholder="NIP" name="nip" onChange={this.handleChange}/>
        <input type="number" placeholder="InvoiceID" name="invoiceID" onChange={this.handleChange} />
        <input type="text" placeholder="Item name" name="itemName" onChange={this.handleChange}/>
        <input type="number" placeholder="Price 1" name="price1" onChange={this.handleChange} />
        <input type="number" placeholder="Price 2" name="price2" onChange={this.handleChange} />
        <button onClick={this.createAndDownloadPdf}>Download PDF</button>
      </div>
    );
  }
}

export default InputsForm;
