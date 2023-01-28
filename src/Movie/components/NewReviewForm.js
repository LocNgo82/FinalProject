import React, {useState} from "react";
import { Card } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// create a review form with comment and rating from the moviegoers
export const NewReviewForm = (props) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');
    // when user press the submit buttn, add the review and rating to the movie
    const onSubmit = (e) => {
        e.preventDefault();
        if (comment) {
            // add a review to the movie
            props.addNewReview({comment,rating});
            // reset the comment and rating to blank
            setComment('');
            setRating('');
        } else {
            console.log('Invalid input');
        }
    };
        
    // create a html component for user to enter comment and rating for a movie.
    return (        
        <div>   
            {
                // call onSubmit function to submit a review
            }            
            <Form onSubmit={onSubmit}>
            <Form.Label><h4>Add a new review</h4></Form.Label>
            {
                // enter comment input
            }
            <Form.Control
                type='textarea'
                placeholder="review"
                onChange={(e) => setComment(e.target.value)}
                value={comment} 
            />
            {
                // enter a rating input
            }
            <Form.Control
                type='text'
                placeholder="rating 1-10"                
                onChange={(e) => {
                    try {  // only allow rating from 1 to 10
                        const int = parseInt(e.target.value);
                        if (int > 0 && int <= 10) {                            
                            setRating(int)                                                         
                        }
                    }
                    catch (ex) {
                        // if user enter a rating outside of the range,
                        // don't allow and display the error.
                        console.log('Error input rating' + e.target.value);
                    } 
                    
                }}                                    
                value={rating}
            />
            {
                // submit the review button
            }
            <Button type='submit'>Add Review</Button>
            </Form>
            
        </div>
    )
};