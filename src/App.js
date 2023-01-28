import React, {Component} from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
// import TicTacToe from "./TicTacToe/components/TicTacToe"
import {CustomerList } from './Customer/components/CustomerList';
import {MovieList } from './Movie/components/MovieList';
import Header from './TicTacToe/components/Header';
import Game from './TicTacToe/components/Game';
import {Home} from './Home';
import "./App.css";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    
} from 'react-router-dom';

// This application uses react router dom to build multiple web pages application.
// There are three applications in this component.
// 1. Movie list.
// 2. Customer invoice.
// 3. Tic-Tac-Toe game.
class App extends Component {    
    render() {
        return (
            <Container>
            {/*
            This container checks the current URL and displays the component associated 
            with that exact path. All routes are placed within the switch components.
            */}
            <Router>
                <div>
                    {/* create links to different routes */}
                    <ButtonGroup>           
                        <Button variant="outline-secondary">
                            <Link to="/">Home</Link>
                        </Button>             
                        <Button variant="outline-secondary">
                            <Link to="/Movie">Movie List</Link>
                        </Button>
                        <Button variant="outline-secondary">
                            <Link to="/Customer">Customer</Link>
                        </Button>
                        <Button variant="outline-secondary">
                            <Link to="/TicTacToe">Game</Link>
                        </Button>
                        
                    </ButtonGroup>
                   {/* render the appliation that matches the path below */}
                    <Switch>      
                              
                        <Route path="/Movie">
                            <MovieList />
                        </Route>
                        <Route path="/Customer">
                            <CustomerList />
                        </Route>
                        <Route path="/TicTacToe">
                            <Header />
                            <Game />
                        </Route>

                        <Route path="/">
                            <Home />
                        </Route>   
                    </Switch>
                </div>
            </Router>
        </Container>
        )
    }
}


export default App;