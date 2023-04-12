enum TaskStatus {
  Incomplete = "Incomplete",
  Complete = "Complete",
}

// Task interface
interface Task {
  name: string;
  completed: TaskStatus;
}

// TaskList interface
interface TaskList {
  tasks: Task[];
  renderTasks(): void;
  addTask(task: Task): void;
  deleteTask(index: number): void;
  editTask(index: number): void;
  toggleCompleted(index: number): void;
}

// BaseTaskList class
class BaseTaskList implements TaskList {
  tasks: Task[] = [];

  renderTasks() {
    throw new Error("Not implemented");
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.renderTasks();
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.renderTasks();
  }

  editTask(index: number) {
    const newTaskName = prompt("Update task name:");
    if (newTaskName !== null && newTaskName.trim() === "") {
      alert("Please enter a task name");
      return;
    }

    if (newTaskName !== null) {
      this.tasks[index].name = newTaskName;
      this.renderTasks();
    }
  }

  toggleCompleted(index: number) {
    this.tasks[index].completed =
      this.tasks[index].completed === TaskStatus.Complete
        ? TaskStatus.Incomplete
        : TaskStatus.Complete;
    this.renderTasks();
  }
}

class TodoList extends BaseTaskList {
  private readonly taskInput: HTMLInputElement;
  private readonly taskList: HTMLUListElement;
  private readonly totalTasks: HTMLSpanElement;
  private completedTasks: HTMLSpanElement; // remove readonly modifier

  constructor(
    taskInputId: string,
    taskListId: string,
    totalTasksId: string,
    completedTasksId: string
  ) {
    super();
    this.taskInput = document.getElementById(taskInputId) as HTMLInputElement;
    this.taskList = document.getElementById(taskListId) as HTMLUListElement;
    this.totalTasks = document.getElementById(totalTasksId) as HTMLSpanElement;
    this.completedTasks = document.getElementById(
      completedTasksId
    ) as HTMLSpanElement;
  }

  renderTasks() {
    // Clear task list
    this.taskList.innerHTML = "";

    // Update total and completed task counts
    const totalTasks = this.tasks.length;
    const completedTasks = this.tasks.filter(
      (task) => task.completed === TaskStatus.Complete
    ).length;
    this.totalTasks.innerText = totalTasks.toString();
    this.completedTasks.innerText = completedTasks.toString();

    // Render each task
    this.tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.classList.add(
        "d-flex",
        "justify-content-between",
        "align-items-center",
        "mb-3",
        "bg-dark",
        "text-light",
        "border-bottom"
      );

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add(
        "form-check-input",
        "me-2",
        "cursor-pointer",
        "link-primary"
      );
      checkbox.checked = task.completed === TaskStatus.Complete;
      checkbox.addEventListener("change", () => this.toggleCompleted(index));
      li.appendChild(checkbox);

      const span = document.createElement("span");
      span.innerText = task.name;
      span.classList.add("me-auto");
      li.appendChild(span);

      const editButton = document.createElement("button");
      editButton.classList.add("btn", "btn-link", "me-2", "btn-edit");
      editButton.innerHTML = `<i class="bi bi-pencil"></i>`;
      editButton.addEventListener("click", () => this.editTask(index));
      li.appendChild(editButton);

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("btn", "btn-link", "btn-delete");
      deleteButton.innerHTML = `<i class="bi bi-trash text-danger"></i>`;
      deleteButton.addEventListener("click", () => this.deleteTask(index));
      li.appendChild(deleteButton);

      this.taskList.appendChild(li);
    });
  }

  addTask() {
    const taskName = this.taskInput.value;
    if (taskName.trim() === "") {
      alert("Please enter a task name");
      return;
    }

    const task: Task = { name: taskName, completed: TaskStatus.Incomplete };
    super.addTask(task);
    this.taskInput.value = "";
  }
}

// Initialize app
const todoList = new TodoList(
  "taskInput",
  "taskList",
  "totalTasks",
  "completedTasks"
);
