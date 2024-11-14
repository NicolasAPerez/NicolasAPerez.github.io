let mockOS = {}
mockOS.version = "1.0";
mockOS.appWindows = new Map();
mockOS.appFileData = new Map();
mockOS.z_Stack = [];
mockOS.imageLocation = "";
mockOS.appLocation = "";

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
            mockOS.z_Stack[i].setAttribute("z-index", i);
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

mockOS.accessApp = function (appID){

}


mockOS.startup = function (imageLocation, appLocation){
    mockOS.imageLocation = imageLocation;
    mockOS.appLocation = appLocation;
    mockOS.addWindowMouseUpEvent();

    let clock = document.querySelector(".Clock");
    mockOS.updateClock(clock);

}