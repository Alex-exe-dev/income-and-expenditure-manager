function dropHandler(event) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.dataTransfer.files[0];
   
    reader.addEventListener('load', (eventlistener) => {
        const jsonData = eventlistener.target.result;
        localStorage.setItem("jsonData", jsonData);
        dragLeaveHandler();
    });

    reader.readAsText(file)

}

function dragOverHandler(event) {
    event.preventDefault();
    var zone = document.getElementById("dragndrop");
    zone.classList.add("dragHover");
    document.getElementById("headLine").innerHTML = "Loslassen zum Einfügen"
}

function dragLeaveHandler() {
    var zone = document.getElementById("dragndrop");
    zone.classList.remove("dragHover");
    document.getElementById("headLine").innerHTML = "Tabellarische Ansicht"
}