const input = document.getElementById("Input");
const tasks = document.getElementById("Tasks");

function AddItem() {
  if (input.value === "") {
    console.log("No content in input");
  } else {
    let li = document.createElement("li");
    li.innerHTML = input.value;
    tasks.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "&#10005;";
    li.appendChild(span);
    Save();
  }
  input.value = "";
}

tasks.addEventListener("click", function (click) {
  if (click.target.tagName == "LI") {
    click.target.classList.toggle("Cheked");
    Save();
  } else if (click.target.tagName == "SPAN") {
    click.target.parentElement.remove();
    Save();
  }
});

function Save() {
  localStorage.setItem("Data", tasks.innerHTML);
}

LoadSave();
function LoadSave() {
  tasks.innerHTML = localStorage.getItem("Data");
}
