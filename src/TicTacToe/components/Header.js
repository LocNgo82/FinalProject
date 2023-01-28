import React from 'react';
import {Container, Row} from 'react-bootstrap';

// Based on https://github.com/christinec-dev/Tic-Tac-React.
// I did the following changes to the original application.
// Change 1: replace the background with my Grand Canyon picture.
// Change 2: add to my project using React-router-dom.
// Change 3: when click on the reset game button, remove the history listing immediately
// Change 4: and reset the game board to blank immediately.
// Change 5: move the css file to the root directory.

// The header of the tic-tac-toe game.
function Header() {
    return (
        <Container>
            <Row>
                <div className="Header">
                    <h4 className="pre-title">WELCOME TO</h4>
                    <h1 className="game-title">Tic Tac React!</h1>
                </div>
            </Row>
            <Row> </Row>
        </Container>
    );
  }
  
//Exports Header Component to be used in app.js
export default Header;