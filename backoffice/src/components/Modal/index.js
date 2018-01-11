import { Component } from 'react';
import view from "./view.js";
import ReduxStore from "../../redux/Store";
import Actions_Util from "../../redux/Util/Actions";


class Modal extends Component {

	store = ReduxStore.getModal();
	utilStore = ReduxStore.getUtil();
	
	state = {
		title: "Title", 
		subtitle: "subtitle",
		text: "test",
		isOpen: false,
		callbackOk: null,
		okLabel: "Cancella"
	};

	constructor(props) {
		super(props);
		this.unsubscribe = this.store.subscribe(()=>this.onUpdate());
	}

	componentWillUnmount() {
		this.unsubscribe();
	}  

	render() { 
		return view(this); 
	}

	componentDidMount() {
		if(this.state.isOpen) this.show();
	}

	show = ()=> {
		this.setState({
			isOpen: true
		});
		this.utilStore.dispatch(Actions_Util.setBlockUI(true));
	};
  
	hide = ()=> {
		this.setState({
			isOpen: false
		});
		this.utilStore.dispatch(Actions_Util.setBlockUI(false));
	};  
  
	callOk = ()=> {
		this.setState({
			isOpen: false
		});
		if(this.state.callbackOk!=null) this.state.callbackOk();
	};

	onUpdate() {
		let newState = this.store.getState();

		this.setState({
			title: newState.title,
			subtitle: newState.subtitle,
			text: newState.text,
			isOpen: newState.isOpen,
			callbackOk: newState.callbackOk,
			okLabel: newState.okLabel
		}, ()=>{
			// state updated
		});
    
		console.log(newState);
	}  

}

export default Modal;
