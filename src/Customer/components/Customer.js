import React from "react";
import {NewItemForm} from './NewItemForm';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {Label} from 'react-bootstrap';
import { CardGroup } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// create a customer component that allow customer to add items into the invoice.
export const Customer = (props) => {
    const {customer, updateCustomer, deleteCustomer} = props;  // retrieve customer, update function, and delete function from the properties

    // delete a item based on the array index
    // update the customer on MockApi    
    const deleteItem = (itemId) => {
        // delete an item based on its index
        customer.items.splice(itemId,1);
        // update the item list for the customer
        const updatedCustomer = {
            ...customer,
            items: customer.items
        };
        // update customer record on MockApi 
        updateCustomer(updatedCustomer);
    }
 
    // add a item to the customer and update customer on MockApi
    const addNewItem = (item) => updateCustomer({...customer, items: [...customer.items, item]});

    const itemTitle = () => {
        if (customer.items.length>0) {
            return (
                <b>
                <Row>
                    <Col>Item#</Col>
                    <Col>Name</Col>
                    <Col>Cost</Col>                
                    <Col>Quantity</Col>                
                    <Col>Subtotal</Col>
                    <Col ></Col>
                </Row>
                </b>
            )
        }
        return (<div></div>)
    }
    // calculate total of all items for a customer
    // display the total cost at the end of a customer record
    const sumItems = () => {
        if (customer.items.length>0) {
            return (
                <div>
                    <Card  bg='info'>
                    <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>                
                    <Col>Total:</Col>                
                    <Col>${customer.items.reduce((total, item) => total + item.cost * item.quantity,0)}</Col>
                    <Col></Col>
                    </Row>
                    </Card>
                </div>
                    
            )
        }
        return (<div></div>);
    }
    // display the item index, name, cost, quantity, and subtotal of each item
    // also allow user to delete the item
    const items = () => (                 
        <div>
            {// use map to assign an index to each item.
            }
            {customer.items.map((item, index) => (
                <div key={index}>
                {/* use card text to display the rating.
                    rating is range from 1 to 10
                    if rating <= 5, use danger color,
                    else use success color.
                    */
                }
                <Card>       
                    <Row>
                    <Col>{index}</Col>
                    <Col>{item.name}</Col>
                    <Col>${item.cost}</Col>                
                    <Col>{item.quantity}</Col>                
                    <Col>${item.quantity*item.cost}</Col>
                                 
                    {
                        // add the delete button for each item
                    }        

                    <Col><Button onClick={(e) => deleteItem(index)}>Delete</Button></Col>
                    
                    </Row>
                </Card>
                </div>
            ))             
            }
        </div>
        
    );
    
    // display all the customers and their invoices
    // also allow user to delete the customer from the list
    return (
        
        
        <div>            
            {
                // display customer's name
                
            }
            <h1>{customer.name} </h1>                        
            <Button onClick={(e) => deleteCustomer(customer.id)}>Delete</Button>       
            <NewItemForm addNewItem={addNewItem} />               
            {
                // this function display the title for the invoice
                // if there is no item, do not display the title
                itemTitle()
            }
            {   
                // list all the items from the customer            
                items()                
            }   
            {
                // calculate the total cost for the invoice
                sumItems()
            }
        
        </div>
    )    
    
};