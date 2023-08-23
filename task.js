var texts = new Set();
function create(textin) {
    var container = document.getElementById("task-list");
    if (texts.has(textin)) {
        alert("!Tasks already entered");
        return;
    }
    texts.add(textin);
    var field = document.createElement("div");
    field.className = "field";
    var checking = document.createElement("input");
    checking.type = "checkbox";
    var textout = document.createElement("input");
    textout.type = "text";
    textout.value = textin;
    textout.readOnly = true;
    var dropdown = document.createElement("select");
    var options = ["Todo", "In Progress", "Completed"];
    for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
        var option = options_1[_i];
        var optionElement = document.createElement("option");
        optionElement.text = option;
        dropdown.appendChild(optionElement);
    }
    dropdown.addEventListener("change", function () {
        if (dropdown.value === "Completed") {
            checking.checked = true;
            texts.delete(textin);
            textout.classList.add("striker");
        }
    });
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", function () {
        if (container) {
            container.removeChild(field);
            texts.delete(textin);
        }
    });
    field.appendChild(checking);
    field.appendChild(textout);
    field.appendChild(dropdown);
    field.appendChild(deleteButton);
    if (container) {
        container.appendChild(field);
    }
}
var addButton = document.getElementById("add-button");
if (addButton) {
    addButton.addEventListener("click", function () {
        var userText = document.getElementById("user_input").value.trim();
        if (userText !== "") {
            create(userText);
        }
        else {
            alert("Tasks should not be empty");
        }
    });
}
var searchtext = document.getElementById("textsearch");
if (searchtext) {
    searchtext.addEventListener("input", function () {
        var searchText = searchtext.value.trim().toLowerCase();
        var taskContainers = document.querySelectorAll(".field ");
        taskContainers.forEach(function (container) {
            var textField = container.querySelector("input[type='text']");
            var shouldDisplay = textField.value.toLowerCase().includes(searchText);
            container.style.display = shouldDisplay ? "block" : "none";
        });
    });
}
