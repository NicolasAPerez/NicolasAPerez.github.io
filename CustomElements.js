import {default as mockOS} from "./WindowManager.js";
import {default as Toolkit} from "./Toolkit.js";

class AppWindow extends HTMLElement{
    static observedAttributes = ["id", "name", "app-id","active-app", "selected-app", "z-index", "frame-events"]
    taskBarButton;
    mouseRelX;
    mouseRelY;
    app_id;

    createTaskbarButton(){
        let task = document.createElement("taskbar-button")
        mockOS.taskbarContainer.appendChild(task);
        this.taskBarButton = task;
        task.setAttribute("id", "Taskbar_" + this.app_id);
        task.setAttribute("app-id", this.app_id);
        task.setAttribute("name", this.name);
        task.attachedWindow = this;

    }

    closeWindow(event){
        if (this === mockOS.movingWindow){
            mockOS.movingWindow = null;
        }
        mockOS.appWindows.delete(this.app_id);
        mockOS.z_Stack.splice(mockOS.z_Stack.indexOf(this), 1);
        mockOS.reorgZIndex();
        this.taskBarButton.remove();
        this.remove();
    }

    minimizeWindow(event){
        this.setAttribute("active-app", "false");
    }

    unMinimizeWindow(){
        this.setAttribute("active-app", "true")
    }

    holdingWindow(event){
        if (event.target.className !== "TitleBarOptionsButton") {
            this.mouseRelX = event.clientX - parseInt(event.currentTarget.parentElement.style.left);
            this.mouseRelY = event.clientY - parseInt(event.currentTarget.parentElement.style.top);
            mockOS.appWindows.forEach(app => {
                app.setAttribute("frame-events", "false")
            });

            mockOS.reorgZIndex(this);
            this.setAttribute("z-index", mockOS.appWindows.size.toString())

            if (this !== mockOS.movingWindow) {
                mockOS.movingWindow = this;
            }
            this.setAttribute("selected-app", "true");
        }
    }

    moveWindow(event){
        if (event.button === 0 && mockOS.movingWindow && this === mockOS.movingWindow){
            let pane = mockOS.movingWindow;
            let left = event.clientX - pane.mouseRelX;
            let top = event.clientY - pane.mouseRelY;

            left = Toolkit.clampNum(0, left, window.innerWidth - pane.offsetWidth);
            top = Toolkit.clampNum(0, top, window.innerHeight - pane.offsetHeight);
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
        this.createTaskbarButton();
        this.shadowRoot.querySelector(".AppWindow").style.top = "10px";
        this.shadowRoot.querySelector(".AppWindow").style.left = "10px";



        this.shadowRoot.querySelector(".AppWindowTitleBar").addEventListener("mousedown", this.holdingWindow.bind(this));
        this.shadowRoot.querySelector("#close").addEventListener("click", this.closeWindow.bind(this));
        this.shadowRoot.querySelector("#minimize").addEventListener("click", this.minimizeWindow.bind(this));

    }

    attributeChangedCallback(name, oldValue, newValue){
        switch (name){
            case "name":
                this.shadowRoot.querySelector(".AppWindowTitleString").innerHTML = newValue;
                this.taskBarButton.setAttribute("name", newValue);
                break;
            case "app-id":
                this.app_id = parseInt(newValue);
                if (this.app_id || this.app_id === 0) {
                    this.shadowRoot.querySelector(".TitleBarIcon").src = mockOS.getIcon(this.app_id);
                    this.taskBarButton.setAttribute("app-id", newValue);
                    this.taskBarButton.setAttribute("id", "Taskbar_" + this.app_id);
                }
                break;
            case "z-index":
                this.shadowRoot.querySelector(".AppWindow").style.zIndex = newValue;
                break;
            case "active-app":
                if (newValue === "true"){
                    this.hidden = false;
                }
                else {
                    this.hidden = true;
                }

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
                break;

        }
    }
}

class TaskBarButton extends HTMLElement{
    static observedAttributes = ["id", "name", "app-id"]
    app_id;
    name;
    attachedWindow;

    toggleWindow(){
        if (this.attachedWindow.getAttribute("active-app") === "true"){
            this.attachedWindow.minimizeWindow();
        }
        else {
            this.attachedWindow.unMinimizeWindow();
        }
    }

    constructor() {
        super();
        let template = document.getElementById("TaskBarButton");
        let templateContent = template.content;

        const shadowRoot = this.attachShadow({mode: "open"});
        shadowRoot.appendChild(templateContent.cloneNode(true));
    }

    connectedCallback(){
        this.setAttribute("style", "height: 100%");
        this.shadowRoot.querySelector(".TaskBarButton").addEventListener("click", this.toggleWindow.bind(this));

    }

    attributeChangedCallback(name, oldValue, newValue){
        switch (name){
            case "name":
                this.shadowRoot.querySelector(".TBTitle").innerHTML = newValue;
                this.name = newValue;
                break;
            case "app-id":
                this.app_id = parseInt(newValue);
                if (this.app_id || this.app_id === 0) {
                    this.shadowRoot.querySelector(".TBIcon").src = mockOS.getIcon(this.app_id);
                }
                break;
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
            mockOS.z_Stack.push(window);
            mockOS.windowContainer.appendChild(window);
            window.setAttribute("id", "Window_" + this.app_id);
            window.setAttribute("app-id", this.app_id);
            window.setAttribute("name", this.name);
            window.setAttribute("active-app", "true");
            window.setAttribute("z-index", mockOS.appWindows.size.toString());
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
        this.shadowRoot.querySelector(".Shortcut").addEventListener("click", this.openMockWindow.bind(this));
    }

    attributeChangedCallback(name, oldValue, newValue){
        switch (name){
            case "name":
                this.shadowRoot.querySelector(".ShortcutTitle").innerHTML = newValue;
                this.name = newValue;
                break;
            case "app-id":
                this.app_id = parseInt(newValue);
                if (this.app_id || this.app_id === 0) {
                    this.shadowRoot.querySelector(".ShortcutIcon").src = mockOS.getIcon(this.app_id);
                }
                break;
        }
    }
}

class Alert extends HTMLElement{
    static observedAttributes = ["id", "checkSession"]


    closeAlertWindow(){
        if (this.getAttribute("checkSession") === "true"){
            sessionStorage.setItem(this.id + "_seen", "true")
        }
        this.remove();
    }

    constructor() {
        super();
        if (!(this.getAttribute("checkSession") === "true") || !(sessionStorage.getItem(this.id + "_seen") === "true")) {
            let template = document.getElementById("Alert");
            let templateContent = template.content;

            const shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(templateContent.cloneNode(true));
        }
        else {
            this.remove();
        }
    }

    connectedCallback(){
        if (!this.getAttribute("id")){
            this.setAttribute("id", "Alert_" + document.querySelectorAll("alert-window").length)
        }
        if (this.shadowRoot) {
            this.shadowRoot.querySelector(".AlertClose").addEventListener("click", this.closeAlertWindow.bind(this));
        }
    }
}

function defineComponents(){
    customElements.define("app-window", AppWindow);
    customElements.define("taskbar-button", TaskBarButton);
    customElements.define("window-shortcut", Shortcut);
    customElements.define("alert-window", Alert)

}

defineComponents();
export default defineComponents;