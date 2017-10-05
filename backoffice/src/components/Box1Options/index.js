import { Component } from 'react';
import view from "./view.js";
import ReduxStore from "../../redux/Store";
import Actions from "../../redux/Main/Actions";


class Box1Options extends Component {
    
  store = ReduxStore.getStore();

  constructor(props) {
    super(props);
    this.store.dispatch(Actions.setSPIDLevel("1"));
  }

  render() { 
    return view(this); 
  }

  setSPIDLevel(event) {
    this.store.dispatch(
      Actions.setSPIDLevel(event.target.value)
    );
  }
  
  
}

export default Box1Options;
