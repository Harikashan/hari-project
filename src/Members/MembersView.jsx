import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Row,
    Col,
    ModalFooter,
    Button,
} from 'reactstrap';


class MembersView extends Component {
    constructor(props) {
        super(props);
    }

    handleClose = () => {
        this.props.onClose();
    }

    handleToggle = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }));
    }


    render() {
        const { showModal, data } = this.props;

        return (
            <Modal size="lg" isOpen={showModal}>
                <ModalHeader className="pb-1">Member Details</ModalHeader>
                <ModalBody>
                    {Object.keys(data).map((index) => {
                        return (

                            <Row key={index}>
                                <Col md={5}>
                                    {index}
                                </Col>
                                <Col md={7}>
                                    {data[index] ? data[index] : '-'}
                                </Col>
                            </Row>
                        )
                    })}


                </ModalBody>
                <ModalFooter>
                    <Button outline color="danger" onClick={this.handleClose}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}


export default MembersView;
