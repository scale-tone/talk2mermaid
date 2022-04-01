# Talk2Mermaid

![image](https://user-images.githubusercontent.com/5447190/161311404-5375cfa7-8645-4655-8626-469f5520d142.png)

This is a Proof-of-Concept, that demonstrates the idea of converting human speech into diagrams.

Today there are many beautiful tools and libraries, that implement the principle of *diagrams-as-code*. [Mermaid](https://github.com/mermaid-js/mermaid) is a great example of such library.

This PoC takes a step further and, instead of typing the code of your diagram, it allows to **pronounce** it in plain English, line-by-line. Then it converts your phrases into [Mermaid](https://github.com/mermaid-js/mermaid) code, and then the code is rendered in form of a diagram.
[Azure Cognitive Services Speech Service](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/speech-to-text) is used to recognize the speech.
