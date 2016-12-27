(function () {
	// 'app'という名前のモジュールを宣言
	// 依存するモジュールとして'ui.bootstrap', 'ngResource', 'ngRoute'の3つを指定
	var app = angular.module('app', ['ui.bootstrap', 'ngResource', 'ngRoute']);
	
	// モジュールにルーティング設定を追加
	// 設定ロジックは$routeProviderというサービスに依存する
	app.config(function($routeProvider){
		// ngResourceモジュールが提供する$routeProviderを通じてURLのパスとコントローラ＆テンプレートを紐付ける
		// - パスが'/'の時　　　処理を担当するコントローラは'list'　使用するテンプレートは'js/tpl/list.html'
		// - パスが'/new'の時　処理を担当するコントローラは'new'　使用するテンプレートは'js/tpl/new.html'
		// - それ以外の時　　　　'/'にリダイレクト
		$routeProvider
		.when('/', {controller: 'list',　templateUrl: 'js/tpl/list.html'})
		.when('/new', {controller: 'new',　templateUrl: 'js/tpl/new.html'})
		.otherwise({redirectTo: '/'});
	});
	
	// todoTasksという名前のオブジェクトを生成するファクトリを追加
	// todoTasksはRESTful APIにアクセスするためのクライアント側オブジェクト
	// ファクトリは$resourceというサービスに依存する
	app.factory('todoTasks', function($resource) {
		// $resourceサービスを使ってtodoTasksオブジェクトを生成する
		return $resource(
				'api/tasks/:id',	// URLテンプレート文字列
				{id: '@id'}			// テンプレートに割り当てる値の指定
		);
	});
	
	// listという名前のコントローラをモジュールに追加
	// コントローラは$log, $scope, todoTasksという3つのサービスもしくはオブジェクトに依存する
	app.controller('list', function($log, $scope, todoTasks) {
		// [1] 画面/データをバインドする設定ロジック
		// $scopeは画面側に値をバインドするためのオブジェクト
		// $scopeのプロパティとして値を設定することで画面/データ間のバインドが行われる
		// $scopeにタスク一覧をあらわす配列を追加
		$scope.list = [];
		// $scopeに優先度のラベルを返す関数を追加
		$scope.priorityLabel = priorityLabel;
		// $scopeに[-]ボタン・クリック時に呼び出される関数を追加
		$scope.minusClicked = minusClicked;
		
		// [2] 画面初期表示のためのロジック
		// タスク一覧をロードする
		loadTasks();
		
		// [3] 各種関数定義部
		// タスク一覧をロードする関数
		function loadTasks () {
			// todoTasksオブジェクトを通じてクエリ一覧を取得する
			// todoTasksは内部的にRESTful APIにリクエストを行う
			// リクエストが成功するとAPIから返された値を引数にしてコールバック関数を呼び出す
			todoTasks.query({}, function(data) {
				// APIから返された値をタスク一覧として$scopeに再設定
				$scope.list = data;
			});
		}
		// [-]ボタンがクリックされた時に呼び出される関数
		function minusClicked(taskId) {
			// todoTasksオブジェクトを通じてタスクを削除する
			// todoTasksは内部的にRESTful APIにリクエストを行う
			// リクエストが成功するとAPIから返された値を引数にしてコールバック関数を呼び出す
			todoTasks.remove({id: taskId}, function(data) {
				// タスク一覧のリロードを行う
				loadTasks();
			});
		}
		// 優先度のラベルを返す関数
		function priorityLabel(priorityNumber) {
			return priorityNumber === 1 ? 'High' : 
				(priorityNumber === 2 ? 'Middle' : 'Low');
		}
	});
	
	// newという名前のコントローラをモジュールに追加
	// コントローラは$log, $scope, $location, todoTasksという3つのサービスもしくはオブジェクトに依存する
	app.controller('new', function($log, $scope, $location, todoTasks) {
		// [1] 画面/データをバインドする設定ロジック
		// $scopeは画面側に値をバインドするためのオブジェクト
		// $scopeのプロパティとして値を設定することで画面/データ間のバインドが行われる
		// 画面のフォームに対応するオブジェクトを追加
		$scope.task = {title: '', priority: 2, createDate: null};
		// [OK]ボタンがクリックされた時に呼び出される関数を追加
		$scope.formSubmitted = formSubmitted;
		
		// [2] 画面初期表示のためのロジック
		// （とくになし）
		
		// [3] 各種関数定義部
		// [OK]ボタンがクリックされた時に呼び出される関数
		function formSubmitted() {
			// todoTasksオブジェクトを通じてタスクを追加する
			// todoTasksは内部的にRESTful APIにリクエストを行う
			// リクエストが成功するとAPIから返された値を引数にしてコールバック関数を呼び出す
			todoTasks.save($scope.task, function(data) {
				// $locationサービスを使ってページ遷移する（'/new'から'/'への遷移）
				$location.path('');
			});
		}
	});
})();
