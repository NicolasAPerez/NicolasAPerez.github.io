import windowManager, {default as mockOS} from "./WindowManager.js";



function insertApps(){
    mockOS.insertAppData("Testing App", "AboutMe.png", "Loading.gif");
    mockOS.insertAppData("Testing App 2", "AboutMe.png", "Loading.gif");
    mockOS.insertAppData("Resume Test", "Resume.png", "NAP_Resume.pdf");
}

function lastUpdatedOn(){
    let text = document.getElementById("openOSAlert");
    let date = "2024-11-19"; //Fallback
    fetch("https://api.github.com/repos/NicolasAPerez/NicolasAPerez.github.io/commits").then(res => {
        if (res.ok){
            res.json().then(data =>{
                date = data[0].commit.committer.date;
                date = new Date(date).toLocaleDateString("en-US");
                text.innerHTML += date;
            });
        }
        else {
            date = new Date(date).toLocaleDateString("en-US");
            text.innerHTML += date;
        }
    });


}





document.addEventListener("DOMContentLoaded", (event)=>{
    let app_container = document.querySelector(".Background");
    let shortcut_container = document.querySelector(".Shortcut_container");
    let taskbar_container = document.querySelector(".TaskBar");
    mockOS.startup(shortcut_container, app_container, taskbar_container, "./ImageAssets/AppIcons/", "./Apps/");
    insertApps();
    mockOS.insertShortcuts();
    lastUpdatedOn();



});

