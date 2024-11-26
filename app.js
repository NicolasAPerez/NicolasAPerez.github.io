import windowManager, {default as mockOS} from "./WindowManager.js";



function insertApps(){
    mockOS.insertAppData("About Me", "AboutMe.png", "AboutMe.html");
    mockOS.insertAppData("Contact Me", "ContactMe.png", "ContactMe.html");
    mockOS.insertAppData("CV", "Resume.png", "NAP_CV_Internet.pdf");
    mockOS.insertAppData("Minesweeper", "Minesweeper.png", "Minesweeper/index.html");
    mockOS.insertAppData("Spellbound Demo", "Spellbound.png","SpellboundDEMO/index.html");
}




document.addEventListener("DOMContentLoaded", (event)=>{
    let app_container = document.querySelector(".Background");
    let shortcut_container = document.querySelector(".Shortcut_container");
    let taskbar_container = document.querySelector(".TaskBar");
    mockOS.startup(shortcut_container, app_container, taskbar_container, "./ImageAssets/AppIcons/", "./Apps/");
    insertApps();
    mockOS.insertShortcuts();

    let text = document.getElementById("openOSAlert");
    let date = "2024-11-19"; //Fallback
    if (text) {

        fetch("https://api.github.com/repos/NicolasAPerez/NicolasAPerez.github.io/commits").then(res => {
            if (res.ok) {
                res.json().then(data => {
                    date = data[0].commit.committer.date;
                    date = new Date(date).toLocaleDateString("en-US");
                    if (text) {
                        text.innerHTML += date;
                    }
                });
            } else {
                date = new Date(date).toLocaleDateString("en-US");
                if (text) {
                    text.innerHTML += date;
                }
            }
        });
    }
});

