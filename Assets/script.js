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

const encryptionKey = "my_secret_key"; // Change this to a secure key

function Save() {
  const encrypted_text = CryptoJS.AES.encrypt(
    tasks.innerHTML,
    encryptionKey
  ).toString();
  localStorage.setItem("Data", encrypted_text);
  console.log("Encrypted:", encrypted_text);
}

LoadSave();
function LoadSave() {
  const encrypted_text = localStorage.getItem("Data");
  if (encrypted_text) {
    const decrypted_bytes = CryptoJS.AES.decrypt(encrypted_text, encryptionKey);
    const decrypted_string = decrypted_bytes.toString(CryptoJS.enc.Utf8);

    if (decrypted_string) {
      tasks.innerHTML = decrypted_string;
      console.log("Decrypted:", decrypted_string);
    } else {
      console.error("Decryption failed!");
    }
  } else {
    console.warn("No saved data found!");
  }
}
