const MOVIES_ENDPOINT = "https://63540cf4ccce2f8c020237cf.mockapi.io/Promineo_Tech_API/moviesApi"
// REST API to get, put, post, and delete records using mockAPI website
class MovieApi {
    // retrieve movie information from the server
    get = async () => {
        try {
            // connect to the server
            const resp = await fetch(MOVIES_ENDPOINT);
            // wait to retrieve data from the movie database
            const data = await resp.json();
            return data;
        } catch (e) {
            // write error if the connection failed
            console.log("Oops, looks like fetchMovies had an issue.", e);
        }

    }
    // update movie information from the server
    put = async(movie) => {
        try {
            // save movie information using the movie id
            const resp = await fetch(`${MOVIES_ENDPOINT}/${movie.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            });
            return await resp.json();
        } catch(e) {
            // if the movie data can't save to the server, display an error message
            console.log("Oops, looks like updating movies had an issue.", e);
        }
    }

    // // add a new movie to the server
    post = async(movieName,synopsis) => {
        try {
            // connect to the server and save add a new movie to the server
            // with movie name and its synopsis
            const resp = await fetch(`${MOVIES_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: `${movieName}`,
                synopsis: `${synopsis}`})
            });
            return await resp.json();
        } catch(e) {
            // if the new movie data can't save to the server, display an error message
            console.log("Oops, looks like adding movie had an issue.", e);
        }
    }

    // delete a movie information from the server
    delete = async(movieId) => {
        try {
            // connect to the server and delete the movie via the movie id
            const resp = await fetch(`${MOVIES_ENDPOINT}/${movieId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }                
            });
            return await resp.json();
        } catch(e) {
            // if it can't delete the movie, display an error message
            console.log("Oops, looks like delete movie had an issue.", e);
        }
    }
}

export const movieApi = new MovieApi();