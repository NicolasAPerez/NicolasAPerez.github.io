const mockOS = {}
mockOS.version = "1.0";
mockOS.appWindows = new Map();
mockOS.appFileData = new Map();
mockOS.z_Stack = [];
mockOS.shortcutContainer = null;
mockOS.windowContainer = null;
mockOS.taskbarContainer = null;
mockOS.imageLocation = "";
mockOS.appLocation = "";


mockOS.insertAppData = function (name, image, app){
    let id = mockOS.appFileData.size;
    mockOS.appFileData.set(id, {app_id: id,  name: name, img: image, app: app});
    return mockOS.appFileData.get(id);
}

mockOS.insertShortcuts = function (){
    mockOS.appFileData.forEach( (app) => {
        let shortcut = document.createElement("window-shortcut");
        shortcut.setAttribute("id", "Shortcut_" + app.app_id);
        shortcut.setAttribute("app-id", app.app_id);
        shortcut.setAttribute("name", app.name);

        mockOS.shortcutContainer.appendChild(shortcut);
    });
}

mockOS.updateClock = function (element){
    mockOS.date = new Date();
    let hour = mockOS.date.getHours().toLocaleString('en-us', {minimumIntegerDigits: 2});
    let min = mockOS.date.getMinutes().toLocaleString('en-us', {minimumIntegerDigits: 2});
    let sec = mockOS.date.getSeconds().toLocaleString('en-us', {minimumIntegerDigits: 2})
    element.innerHTML = `<b>${mockOS.date.getMonth()}/${mockOS.date.getDate()}/${mockOS.date.getFullYear()} <br> ${hour}:${min}:${sec} <br> Version ${mockOS.version} </b> `;
}

mockOS.reorgZIndex = function (topApp = null){
    if (mockOS.z_Stack.at(mockOS.z_Stack.length-1) !== topApp) {
        mockOS.z_Stack.splice(mockOS.z_Stack.indexOf(topApp), 1);

        if (topApp != null) {
            mockOS.z_Stack.push(topApp);
        }

        for (let i = 0; i < mockOS.z_Stack.length; i++) {
            mockOS.z_Stack[i].setAttribute("z-index", i + 1);
        }
    }
}

mockOS.addWindowMouseUpEvent = function () {
    document.addEventListener("mouseup", (event) => {
        if (mockOS.movingWindow) {

            window.removeEventListener("mousemove", mockOS.movingWindow.moveWindow);
            mockOS.appWindows.forEach(app => {
                app.setAttribute("frame-events", "true")
            });
            mockOS.movingWindow.setAttribute("selected-app", "false")
            mockOS.movingWindow = null;
        }

    });
}



mockOS.getIcon = function (appID){
    return `${mockOS.imageLocation}${mockOS.appFileData.get(appID).img}`;
}

//Use if not using iframes to display images
mockOS.getAppHTML = function (appID){
    let appFile = `${mockOS.appLocation}${mockOS.appFileData.get(appID).app}`;
    let extension = appFile.split('.').pop();
    let AppHTML = "";
    switch (extension){
        case "png":
        case "jpg":
        case "gif":
            AppHTML = `<img src="${appFile}" slot="Application">`
            break;
        case "pdf":
            AppHTML = `<object data="${appFile}" type="application/pdf" slot="Application">Item Failed to Display!</object>`;
            break;
        case "html":
        default:
            AppHTML = `<iframe src="${appFile}" slot="Application" scrolling="yes"></iframe>`
            break;

    }

    return AppHTML;

}


mockOS.startup = function (shortcutContainer, windowContainer, taskbarContainer, imageLocation = "", appLocation = ""){
    mockOS.shortcutContainer = shortcutContainer;
    mockOS.windowContainer = windowContainer;
    mockOS.taskbarContainer = taskbarContainer;
    mockOS.imageLocation = imageLocation;
    mockOS.appLocation = appLocation;
    mockOS.addWindowMouseUpEvent();

    mockOS.clock = document.querySelector(".Clock");
    mockOS.updateClock(mockOS.clock);
    let updater = setInterval(mockOS.updateClock, 1000, mockOS.clock);


}

export default mockOS;