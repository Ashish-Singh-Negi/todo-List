import "./style.css";

const input = document.getElementById("userTask") as HTMLInputElement;
const form = document.querySelector("form") as HTMLFormElement;
const searchForm = document.getElementById("searchForm") as HTMLFormElement;
const userSearch = document.getElementById("userSearch") as HTMLInputElement;
const toDoContainer = document.querySelector(
  ".todoContainer"
) as HTMLDivElement;

interface Todo {
  title: string;
  isComplted: boolean;
}

const toDos: Todo[] = [];

form.onsubmit = (e) => {
  e.preventDefault();

  toDos.push({
    title: input.value,
    isComplted: false,
  });

  input.value = "";
  addTask(toDos, "todoTask");
};

searchForm.onsubmit = (e) => {
  e.preventDefault();

  toDoContainer.innerText = "";
  toDos.forEach((item, index) => {
    if (item.title === userSearch.value) {
      const isClass = "founded";
      renderTasks(item.title, item.isComplted, index, isClass);
    } else {
      renderTasks(item.title, item.isComplted, index);
    }
  });
  userSearch.value = "";
};

const renderTasks = (
  title: string,
  isComplted: boolean,
  index: number,
  isClass: string = "todoTask"
) => {
  // creating todoContainer

  const toDoDiv = document.createElement("div");
  toDoDiv.className = isClass;

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.className = "checkBox";
  checkbox.checked = isComplted;
  checkbox.onchange = () => {
    toDos.find((item, indx) => {
      if (indx === index) item.isComplted = checkbox.checked;
    });
    para.className = checkbox.checked ? "cutpara" : "";
  };

  const para = document.createElement("p");
  para.innerText = title;
  para.className = isComplted ? "cutpara" : "";

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "X";
  deleteBtn.onclick = () => {
    toDos.splice(index, 1);
    addTask(toDos, "todoTask");
  };

  toDoDiv.append(checkbox, para, deleteBtn);
  toDoContainer.append(toDoDiv);
};

const addTask = (arr: Todo[], isClass: string) => {
  toDoContainer.innerText = "";
  arr.forEach((item, index) => {
    renderTasks(item.title, item.isComplted, index, isClass);
  });
};
