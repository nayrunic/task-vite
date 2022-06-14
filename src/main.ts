import './style.css'
import { Task } from './task.interface'

const form = document.getElementById("#taskForm") as HTMLFormElement;
const taskList = document.getElementById("#taskList") as HTMLDivElement;
let tasks: Task[] = [];

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputTitle = document.getElementById("#title") as HTMLInputElement;
  const description = document.getElementById("#description") as HTMLTextAreaElement;

  tasks.push({
    title: inputTitle?.value,
    description: description?.value
  });

  localStorage.setItem('task', JSON.stringify(tasks));
  form.reset();
  inputTitle.focus();
  renderTask();
})

document.addEventListener("DOMContentLoaded", () => {
  tasks = JSON.parse(localStorage.getItem('task') || "[]");
  renderTask();
})


function renderTask (){
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.className = "grid bg-zinc-800 mb-1 rounded-lg hover:bg-blue-600 hover:cursor-pointer p-4"
    const title = document.createElement('span');
    title.innerHTML = task.title;
    const description = document.createElement('div');
    description.className = "bg-slate-200 mb-1 rounded-md text-black p-1 my-5"
    description.innerHTML = task.description;
    const btnDelete = document.createElement('button');
    btnDelete.innerHTML = 'Delete'
    btnDelete.className = "bg-red-500 px-2 py-1 rounded-md w-1/5"
    btnDelete.addEventListener('click', () => {
      const index = tasks.findIndex((t) => t.title === task.title);
      tasks.splice(index, 1);
      localStorage.setItem("task", JSON.stringify(tasks));
      renderTask();
    });

    taskElement.append(title);
    taskElement.append(description);
    taskElement.append(btnDelete);
    taskList.append(taskElement);
  })
}



