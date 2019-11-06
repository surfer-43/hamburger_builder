import React, { Component } from "react";

// import custom CSS classes
import classes from './Layout.css';

// import custom classes
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        console.log("did the sideDrawerCloseHandler get called: ");
        this.setState((prevState)=>{
            return{ showSideDrawer: !prevState.showSideDrawer };
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar 
                    opened={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>
                <SideDrawer 
                    opened={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux> 
        )
    }
}

export default Layout;