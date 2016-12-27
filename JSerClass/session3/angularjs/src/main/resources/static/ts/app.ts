(function() {
	// 匿名関数により形成されたローカル・スコープ
	// このコードはscriptタグのロードとともに実行される
	
    var app = angular.module('app', ['ui.bootstrap', 'ngResource', 'ngRoute']);
    app.config(routeConfigurer);
	app.factory('todoTasks', todoTaskFactory);
    app.controller('list', listPageController);
    app.controller('new', newPageController);
    
    /**
     * TODOタスクの優先度をあらわす列挙型.
     * 対応する整数は1始まりとなるよう指定（デフォルトは0始まり）
     */
    enum TaskPriority { High = 1, Middle, Low }
    /**
     * TODOタスクをあらわすオブジェクトのインターフェース.
     */
    interface TodoTask {
        id :number;
        title :string;
        priority :TaskPriority;
        createDate :string;
    }
    /**
     * 新規TODOタスクをあらわすオブジェクト.
     */
    class NewTodoTask implements TodoTask {
        public id :number;
        public createDate :string;
        constructor (public title: string, public priority :TaskPriority) {
            this.id = undefined;
            this.createDate = null;
        }
    }
    /**
     * TODOタスク一覧ページ（/）用のスコープ・オブジェクト.
     */
    interface ListPageScope extends ng.IScope {
        list :TodoTask[];
        priorityLabel(priorityNumber : number) : string;
        minusClicked(taskId : number) : void;
    }
    /**
     * 新規タスクページ（/new）用のスコープ・オブジェクト.
     */
    interface NewPageScope extends ng.IScope {
        task :TodoTask;
        formSubmitted() : void;
    }
    
    function routeConfigurer ($routeProvider :ng.route.IRouteProvider) {
		$routeProvider
		.when('/', {controller: 'list',　templateUrl: 'js/tpl/list.html'})
		.when('/new', {controller: 'new',　templateUrl: 'js/tpl/new.html'})
		.otherwise({redirectTo: '/'});
    }
    function todoTaskFactory($resource :ng.resource.IResourceService) {
		return $resource('api/tasks/:id', {id: '@id'});
    }
    function listPageController (
            $log :angular.ILogService,
            $scope :ListPageScope, 
            todoTasks :ng.resource.IResourceClass<TodoTask>) {
            
        $scope.list = [];
        $scope.minusClicked = minusClicked;
        $scope.priorityLabel = priorityLabel;
        
        loadTasks();
        
        function loadTasks () {
            todoTasks.query({}, function(data :TodoTask[]) {
                $scope.list = data;
            });
        }
        function minusClicked(taskId :number) {
            todoTasks.remove({id: taskId}, function() {
                loadTasks();
            });
        }
        function priorityLabel(priorityNumber :number) {
            return priorityNumber === 1 ? 'High' : 
                (priorityNumber === 2 ? 'Middle' : 'Low');
        }
    }
    function newPageController (
            $log :angular.ILogService,
            $scope :NewPageScope, 
            $location :ng.ILocationService,
            todoTasks :ng.resource.IResourceClass<TodoTask>) {
        
        $scope.task = new NewTodoTask('', TaskPriority.Middle);
        $scope.formSubmitted = formSubmitted;
        
        function formSubmitted() {
            todoTasks.save($scope.task, function(data :TodoTask) {
                $location.path('');
            });
        }
    }
})();