import { Component } from 'react';
import view from "./view.js";
import ReduxStore from "../../redux/Store";
import Actions from "../../redux/Main/Actions";
import Utility from "../../util/Utility";

class Box1Attribute extends Component {
    
  store = ReduxStore.getStore();

  constructor(props) {
    super(props);
    this.state = {
      n: 1,		// index 1 because index 0 is for resident sp on wso2
      data: [
        {
          n: 1,	// index 1 because index 0 is for resident sp on wso2
          Name: "",
          Description: "",
          RequestedAttribute: [],
          removeButton: false,
          removeFunc: (n)=>{this.removeChild(n)},
          setName: (n, e)=>{this.setName(n, e)},   
          setDescription: (n, e)=>{this.setDescription(n, e)},      
          setRequestedAttribute: (n, e)=>{this.setRequestedAttribute(n, e)}       
        }
      ]
    }
    this.onChange();
  }

  render() { 
    return view(this); 
  }

  addAttributeConsumingService() {
    let newState = {
      data: [...this.state.data, {
        n: ++this.state.n,
        Name: "",
        Description: "",
        RequestedAttribute: [],
        removeButton: true,
        removeFunc: (n)=>{this.removeChild(n)},
        setName: (n, e)=>{this.setName(n, e)},   
        setDescription: (n, e)=>{this.setDescription(n, e)},      
        setRequestedAttribute: (n, e)=>{this.setRequestedAttribute(n, e)} 
      }]
    }

    this.setState(Object.assign({}, newState), ()=> this.onChange());
  }

  removeChild(n) {
    let newState = {
      data: this.state.data.filter((item)=>{
        let keep = false;
        if(item.n!==n) keep = true;
        return keep;
      })
    }

    this.setState(Object.assign({}, newState), ()=> this.onChange());
  }  

  setName(n, e) {
    let newState = {
      data: this.state.data.map((item)=>{
        if(item.n===n) item.Name = e.target.value;
        return item;
      })
    }

    this.setState(Object.assign({}, newState), ()=> this.onChange());
  }  

  setDescription(n, e) {
    let newState = {
      data: this.state.data.map((item)=>{
        if(item.n===n) item.Description = e.target.value;
        return item;
      })
    }

    this.setState(Object.assign({}, newState), ()=> this.onChange());
  }   

  setRequestedAttribute(n, e) {
    let newState = {
      data: this.state.data.map((item)=>{
      if(item.n===n){
          //if ( ! item.hasOwnProperty('RequestedAttribute')) item.RequestedAttribute = [];
          if (e.target.checked) item.RequestedAttribute.push(e.target.value);
          else item.RequestedAttribute = item.RequestedAttribute.filter(a => a !== e.target.value);
       }
       return item;
       })
    }

    this.setState(Object.assign({}, newState), ()=> this.onChange());
  }    

  onChange() {
    //deep clone
    let storeData = JSON.parse(JSON.stringify(this.state.data));
    for(let k in storeData) {
      delete storeData[k].n;
      delete storeData[k].removeButton;
      delete storeData[k].removeFunc;
      delete storeData[k].setName;
      delete storeData[k].setDescription;
      delete storeData[k].setRequestedAttribute;
    }

    this.store.dispatch(
      Actions.setAttributeConsumingService(storeData)
    );
  }
}

export default Box1Attribute;
