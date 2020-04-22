var canvas = {
    canvas: document.getElementById('mycanvas'),
    ctx: canvas.getContext('2d'),
    clearscreen: document.getElementById("clearscreen"),
    color: document.getElementById("c"),
    r: document.getElementById("r"),
    cleararea: document.getElementById("cleararea"),
    w: document.getElementById("w"),
    dataarr: [],
    setcanvas: () => {
        ctx.lineCap = "round";
    }

}