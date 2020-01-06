import React, { Component } from 'react'
import InputsForm from "../inputs-form/inputs-form"
import Header from "../Header/Header"

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <InputsForm/>
            </div>        );
    }
}


export default App;
