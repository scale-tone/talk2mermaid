# Talk2Mermaid

<img src="https://user-images.githubusercontent.com/5447190/161311404-5375cfa7-8645-4655-8626-469f5520d142.png" width="700px"/>

This is a Proof-of-Concept, that demonstrates the idea of converting human speech into diagrams.

Today there are many beautiful tools and libraries, that implement the principle of *diagrams-as-code*. [Mermaid](https://github.com/mermaid-js/mermaid) is a great example of such library.

This PoC takes a step further and, instead of typing the code of your diagram, it allows to **pronounce** it in plain English, line-by-line. Then it converts your phrases into [Mermaid](https://github.com/mermaid-js/mermaid) code, and then the code is rendered in form of a diagram.
[Azure Cognitive Services Speech Service](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/speech-to-text) is used to recognize the speech.

## Live Demo

https://green-dune-06f281403.1.azurestaticapps.net/

## How to use

* Open the app in your browser (either by using the live demo, deploying your own copy to Azure or running it locally on your devbox).
* Press 'Start Recognizing'.
* Allow the page to use your microphone, if the page asks for that permission.
* **Pronounce** the diagram type you'd like to create. So far the following are supported:
  * [Flowchart](https://mermaid-js.github.io/mermaid/#/flowchart). You can also say 'Flowchart left-to-right' or 'Flowchart top-to-bottom'.
  * [Sequence Diagram](https://mermaid-js.github.io/mermaid/#/sequenceDiagram).
  
  The diagram header should appear in the code window on the left.

* Now start pronouncing the diagram code, line by line. The full supported syntax is defined [in this file](https://github.com/scale-tone/talk2mermaid/blob/master/src/Grammar.ts#L15). See some sample phrases below. Once a line is recognized, it is added to the diagram code on the left, and the diagram is re-rendered.

### Sample phrases for a Flowchart
 
  * **'Bob calls Charlie'** (defines two nodes 'Bob' and 'Charlie' and a solid arrow between them):

     <img src="https://user-images.githubusercontent.com/5447190/161318180-e6afa649-c666-4e9b-948c-cde16fd64819.png" width=250px/>

  * **'Charlie references Debbie'** (defines two nodes 'Charlie' and 'Debbie' and a dotted arrow between them):

     <img src="https://user-images.githubusercontent.com/5447190/161318583-7266c5ce-bde0-42c7-8b21-0ddf5bd72f21.png" width=250px/>

  * **'Hexagon Frontend'** (defines a hexagon-shaped node called 'Frontend'):

     <img src="https://user-images.githubusercontent.com/5447190/161318983-def7fa85-e5ca-40b6-afd8-e9c131fd7ec3.png" width=300px/>

  * **'Database MyDB'** (defines a cylinder-shaped node called 'MyDB'): 

     <img src="https://user-images.githubusercontent.com/5447190/161319624-7877963c-8283-4f12-8324-71249965d1cb.png" width=300px/>

  * **'Subgraph Backend, Rectangle MyService, Subraph End'** (defines a subgraph called 'Backend' with a node called 'MyService' in it): 

     <img src="https://user-images.githubusercontent.com/5447190/161320691-fd506fa3-420c-49a6-985e-7ce6a37c685c.png" width=300px/>


### Sample phrases for a Sequence Diagram.
