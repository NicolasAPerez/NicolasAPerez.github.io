
let mockOS = {}
let updater;
mockOS.version = "1.0";
mockOS.appWindows = new Map();
let numAppsPerHeight = Math.floor((window.innerHeight - 100) / 125);


//Utility Functions

function updateClock(element){
    mockOS.date = new Date();
    let hour = mockOS.date.getHours().toLocaleString('en-us', {minimumIntegerDigits: 2});
    let min = mockOS.date.getMinutes().toLocaleString('en-us', {minimumIntegerDigits: 2});
    let sec = mockOS.date.getSeconds().toLocaleString('en-us', {minimumIntegerDigits: 2})
    element.innerHTML = `<b>${mockOS.date.getMonth()}/${mockOS.date.getDate()}/${mockOS.date.getFullYear()} <br> ${hour}:${min}:${sec} <br> Version ${mockOS.version} </b> `;
}

function camelCaseToName(camel){
    let newName = camel;
    newName = newName.charAt(0).toUpperCase() + newName.slice(1);

    let slicedName = newName.charAt(0);

    for (let i = 1; i < newName.length; i++){
        if (newName.charAt(i) === newName.charAt(i).toUpperCase()){
            slicedName += " ";
        }
        slicedName += newName.charAt(i);
    }
    return slicedName;
}
function clampNum(minimum, base, maximum){
    return Math.min( Math.max(base, minimum), maximum);
}

function reorgZIndex(startingIndex){
    appWindows.forEach( (value, key) =>{
        let zInd = Number.parseInt(value.windowID.style.zIndex);
        if (zInd > startingIndex){
            value.windowID.style.zIndex = --zInd;
        }
    });
}

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

function selectApp(id, iframe){
    let totalSource = "FrameApps/";

    switch (id) {
        case "Resume": {
            totalSource += "NAP_Resume.pdf";
            break;
        }
        case "Spellbound": {
            totalSource += "SpellboundDEMO/index.html";
            break;
        }
        case "Minesweeper": {
            totalSource += "Minesweeper/index.html";
            iframe.parentElement.style.width = "641px";
            iframe.parentElement.style.height = "809px";
            break;
        }
        case "AboutMe": {
            totalSource = "/AboutMe/index.html";
            break;
        }
        case "ContactMe": {
            totalSource = "/ContactMe/index.html";
            break;
        }
        case "Projects": {
            totalSource = "/Projects/index.html";
            break;
        }
        case "SourceCode" : {
            window.location.href = "https://github.com/NicolasAPerez/NicolasAPerez.github.io";
            return;
        }
        case "SwitchToNormal": {
            window.location.href = "/";
            return;
        }
        default: {
            totalSource += "Loading.gif"
            iframe.draggable = "false";
        }
    }

    iframe.src = totalSource;
}

/*
document.addEventListener("mouseup", (event) =>{
    
    window.removeEventListener("mousemove", moveWindow);
    document.querySelectorAll(".Application").forEach( frame => {
        frame.style.pointerEvents = "auto";
    });
    
    movingWindow = null;
    
});

 */

document.addEventListener("DOMContentLoaded", (event)=>{
    const appWindows = new Map();
    mockOS.totalApps = 0;
    document.querySelector(".Short").appWindows = appWindows;

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
    let clock = document.querySelector(".Clock");
    updateClock(clock);
    updater = setInterval(updateClock, 1000, clock);
    

});

