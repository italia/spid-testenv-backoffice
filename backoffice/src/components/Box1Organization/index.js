import { Component } from 'react';
import view from "./view.js";
import ReduxStore from "../../redux/Store";
import Actions from "../../redux/Main/Actions";


class Box1Organization extends Component {
    
  store = ReduxStore.getStore();

  constructor(props) {
    super(props);
    this.store.dispatch(Actions.setOrganization_Name(""));
    this.store.dispatch(Actions.setOrganization_DisplayName(""));
    this.store.dispatch(Actions.setOrganization_Url(""));
  }

  render() { 
    return view(this); 
  }

  setName(event) {
    this.store.dispatch(
      Actions.setOrganization_Name(event.target.value)
    );
  }
  
  setDisplayName(event) {
    this.store.dispatch(
      Actions.setOrganization_DisplayName(event.target.value)
    );
  }

  setUrl(event) {
    this.store.dispatch(
      Actions.setOrganization_Url(event.target.value)
    );
  }
  
  
}

export default Box1Organization;
