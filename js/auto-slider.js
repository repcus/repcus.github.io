
window.onload= ()=>{
    sections = document.querySelectorAll(".section");
    document.addEventListener('scroll', ()=>{
        console.log(sections[1])
        sections[1].scrollIntoView({behavior: "smooth", block: "start"});
    })
}
