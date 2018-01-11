import React from "react";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
import "./style.css";


function view(me) { 

    return(

        <Modal isOpen={me.state.isOpen} onRequestHide={me.hide}>
            <ModalHeader>
                <ModalTitle>
                    <h5>{me.state.title}</h5>
                    <h6>{me.state.subtitle}</h6>
                </ModalTitle>
            <ModalClose onClick={me.hide}/>
            </ModalHeader>
            {me.state.text!==null && me.state.text!=="" ? 
                <ModalBody>
                    {me.state.text}
                </ModalBody>
            : ""}
            <ModalFooter> 
				{me.state.callbackOk!=null ? 
					<span><button className='btn btn-default' onClick={me.callOk}>{me.state.okLabel}</button></span>
				: ""}			
                <span><button className='btn btn-default' onClick={me.hide}>Chiudi</button></span>
            </ModalFooter>
        </Modal>
    )
};

export default view;