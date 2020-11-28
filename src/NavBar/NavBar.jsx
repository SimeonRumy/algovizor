import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import './NavBar.css';


export default class NavBar extends Component {

    constructor() {
        super();
        this.state = {
            algoNumber: 0,
            buttonText: ""
        };
        this.handleAlgoChange = this.handleAlgoChange.bind(this);
        this.runAlgo = this.runAlgo.bind(this);
    }


    handleAlgoChange(text, number) {
        this.setState({ algoNumber: number, buttonText: text })
    }

    runAlgo(dijkstra, astar, bfs) {
        if (this.state.algoNumber === 0) {
            return dijkstra();
        } else if (this.state.algoNumber === 1) {
            return astar();
        } else {
            return bfs();
        }
    }

    render() {
        const {
            onDijkstra,
            onAstar,
            onBFS,
            onReset,
        } = this.props;

        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Algo Vizor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">About</Nav.Link>
                            <NavDropdown title="Algorithms" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.2" onClick={() => this.handleAlgoChange("Dijkstras", 0)}>Dijkstras</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2" onClick={() => this.handleAlgoChange("A-Star", 1)}>A-Star</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3" onClick={() => this.handleAlgoChange("BFS", 2)}>BFS</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form inline>
                            <Button className="ml-2" variant="outline-success btn-lg" onClick={() => this.runAlgo(onDijkstra, onAstar, onBFS)}>Run {this.state.buttonText} Algorithm</Button>
                            <Button className="ml-2" variant="outline-danger btn-lg" onClick={() => onReset()}>Reset</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}


