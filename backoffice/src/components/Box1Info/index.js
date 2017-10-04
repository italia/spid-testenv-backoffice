import { Component } from 'react';
import view from "./view.js";
import ReduxStore from "../../redux/Store";
import Actions from "../../redux/Main/Actions";

class Box1Info extends Component {

  store = ReduxStore.getStore();

  constructor(props) {
    super(props);
    this.store.dispatch(Actions.setInfo_EntityId(""));
    this.store.dispatch(Actions.setInfo_Certificate(""));
  }

  render() { 
    return view(this); 
  }

  setEntityId(event) {
    this.store.dispatch(
      Actions.setInfo_EntityId(event.target.value)
    );
  }

  setCertificate(event) {
    this.store.dispatch(
      Actions.setInfo_Certificate(event.target.value)
    );
  }
  
}

export default Box1Info;
