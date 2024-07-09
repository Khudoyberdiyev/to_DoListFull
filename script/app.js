const todoListForm = document.querySelector("#todolist__form");
const todoListAdder = document.querySelector(".todolist__adder");
const clearInput = document.querySelector("#clear-input");
const todolistTaskContainer = document.querySelector(
  ".todolist__task-container"
);
const todoListDeleteAll = document.querySelector("#delete-all");
const todolistSorted = document.querySelector("#sort-todo");
const deleteTaskBtn = document.querySelector(".delete-btn");
const searchInput = document.querySelector("#search-tasks");
const SearchClear = document.querySelector(".todoList-search > i");

todoListForm.addEventListener("submit", createNewTasks);

const ALL_TASKS = [];

function createNewTasks(e) {
  e.preventDefault();
  // console.log(todoListAdder.value);
  if (todoListAdder.value.trim().length > 0) {
    const time = new Date();

    let newTask = {
      taskName: todoListAdder.value,
      minutes: time.getMinutes(),
      hours: time.getHours(),
      date: time.getDate(),
      month: time.getMonth() + 1,
      year: time.getFullYear(),
      isCompleted: false,
      isEdited: false,
      generalTimes: time.getMilliseconds(),
    };

    ALL_TASKS.unshift(newTask);

    // console.log(ALL_TASKS);
    renderTasks(ALL_TASKS);

    todoListAdder.value = "";
    todoListAdder.focus();
  }
}

function renderTasks(tasks) {
  const taskFragment = document.createDocumentFragment();
  while (todolistTaskContainer.firstChild) {
    todolistTaskContainer.firstChild.remove();
  }
  if (ALL_TASKS.length > 0) {
    tasks.forEach((taskItem, index) => {
      let taskItemElement = document.createElement("div");
      taskItemElement.className = "todolist__item";
      taskItemElement.setAttribute("idNumber", index);
      taskItemElement.innerHTML = `
       <strong id="editWork" class="${
         taskItem.isCompleted ? "completed-item" : ""
       }">${taskItem.taskName}</strong>
       <div class="todolist__item-btns">
       <button class="check-btn"><i class="bi bi-check-circle-fill"></i> Complete</button>
       <button class="edit-btn"><i class="bi bi-pencil-square"></i><i class="fa-solid fa-check-double"></i> Edit</button>
       <button class="time-btn"><div class="item-date">${addZeroToTime(
         taskItem.date
       )}/${addZeroToTime(taskItem.month)}/${addZeroToTime(
        taskItem.year
      )}</div><i class="bi bi-clock-fill"></i> ${addZeroToTime(
        taskItem.hours
      )} : ${addZeroToTime(taskItem.minutes)}</button>
       <button class="delete-btn"><i class="bi bi-trash"></i> Delete</button>

       </div>
       `;

      taskFragment.appendChild(taskItemElement);
      //    console.log(taskFragment);
    });

    todolistTaskContainer.appendChild(taskFragment);
  } else {
    todolistTaskContainer.innerHTML = "<b>NO TASKS YET</b>";
  }
}
renderTasks();

function addZeroToTime(time) {
  return String(time).padStart(2, "0");
}

todoListDeleteAll.addEventListener("click", () => {
  //delete all tasks
  if (ALL_TASKS.length > 0) {
    var userAgree = confirm("Are you sure you want to delete all tasks?");
  } else {
    alert("You have no tasks at the time.!");
  }
  if (userAgree) {
    ALL_TASKS.splice(0, ALL_TASKS.length);
    renderTasks(ALL_TASKS);
  }
});

todolistSorted.addEventListener("change", () => {
  let sortedList;
  if (todolistSorted.value == "a-z") {
    sortedList = ALL_TASKS.sort((a, b) => {
      if (a.taskName < b.taskName) {
        return -1;
      }
    });
  } else if (todolistSorted.value == "z-a") {
    sortedList = ALL_TASKS.sort((a, b) => {
      if (a.taskName > b.taskName) {
        return -1;
      }
    });
  } else if (todolistSorted.value == "newest") {
    sortedList = ALL_TASKS.sort((a, b) => {
      if (a.generalTimes < b.generalTimes) {
        return -1;
      }
    });
  } else {
    sortedList = ALL_TASKS.sort((a, b) => {
      if (a.generalTimes > b.generalTimes) {
        return -1;
      }
    });
  }
  ALL_TASKS = sortedList
  renderTasks(sortedList);
});

todolistTaskContainer.addEventListener("click", (e) => {
  let indexOfItem = +e.target
    .closest("button")
    .parentElement.parentElement.getAttribute("idNumber");
  if (e.target.closest(".delete-btn")) {
    console.log(indexOfItem);

    ALL_TASKS.splice(indexOfItem, 1);
    renderTasks(ALL_TASKS);
  } else if (e.target.closest(".check-btn")) {
    ALL_TASKS[indexOfItem].isCompleted = !ALL_TASKS[indexOfItem].isCompleted;
    renderTasks(ALL_TASKS);
  }else{
    var strElement =
      e.target.closest(".edit-btn").parentElement.parentElement;
    var parent = strElement.querySelector("#editWork");
    
    if (parent.getAttribute("contenteditable") === "true") {
      parent.setAttribute("contenteditable", "false");
    //   parent.textContent = "Edit First Child";
    } else {
      parent.setAttribute("contenteditable", "true");
      parent.focus();
    //   parent.textContent = "Save First Child";
    }
   
  }
});

// console.log();
// const btnDone = document.querySelector(".edit-btn");
// btnDone.addEventListener("click", () => {
//     btnDone.classList.toggle("active");
//     console.log(e.target.closest(".edit-btn"));
// });



searchInput.addEventListener("keydown", () => {
  const allStrongs = document.querySelectorAll(".todolist__item > strong");
  let inpValue = searchInput.value.toLowerCase();
  allStrongs.forEach((itemName) => {
    if (itemName.textContent.toLowerCase().indexOf(inpValue) == -1) {
      itemName.parentElement.style.display = "none";
    } else {
      itemName.parentElement.style.display = "block";
    }
  });
  
});

clearInput.addEventListener("click", () => {
  todoListAdder.value = "";
});



