const clothesFolder = "images/clothes/"
const clothes = ["dress1.svg", "dress2.svg", "pants1.svg", "pants2.svg", "shirt1.svg", "shirt2.svg", "shoes1.svg", "shoes2.svg", "shoes3.svg", "glasses1.svg", "glasses2.svg"]

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("item", ev.target.id);
}

function dress(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("item");
    let item = document.getElementById(data);
    changeDressClass(item);
    let harperBox = document.querySelector(".harper-box");
    harperBox.appendChild(document.getElementById(data));
}

function undress(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("item");
    let item = document.getElementById(data);
    changeDressClass(item);

    for (let piece in clothes) {
        if (data.localeCompare(clothes[piece]) == 0) {
            let storageBox = document.getElementById("box" + piece);
            storageBox.appendChild(document.getElementById(data))
            break;
        }
    }
}

function validate() {
    let harperBox = document.querySelector(".harper-box");
    let children = harperBox.children;
    let childNodes = Array.from(children);
    if ((childNodes.find(c => c.id.localeCompare("shirt2.svg") == 0) &&
        childNodes.find(c => c.id.localeCompare("pants1.svg") == 0) &&
        childNodes.find(c => c.id.localeCompare("shoes1.svg") == 0) &&
        childNodes.find(c => c.id.localeCompare("glasses1.svg") == 0) && childNodes.length == 4) ||
        (childNodes.find(c => c.id.localeCompare("glasses2.svg") == 0)) &&
        childNodes.find(c => c.id.localeCompare("shoes2.svg")) && childNodes.length == 2) {
        console.log("Correct");
        document.querySelector("#correct-result").style.display = "block";
    } else {
        console.log("Incorrect");
        document.querySelector("#false-result").style.display = "block";
    }
    loadClothes();
}

function loadClothes() {
    let wardrobe = document.querySelector(".wardrobe");
    wardrobe.innerHTML = "";
    for (let piece in clothes) {
        let garment = document.createElement("img");
        garment.className = "garment";
        garment.draggable = true;
        garment.src = clothesFolder + clothes[piece]
        garment.ondragstart = drag;
        garment.id = clothes[piece]

        if (clothes[piece].startsWith("dress")) {
            garment.className = "dress";
        } else if (clothes[piece].startsWith("pants")) {
            garment.className = "pants";
        } else if (clothes[piece].startsWith("shirt")) {
            garment.className = "shirt";
        } else if (clothes[piece].startsWith("shoes")) {
            garment.className = "shoes";
            if (clothes[piece].localeCompare("shoes2.svg") == 0 || clothes[piece].localeCompare("shoes3.svg") == 0) {
                garment.className = "boots";
            }
        } else if (clothes[piece].startsWith("glasses")) {
            garment.className = "glasses";
            if (clothes[piece].localeCompare("glasses1.svg") == 0) {
                garment.className = "round-glasses";
            }
        }

        let storageBox = document.createElement("div");
        storageBox.className = "storageBox";
        storageBox.setAttribute("id", "box" + piece);
        storageBox.style.backgroundImage = "url(" + garment.src + ")";
        storageBox.style.backgroundRepeat = "no-repeat";
        storageBox.style.height = garment.naturalHeight + "px";
        storageBox.style.width = garment.naturalWidth + "px";
        storageBox.ondragover = allowDrop;
        storageBox.ondrop = undress;

        storageBox.appendChild(garment);
        wardrobe.appendChild(storageBox);
    }
}

function reset() {
    let harperBox = document.querySelector(".harper-box");
    harperBox.innerHTML = "";
    document.querySelector("#correct-result").style.display = "none";
    document.querySelector("#false-result").style.display = "none";
    loadClothes();
}

function changeDressClass(item) {
    switch (item.className) {
        case "dress":
            changeClass(item, "dress", "dressed-dress");
            break;
        case "dressed-dress":
            changeClass(item, "dressed-dress", "dress");
            break;
        case "pants":
            changeClass(item, "pants", "dressed-pants");
            break;
        case "dressed-pants":
            changeClass(item, "dressed-pants", "pants");
            break;
        case "shirt":
            changeClass(item, "shirt", "dressed-shirt");
            break;
        case "dressed-shirt":
            changeClass(item, "dressed-shirt", "shirt");
            break;
        case "shoes":
            changeClass(item, "shoes", "dressed-shoes");
            break;
        case "dressed-shoes":
            changeClass(item, "dressed-shoes", "shoes");
            break;
        case "boots":
            changeClass(item, "boots", "dressed-boots");
            break;
        case "dressed-boots":
            changeClass(item, "dressed-boots", "boots");
            break;
        case "glasses":
            changeClass(item, "glasses", "dressed-glasses");
            break;
        case "dressed-glasses":
            changeClass(item, "dressed-glasses", "glasses");
            break;
        case "round-glasses":
            changeClass(item, "round-glasses", "dressed-round-glasses");
            break;
        case "dressed-round-glasses":
            changeClass(item, "dressed-round-glasses", "round-glasses");
            break;
        default: console.log("None");
    }
}

function changeClass(item, oldClass, newClass) {
    item.classList.remove(oldClass);
    item.classList.add(newClass);
}
