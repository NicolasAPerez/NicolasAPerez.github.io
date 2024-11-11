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

class TaskBarButton extends HTMLElement{
    static observedAttributes = ["name", "app"]
    constructor() {
        super();
        let template = document.getElementById("TaskBarButton");
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

class Shortcut extends HTMLElement{
    static observedAttributes = ["name", "icon", "app-id"]

    #appWindows;
    app_id;

    set appWindows(value){
        this.#appWindows = value;

    }


    openWindow(){
        if (!appWindows.has(this.app_id)){
            console.log(this.app_id);

        }
    }

    constructor() {
        super();
        let template = document.getElementById("Shortcut");
        let templateContent = template.content;

        const shadowRoot = this.attachShadow({mode: "open"});
        shadowRoot.appendChild(templateContent.cloneNode(true));

    }
    connectedCallback(){
        this.shadowRoot.querySelector(".Shortcut").onclick = this.openWindow;
    }

    attributeChangedCallback(name, oldValue, newValue){
        switch (name){
            case "name":
                this.shadowRoot.querySelector(".ShortcutTitle").innerHTML = newValue;
                break;
            case "icon":
                this.shadowRoot.querySelector(".ShortcutIcon").src = `./ImageAssets/AppIcons/${newValue}.png`;
                break;
            case "app-id":
                this.app_id = parseInt(newValue);
                break;
        }
    }
}


function defineComponents(){
    customElements.define("app-window", AppWindow);
    customElements.define("taskbar-button", TaskBarButton);
    customElements.define("window-shortcut", Shortcut);

}

defineComponents();
export default defineComponents;