var w = new Worker('test1.js');

w.onmessage = function(e) {
    document.getElementsByTagName('div')[0].innerHTML = e.data;
    if (e.data == 10) {
        w.terminate();
    }
}