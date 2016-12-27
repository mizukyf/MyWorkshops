(function($) {
	// 匿名関数により形成されたローカル・スコープ
	// 仮引数$は実引数jQueryを参照する
	// このコードはscriptタグのロードとともに実行される
	
	// ドキュメントの読み込みが終わった段階（loadイベント）で実行される関数を設定
	$(document).ready(function() {
		// このコードはページロード完了時に実行される
		
		// 主要なUI要素をクエリで検索し変数に格納
		// テンプレートとなる要素
		var taskTpl = $("tr.task-tpl");
		// 新規タスク入力欄となる要素
		var taskNew = $("tr.task-new");
		// 新規タスク・タイトルの入力フォーム
		var taskNewTitle = $("input:text", taskNew);
		// 新規タスクの[+]ボタン
		var taskNewBtn = $("td.task-action > button", taskNew);

		// [+]ボタンにclickイベント・リスナーを設定
		taskNewBtn.click(function (event) {
			// タイトル入力内容を取得
			var title = taskNewTitle.val();
			// タスク登録のための関数を実行
			addTask({id: 0, title: title});
		});
		
		// タスク一覧をロードする関数
		var loadTasks = function() {
			// タスク一覧をクリアする
			$("tr.task-item").remove();
			
			// タスク一覧を返すREST APIにGETメソッドのリクエストを実施
			$.get("/api/tasks", {}, function(data) {
				// $.each(array, function)は配列をイテレートするためのユーティリティ
				$.each(data, function(index, item) {
					var taskItem = taskTpl.clone().show();
					taskItem.removeClass("task-tpl").addClass("task-item");
					$("td.task-id", taskItem).text(item.id);
					$("td.task-title", taskItem).text(item.title);
					$("td.task-action > button", taskItem).click(function() {
						deleteTask(item.id);
					});
					taskNew.before(taskItem);
				});
			});
		};
		
		// 指定されたIDのタスクを削除する関数
		var deleteTask = function(id) {
			// REST APIに対してDELETEメソッドで削除リクエストを送る
			$.ajax({
				// REST　APIのURL
				url: "/api/tasks/" + id,
				// HTTPリクエスト・メソッド
				method: "DELETE",
				// リクエスト成功時に実行される関数
				success: function (data, textStatus) {
					// APIがOKレスポンスを返したら一覧をリロード
					loadTasks();
				}
			});
		};
		
		// 指定された内容のタスクを追加する関数
		var addTask = function(task) {
			// REST APIに対してPOSTメソッドで登録リクエストを送る
			$.ajax({
				// REST APIのURL
				url: "/api/tasks",
				// HTTPリクエスト・メソッド
				method: "POST",
				// 送信データとしてタスク情報をJSON化した文字列を指定
				data: JSON.stringify(task),
				// コンテンツタイプとしてJSONをあらわす値を指定
				contentType: "application/json",
				// リクエスト成功時に実行される関数
				success: function (data, textStatus) {
					// APIがOKレスポンスを返したら一覧をリロード
					loadTasks();
				}
			});
		};
		
		// タスク一覧をロード（初回表示）
		loadTasks();
	});
	
})(jQuery);