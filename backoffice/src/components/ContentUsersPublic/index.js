import { Component } from 'react';
import view from "./view.js";
import Utility from "../../util/Utility";
import Services from "../../services/Services";
import ReduxStore from "../../redux/Store";
import Actions_Util from "../../redux/Util/Actions";


class ContentUsersPublic extends Component {

	utilStore = ReduxStore.getUtil();
	state = {
		users: [], 
	};

	constructor(props) {
		super(props);
	}	
	
	render() {    
		return view(this);
	}
	
	// reload theme rendering functions
	componentDidMount() { 	
		this.loadPublicUsers();
		Utility.applyTheme();
	}  		

	loadPublicUsers() { 
		let service = Services.getMainService();
		this.utilStore.dispatch(Actions_Util.setBlockUI(true));

		service.getPublicUsers(
			(response)=> {
				this.utilStore.dispatch(Actions_Util.setBlockUI(false));
				this.setState({
					users: response,
				}, ()=>{
					// state updated
				});
			},
			(error)=> { 
				this.utilStore.dispatch(Actions_Util.setBlockUI(false));
				this.setState({
					users: [],
				}, ()=>{
					// state updated
				});
				Utility.log("ContentUsersPublic getPublicUsers", "Error", error);
			}
		);  
	}  

}

export default ContentUsersPublic;
