function dropHandler(event) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.dataTransfer.files[0];
   
    reader.addEventListener('load', (eventlistener) => {
        const jsonData = eventlistener.target.result;
        localStorage.setItem("jsonData", jsonData)
        console.log(jsonData)
    });

    reader.readAsText(file)

}

function dragOverHandler(event) {
    event.preventDefault();
    var zone = document.getElementById("dragndrop");
    zone.classList.add("hover");
}

function dragLeaveHandler() {
    var zone = document.getElementById("dragndrop");
    zone.classList.remove("hover")
}