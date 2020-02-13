import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    ModalFooter,
    Button,
} from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import { addBooks } from '../services/api-services'
import Aleart from '../services/Aleart';


class BooksAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: '',
                address: '',
                telephoneNumber: '',
                nic: '',
                bid: props.data.bid + 1
            },
            alert: {
                type: '',
                message: ''
            }
        }
        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
        });
    }

    handleFormValueChange = (e) => {
        let data = { ...this.state.data };
        data[e.target.name] = e.target.value;
        this.setState({
            data,
            toast: {
                type: '',
                message: ''
            }
        });
    }

    handleClose = () => {
        this.props.onClose();
    }

    handleToggle = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }));
    }

    handleSubmit = () => {
        if (this.validator.allValid()) {
            addBooks(this.state.data).then((results) => {
                this.setState({
                    alert: {
                        type: 'success',
                        message: 'Book Added successfully'
                    }
                });
                this.handleClose();
            }).catch((error) => {
                this.setState({
                    alert: {
                        type: 'warning',
                        message: 'Request is failed'
                    }
                })
            })
        } else {
            this.validator.showMessages();
        }
    }

    render() {
        const { showModal, } = this.props;
        const { data, alert } = this.state;

        return (
            <Modal size="lg" isOpen={showModal}>
                <Aleart
                    isOpen={alert.message ? true : false}
                    type={alert.type}
                    message={alert.message} />
                <ModalHeader className="pb-1">Member Details</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col>
                                <FormGroup className="required">
                                    <Label for="name">Name</Label>
                                    <Input type="text" name="name" id="name" value={data.name}
                                        onChange={this.handleFormValueChange} placeholder="Name" />
                                    <span className="text-danger"><small>{this.validator.message('Name', data.name, 'required')}</small></span>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup className="required">
                                    <Label for="name">Author</Label>
                                    <Input type="text" name="author" id="author" value={data.author}
                                        onChange={this.handleFormValueChange} placeholder="Author" />
                                    <span className="text-danger"><small>{this.validator.message('Author', data.author, 'required')}</small></span>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup className="required">
                                    <Label for="name">Serial No</Label>
                                    <Input type="number" name="serialNo" id="serialNo" value={data.serialNo}
                                        onChange={this.handleFormValueChange} placeholder="Serial No" />
                                    <span className="text-danger"><small>{this.validator.message('Serial No', data.serialNo, 'required')}</small></span>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup className="required">
                                    <Label for="name">Telephone Number</Label>
                                    <Input type="text" name="catogory" id="catogory" value={data.catogory}
                                        onChange={this.handleFormValueChange} placeholder="Catogory" />
                                    <span className="text-danger"><small>{this.validator.message('Telephone Number', data.catogory, 'required')}</small></span>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button outline color="danger" onClick={this.handleClose}>Close</Button>
                    <Button outline color="primary" onClick={this.handleSubmit}>Submit</Button>
                </ModalFooter>
            </Modal>
        )
    }
}


export default BooksAdd;

// { "bid": 9, "author": "Gustave Flaubert", "serialNo": 123123, "catogory": "Daring", "name": "Madame Bovary" }