const elements = Array.from(document.querySelectorAll('body *'));
let elementIndex = 0;
let listLength = 0;
let lastElement = null;

function readElement(element) {
    const text = element.innerText || element.textContent;

    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
        event.preventDefault();

        if(elementIndex > 0){ //validacion necesaria para quitar estilos a elemento anterior
            if(lastElement.tagName == "UL"){
                lastElement.className = "not-focused";
            }
            elements[elementIndex - 1].className = "not-focused";
        }

        lastElement = elements[elementIndex];
        elements[elementIndex].className = "is-focused"; //estilo para elemento actual
        readElement(elements[elementIndex]);

        if(elements[elementIndex].tagName == "UL"){
            lastElement = elements[elementIndex];
            listLength = lastElement.children.length;
            return elementIndex += listLength + 1;
        }
        
        return elementIndex = (elementIndex + 1) % elements.length;
    }
});
