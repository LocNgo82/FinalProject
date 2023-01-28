import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {NewReviewForm} from './NewReviewForm';
import { CardGroup } from "react-bootstrap";
// create a movie component that allow moviegoers to create a new movie and its synopsis.
export const Movie = (props) => {
    // retrieve movie, update function, and delete function from the props
    const {movie, updateMovie, deleteMovie} = props;  

    // delete a review based on the array index    
    const deleteReview = (reviewId) => {
        // delete a movie based on its index
        movie.reviews.splice(reviewId,1);
        // update the review list
        const updatedMovie = {
            ...movie,
            reviews: movie.reviews
        };
        // update the movie on MockApi    
        updateMovie(updatedMovie);
    }
 
    // add a review to the movie and update movie on MockApi
    const addNewReview = (review) => updateMovie({...movie, reviews: [...movie.reviews, review]});

    // set review background color
    const bg_color = (color) => (
        color <= 5 ? 'warning' : 'info'
    );
    // display the review and rating after the user enter the review
    // also allow user to delete the review and rating
    const reviews = () => (
        // Enclosed all the reviews inside a card component.
        <div>
            {// use map to assign an index to each review.
            }
            {movie.reviews.map((review, index) => (
                <div>
                {/* use card text to display the rating.
                    rating is range from 1 to 10
                    if rating <= 5, use danger color,
                    else use success color.
                    */
                }
                <Card key={index}>
                    <Card.Body>
                    {// if review rating <= 5, then set the background color to warn, 
                    // set background color to info
                    }
                    <Card bg={bg_color(review.rating)}>
                    {`Review: ${review.comment}`}
                    </Card>
                    
                    <Card bg={bg_color(review.rating)}>                        
                    {`Rating: ${review.rating} out of 10`}
                    </Card>
                    {// create a delete button for each review.
                    }     
                    </Card.Body>                                                    
                </Card>     
                <Button onClick={(e) => deleteReview(index)}>Delete Review</Button>
                </div>   
            )                      
            )}
        </div>
    );
    // create a new movie and its synopsis
    // also allow user to delete the movie from the list
    // use react-bootstrap form.label and button
    return (
        <div>            
            {// display movie name
            }
            <Card className="bg-secondary">
            <Form.Label><h1>{`Movie: ${movie.name}`}</h1></Form.Label>
            <div>                
            {// display the synopsis of the movie
            }
            <Form.Label>
            <h4>
                {`Synopsis: ${movie.synopsis}`}
            </h4>                        
            </Form.Label>
            </div>
            {// button to delete a movie
            }
            </Card>
            <Button onClick={(e) => deleteMovie(movie.id)}>Delete Movie</Button>
            {// add a new movie form
            }
            <NewReviewForm addNewReview={addNewReview} /> 
            {// display the word movie if review is greater than 1
            }
            
            {movie.reviews.length > 0 && (movie.reviews.length > 1 ? <Form.Label><h4>Reviews:</h4></Form.Label> : 
            <Form.Label><h4>Review:</h4></Form.Label>)}
            <Card>
            {
                // display all the reviews after the review form                
                reviews()
            }                       
            </Card>
            
        </div>
    )          
    
};