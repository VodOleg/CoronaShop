import React, { Component } from 'react'
import {Modal} from 'react-bootstrap';

export default class SimpleMessageModal extends Component {

    constructor(props){
        super(props);
        this.onCloseCB=props.onClose;
        this.state = {
            show: true,
        }       

    }

    handleClose(){
        this.setState({show:false});
        this.onCloseCB("modal closed");
    }

    handleShow(){
        this.setState({show:true});
    }

    render() {
        return (
            <div>
                <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
                    <Modal.Header>
                    <Modal.Title>{this.props.message}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.children}
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
