import { Component } from 'react';
import view from "./view.js";
import ReduxStore from "../../redux/Store";
import Utility from "../../util/Utility";

class AceEditor extends Component {

  store = ReduxStore.getStore();
    
  constructor(props) {
    super(props);
    this.state = { code: Utility.json2metadata(this.store.getState()) };
    this.unsubscribe = this.store.subscribe(()=>this.onMetadataUpdate());
  }  

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() { return view(this); }

  updateCode(value) {
    this.setState({
			code: value,
    }, ()=>{
      // state updated
    });
  }

  onMetadataUpdate() {
    this.updateCode(Utility.json2metadata(this.store.getState()));
  }

}

export default AceEditor;
