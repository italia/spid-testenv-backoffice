import { Component } from 'react';
import view from "./view.js";
import ReduxStore from "../../redux/Store";
import Actions from "../../redux/Main/Actions";


class Box1Assertion extends Component {

  store = ReduxStore.getStore();

  constructor(props) {
    super(props);
    this.state = {
      n: 0,
      data: [
        {
          n: 0,
          IsDefault: true,
          Binding: "HTTP-POST",
          Location: "",
          removeButton: false,
          removeFunc: (n)=>{this.removeChild(n)},
          setDefault: (n)=>{this.setDefault(n)},
          setBinding: (n, e)=>{this.setBinding(n, e)},
          setLocation: (n, e)=>{this.setLocation(n, e)}        
        }
      ]
    }
    this.onChange();
  }    

  render() { 
    return view(this); 
  }

  addAssertionConsumerService() {
    let newState = {
      data: [...this.state.data,{
        n: ++this.state.n,
        IsDefault: false,
        Binding: "HTTP-POST",
        Location: "",
        removeButton: true,
        removeFunc: (n)=>{this.removeChild(n)},
        setDefault: (n)=>{this.setDefault(n)},
        setBinding: (n, e)=>{this.setBinding(n, e)},
        setLocation: (n, e)=>{this.setLocation(n, e)}        
      }]
    };

    this.setState(Object.assign({}, newState), ()=> this.onChange());
  }

  removeChild(n) {
    let newState = {
      data: this.state.data.filter((item)=>{
        let keep = false;
        if(item.n!==n) keep = true;
        return keep;
      })
    };
    
    this.setState(Object.assign({}, newState), ()=> this.onChange());
  }  

  setDefault(n) {
    let newState = {
      data: this.state.data.map((item)=>{
        if(item.n===n) item.IsDefault = true;
        else item.IsDefault = false;
        return item;
      })
    }

    this.setState(Object.assign({}, newState), ()=> this.onChange());
  }  

  setBinding(n, e) {
    let newState = {
      data: this.state.data.map((item)=>{
        if(item.n===n) item.Binding = e.target.value;
        return item;
      })
    }

    this.setState(Object.assign({}, newState), ()=> this.onChange());
  } 

  setLocation(n, e) {
    let newState = {
      data: this.state.data.map((item)=>{
        if(item.n===n) item.Location = e.target.value;
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
      delete storeData[k].setDefault;
      delete storeData[k].setBinding;
      delete storeData[k].setLocation;
    }

    this.store.dispatch(
      Actions.setAssertionConsumerService(storeData)
    );
  }

}

export default Box1Assertion;
