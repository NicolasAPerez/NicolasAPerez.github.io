class AppWindow extends HTMLElement{
    static observedAttributes = ["name", "app", "zindex"]
    constructor() {
        super();
        let template = document.getElementById("AppWindow");
        let templateContent = template.content;

        const shadowRoot = this.attachShadow({mode: "open"});
        shadowRoot.appendChild(templateContent.cloneNode(true));
    }

    attributeChangedCallback(name, oldValue, newValue){
        switch (name){
            case "name":
                this.shadowRoot.querySelector(".AppWindowTitleString").innerHTML = newValue;
                break;
            case "app":
                break;
            case "zindex":
                this.shadowRoot.querySelector(".AppWindow").style.zIndex = newValue;
        }
    }
}



function defineComponents(){
    customElements.define("app-window", AppWindow);
}

defineComponents();
export default defineComponents;