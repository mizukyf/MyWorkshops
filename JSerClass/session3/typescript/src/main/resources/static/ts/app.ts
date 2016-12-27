(function($ : JQueryStatic) {
	// 匿名関数により形成されたローカル・スコープ
	// 仮引数$は実引数jQueryを参照する
	// このコードはscriptタグのロードとともに実行される
	
    /**
     * TODO一覧のタスクをあらわすオブジェクト.
     */
    class TodoTask {
        constructor(public id :number, public title :string, public createDate :string) {
        }
    }
    
	// ドキュメントの読み込みが終わった段階（loadイベント）で実行される関数を設定
	$(document).ready(function() {
		// このコードはページロード完了時に実行される
		
		// 主要なUI要素をクエリで検索し変数に格納
		// テンプレートとなる要素
		const taskTpl = $("tr.task-tpl");
		// 新規タスク入力欄となる要素
		const taskNew = $("tr.task-new");
		// 新規タスク・タイトルの入力フォーム
		const taskNewTitle = $("input:text", taskNew);
		// 新規タスクの[+]ボタン
		const taskNewBtn = $("td.task-action > button", taskNew);

		// [+]ボタンにclickイベント・リスナーを設定
		taskNewBtn.click(function (event :JQueryEventObject) {
			// タイトル入力内容を取得
			const title = taskNewTitle.val() as string;
			// タスク登録のための関数を実行
            // addTask(new TodoTask(0, title, null))
			addTask({id: 0, title: title, createDate: null});
            // 入力欄のテキストとして空文字列を設定
            taskNewTitle.val("");
		});
		
		// タスク一覧をロードする関数
		const loadTasks = function() :void {
			// タスク一覧をクリアする
			$("tr.task-item").remove();
			
			// タスク一覧を返すREST APIにGETメソッドのリクエストを実施
			$.get("/api/tasks", {}, function(data :TodoTask[], textStats :string) {
				// $.each(array, function)は配列をイテレートするためのユーティリティ
				$.each(data, function(index :number, item :TodoTask) {
					// テンプレート・アイテムをクローンし非表示のスタイルを解除
                    // テンプレート・アイテム用のclassを削除し表示アイテム用のclassを追加
                    const taskItem = taskTpl.clone().show()
					.removeClass("task-tpl").addClass("task-item");
                    // タスクID、タイトルを設置
					$("td.task-id", taskItem).text(item.id);
					$("td.task-title", taskItem).text(item.title);
                    // ボタンにイベント・リスナーを設定
					$("td.task-action > button", taskItem)
                    .click(function(event :JQueryEventObject) {
						deleteTask(item.id);
					});
                    // 表示アイテムを入力欄の1つまえに挿入
					taskNew.before(taskItem);
				});
			});
		};
		
		// 指定されたIDのタスクを削除する関数
		const deleteTask = function(id :number) :void {
			// REST APIに対してDELETEメソッドで削除リクエストを送る
			$.ajax({
				// REST　APIのURL
				url: "/api/tasks/" + id,
				// HTTPリクエスト・メソッド
				method: "DELETE",
				// リクエスト成功時に実行される関数
				success: function (data :any, textStatus :string) {
					// APIがOKレスポンスを返したら一覧をリロード
					loadTasks();
				}
			});
		};
		
		// 指定された内容のタスクを追加する関数
		const addTask = function(task :TodoTask) :void {
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
				success: function (data :TodoTask, textStatus :string) {
					// APIがOKレスポンスを返したら一覧をリロード
					loadTasks();
				}
			});
		};
		
		// タスク一覧をロード（初回表示）
		loadTasks();
	});
	
})(jQuery);