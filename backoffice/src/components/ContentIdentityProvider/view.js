import React from 'react';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import AceEditor from 'react-ace';
import './style.css';

function view(me) { 
    return(
        <div>
            <div id="MetadataLink">
                <a href="assets/idp-metadata.xml" target="_blank" alt="Vedi XML">
                    <i className="fa fa-external-link"></i>
                </a>
            </div>
            <AceEditor
                ref="aceEditor"
                mode="xml"
                theme="cobalt"
                name="AceEditor"
                className="AceEditor"
                defaultValue={me.state.xml}
                value={me.state.xml}
                readOnly={true}
                maxLines={10000}
                editorProps={{$blockScrolling: true}}
            />
        </div>
    );
}

export default view;
