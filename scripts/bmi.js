window.onload = () => {
    let button = document.querySelector("#BMIbutton");
    button.addEventListener("click", BMI);
};

function BMI() {
    let height = parseInt(document.querySelector("#wzrost").value)
    let weigth = parseInt(document.querySelector("#waga").value)
    let result = weigth / height ** 2
    document.getElementById("BMItext").style.visibility = "visible"
    document.getElementById("BMI").textContent = (result * 10000).toFixed(2)
}