# Talk2Mermaid

<img src="https://user-images.githubusercontent.com/5447190/161311404-5375cfa7-8645-4655-8626-469f5520d142.png" width="700px"/>

This is a Proof-of-Concept, that demonstrates the idea of converting human speech into diagrams.

Today there are many beautiful tools and libraries, that implement the principle of *diagrams-as-code*. [Mermaid](https://github.com/mermaid-js/mermaid) is a great example of such library.

This PoC takes a step further and, instead of typing the code of your diagram, it allows to **pronounce** it in plain English, line by line. Then it converts your phrases into [Mermaid](https://github.com/mermaid-js/mermaid) code, and then the code is rendered in form of a diagram.
[Azure Cognitive Services Speech Service](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/speech-to-text) is used to recognize the speech.

The project here is a typical React SPA (Single-Page App) written in TypeScript and intended to be deployed as an [Azure Static Web App](https://docs.microsoft.com/en-us/azure/static-web-apps/overview).

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

  * **'Alice sends Bob a message: "Hello"'**: 

     <img src="https://user-images.githubusercontent.com/5447190/161321128-8cda788f-bbc6-4f4b-9a74-0a71e8ed49d1.png" width=300px/>

  * **'Bob responds to Alice with a message: "Goodbye"'**: 

     <img src="https://user-images.githubusercontent.com/5447190/161321372-5f983ea7-41b4-4bc7-ba0a-a496102b0fb6.png" width=300px/>

  * **'Actor Charlie'** (defines a human-shaped participant): 

     <img src="https://user-images.githubusercontent.com/5447190/161321586-0e31cfdd-476e-4205-8815-1118f0c4e7b7.png" width=200px/>
     
  * **'Loop NonStop, Charlie sends Charlie a message: "Thinking", Loop End'** (defines a message to self wrapped with a loop): 

     <img src="https://user-images.githubusercontent.com/5447190/161322405-f2deb073-3baf-4a60-9e39-9ffd27b72a9d.png" width=200px/>

## How run locally

1. Clone the sources onto your devbox.
2. Get yourself an [Azure Cognitive Services](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/speech-to-text) instance.
3. Update the `CognitiveServicesSubscriptionKey` and `CognitiveServicesRegion` settings in [/api/local.settings.json](https://github.com/scale-tone/talk2mermaid/blob/master/api/local.settings.json#L7) file with your values.
4. Make sure the subscription key will never be committed.
5. Go to the [project root folder](https://github.com/scale-tone/talk2mermaid) and execute this:

    ```
    npm install
    npm run start-with-backend
    ```
    
    The code will be compiled and started at http://localhost:3000. A browser tab with that page should open up automatically, but if not, then navigate to http://localhost:3000 with your browser.


## How run deploy to Azure

1. Fork this repo (cloning is not enough, because Static Web Apps deployment process needs write access to your GitHub repo).
2. Create an Azure Static Web App instance and deploy your cloned code there with [any of the approaches described here](https://docs.microsoft.com/en-us/azure/static-web-apps/getting-started?tabs=react).
3. Configure `CognitiveServicesSubscriptionKey` and `CognitiveServicesRegion` settings for your Static Web Apps instance:

  <img src="https://user-images.githubusercontent.com/5447190/161324274-90c22da8-6bdc-4819-8063-fceb18e157fd.png" width=600px/>

4. Navigate to the root page of your Static Web Apps instance.
