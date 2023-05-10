let date;
let updater;
const version = "Alpha";
const appWindows = new Map();



function updateClock(element){
    date = new Date();
    let hour = date.getHours().toLocaleString('en-us', {minimumIntegerDigits: 2});
    let min = date.getMinutes().toLocaleString('en-us', {minimumIntegerDigits: 2});
    let sec = date.getSeconds().toLocaleString('en-us', {minimumIntegerDigits: 2})
    element.innerHTML = `<b>${date.getMonth()}/${date.getDate()}/${date.getFullYear()} <br> ${hour}:${min}:${sec} <br> Version ${version} </b> `;
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

function createBarButton(parentDiv, idName, imageFile){
    let currWindow = appWindows.get(idName);
    currWindow.buttonID = document.getElementById("button").content.firstElementChild.cloneNode(true);
    parentDiv.appendChild(currWindow.buttonID);
    
    currWindow.buttonID.querySelector(".buttonIcon").src = `OS_img/${imageFile}.png`;
    currWindow.buttonID.querySelector(".buttonTitle").innerHTML = camelCaseToName(idName);
    currWindow.buttonID.setAttribute("onclick", `toggleVisible('${idName}')`);
    
    
}

function createWindow(parentDiv, idName, content){
    appWindows.set(idName, {});
    let currWindow = appWindows.get(idName);
    currWindow.windowID = document.getElementById("window").content.firstElementChild.cloneNode(true);
    parentDiv.appendChild(currWindow.windowID);
    
    createBarButton(document.getElementsByClassName("WindowsBar")[0],idName, idName);
    currWindow.windowID.id = idName;
    
    currWindow.windowID.querySelector(".WindowTopOptions").addEventListener("mousedown", (event) =>{
        if (event.button === 0){
            let window = event.target.parentElement;
            if (window.className !== "WindowTotal"){
                window = window.parentElement;
            }
            let left = window.style.left;
            let top = window.style.top;
            left = parseInt(left) || 0;
            top = parseInt(top) || 0;
            left += event.movementX;
            top += event.movementY;
            
            window.style.left = left + "px";
            window.style.top = top + "px";
        }
    })
    currWindow.windowID.querySelector(".buttonIcon").src = `OS_img/${idName}.png`;
    currWindow.windowID.querySelector(".windowTitle").innerHTML = camelCaseToName(idName);
    currWindow.windowID.querySelector(".MinimizeWindow").setAttribute("onclick", `toggleVisible('${idName}')`);
    currWindow.windowID.querySelector(".CloseWindow").setAttribute("onclick", `closeWindow('${idName}')`);
}

function createShortcut(idName, content){
    let shortcut = document.getElementById("shortcut").content.firstElementChild.cloneNode(true);
    document.getElementById("display").appendChild(shortcut);
    
    shortcut.querySelector(".ShortcutIcon").src = `OS_img/${idName}.png`;
    shortcut.querySelector(".ShortcutTitle").innerHTML = camelCaseToName(idName);
    shortcut.setAttribute("onclick", `openWindow('${idName}', '${content}')`);
   
}


function toggleVisible(id){
    let window = appWindows.get(id).windowID;
    window.hidden = !window.hidden;
    
}

function openWindow(id, content){
    if (!appWindows.has(id)){
        createWindow(document.getElementById("display"), id, null);
    }
}
function closeWindow(id){
    if (appWindows.has(id)){
        let tempobj = appWindows.get(id);
        tempobj.windowID.remove();
        tempobj.buttonID.remove();
        appWindows.delete(id);
    }
}

function moveWindow(event){
    
    
    
}

document.addEventListener("DOMContentLoaded", (event)=>{
    
    createShortcut("AboutMe", null)
    
    let clock = document.getElementById("datetime");
    updateClock(clock);
    updater = setInterval(updateClock, 1000, clock);
    
    


});

