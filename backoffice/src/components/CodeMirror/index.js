import { Component } from 'react';
import view from "./view.js";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/xml/xml";
import ReduxStore from "../../redux/Store";
import Utility from "../../util/Utility";


class CodeMirror extends Component {
    
  options = {
    readOnly: true,
    //lineWrapping: true,
    lineNumbers: true,
    mode: "xml",
    //matchBrackets: true,
    indentUnit: 1,
    indentWithTabs: true,
    preserveScrollPosition: true,
    //enterMode: "keep",
    //tabMode: "shift",
    css:"font-size:8px;"
  };

  store = ReduxStore.getStore();
    
  constructor(props) {
    super(props);
    this.state = { code: Utility.json2metadata(this.store.getState()) };
    this.store.subscribe(()=>this.onMetadataUpdate());
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

export default CodeMirror;
