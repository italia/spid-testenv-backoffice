import { Component } from 'react';
import view from "./view.js";
import ReduxStore from "../../redux/Store";
import Actions from "../../redux/Main/Actions";

class Box1Info extends Component {

  store = ReduxStore.getStore();
  validation = ReduxStore.getValidation();

  constructor(props) {
    super(props);
    this.state = {
      validation: ""
    }

    this.store.dispatch(Actions.setInfo_EntityId(""));
    this.store.dispatch(Actions.setInfo_Certificate(""));

    this.unsubscribe = this.validation.subscribe(()=>this.onValidation());
  }

  componentWillUnmount() {
    this.unsubscribe();
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
      Actions.setInfo_Certificate(event.target.value.replace(/(-----(BEGIN|END) CERTIFICATE-----|\n)/g, ''))
    );
  }
 

  onValidation() {
    let isValid = this.validation.getState();
    if(!isValid.info) this.setState(Object.assign({}, {validation: "validationfailed"}));
    else this.setState(Object.assign({}, {validation: "validationok"}));
  }  
}

export default Box1Info;
