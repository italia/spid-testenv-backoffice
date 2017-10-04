import { Component } from 'react';
import view from "./view.js";
import Utility from "../../util/Utility";
import Services from "../../services/Services";
import ReduxStore from "../../redux/Store";
import Actions_Util from "../../redux/Util/Actions";


class ContentIdentityProvider extends Component {

	utilStore = ReduxStore.getUtil();
	state = {};

	constructor(props) {
		super(props);
		this.unsubscribe = this.utilStore.subscribe(()=>this.onUtilStoreUpdate());
	}	
	
	onUtilStoreUpdate() {
		let utilState = this.utilStore.getState(); 
	}	
	
	render() {    
		return view(this);
	}
  
}

export default ContentIdentityProvider;
