import mermaid from 'mermaid';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

import { DiagramGrammar, FullGrammar } from './Grammar';

export class AppState {

    diagramCode: string = ``;

    diagramSvg: string = '';

    currentText: string = '';

    isRecognizing: boolean = false;

    diagramGrammar: DiagramGrammar;

    constructor() {

        mermaid.initialize({
            startOnLoad: true
        });

        const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
            process.env.REACT_APP_COGNITIVE_SERVICES_SUBSCRIPTION_KEY!,
            process.env.REACT_APP_COGNITIVE_SERVICES_REGION!
        );
        
        speechConfig.speechRecognitionLanguage = 'en-US';

        this._recognizer = new SpeechSDK.SpeechRecognizer (
            speechConfig,
            SpeechSDK.AudioConfig.fromDefaultMicrophoneInput()
        );

        this._recognizer.recognized = (sender, evt) => this.understandPhrase(evt.result.text);

        // Adding default phrase list
        const phraseList = SpeechSDK.PhraseListGrammar.fromRecognizer(this._recognizer);

        phraseList.addPhrases(Object.keys(FullGrammar));
    }

    reRenderDiagram() {

        if (!this.diagramCode) {
            this.diagramSvg = '';
            return;
        }

        mermaid.render('mermaidSvgId', this.diagramCode, (svg) => {
            this.diagramSvg = svg;
        });    
    }

    startStopRecognizing() {

        if (!this.isRecognizing) {

            this._recognizer.startContinuousRecognitionAsync();
            this.isRecognizing = true;

        } else {

            this._recognizer.stopContinuousRecognitionAsync();
            this.isRecognizing = false;
        }
    }

    private readonly _recognizer: SpeechSDK.SpeechRecognizer;

    private cleanupPhrase(text: string): string {

        text = text.toLowerCase();
        if (text.endsWith('.')) {
            text = text.substring(0, text.length - 1);
        }

        return text;
    }

    private understandPhrase(text: string) {

        text = this.cleanupPhrase(text);
        
        console.log(text);
        this.currentText = text;

        var textWithoutSpaces = text.replace(/\s/g, '');

        // Checking if a new diagram is to be created
        for (const diagramTypeName of Object.keys(FullGrammar)) {
            
            if (textWithoutSpaces.startsWith(diagramTypeName.toLowerCase())) {

                this.diagramGrammar = FullGrammar[diagramTypeName];
                
                textWithoutSpaces = textWithoutSpaces.substring(diagramTypeName.length);
                const variation = this.diagramGrammar.variations[textWithoutSpaces] ?? '';

                this.diagramCode = `${this.diagramGrammar.startLine} ${variation} \n`;

                // Adding phrase list specific to this diagram type
                const phraseList = SpeechSDK.PhraseListGrammar.fromRecognizer(this._recognizer);

                phraseList.clear();
                phraseList.addPhrases(this.diagramGrammar.phraseList);

                this.reRenderDiagram();
                return;
            }
        }

        if (!this.diagramGrammar) {
            return;
        }

        // Handling general commands
        switch (textWithoutSpaces) {

            case 'cleanup':

                if (!!this.diagramGrammar) {
                
                    this.diagramCode = this.diagramGrammar.startLine + `\n`;
                }
    
                this.reRenderDiagram();
                return;
    
            case 'cancel':

                const diagramLines = this.diagramCode.split(`\n`).filter(l => !!l);

                if (diagramLines.length > 1) {
                    
                    diagramLines.pop();
    
                    this.diagramCode = diagramLines.join('\n') + '\n';
    
                    this.reRenderDiagram();
                }

                return;
            
            case 'rerender':

                this.reRenderDiagram();
                return;
        }
        
        // Trying to match and add a next line to the diagram
        for (const pattern in this.diagramGrammar.regexes) {

            const regex = new RegExp(pattern, 'i');
            const match = regex.exec(text);
            if (!!match) {

                var diagramCodeLine = this.diagramGrammar.regexes[pattern];

                for (var i = 1; i < match.length; i++) {

                    const matchWithoutSpaces = match[i].replace(/\s/g, '');

                    diagramCodeLine = diagramCodeLine.replace(new RegExp(`\\$${i}`, 'g'), matchWithoutSpaces);

                    // Also adding node names to the phrase list
                    const phraseList = SpeechSDK.PhraseListGrammar.fromRecognizer(this._recognizer);
                    phraseList.addPhrase(match[i]);
                }

                this.diagramCode += diagramCodeLine + `\n`;
                break;
            }            
        }

        this.reRenderDiagram();
    }
}