class AppWindow extends HTMLElement{
    static observedAttributes = ["id", "name", "app","active-app", "selected-app", "z-index", "frame-events"]
    taskBarButton;
    mouseRelX;
    mouseRelY;

    createTaskbarButton(){

    }

    moveWindowEventApplier(){

    }
    moveWindow(event){
        if (event.button === 0){
            let pane = mockOS.movingWindow;
            let left = event.clientX - pane.mouseRelX;
            let top = event.clientY - pane.mouseRelY;

            left = clampNum(0, left, window.innerWidth - pane.offsetWidth);
            top = clampNum(0, top, window.innerHeight - pane.offsetHeight);
            this.shadowRoot.querySelector(".AppWindow").style.left = left + "px";
            this.shadowRoot.querySelector(".AppWindow").style.top = top + "px"

        }
    }

    constructor() {
        super();
        let template = document.getElementById("AppWindow");
        let templateContent = template.content;

        const shadowRoot = this.attachShadow({mode: "open"});
        shadowRoot.appendChild(templateContent.cloneNode(true));
    }

    connectedCallback(){
        this.shadowRoot.querySelector(".AppWindow").style.top = "10px";
        this.shadowRoot.querySelector(".AppWindow").style.left = "10px";


        this.shadowRoot.querySelector(".AppWindowTitleBar").addEventListener("mousedown", (event) =>{
            this.mouseRelX = event.clientX - parseInt(event.currentTarget.parentElement.style.left);
            this.mouseRelY = event.clientY - parseInt(event.currentTarget.parentElement.style.top);
            document.querySelectorAll("app-window").forEach( frame => {
                frame.setAttribute("frame-events", "false");
            });

            //reorgZIndex(Number.parseInt(appWindows.get(idName).windowID.style.zIndex));
            this.setAttribute("z-index", mockOS.appWindows.size.toString())

            if (this !== mockOS.movingWindow){
                mockOS.movingWindow = this;
            }
            this.setAttribute("selected-app", "true");

        })
    }

    attributeChangedCallback(name, oldValue, newValue){
        switch (name){
            case "name":
                this.shadowRoot.querySelector(".AppWindowTitleString").innerHTML = newValue;
                break;
            case "app":
                break;
            case "z-index":
                this.shadowRoot.querySelector(".AppWindow").style.zIndex = newValue;
                break;
            case "selected-app":
                if (newValue === "true"){
                    window.addEventListener("mousemove", this.moveWindow.bind(this));
                }
                else {
                    window.removeEventListener("mousemove", this.moveWindow);
                }
                break;
            case "frame-events":
                if (newValue === "true"){
                    this.shadowRoot.querySelector(".Application").style.pointerEvents = "auto";
                }
                else {
                    this.shadowRoot.querySelector(".Application").style.pointerEvents = "none";
                }

        }
    }
}

class TaskBarButton extends HTMLElement{
    static observedAttributes = ["id", "name", "app"]
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
    static observedAttributes = ["id", "name", "icon", "app-id"]

    app_id;
    name;


    openMockWindow(){
        if (!mockOS.appWindows.has(this.app_id)){
            let window = document.createElement("app-window")
            mockOS.appWindows.set(this.app_id, window);
            document.querySelector(".Background").appendChild(window);
            window.setAttribute("id", "Window_" + this.app_id);
            window.setAttribute("name", this.name);
            window.setAttribute("active-app", "true");
            window.setAttribute("z-index", mockOS.appWindows.size.toString())


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
        this.shadowRoot.querySelector(".Shortcut").setAttribute("onclick",`${this.getAttribute("id")}.openMockWindow()`);
    }

    attributeChangedCallback(name, oldValue, newValue){
        switch (name){
            case "name":
                this.shadowRoot.querySelector(".ShortcutTitle").innerHTML = newValue;
                this.name = newValue;
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