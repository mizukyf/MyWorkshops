(function () {
    var app = angular.module('app', ['ui.bootstrap', 'ngResource', 'ngRoute']);
    app.config(RouteConfigurer);
    app.factory('todoTasks', todoTaskFactory);
    app.controller('list', listPageController);
    app.controller('new', newPageController);
    var TaskPriority;
    (function (TaskPriority) {
        TaskPriority[TaskPriority["High"] = 1] = "High";
        TaskPriority[TaskPriority["Middle"] = 2] = "Middle";
        TaskPriority[TaskPriority["Low"] = 3] = "Low";
    })(TaskPriority || (TaskPriority = {}));
    var NewTodoTask = (function () {
        function NewTodoTask(title, priority) {
            this.title = title;
            this.priority = priority;
            this.id = undefined;
            this.createDate = null;
        }
        return NewTodoTask;
    }());
    function RouteConfigurer($routeProvider) {
        $routeProvider
            .when('/', { controller: 'list', templateUrl: 'js/tpl/list.html' })
            .when('/new', { controller: 'new', templateUrl: 'js/tpl/new.html' })
            .otherwise({ redirectTo: '/' });
    }
    function todoTaskFactory($resource) {
        return $resource('api/tasks/:id', { id: '@id' });
    }
    function listPageController($log, $scope, todoTasks) {
        $scope.list = [];
        $scope.minusClicked = minusClicked;
        $scope.priorityLabel = priorityLabel;
        loadTasks();
        function loadTasks() {
            todoTasks.query({}, function (data) {
                $scope.list = data;
            });
        }
        function minusClicked(taskId) {
            todoTasks.remove({ id: taskId }, function () {
                loadTasks();
            });
        }
        function priorityLabel(priorityNumber) {
            return priorityNumber === 1 ? 'High' :
                (priorityNumber === 2 ? 'Middle' : 'Low');
        }
    }
    function newPageController($log, $scope, $location, todoTasks) {
        $scope.task = new NewTodoTask('', TaskPriority.Middle);
        $scope.formSubmitted = formSubmitted;
        function formSubmitted() {
            todoTasks.save($scope.task, function (data) {
                $location.path('');
            });
        }
    }
})();
//# sourceMappingURL=app.js.map