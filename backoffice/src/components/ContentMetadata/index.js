import { Component } from "react";
import view from "./view.js";
import Utility from "../../util/Utility";


class ContentMetadata extends Component {
  
  render() {
    return view(this);
  } 

  // reload theme rendering functions
  componentDidMount() { 
    Utility.applyTheme();
    Utility.log("RELOAD FOR ROUTE", this.props.location.pathname);
  }    

}

export default ContentMetadata;
