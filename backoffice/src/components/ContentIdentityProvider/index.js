import { Component } from 'react';
import view from "./view.js";
import Utility from "../../util/Utility";
import Services from "../../services/Services";
import ReduxStore from "../../redux/Store";
import Actions_Util from "../../redux/Util/Actions";
import $ from 'jquery';


class ContentIdentityProvider extends Component {

	utilStore = ReduxStore.getUtil();
	state = {
		metadataUrl: 'assets/idp-metadata.xml',
		xml: ''
	};

	constructor(props) {
		super(props);
		this.unsubscribe = this.utilStore.subscribe(()=>this.onUtilStoreUpdate());
	}

	componentDidMount() {
		if (this.state.xml !== '') {
			this.updateXml();
			return;
		}
		$.ajax({
			cache: true,
			dataType: 'text',
			method: 'GET',
			url: this.state.metadataUrl
		})
		.done((data) => {
			this.state.xml = data;
			this.updateXml();
		})
		.fail((xhr, status, error) => {
			window.alert(error);
		});
	}

	updateXml() {
		this.refs.aceEditor.editor.getSession().setValue(this.state.xml);
	}

	onUtilStoreUpdate() {
		let utilState = this.utilStore.getState();
	}

	render() {
		return view(this);
	}

}

export default ContentIdentityProvider;
