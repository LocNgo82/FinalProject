import React from "react";
import {Movie} from './Movie';
import {movieApi} from '../rest/MoviesApi'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
// import { CardGroup } from "react-bootstrap";

// This application maintains a movie list using movie api to store the movie information.
export class MovieList extends React.Component {
    // keep tract of the state for all the movies
    state = {
        movies: [],  // state of the movie list
        movie_name: "",  // state of the movie name
        movie_synopsis: ""  // state of the synopsis
    };

// when the server connect, fetch the movie list
componentDidMount() {
    this.fetchMovie();
}

//this function fetch the movie list using the movie api.
fetchMovie = async () => {
    const movies = await movieApi.get();
    this.setState({movies});
}

//this function update a movie using the movie api
updateMovie = async (updateMovie) => {
    await movieApi.put(updateMovie);
    this.fetchMovie();
}

//this function create a new movie title and its synopsis
createMovie = async (name,synopsis) => {
    await movieApi.post(name,synopsis);
    // display the new movie on the web page
    this.fetchMovie();
    // reset the movie input boxes to blank
    this.state.movie_name = "";
    this.state.synopsis = "";
}
//this function delete a movie
deleteMovie = async (movieId) => {
    await movieApi.delete(movieId);
    this.fetchMovie();
}
//render the webpage with a movie input and the movie list
render() {
    // add input boxes to allow use to add a new movie, synopsis, and a create movie button.
    // list all the movies after the input boxes
    return (       
        // create a new movie form
        <div className="movie-list">            
            <Form.Group className="mb-3" controlId="formMovieList">
            <Form.Label className="bg-primary"><h2>Add New Movie</h2></Form.Label>
            {
                // input box for entering a new movie name
            }
            <Form.Control
                className="bg-white"                
                placeholder="movie name"
                value={this.state.movie_name}
                onChange={e => this.setState({ movie_name: e.target.value })}
                type="text"
            />
            {
                // input box for entering a synopsis for the movie
            }
            <Form.Control
                className="synopsis"                
                placeholder="synopsis"
                value={this.state.synopsis}
                onChange={e => this.setState({ synopsis: e.target.value })}
                type="text"
            />            
            {
                // button to create a new movie
            }
            <Button id="create-new-movie" className="btn btn-primary form-control" 
            onClick={() => this.createMovie(this.state.movie_name, this.state.synopsis)            
            }>Create</Button>   
            </Form.Group>
            <Card bg='success'>
                {
                    // list all the existing movies from online database
                }
            {this.state.movies.map((movie) => (
                // call the movie class and pass in the movie id,
                // update movie function, and delete movie function
                <Movie
                    movie={movie} 
                    key={movie.id}
                    updateMovie={this.updateMovie}
                    deleteMovie={this.deleteMovie}
                    />
            ))}
            </Card>
        
        </div>
    )
}
} // MovieList

