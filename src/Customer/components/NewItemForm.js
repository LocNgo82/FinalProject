import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

// create a item form with name and cost from the moviegoers
export const NewItemForm = (props) => {
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [quantity, setQuantity] = useState('');
    // when user press the submit buttn, add the item and cost to the movie
    const onSubmit = (e) => {
        e.preventDefault();
        if (name) {
            props.addNewItem({name,cost, quantity});
            setName('');
            setCost('');
            setQuantity('');
        } else {
            console.log('Invalid input');
        }
    };
        
    // create a html component for user to enter name and cost for a movie.
    return (
        
        <div>
            
            <Form onSubmit={onSubmit}>
            
            <Row>                
            <Form.Label><h4>Add a new item</h4></Form.Label>

            <Col>
            <Form.Control
                type='textarea'
                placeholder="item"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            </Col>
            <Col>
            <Form.Control
                type='text'
                placeholder="cost"                
                onChange={(e) => {
                    try {
                        const int = parseInt(e.target.value);
                        if (int >= 0) {                            
                            setCost(int)                                                         
                        }
                    }
                    catch (ex) {
                        console.log('Error input cost.' + e.target.value);
                    } 
                    
                }}                                    
                value={cost}
            />
            </Col>
            <Col>
            <Form.Control
               type='text'
               placeholder="quantity"                
               onChange={(e) => {
                   try {
                       const int = parseInt(e.target.value);
                       if (int >= 0) {                            
                           setQuantity(int)                                                         
                       }
                   }
                   catch (ex) {
                       console.log('Error input quantity.' + e.target.value);
                   } 
                   
               }}                                    
               value={cost}
            />
            </Col>
            </Row>
            
            <Button type='submit'>Add Item</Button>
            </Form>
        </div>
    )
};