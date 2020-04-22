var i = 1;

function timecunt() {
    i++;
    postMessage(i);
    setTimeout(() => {
        timecunt()
    }, 1000);
}

timecunt();