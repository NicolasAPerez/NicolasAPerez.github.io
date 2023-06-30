
function loadHeader(){
    document.getElementById("Header").innerHTML = `
        <div style="position: relative" >
            <img src="/ImageAssets/VerdantEclipseTight.png" id="PersonalLogo" draggable="false">
            <a id="RetroButton" onclick="location.href = '/Retro'">
                <p>
                    <span>Switch to</span>
                    <span style="font-family: 'Bookman Old Style',serif">RETRO</span>
                </p>
            </a>
        </div>
        <div id="QuickBar">
            <a class="QuickBarButton" href="/">
                Home
            </a>
            <a class="QuickBarButton" href="/AboutMe">
                About Me
            </a>
            <a class="QuickBarButton" href="/ContactMe">
                Contact Me
            </a>
            <a class="QuickBarButton" href="/Projects">
                Projects
            </a>
            <a class="QuickBarButton" href="/Resume">
                Resume
            </a>
            <a class="QuickBarButton" href="https://github.com/NicolasAPerez/NicolasAPerez.github.io">
                Source Code
            </a>


        </div>
        <hr style="color: white; background-color: white; height: 10px">
        `;
}

document.addEventListener("DOMContentLoaded", (event)=> {

    if (window.self === window.top){
        loadHeader();
    }






});

