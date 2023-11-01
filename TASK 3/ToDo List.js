window.addEventListener('load', () => {
    const form = document.querySelector("#input-group");
    const input = document.querySelector("#input-field");
    const list_el = document.querySelector("#tasks");
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  

    function saveTasksToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
 
    function createTaskElement(taskText) {
      const task_el = document.createElement("div");
      task_el.classList.add("task");
  
      const task_content_el = document.createElement("div");
      task_content_el.classList.add("content");
      task_el.appendChild(task_content_el);
  
      const task_input_el = document.createElement("input");
      task_input_el.classList.add("text");
      task_input_el.type = "text";
      task_input_el.value = taskText;
      task_input_el.setAttribute("readonly", "readonly");
      task_content_el.appendChild(task_input_el);
  
      const task_functions_el = document.createElement("div");
      task_functions_el.classList.add("functions");
  
      const task_edit_el = document.createElement("button");
      task_edit_el.classList.add("edit");
      task_edit_el.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
  
      const task_delete_el = document.createElement("button");
      task_delete_el.classList.add("delete");
      task_delete_el.innerHTML = '<i class="fa-solid fa-trash"></i>';
  
      task_functions_el.appendChild(task_edit_el);
      task_functions_el.appendChild(task_delete_el);
      task_el.appendChild(task_functions_el);
  
      task_edit_el.addEventListener('click', () => {
        if (task_edit_el.innerHTML.toLowerCase() === '<i class="fa-regular fa-pen-to-square"></i>') {
          task_edit_el.innerHTML = '<i class="fa-solid fa-check" style="color: #00ADB5;"></i>';
          task_input_el.removeAttribute("readonly");
          task_input_el.focus();
        } else {
          task_edit_el.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
          task_input_el.setAttribute("readonly", "readonly");

          const taskIndex = tasks.indexOf(taskText);
          if (taskIndex !== -1) {
            tasks[taskIndex] = task_input_el.value;
            saveTasksToLocalStorage();
          }
        }
      });
  
      task_delete_el.addEventListener('click', () => {
        list_el.removeChild(task_el);
        const taskIndex = tasks.indexOf(taskText);
        if (taskIndex !== -1) {
          tasks.splice(taskIndex, 1);
          saveTasksToLocalStorage();
        }
      });
  
      return task_el;
    }
    tasks.forEach((taskText) => {
      const task_el = createTaskElement(taskText);
      list_el.appendChild(task_el);
    });
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const task = input.value;
      if (!task) {
        alert("Please enter a task first");
        return;
      }
  
      const task_el = createTaskElement(task);
      list_el.appendChild(task_el);
 
      tasks.push(task);
      saveTasksToLocalStorage();
  
      input.value = "";
    });
  });
  