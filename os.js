const containerDiv = document.querySelector("#container");
const button = document.querySelector("#btn");
button.addEventListener("click", fetchSpecs);

setInterval(() => {
  fetchSpecs();
}, 2000);

function checkType(key, value, parent) {
  const wrapDiv = document.createElement("div");  
  wrapDiv.classList.add("wrapdiv");

  if (typeof value === "object" && value !== null) {

    const label = document.createElement("strong"); 
    label.textContent = `${key}`; 

    wrapDiv.appendChild(label);

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        checkType(`[${index}]`, item, wrapDiv);
      });
    } else {
      for (const [obKey, obVal] of Object.entries(value)) {
        checkType(obKey, obVal, wrapDiv);
      }
    }
  } else {
    wrapDiv.textContent = `${key} - ${value}`;
  }
  parent.appendChild(wrapDiv);
}

function fetchSpecs() {
  fetch("http://localhost:3000/spec/os")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data[0]);
      containerDiv.textContent = "";
      for (const [key, value] of Object.entries(data)) {
        checkType(key.toLocaleUpperCase(), value, containerDiv);
        console.log(containerDiv);
      }
    })
    .catch((err) => {
      console.log(`Error :${err}`);
    });
}
fetchSpecs();
