//* HTML element
var nameinput = document.getElementById("NameInput");
var cotegryinput = document.getElementById("Cotegryinput");
var priceinput = document.getElementById("PriceInput");
var descriptioninput = document.getElementById("Descriptioninput");
var imageinput = document.getElementById("imageinput");
var productcontenar = document.getElementById("ProductContenar");
var inputsearch = document.getElementById("inputsearch");
var add = document.getElementById("add");
var Edite = document.getElementById("Edite");

// ! app varibals
var ProdactList = JSON.parse(localStorage.getItem("item")) || [];
displayprodactall();
// ! function
function AddProduct() {
  if (Validation(NameRegex, nameinput) &&
    Validation(CotegryRegex, cotegryinput) &&
    Validation(PriceRegex, priceinput) &&
    Validation(DescriptionRegex, descriptioninput) &&
    imageinput.value !== ""
  ) {
    // var file = imageinput.files[0];
    // var imageURL = URL.createObjectURL(file);
    var prodact = {
      name: nameinput.value,
      cotegry: cotegryinput.value,
      price: priceinput.value,
      description: descriptioninput.value,
      // image: imageURL
      image: "./assets/images/" + imageinput.files[0].name,
    }
    ProdactList.push(prodact);
    localStorage.setItem("item", JSON.stringify(ProdactList));
    DisplayProdact(ProdactList.length - 1);
    ClearForm()
  }
  else {
    alert("Fuch youe")
  }

}
function DisplayProdact(index) {
  var cardHTML = `
          <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="inner my-3">
              <img
                src="${ProdactList[index].image}"
                class="w-100 rounded-2"
                alt="noth"
              />
              <div class="d-flex justify-content-between mt-1">
                <h2 class="h5">${ProdactList[index].name}</h2>
                <div><span>${ProdactList[index].price}</span>
                <i class="fa-solid fa-dollar-sign"></i></div>
              </div>
              <div class="d-flex gap-2 mt-1">
                <i class="fa-solid fa-tag"></i>
                <h2 class="h6">${ProdactList[index].cotegry}</h2>
              </div>
              <div>
              <p class="h6 text-wrap text-break">${ProdactList[index].description.replace(/\n/g, "<br>")}</p>
              </div>
              <button class="btn btn-outline-warning" onclick="UpdateCard(${index})">Update</button>
              <button class="btn btn-outline-danger" onclick="DeleteCard(${index})">Delete</button>
            </div>
          </div>
        `;
  productcontenar.innerHTML += cardHTML;
}
function displayprodactall() {
  for (var i = 0; i < ProdactList.length; i++) {
    DisplayProdact(i);
  }
}
function ClearForm() {
  var prodact_claer = {
    name: nameinput.value = "",
    cotegry: cotegryinput.value = "",
    price: priceinput.value = "",
    description: descriptioninput.value = "",
    image: imageinput.value = ""
  }
  var prodact_claer_icon = {
    name: nameinput.classList.remove("is-valid"),
    cotegry: cotegryinput.classList.remove("is-valid"),
    price: priceinput.classList.remove("is-valid"),
    description: descriptioninput.classList.remove("is-valid"),
    image: imageinput.value = ""
  }
}
function DeleteCard(index) {
  // ! delete product form prodactlist 
  ProdactList.splice(index, 1);
  // ! update localstorge prodacts
  localStorage.setItem("item", JSON.stringify(ProdactList));
  // ! delete HTML from prodacts
  productcontenar.innerHTML = "";
  displayprodactall();
}
function searchInput() {
  productcontenar.innerHTML = "";
  for (var i = 0; i < ProdactList.length; i++) {
    if (ProdactList[i].name.toLowerCase().includes(inputsearch.value.toLowerCase())) {
      DisplayProdact(i);
    }
  }
}

var NameRegex = /^[A-Z](-)?[a-z\s]{3,}$/
var CotegryRegex = /^[A-Z](-)?[a-z\s]{3,}$/
var PriceRegex = /^\d{1,30001}[^/*-+=()&^%$#@!~]$/
var DescriptionRegex = /^[a-z\s]{25,}$/i

function Validation(Regex, element) {
  if (Regex.test(element.value)) {
    element.classList.add("is-valid")
    element.classList.remove("is-invalid")
    element.nextElementSibling.nextElementSibling.classList.add("d-none")
    return true
  }
  else if (element.value == "") {
    element.nextElementSibling.nextElementSibling.classList.add("d-none")
    element.classList.remove("is-invalid")
    element.classList.remove("is-valid")
  }
  else {
    element.classList.add("is-invalid")
    element.classList.remove("is-valid")
    element.nextElementSibling.nextElementSibling.classList.remove("d-none")
    return false
  }
  add.addEventListener("click", function () {
    // element.classList.remove("is-invalid")
    // element.classList.remove("is-valid")
    console.log("elkatry");
  })
}


var zindex;
function UpdateCard(index) {
  zindex = index;
  nameinput.value = ProdactList[index].name;
  cotegryinput.value = ProdactList[index].cotegry;
  priceinput.value = ProdactList[index].price;
  descriptioninput.value = ProdactList[index].description;
  add.classList.add("d-none")
  Edite.classList.remove("d-none")
}

function EditeProdact() {
  if (Validation(NameRegex, nameinput) &&
    Validation(CotegryRegex, cotegryinput) &&
    Validation(PriceRegex, priceinput) &&
    Validation(DescriptionRegex, descriptioninput)) {
    ProdactList[zindex].name = nameinput.value;
    ProdactList[zindex].cotegry = cotegryinput.value;
    ProdactList[zindex].price = priceinput.value;
    ProdactList[zindex].description = descriptioninput.value;
    if (imageinput.files.length > 0) {
      // var file = imageinput.files[0];
      // var imageURL = URL.createObjectURL(file);
      ProdactList[zindex].image = "./assets/images/" + imageinput.files[0].name;
    }
    localStorage.setItem("item", JSON.stringify(ProdactList));
    productcontenar.innerHTML = "";
    displayprodactall();
    add.classList.remove("d-none")
    Edite.classList.add("d-none")
    ClearForm()
  }
  else {
    alert = "fuce you agein";
  }
}
//! code for line validtion



// function ValidateCotegry() {
//   if (CotegryRegex.test(cotegryinput.value)) {
//     cotegryinput.classList.remove("is-invalid")
//     cotegryinput.classList.add("is-valid")
//   }
//   else {
//     cotegryinput.classList.remove("is-valid")
//     cotegryinput.classList.add("is-invalid")
//   }
// }

