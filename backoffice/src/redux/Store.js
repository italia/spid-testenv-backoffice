import { createStore, applyMiddleware } from "redux"
import initialState from "./Main/InitialState";
import transitions from "./Main/Transitions"
import initialState_Modal from "./Modal/InitialState";
import transitions_Modal from "./Modal/Transitions"
import initialState_Util from "./Util/InitialState";
import transitions_Util from "./Util/Transitions"
import initialState_Validation from "./Validation/InitialState";
import transitions_Validation from "./Validation/Transitions"
import Utility from "../util/Utility";

const TAG = "Store.js";

class Store {

    store = null;
    modal = null;
    util = null;
    validation = null;

    constructor() {
        this.store 		= createStore(transitions, initialState, applyMiddleware(logger));
        this.modal 	    = createStore(transitions_Modal, initialState_Modal, applyMiddleware(logger));
        this.util 		= createStore(transitions_Util, initialState_Util, applyMiddleware(logger));
        this.validation	= createStore(transitions_Validation, initialState_Validation, applyMiddleware(logger));
        Utility.log(TAG, "STORE CREATED");
    }

    static getStore() {
        if(this.store == null) 
            this.store = createStore(transitions, initialState, applyMiddleware(logger));
        return this.store;
    }   

    static getModal() {
        if(this.modal == null) 
            this.modal = createStore(transitions_Modal, initialState_Modal, applyMiddleware(logger));
        return this.modal;
    }     
	
    static getUtil() {
        if(this.util == null) 
            this.util = createStore(transitions_Util, initialState_Util, applyMiddleware(logger));
        return this.util;
    }  
    
    static getValidation() {
        if(this.validation == null) 
            this.validation = createStore(transitions_Validation, initialState_Validation, applyMiddleware(logger));
        return this.validation;
    }     
}

const logger = store => next => action => {
    Utility.log(TAG, 'Current Action: ', action)
    let result = next(action)
    Utility.log(TAG, 'Next State: ', store.getState())
    return result;
} 

export default Store;