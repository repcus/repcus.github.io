function go() {
    if (document.getElementById("student").value != "" && document.getElementById("teacher").value != "") {
        document.getElementById("questions").style.display = "block"
        document.getElementById("first").style.display = "none"
    } else {
        alert("Przed wyruszeniem w drogę, należy zebrać drużynę!")
    }
}