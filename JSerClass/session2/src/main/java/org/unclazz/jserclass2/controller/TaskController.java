package org.unclazz.jserclass2.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.unclazz.jserclass2.service.TaskService;
import org.unclazz.jserclass2.vo.Task;

/**
 * RESTful APIのコントローラ.
 * <p>{@code "/api/tasks/..."}形式URLのリクエストへの応答を担当する。
 * {@link RestController}アノテーションの効果で
 * リクエスト/レスポンスのいずれもJSONでやり取りするコントローラとして機能する。</p>
 */
@RestController
@RequestMapping("/api")
public class TaskController {
	@Autowired
	private TaskService taskService;
	
	@RequestMapping(value="/tasks/{id}", method=RequestMethod.GET)
	public Task getTask(@PathVariable("id") final int id) {
		return taskService.getTask(id);
	}
	
	@RequestMapping(value="/tasks", method=RequestMethod.GET)
	public List<Task> getTaskList() {
		return taskService.getTaskList();
	}
	
	@RequestMapping(value="/tasks", method=RequestMethod.POST)
	public Task postTask(@RequestBody final Task task) {
		taskService.registerTask(task);
		return task;
	}
	
	@RequestMapping(value="/tasks/{id}", method=RequestMethod.DELETE)
	public void deleteTask(@PathVariable("id") final int id) {
		taskService.removeTask(id);
	}
}
