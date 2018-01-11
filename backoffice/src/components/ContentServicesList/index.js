import { Component } from 'react';
import view from "./view.js";
import Utility from "../../util/Utility";
import Services from "../../services/Services";
import ReduxStore from "../../redux/Store";
import Actions_Util from "../../redux/Util/Actions";


class ContentServicesList extends Component {

	utilStore = ReduxStore.getUtil();
	state = {services: []};


	render() {    
		return view(this);
	}

	componentDidMount() { 
		let service = Services.getMainService();
		this.utilStore.dispatch(Actions_Util.setBlockUI(true));

		service.getServices(
			(response)=> {
				this.utilStore.dispatch(Actions_Util.setBlockUI(false));
				this.setState({
					services: response,
				}, ()=>{
					// state updated
				});
			},
			(error)=> { 
				this.utilStore.dispatch(Actions_Util.setBlockUI(false));
				this.setState({
					services: [],
				}, ()=>{
					// state updated
				});
				Utility.showModal({
					title: "Caricamento dati",
					subtitle: "Si sono verificati errori durante il caricamento dati",
					text: error,
					isOpen: true
				}); 
				Utility.log("ContentServicesList getServices", "Error", error);
			}
		);  

		Utility.applyTheme();
	}  
	
	delete(applicationName) {
		Utility.log("ContentServicesList delete", "ID", applicationName);
		let service = Services.getMainService();
		
		Utility.showModal({
			title: "Cancellazione service provider",
			subtitle: "",
			text: "Sicuro di voler cancellare il service provider: " + applicationName + " ?",
			isOpen: true,
			callbackOk: ()=> {

				service.deleteService({
						"applicationName": applicationName
					},
					()=> {
						this.utilStore.dispatch(Actions_Util.setBlockUI(false));
						this.componentDidMount();
					},
					(error)=> { 
						this.utilStore.dispatch(Actions_Util.setBlockUI(false));
						this.componentDidMount();
					}
				);				

			},
			okLabel: "Cancella"
		});
	}
	
	manageUsers(applicationName) {
		Utility.log("ContentServicesList manageUsers", "ID", applicationName);
		this.utilStore.dispatch(Actions_Util.setUsersPageApplicationName(applicationName));
		window.location = "/#/users";
	}	
  
}

export default ContentServicesList;
