const input = document.getElementById("Input");
const tasks = document.getElementById("Tasks");

// Create item if enter is pressed on input
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    AddItem();
  }
});

// Create item
function AddItem() {
  if (input.value === "") {
    console.log("No content in input");
  } else {
    addItems(input.value)
  }
  input.value = "";
}

// Create Item
function addItems(item) {
  let li = document.createElement("li");
  li.innerHTML = item;
  tasks.appendChild(li);

  let span = document.createElement("span");
  span.innerHTML = "&#10005;";
  li.appendChild(span);
  Save();
}

// if item is clicked check item or remove it
tasks.addEventListener("click", function (click) {
  if (click.target.tagName == "LI") {
    click.target.classList.toggle("Cheked");
    Save();
  } else if (click.target.tagName == "SPAN") {
    click.target.parentElement.remove();
    Save();
  }
});

// encrypt and saves the data in the to-do list to localstorage
const encryptionKey = "my_secret_key"; // Change this to a secure key

function Save() {
  const encrypted_text = CryptoJS.AES.encrypt(
    tasks.innerHTML,
    encryptionKey
  ).toString();
  localStorage.setItem("Data", encrypted_text);
}

LoadSave();
function LoadSave() {
  const encrypted_text = localStorage.getItem("Data");
  if (encrypted_text) {
    const decrypted_bytes = CryptoJS.AES.decrypt(encrypted_text, encryptionKey);
    const decrypted_string = decrypted_bytes.toString(CryptoJS.enc.Utf8);

    if (decrypted_string) {
      tasks.innerHTML = decrypted_string;
    } else {
      console.error("Decryption failed!");
    }
  } else {
    console.warn("No saved data found!");
  }
}

// saves the data in the to-do list to localstorage
// function Save() {
//   localStorage.setItem("Data", tasks.innerHTML);
// }

// function LoadSave() {
//   tasks.innerHTML = localStorage.getItem("Data");
// }

// Darkmode
if (localStorage.getItem("Darkmode") == null) {
  localStorage.setItem("Darkmode", false);
} else if (localStorage.getItem("Darkmode") == "true") {
  DarkMode();
  localStorage.setItem("Darkmode", true);
}
function DarkMode() {
  document.getElementById("DarkMode").classList.toggle("fa-moon-o");
  document.getElementById("DarkMode").classList.toggle("fa-sun-o");
  document.getElementById("container").classList.toggle("Darkcontainer");
  document.getElementById("body").classList.toggle("DarkBody");

  if (localStorage.getItem("Darkmode") == "false") {
    localStorage.setItem("Darkmode", true);
  } else if (localStorage.getItem("Darkmode") == "true") {
    localStorage.setItem("Darkmode", false);
  }
}

// import to-do's from json
// fetch("Assets/data.json")
//   .then((Response) => Response.json())
//   .then((data) => {
//     data.ToDo.forEach((element) => {
//       console.log(element);
//       let li = document.createElement("li");
//       li.innerHTML = element;
//       tasks.appendChild(li);

//       let span = document.createElement("span");
//       span.innerHTML = "&#10005;";
//       li.appendChild(span);
//       Save();
//     });
//   });

// Ai random item
async function Random() {
  const apiKey = ""; // API KEY
  const apiUrl = "https://api.mistral.ai/v1/chat/completions";

  const prompt =
    "Give a random short one sentence task for a to-do list (only the task and short anser, without qoutation marks or an ordered list or something just plane text).";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "mistral-tiny",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 50,
      temperature: 0.9,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error API-Request:", response.statusText, errorText);
    return;
  }

  const data = await response.json();
  const task = data.choices[0].message.content.trim();

  addItems(task)
}
