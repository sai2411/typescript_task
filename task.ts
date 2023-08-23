const texts: Set<string> = new Set();
function create(textin: string): void {
    const container: HTMLElement | null = document.getElementById("task-list");
    if (texts.has(textin)) {
        alert("!Tasks already entered");
        return;
    }
    texts.add(textin);
    const field: HTMLDivElement = document.createElement("div");
    field.className = "field";
    const checking: HTMLInputElement = document.createElement("input");
    checking.type = "checkbox";
    const textout: HTMLInputElement = document.createElement("input");
    textout.type = "text";
    textout.value = textin;
    textout.readOnly = true;
    const dropdown: HTMLSelectElement = document.createElement("select");
    const options: string[] = ["Todo", "In Progress", "Completed"];
    for (const option of options) {
        const optionElement: HTMLOptionElement = document.createElement("option");
        optionElement.text = option;
        dropdown.appendChild(optionElement);
    }
    dropdown.addEventListener("change", () => {
        if (dropdown.value === "Completed") {
            checking.checked = true;
            texts.delete(textin);
            textout.classList.add("striker");
        }
    });

    const deleteButton: HTMLButtonElement = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", () => {
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

const addButton: HTMLButtonElement | null = document.getElementById("add-button") as HTMLButtonElement;

if (addButton) {
    addButton.addEventListener("click", () => {
        const userText: string = (document.getElementById("user_input") as HTMLInputElement).value.trim();
        if (userText !== "") {
            create(userText);
        } else {
            alert("Tasks should not be empty");
        }
    });
}

const searchtext: HTMLInputElement | null = document.getElementById("textsearch") as HTMLInputElement;

if (searchtext) {
    searchtext.addEventListener("input", () => {
        const searchText: string = searchtext.value.trim().toLowerCase();
        const taskContainers: NodeListOf<HTMLDivElement> = document.querySelectorAll(".field ");

        taskContainers.forEach(container => {
            const textField: HTMLInputElement = container.querySelector("input[type='text']") as HTMLInputElement;
            const shouldDisplay: boolean = textField.value.toLowerCase().includes(searchText);
            container.style.display = shouldDisplay ? "block" : "none";
        });
    });
}
