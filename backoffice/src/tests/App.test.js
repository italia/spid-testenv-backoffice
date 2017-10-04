import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import Box1 from '../components/Box1';
import Actions from '../store/Actions';


it('renders without crashing', ()=> {
  const div = document.createElement('div');
  ReactDOM.render(<Box1 />, div);
});


it('tests Actions', ()=> {
  console.log(Actions.setEntityId("3"));
}); 