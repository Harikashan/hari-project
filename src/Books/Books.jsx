import React, { Component } from 'react';
import { Container, Button, Row, Col } from 'reactstrap';
import { getBooks, removeBooks } from '../services/api-services'
import BooksView from './BooksView';
import BooksAdd from './BooksAdd';
import Aleart from '../services/Aleart';

class Books extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showViewModal: false,
            showAddModal: false,
            booksData: [],
            id: '',
            alert: {
                type: '',
                message: ''
            }
        }
    }
    componentDidMount = () => {
        getBooks().then((results) => {
            this.setState({ booksData: results.data })
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
        removeBooks(id).then((results) => {
            this.setState({
                alert: {
                    type: 'success',
                    message: 'Books Deleted successfully'
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
        const { showViewModal, id, booksData, showAddModal } = this.state;

        if (showViewModal) {
            return (
                <BooksView
                    data={booksData[id]}
                    showModal={showViewModal}
                    onClose={this.handleModalClose} />
            )
        }

        if (showAddModal) {
            return (
                <BooksAdd
                    data={booksData.reverse()[0]}
                    showModal={showAddModal}
                    onClose={this.handleModalClose} />
            )
        }
    }

    renderBooksTable = () => {
        const { booksData } = this.state;
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {booksData && booksData.map((data, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{data.bid}</th>
                                <td onClick={(e) => this.viewModelClick(e, index)}>
                                    {data.name}</td>
                                <td>
                                    <Button size={'sm'} color="danger"
                                        onClick={(e) => this.deleteModelClick(e, data.bid)}>{'Delete'}
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
                        <label><h3>Books</h3></label>
                    </Col>

                    <Col sm={3}>
                        <Button color="success float-right"
                            onClick={() => this.addModelClick()}>
                            <i className="fas fa-plus"></i>
                            {'Add Books'}
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {this.renderBooksTable()}
                    </Col>
                </Row>
                {this.renderModal()}
            </Container>

        )
    }
}

export default Books;