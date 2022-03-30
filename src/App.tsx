import React from 'react';
import { observer } from 'mobx-react';

import {
    AppBar, Box, Button, TextField, Toolbar, Typography
} from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';

import { AppState } from './AppState';

export const App = observer(
    class App extends React.Component<{ state: AppState }> {

        render(): JSX.Element {

            const state = this.props.state;

            var hint = '';

            if (!!state.isRecognizing) {
             
                if (!!state.diagramGrammar) {
                    
                    hint = state.diagramGrammar.hint;

                } else {

                    hint = `e.g. 'Flowchart' or 'Sequence Diagram'`;
                }
            }

            return (<>
                
                <AppBar position="static" color="default">
                    <Toolbar>

                        <Typography variant="h5" color="inherit">
                            Talk2Mermaid
                        </Typography>

                        <Box width={30} />

                        <Button
                            className="start-button"
                            variant="outlined"
                            color="secondary"
                            size="large"
                            onClick={() => state.startStopRecognizing()}
                        >
                            {!state.isRecognizing ? "Start" : "Stop"} Recognizing
                        </Button>

                        <Box width={30} />

                        <TextField
                            fullWidth
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            placeholder={hint}
                            value={state.currentText}
                            onChange={(evt) => {}}
                        />

                    </Toolbar>
                </AppBar>

                <div className='sidebar-div'>

                    <TextField
                        className="diagram-code-textbox"
                        fullWidth
                        multiline
                        value={state.diagramCode}              
                        onChange={(evt) => state.diagramCode = evt.target.value as string}
                        onBlur={() => state.reRenderDiagram()}
                    />
                    
                </div>

                {!!state.diagramSvg && (<>
                    <div className='diagram-div'
                        dangerouslySetInnerHTML={{ __html: state.diagramSvg }}
                    />

                    <Toolbar variant="dense" className="bottom-toolbar">

                        <Typography style={{ flex: 1 }} />

                        <Button
                            variant="outlined"
                            href={URL.createObjectURL(new Blob([state.diagramSvg], { type: 'image/svg+xml' }))}
                            download={'diagram.svg'}
                        >
                            <SaveIcon />
                            <Box width={20} />
                            <Typography color="inherit">Save as .SVG</Typography>
                        </Button>

                        <Box width={20} />
                    </Toolbar>

                </>)}
            
            </>);
        }
    }
);