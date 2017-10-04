import { Component } from 'react';
import view from "./item-view.js";

class Box1AttributeItem extends Component {
    
  constructor(item) {
    super(item);
    this.data = item.data;
  }

  render() { return view(this); }

  // reload theme rendering functions
  componentDidMount() { window.app_plugins.loaded(); }

}

export default Box1AttributeItem;
