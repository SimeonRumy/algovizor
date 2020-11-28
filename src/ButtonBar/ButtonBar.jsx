import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap'


export default class ButtonBar extends Component {

    constructor() {
        super();
        this.state = {
            costNumber: 0,
            buttonText: ""
        };
    }

    render() {
        const {
            onSetStartButtonClick,
            onSetFinishButtonClick,
            onSetWAllsButtonClick,
            onSetCostlyNodes,
        } = this.props;

        return (
            <div>
                <Navbar bg="ligth" variant="ligth">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Button className="ml-3 mr-3" variant="secondary btn-md" onClick={() => onSetStartButtonClick()}>Set Start</Button>
                            <Button className="ml-3 mr-3" variant="secondary btn-md" onClick={() => onSetFinishButtonClick()}>Set Finish</Button>

                            {/* <ButtonGroup>
                                <Button variant="secondary btn-md">{this.state.costNumber}</Button>

                                <DropdownButton as={ButtonGroup} title="Add Costly Nodes" id="bg-nested-dropdown" variant="secondary btn-md">
                                    <Dropdown.Item onClick={() => this.setState({ costNumber: 1 })}>Cost 1</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.setState({ costNumber: 2 })}>Cost 3</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.setState({ costNumber: 3 })}>Cost 2</Dropdown.Item>
                                </DropdownButton>

                            </ButtonGroup> */}
                            <Button className="ml-3 mr-3" variant="secondary btn-md" onClick={() => onSetCostlyNodes()}>Add Costly Nodes</Button>

                            <Button className="ml-3 mr-0" variant="secondary btn-md" onClick={() => onSetWAllsButtonClick()}>Add Walls</Button>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>
            </div >
        );
    }
}