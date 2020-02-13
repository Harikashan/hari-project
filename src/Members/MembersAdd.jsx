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
import { addMembers } from '../services/api-services'
import Aleart from '../services/Aleart';


class MembersAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: '',
                address: '',
                telephoneNumber: '',
                nic: '',
                mid: props.data.mid + 1
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
            addMembers(this.state.data).then((results) => {
                this.setState({
                    alert: {
                        type: 'success',
                        message: 'Member Added successfully'
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
                                        onChange={this.handleFormValueChange} placeholder="First Name" />
                                    <span className="text-danger"><small>{this.validator.message('Name', data.name, 'required')}</small></span>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup className="required">
                                    <Label for="name">Address</Label>
                                    <Input type="text" name="address" id="address" value={data.address}
                                        onChange={this.handleFormValueChange} placeholder="First Name" />
                                    <span className="text-danger"><small>{this.validator.message('Address', data.address, 'required')}</small></span>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup className="required">
                                    <Label for="name">NIC</Label>
                                    <Input type="number" name="nic" id="nic" value={data.nic}
                                        onChange={this.handleFormValueChange} placeholder="First Name" />
                                    <span className="text-danger"><small>{this.validator.message('NIC', data.nic, 'required')}</small></span>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup className="required">
                                    <Label for="name">Telephone Number</Label>
                                    <Input type="tel" name="telephoneNumber" id="telephoneNumber" value={data.telephoneNumber}
                                        onChange={this.handleFormValueChange} placeholder="First Name" />
                                    <span className="text-danger"><small>{this.validator.message('Telephone Number', data.telephoneNumber, 'required')}</small></span>
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


export default MembersAdd;
