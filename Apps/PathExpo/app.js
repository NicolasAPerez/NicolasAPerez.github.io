
const colors = {cell: "#f0f0f0",
    travelled: "#b4b4b4",
    path: "#79bb6c",
    current: "#99ec89",
    home: "#86d3a1",
    target: "#fff093",
    impass: "#000000"
}




class PathFinderSim{
    canvas;
    map;
    ctx;
    xRatio;
    yRatio;
    strokeWeight = 12;
    home;
    target;
    
    
    
    
    constructor(map, canvas, method, home, target) {
        if (!Array.isArray(map) || !Array.isArray(map[0])){
            throw new Error("Map is not in the correct format");
        }
        this.map = map;
        this.canvas = canvas;
        this.canvas.setAttribute("width", canvas.parentElement.offsetWidth);
        this.canvas.setAttribute("height", canvas.parentElement.offsetHeight);
        this.ctx = canvas.getContext("2d");
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0, canvas.width, canvas.height);
        this.home = home;
        this.target = target;
        
        this.xRatio = this.canvas.width/this.map.length;
        this.yRatio = this.canvas.height/this.map[0].length;
    }
    
    fillCell(x, y, color, value = 0){
        this.ctx.fillStyle = (value >= 0)? color : colors.impass;
        
        this.ctx.fillRect(x * this.xRatio + this.strokeWeight,y * this.yRatio + this.strokeWeight,
            this.xRatio - this.strokeWeight*2, this.yRatio - this.strokeWeight*2);

        this.ctx.font = this.xRatio/5 + "px sans-serif";
        this.ctx.fillStyle = "black";

        this.ctx.fillText(value.toString(), x * this.xRatio + this.xRatio/2.2, y * this.yRatio + this.yRatio/1.8)



    }
    
    initializeBoard(){
        for (let i = 0; i < this.map.length; i++){
            for (let j = 0; j < this.map[i].length; j++){
                this.fillCell(i, j, colors.cell, this.map[j][i]);
            }
        }
        this.fillCell(this.home.x, this.home.y, colors.home, this.map[this.home.y][this.home.x]);
        this.fillCell(this.target.x, this.target.y, colors.target, this.map[this.target.y][this.target.x]);
        
    }
    
}

let test = new PathFinderSim([[0,2,0],[-1,5,0],[-1,0,0]], document.querySelector("canvas"),
    "test", {x:0, y:0}, {x:2, y:2});
test.initializeBoard();