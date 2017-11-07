import { Component } from 'react';
import view from "./view.js";
import ReduxStore from "../../redux/Store";
import Actions from "../../redux/Main/Actions";


class Box1Logout extends Component {

  store = ReduxStore.getStore();
  validation = ReduxStore.getValidation();

  constructor(props) {
    super(props);
    this.state = {
      n: 0,
      validation: "",
      data: [
        {
          n: 0,
          Binding: "HTTP-POST",
          Location: "",
          removeButton: false,
          removeFunc: (n)=>{this.removeChild(n)},
          setBinding: (n, e)=>{this.setBinding(n, e)},
          setLocation: (n, e)=>{this.setLocation(n, e)}       
        }
      ]
    }
    this.onChange();
    this.unsubscribe = this.validation.subscribe(()=>this.onValidation());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }  

  render() { 
    return view(this); 
  }

  addSingleLogout() {
    let newState = {
      data: [...this.state.data, {
        n: ++this.state.n,
        Binding: "HTTP-POST",
        Location: "",
        removeButton: true,
        removeFunc: (n)=>{this.removeChild(n)},
        setBinding: (n, e)=>{this.setBinding(n, e)},
        setLocation: (n, e)=>{this.setLocation(n, e)}
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
      delete storeData[k].setBinding;
      delete storeData[k].setLocation;
    }

    this.store.dispatch(
      Actions.setSingleLogout(storeData)
    );
  }  

  onValidation() {
    let isValid = this.validation.getState();
    if(!isValid.logout) this.setState(Object.assign({}, {validation: "validationfailed"}));
    else this.setState(Object.assign({}, {validation: "validationok"}));    
  }
}

export default Box1Logout;
