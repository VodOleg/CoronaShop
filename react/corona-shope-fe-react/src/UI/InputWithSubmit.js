import React, { Component } from 'react'
import {InputGroup, Button, FormControl} from 'react-bootstrap';
import './ButtonSelection.css';

export default class InputWithSubmit extends Component {
    
    constructor(props){
        super(props);
        this.textInput = React.createRef();
    }

    handleApply(e){
        let data = {
            key: this.props.title,
            value: this.textInput.current.value
        };
        this.props.applyCB(data);
    }

    render() {
        return (
            <InputGroup size="sm" className="mb-3 btn-group-sm inBox">
                <InputGroup.Prepend>
                    <InputGroup.Text className="logName">{this.props.title}</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                placeholder={this.props.placeholder}
                aria-label={this.props.title}
                aria-describedby="basic-addon2"
                ref={this.textInput}
                type={this.props.type}
                />
                <InputGroup.Append>
                <Button variant="outline-secondary" onClick={(e)=>{this.handleApply(e)}}>Apply</Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}
