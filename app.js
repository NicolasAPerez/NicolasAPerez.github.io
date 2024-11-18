import windowManager, {default as mockOS} from "./WindowManager.js";
let updater;
let numAppsPerHeight = Math.floor((window.innerHeight - 100) / 125);


//Utility Functions







//Element Functions

function createBarButton(parentDiv, idName, imageFile){
    let currWindow = appWindows.get(idName);
    currWindow.buttonID = document.getElementById("button").content.firstElementChild.cloneNode(true);
    parentDiv.appendChild(currWindow.buttonID);

    currWindow.buttonID.querySelector(".buttonIcon").src = `./OS_img/${imageFile}.png`;
    currWindow.buttonID.querySelector(".buttonTitle").innerHTML = camelCaseToName(idName);
    currWindow.buttonID.setAttribute("onclick", `toggleVisible('${idName}')`);
}

/*
function createWindow(parentDiv, idName, content){
    appWindows.set(idName, {});
    let currWindow = appWindows.get(idName);
    currWindow.windowID = document.getElementById("window").content.firstElementChild.cloneNode(true);
    parentDiv.appendChild(currWindow.windowID);

    createBarButton(document.getElementsByClassName("WindowsBar")[0],idName, idName);
    currWindow.windowID.id = idName;
    currWindow.windowID.style.top = "5px";
    currWindow.windowID.style.left = "5px";
    currWindow.windowID.style.zIndex = appWindows.size - 1;

    currWindow.windowID.querySelector(".WindowTopOptions").addEventListener("mousedown", (event) =>{
        window.addEventListener("mousemove", moveWindow);
        appWindows.get(idName).mouseRelX = event.clientX - parseInt(event.currentTarget.parentElement.style.left);
        appWindows.get(idName).mouseRelY = event.clientY - parseInt(event.currentTarget.parentElement.style.top);
        document.querySelectorAll(".Application").forEach( frame => {
            frame.style.pointerEvents = "none";
        });

        reorgZIndex(Number.parseInt(appWindows.get(idName).windowID.style.zIndex));
        appWindows.get(idName).windowID.style.zIndex = appWindows.size - 1;

        if (!movingWindow){
            movingWindow = idName;
        }

    })

    selectApp(idName, currWindow.windowID.querySelector(".Application"));
    currWindow.windowID.querySelector(".buttonIcon").src = `./OS_img/${idName}.png`;
    currWindow.windowID.querySelector(".windowTitle").innerHTML = camelCaseToName(idName);
    currWindow.windowID.querySelector(".MinimizeWindow").setAttribute("onclick", `toggleVisible('${idName}')`);
    currWindow.windowID.querySelector(".CloseWindow").setAttribute("onclick", `closeWindow('${idName}')`);
}

function createShortcut(idName, content){
    let shortcut = document.getElementById("shortcut").content.firstElementChild.cloneNode(true);
    document.getElementById("display").appendChild(shortcut);
    shortcut.style.top = (totalApps % numAppsPerHeight * 125) + "px";
    shortcut.style.left = (Math.floor(totalApps / numAppsPerHeight) * 100) + "px";

    shortcut.querySelector(".ShortcutIcon").src = `./OS_img/${idName}.png`;
    shortcut.querySelector(".ShortcutTitle").innerHTML = camelCaseToName(idName);
    shortcut.setAttribute("onclick", `openWindow('${idName}', '${content}')`);

    mockOS.totalApps++;

}

function toggleVisible(id){
    let window = appWindows.get(id).windowID;
    window.hidden = !window.hidden;

}



function closeWindow(id){
    if (appWindows.has(id)){
        let tempobj = appWindows.get(id);
        reorgZIndex(Number.parseInt(tempobj.windowID.style.zIndex));
        tempobj.windowID.remove();
        tempobj.buttonID.remove();
        appWindows.delete(id);
    }
}

 */

/*
function moveWindow(event){
    if (event.button === 0){
        let pane = document.getElementById(movingWindow);
        if (pane.className === "WindowTotal") {

            let left = event.clientX - appWindows.get(movingWindow).mouseRelX;
            let top = event.clientY - appWindows.get(movingWindow).mouseRelY;

            left = clampNum(0, left, window.innerWidth - pane.offsetWidth);
            top = clampNum(0, top, window.innerHeight - pane.querySelector(".WindowTopOptions").offsetHeight - document.querySelector(".WindowsBar").offsetHeight);
            pane.style.left = left + "px";
            pane.style.top = top + "px"
        }
    }
}
 */

function insertApps(){
    mockOS.insertAppData("Testing App", "AboutMe.png", "Loading.gif");
    mockOS.insertAppData("Testing App 2", "AboutMe.png", "Loading.gif");


}





document.addEventListener("DOMContentLoaded", (event)=>{
    let app_container = document.querySelector(".Background");
    let shortcut_container = document.querySelector(".Shortcut_container");
    let taskbar_container = document.querySelector(".TaskBar");
    mockOS.startup(shortcut_container, app_container, taskbar_container, "./ImageAssets/AppIcons/", "./Apps/FrameApps/");
    insertApps();
    mockOS.insertShortcuts();



    //Insert Applications
    /*
    createShortcut("SwitchToNormal", null);
    createShortcut("AboutMe", null);
    createShortcut("ContactMe", null);
    createShortcut("Projects", null);
    createShortcut("Resume", null);
    createShortcut("SourceCode", null);
    createShortcut("Minesweeper", null);
    createShortcut("Spellbound", null);


    //Bar Z Index update

    document.querySelector(".WindowsBar").style.zIndex = totalApps;

     */
    //Clock Functions



});

