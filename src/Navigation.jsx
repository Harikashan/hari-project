import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class Navigation extends Component {

    constructor(props) {
        super(props);
    }

    navigateTo = to => e => {
        e.preventDefault();
        this.props.history.push(`/${to}`);

    }

    render() {
        return (
            <Nav vertical className="pl-2">
                <NavItem className="py-1">
                    <NavLink href="/#" className="text-muted" onClick={this.navigateTo('members')}><i className="far fa-gem pr-2"></i> Members</NavLink>
                </NavItem>

                <NavItem className="py-1">
                    <NavLink href="/#" className="text-muted" onClick={this.navigateTo('books')}><i className="far fa-gem pr-2"></i> Books</NavLink>
                </NavItem>
            </Nav>
        );
    }
}

export default withRouter(Navigation);
