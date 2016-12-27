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
				// ループ処理用の一時変数を宣言
				var key, item;
				// APIが返した配列の各要素についてループ処理
				for (key in data) {
					// keyが指す1タスクを取り出す
					item = data[key];
					// テンプレートをクローンする
					var taskItem = taskTpl.clone().show();
					// テンプレ用のclass属性を削除し、表示項目用のclass属性を追加
					taskItem.removeClass("task-tpl").addClass("task-item");
					// 子孫ノードから#列に該当する要素を検索しタスクIDを設定
					$("td.task-id", taskItem).text(item.id);
					// 子孫ノードからTitle列に該当する要素を検索しタスク名を設定
					$("td.task-title", taskItem).text(item.title);
					// 子孫ノードからAction列の[x]ボタンに該当する要素を検索しイベント・リスナーを設定
					$("td.task-action > button", taskItem).click(function(event) {
						// クリックされたらitemが指すオブジェクトのid値を引数に
						// APIを通じてタスク削除を行う
						deleteTask(item.id);
					});
					// 種々設定済みの要素を新規タスク入力欄の「手前」に追加
					taskNew.before(taskItem);
				}
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