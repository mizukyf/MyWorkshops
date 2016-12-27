(function ($) {
    var TodoTask = (function () {
        function TodoTask(id, title, createDate) {
            this.id = id;
            this.title = title;
            this.createDate = createDate;
        }
        return TodoTask;
    }());
    $(document).ready(function () {
        var taskTpl = $("tr.task-tpl");
        var taskNew = $("tr.task-new");
        var taskNewTitle = $("input:text", taskNew);
        var taskNewBtn = $("td.task-action > button", taskNew);
        taskNewBtn.click(function (event) {
            var title = taskNewTitle.val();
            addTask({ id: 0, title: title, createDate: null });
            taskNewTitle.val("");
        });
        var loadTasks = function () {
            $("tr.task-item").remove();
            $.get("/api/tasks", {}, function (data, textStats) {
                $.each(data, function (index, item) {
                    var taskItem = taskTpl.clone().show()
                        .removeClass("task-tpl").addClass("task-item");
                    $("td.task-id", taskItem).text(item.id);
                    $("td.task-title", taskItem).text(item.title);
                    $("td.task-action > button", taskItem)
                        .click(function (event) {
                        deleteTask(item.id);
                    });
                    taskNew.before(taskItem);
                });
            });
        };
        var deleteTask = function (id) {
            $.ajax({
                url: "/api/tasks/" + id,
                method: "DELETE",
                success: function (data, textStatus) {
                    loadTasks();
                }
            });
        };
        var addTask = function (task) {
            $.ajax({
                url: "/api/tasks",
                method: "POST",
                data: JSON.stringify(task),
                contentType: "application/json",
                success: function (data, textStatus) {
                    loadTasks();
                }
            });
        };
        loadTasks();
    });
})(jQuery);
//# sourceMappingURL=app.js.map