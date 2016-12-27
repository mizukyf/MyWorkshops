package org.unclazz.jserclass2.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.stereotype.Service;
import org.unclazz.jserclass2.vo.Task;

/**
 * タスク情報をCRUDするためのサービス.
 * <p>サンプル・アプリケーションなのでパーシステンスにDAOやO/Rマッパーは使用していない。</p>
 */
@Service
public class TaskService {
	/** モックのシーケンス採番オブジェクト.　*/
	private final AtomicInteger mockSequence = new AtomicInteger(0);
	/** モックのレコード格納オブジェクト.　*/
	private final List<Task> mockRecords = new ArrayList<Task>();
	{
		// ダミーデータの登録
		mockRecords.add(new Task(mockSequence.incrementAndGet(), "4月までにバシュラールを再読"));
		mockRecords.add(new Task(mockSequence.incrementAndGet(), "3月中にOSS-DB Gold資格試験の申込み"));
		mockRecords.add(new Task(mockSequence.incrementAndGet(), "3/11までにJSer Class #3のテキストの構想をまとめる"));
		mockRecords.add(new Task(mockSequence.incrementAndGet(), "X/XX PAULのキッシュロレーヌを試してみる"));
	}
	
	/**
	 * タスク情報の一覧を返す.
	 * @return タスク情報のリスト
	 */
	public List<Task> getTaskList() {
		return Collections.unmodifiableList(mockRecords);
	}
	
	/**
	 * タスク情報を返す.
	 * @param taskId タスクID
	 * @return タスク情報（存在しないタスクIDが指定された場合{@code null}）
	 */
	public Task getTask(final int taskId) {
		for (int i = 0; i < mockRecords.size(); i ++) {
			final Task task = mockRecords.get(i);
			if (task.getId() == taskId) {
				return task;
			}
		}
		return null;
	}
	
	/**
	 * タスク情報を登録する.
	 * <p>タスク情報VOのタスクIDはこのメソッドの中で自動採番された値が設定される。</p>
	 * @param newTask タスク情報
	 */
	public void registerTask(Task newTask) {
		newTask.setId(mockSequence.incrementAndGet());
		mockRecords.add(newTask);
	}
	
	/**
	 * タスク情報を削除する.
	 * @param taskId タスクID
	 * @throws IllegalArgumentException 存在しないタスクIDが指定された場合
	 */
	public void removeTask(final int taskId) {
		for (int i = 0; i < mockRecords.size(); i ++) {
			final Task task = mockRecords.get(i);
			if (task.getId() == taskId) {
				mockRecords.remove(i);
				return;
			}
		}
		throw new IllegalArgumentException("Invalid task id specified.");
	}
}
