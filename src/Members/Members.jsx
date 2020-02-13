import React, { Component } from 'react';
import { Container, Button, Row, Col } from 'reactstrap';
import { getMembers, removeMembers } from '../services/api-services'
import MembersView from './MembersView';
import MembersAdd from './MembersAdd';
import Aleart from '../services/Aleart';

class Members extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showViewModal: false,
            showAddModal: false,
            membersData: [],
            id: '',
            alert: {
                type: '',
                message: ''
            }
        }
    }
    componentDidMount = () => {
        getMembers().then((results) => {
            this.setState({ membersData: results.data })
        })
    }

    //Handle onclick of view
    viewModelClick = (e, id) => {
        this.setState({
            showViewModal: true,
            id: id
        });
    }

    //Handle onclick of Add
    addModelClick = () => {
        this.setState({
            showAddModal: true,
        });
    }

    //Handle onclick of Add
    deleteModelClick = (e, id) => {
        removeMembers(id).then((results) => {
            this.setState({
                alert: {
                    type: 'success',
                    message: 'Member Deleted successfully'
                }
            });

            this.componentDidMount();

        }).catch((error) => {
            this.setState({
                alert: {
                    type: 'warning',
                    message: 'Request is failed'
                }
            })
        });
    }

    handleModalClose = () => {
        this.setState({ showViewModal: false, showAddModal: false });
        this.componentDidMount();
    }

    renderModal = () => {
        const { showViewModal, id, membersData, showAddModal } = this.state;

        if (showViewModal) {
            return (
                <MembersView
                    data={membersData[id]}
                    showModal={showViewModal}
                    onClose={this.handleModalClose} />
            )
        }

        if (showAddModal) {
            return (
                <MembersAdd
                    data={membersData.reverse()[0]}
                    showModal={showAddModal}
                    onClose={this.handleModalClose} />
            )
        }
    }

    renderMembersTable = () => {
        const { membersData } = this.state;
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">TelephoneNumber</th>
                        <th scope="col">NIC</th>
                        <th scope="col">Address</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {membersData && membersData.map((data, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{data.mid}</th>
                                <td onClick={(e) => this.viewModelClick(e, index)}>
                                    {data.name}</td>
                                <td>{data.telephoneNumber}</td>
                                <td>{data.nic}</td>
                                <td>{data.address}</td>
                                <td>
                                    <Button size={'sm'} color="danger"
                                        onClick={(e) => this.deleteModelClick(e, data.mid)}>{'Delete'}
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        )
    }

    render() {
        const { alert } = this.state;
        return (
            <Container fluid>
                <Aleart
                    isOpen={alert.message ? true : false}
                    type={alert.type}
                    message={alert.message} />
                <Row>
                    <Col sm={3}>
                        <label><h3>Members</h3></label>
                    </Col>

                    <Col sm={3}>
                        <Button color="success float-right"
                            onClick={() => this.addModelClick()}>
                            <i className="fas fa-plus"></i>
                            {'Add Members'}
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {this.renderMembersTable()}
                    </Col>
                </Row>
                {this.renderModal()}
            </Container>

        )
    }
}

export default Members;