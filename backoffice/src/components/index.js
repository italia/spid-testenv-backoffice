import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from "react";
import { HashRouter as Router, Route } from 'react-router-dom';
import ReduxStore from "./redux/Store";
import Actions from './redux/Main/Actions'
import Actions_Util from './redux/Util/Actions'
import registerServiceWorker from './util/registerServiceWorker';
import Utility from "./util/Utility";

import MobileHeader from './components/MobileHeader';
import Menu from './components/Menu';
import ContentMetadata from './components/ContentMetadata';
import ContentUsers from './components/ContentUsers';
import ContentServicesList from './components/ContentServicesList';
import Footer from './components/Footer';
import Modal from './components/Modal';

import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';


new ReduxStore();

class App extends Component {
	store = ReduxStore.getStore();
	utilStore = ReduxStore.getUtil();

	constructor(props) {
		super(props);
        
        this.state = {blocking: false};
		this.store.dispatch(Actions.setInfo_Id(Utility.uuidv4()));
		this.unsubscribe = this.utilStore.subscribe(()=>this.onUtilStoreUpdate());
	}	
	
	onUtilStoreUpdate() {
		let utilState = this.utilStore.getState(); 
		this.setState({
			blocking: utilState.blockUI
		}, ()=>{
			// state updated
		});
	}	
	
	render() {
		return (
			<BlockUi tag="div" blocking={this.state.blocking}>  
				<div className="app sidebar-hidden aside-menu-hidden">
					<Router> 
						<div>
							<MobileHeader />
							<div className="app-content">
								<Menu />
								<Route exact path='/' component={ContentMetadata} />
								<Route path='/users' component={ContentUsers} />
								<Route path='/services' component={ContentServicesList} />
							</div>
							<Footer />
							<Modal />
						</div>
					</Router>             
				</div>      
			</BlockUi>
		);
	} 
}






ReactDOM.render(<App />, document.getElementById('root'));

//registerServiceWorker();
