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


//Generic insert for locations of data, name, and image files
//Command function available for Apps that do not want to open an App-Window element
//Could theoretically implement similarly with type checks and putting functions in the app property
//But I prefer to keep types static if possible
mockOS.insertAppData = function (name, image, app, commandFunction = null){
    let id = mockOS.appFileData.size;
    mockOS.appFileData.set(id, {app_id: id,  name: name, img: image, app: app, commandFunction: commandFunction});
    return mockOS.appFileData.get(id);
}

//Creates Shortcut elements based on current AppFileData list and adds them to ShortcutContainer
//TODO: Delete Shortcuts on call to allow for refreshes with additional items in list
mockOS.insertShortcuts = function (){
    mockOS.appFileData.forEach( (app) => {
        let shortcut = document.createElement("window-shortcut");
        shortcut.setAttribute("id", "Shortcut_" + app.app_id);
        shortcut.setAttribute("app-id", app.app_id);
        shortcut.setAttribute("name", app.name);

        mockOS.shortcutContainer.appendChild(shortcut);
    });
}

//Handles updating the clock for the taskbar
mockOS.updateClock = function (element){
    mockOS.date = new Date();
    let hour = mockOS.date.getHours().toLocaleString('en-us', {minimumIntegerDigits: 2});
    let min = mockOS.date.getMinutes().toLocaleString('en-us', {minimumIntegerDigits: 2});
    let sec = mockOS.date.getSeconds().toLocaleString('en-us', {minimumIntegerDigits: 2})
    element.innerHTML = `<b>${mockOS.date.getMonth()}/${mockOS.date.getDate()}/${mockOS.date.getFullYear()} <br> ${hour}:${min}:${sec} <br> Version ${mockOS.version} </b> `;
}

//Reorganizes the currently open windows and pushes TopApp to the front if not null
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

mockOS.resetWindowLocations = function (){
    mockOS.appWindows.forEach( (app) => {
        app.resetWindowLocation();
    });
}

//Handles the MouseUp event used in "Window Dragging" functionality
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


//Returns the file location of the requested App's icon
mockOS.getIcon = function (appID){
    return `${mockOS.imageLocation}${mockOS.appFileData.get(appID).img}`;
}

//Returns an element of the App's data based on it's type
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

mockOS.getCommandFunction = function (appID){
    return mockOS.appFileData.get(appID).commandFunction;
}

//Startup function, sets useful variables like various file locations,
//CALL THIS BEFORE USE
//TODO: Potentially move this to be a constructor and remake as a class?
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