import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import { Col, Container, Row } from 'reactstrap';
import Members from './Members/Members';
import Books from './Books/Books';
import PrivateRoute from './PrivateRoute';
import Navigation from './Navigation'

class App extends Component {

  renderNavigation = () => {
    return (
      <Col md={2} className="d-none d-md-block bg-white sidebar shadow-sm">
        <div className="sidebar-sticky">
          <Navigation></Navigation>
        </div>
      </Col>
    )
  }

  renderPrivateRoutes = () => {

    return (
      <Col md={10} className='ml-sm-auto col-lg-10 py-4 px-4'>
        <Row >
          <Col md={12}>
            <Switch>
              <PrivateRoute exact path='/members' component={Members} />
              <PrivateRoute exact path="/books" component={Books} />
            </Switch>
          </Col>
        </Row>
      </Col>
    )
  }

  render() {

    return (
      <Container fluid className="px-0">
        <Router>
          <Row>
            {this.renderNavigation()}
            {this.renderPrivateRoutes()}
          </Row>
        </Router>
      </Container>
    );
  }
}


export default App;
