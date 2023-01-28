import React from "react";
import {Customer} from './Customer';
import {customersApi} from '../rest/CustomersApi'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { CardGroup } from "react-bootstrap";

// maintain a customer list using customer api
export class CustomerList extends React.Component {
    // keep tract of the state for all the customers
    state = {
        customers: [],
        name: ""
    };

// when the server connect, fetch the customer list
componentDidMount() {
    this.fetchCustomer();
}

//this function fetch the customer list using the customer api.
fetchCustomer = async () => {
    const customers = await customersApi.get();
    this.setState({customers});
}

//this function update a customer using the customer api
updateCustomer = async (updateCustomer) => {
    await customersApi.put(updateCustomer);
    this.fetchCustomer();
}

//this function create a new customer using the customer api
createCustomer = async (name) => {
    await customersApi.post(name);
    this.fetchCustomer();
    document.getElementById("new-customer-name").value = "";
    
}
//this function delete a customer using the customer api
deleteCustomer = async (customerId) => {
    await customersApi.delete(customerId);
    this.fetchCustomer();
}
//render the webpage with a customer input and the customer list
render() {
    // add input boxes to allow use to add a new customer, synopsis, and a create customer button.
    // list all the customers after the input boxes
    return (       
        // add input boxes to allow use to add a new customer.
        // list all the customers after the input boxes
        <div className="customer-list">
            <Form.Group className="mb-3" controlId="formCustomerList">
            <Form.Label className="bg-primary"><h2>Add New Customer</h2></Form.Label>
            {
                // input box for entering a new customer name
            }
            <Form.Control
                className="bg-white"                
                placeholder="customer name"
                value={this.state.name}
                onChange={e => this.setState({name: e.target.value })}
                type="text"
            />
            {
                // button to create a new customer using state life cycle
            }
            <Button id="create-new-customer" className="btn btn-primary form-control" 
            onClick={() => this.createCustomer(this.state.name)            
            }>Create</Button>   
            </Form.Group>
            <Card bg='success'>
                {
                    // list all the existing movies from online database
                }
            {this.state.customers.map((customer) => (
                // call the customer class and pass in the customer, customer id, 
                // update customer function, and delete customer function
                <Customer
                    customer={customer} 
                    key={customer.id}
                    updateCustomer={this.updateCustomer}
                    deleteCustomer={this.deleteCustomer}
                    />
            ))}
            </Card>            
        </div>
    )
}
} // CustomerList

