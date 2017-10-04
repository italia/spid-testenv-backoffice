import { Component } from "react";
import view from "./view.js";
import Utility from "../../util/Utility";

class Footer extends Component {
  
  render() {
    return view(this);
  }
  
  // reload theme rendering functions
  componentDidMount() { 
    window.app.init();    
    window.app.layout();
    window.app.resizableLayout(); 
    Utility.log("FOOTER");
  }  

}

export default Footer;
