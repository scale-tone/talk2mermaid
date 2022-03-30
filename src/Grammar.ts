
export type DiagramGrammar = {
    
    startLine: string;

    variations: { [r: string]: string };

    phraseList: string[];

    regexes: { [r: string]: string };

    hint: string;
}

export const FullGrammar = {

    flowchart: {

        startLine: 'flowchart',

        hint: `e.g. 'Alice calls Bob'`,

        variations: {
            'lefttoright': 'LR',
            'toptobottom': 'TB',
        },

        phraseList: [
            'rectangle', 'ellipse', 'subroutine', 'database', 'circle', 'hexagon', 'rhombus',
            'sub graph', 'sub graph end',
            'calls', 'is related to', 'references', 'uses'
        ],

        regexes: {
            'rectangle (.+)': '$1["$1"]',
            'ellipse (.+)': '$1(["$1"])',
            'subroutine (.+)': '$1[["$1"]]',
            'database (.+)': '$1[("$1")]',
            'circle (.+)': '$1(("$1"))',
            'hexagon (.+)': '$1{{"$1"}}',
            'rhombus (.+)': '$1{"$1"}',
            'subgraph end': 'end',
            'sub graph end': 'end',
            'subgraph (.+)': 'subgraph $1',
            'sub graph (.+)': 'subgraph $1',
            '(.+) calls (.+)': '$1 --> $2',
            '(.+) is related to (.+)': '$1 --- $2',
            '(.+) references (.+)': '$1 -.-> $2',
            '(.+) uses (.+)': '$1 ==> $2',
        }

    } as DiagramGrammar,

    sequenceDiagram: {

        startLine: 'sequenceDiagram',

        hint: `e.g. 'Alice sends Bob a message: Hello'`,

        variations: {},

        phraseList: [
            'participant', 'actor',
            'sends', 'a message', 'responds to', 'activate', 'deactivate',
            'loop', 'loop end', 'if', 'else', 'if end', 'parallel', 'parallel end'
        ],

        regexes: {

            'participant (.+)': 'participant $1',
            'actor (.+)': 'actor $1',
            '(.+) sends (.+) a message\.? ?(.*)': '$1 ->> $2: $3',
            '(.+) responds to (.+) with a message\.? ?(.*)': '$1 -->> $2: $3',
            'deactivate (.+)': 'deactivate $1',
            'activate (.+)': 'activate $1',

            'loop end': 'end',
            'loop (.+)': '$1',

            'if end': 'end',
            'if (.+)': 'alt $1',
            'else (.+)': 'else $1',

            'parallel end': 'end',
            'parallel (.+)': 'par $1',
        }

    } as DiagramGrammar
};
