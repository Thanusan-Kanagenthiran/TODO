var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["Incomplete"] = "Incomplete";
    TaskStatus["Complete"] = "Complete";
})(TaskStatus || (TaskStatus = {}));
// BaseTaskList class
var BaseTaskList = /** @class */ (function () {
    function BaseTaskList() {
        this.tasks = [];
    }
    BaseTaskList.prototype.renderTasks = function () {
        throw new Error("Not implemented");
    };
    BaseTaskList.prototype.addTask = function (task) {
        this.tasks.push(task);
        this.renderTasks();
    };
    BaseTaskList.prototype.deleteTask = function (index) {
        this.tasks.splice(index, 1);
        this.renderTasks();
    };
    BaseTaskList.prototype.editTask = function (index) {
        var newTaskName = prompt("Update task name:");
        if (newTaskName !== null && newTaskName.trim() === "") {
            alert("Please enter a task name");
            return;
        }
        if (newTaskName !== null) {
            this.tasks[index].name = newTaskName;
            this.renderTasks();
        }
    };
    BaseTaskList.prototype.toggleCompleted = function (index) {
        this.tasks[index].completed =
            this.tasks[index].completed === TaskStatus.Complete
                ? TaskStatus.Incomplete
                : TaskStatus.Complete;
        this.renderTasks();
    };
    return BaseTaskList;
}());
var TodoList = /** @class */ (function (_super) {
    __extends(TodoList, _super);
    function TodoList(taskInputId, taskListId, totalTasksId, completedTasksId) {
        var _this = _super.call(this) || this;
        _this.taskInput = document.getElementById(taskInputId);
        _this.taskList = document.getElementById(taskListId);
        _this.totalTasks = document.getElementById(totalTasksId);
        _this.completedTasks = document.getElementById(completedTasksId);
        return _this;
    }
    TodoList.prototype.renderTasks = function () {
        var _this = this;
        // Clear task list
        this.taskList.innerHTML = "";
        // Update total and completed task counts
        var totalTasks = this.tasks.length;
        var completedTasks = this.tasks.filter(function (task) { return task.completed === TaskStatus.Complete; }).length;
        this.totalTasks.innerText = totalTasks.toString();
        this.completedTasks.innerText = completedTasks.toString();
        // Render each task
        this.tasks.forEach(function (task, index) {
            var li = document.createElement("li");
            li.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-3", "bg-dark", "text-light", "border-bottom");
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("form-check-input", "me-2", "cursor-pointer", "link-primary");
            checkbox.checked = task.completed === TaskStatus.Complete;
            checkbox.addEventListener("change", function () { return _this.toggleCompleted(index); });
            li.appendChild(checkbox);
            var span = document.createElement("span");
            span.innerText = task.name;
            span.classList.add("me-auto");
            li.appendChild(span);
            var editButton = document.createElement("button");
            editButton.classList.add("btn", "btn-link", "me-2", "btn-edit");
            editButton.innerHTML = "<i class=\"bi bi-pencil\"></i>";
            editButton.addEventListener("click", function () { return _this.editTask(index); });
            li.appendChild(editButton);
            var deleteButton = document.createElement("button");
            deleteButton.classList.add("btn", "btn-link", "btn-delete");
            deleteButton.innerHTML = "<i class=\"bi bi-trash text-danger\"></i>";
            deleteButton.addEventListener("click", function () { return _this.deleteTask(index); });
            li.appendChild(deleteButton);
            _this.taskList.appendChild(li);
        });
    };
    TodoList.prototype.addTask = function () {
        var taskName = this.taskInput.value;
        if (taskName.trim() === "") {
            alert("Please enter a task name");
            return;
        }
        var task = { name: taskName, completed: TaskStatus.Incomplete };
        _super.prototype.addTask.call(this, task);
        this.taskInput.value = "";
    };
    return TodoList;
}(BaseTaskList));
// Initialize app
var todoList = new TodoList("taskInput", "taskList", "totalTasks", "completedTasks");
