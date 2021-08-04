let orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
console.log(orientation);
if (orientation === 'portrait-primary' || orientation === 'portrait-secondary') {
    document.getElementById("pic1").src = './img/OBR.svg';
    document.getElementById("pic2").src = './img/OBR.svg';
}
window.onorientationchange = function(event) {
    orien = event.target.screen.orientation.angle;
    if (orien === 0 || orien === 180) {
        document.getElementById("pic1").src = './img/OBR.svg';
        document.getElementById("pic2").src = './img/OBR.svg';
    } else if (orien === 90 || orien === 270) {
        document.getElementById("pic1").src = './img/P1.PNG';
        document.getElementById("pic2").src = './img/P2.PNG';
    }
};