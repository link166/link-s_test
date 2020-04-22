let gridDom = document.getElementById("grid")

class Grid {
    constructor() {
        this.map = new Map()
        this.gridwidth = gridDom.offsetWidth
        this.gridheight = gridDom.offsetHeight
        this.flag = 0;
    }
    createGrid() {
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                let chess = new Chess(j, i)
                chess.create()
                this.map.set(chess.div, chess)
            }
        }
    }
}

class Chess {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.div
        this.value = 0
    }
    create() {
        let div = document.createElement("div");
        this.div = div
        div.className = "chess"
        div.style.top = `${this.y*39.5+25-39.5/2}px`
        div.style.left = `${this.x*39.5+25-39.5/2}px`
        gridDom.appendChild(div)
    }
    coloris() {
        return this.div.className.slice(7)
    }
    check() {
        let result = 0;
        let map = grid.map


        return result;
    }
}

let grid = new Grid()
grid.createGrid()
gridDom.onclick = function(e) {
    let target = e.target;
    if (target.className == "chess") {
        switch (grid.flag) {
            case 0:
                target.className += " black";
                grid.flag = 1;
                grid.map.get(target).value = 1
                console.log(grid.map.get(target))
                break;
            case 1:
                grid.flag = 0
                target.className += " white";
                grid.map.get(target).value = 2
                console.log(grid.map.get(target))
                break;
        }
    }
}