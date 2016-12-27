package org.unclazz.jserclass2.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * タスク情報VO.
 */
public class Task {
	/** タスクID. */
	private int id;
	/** タスク名 */
	private String title;
	/** 作成日時 */
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss.SSS")
	private Date createDate;
	
	/** インスタンス・フィールドを明示的には初期化しないコンストラクタ. */
	public Task() {}
	/**
	 * インスタンス・フィールドの明示的に初期化を行うコンストラクタ.
	 * @param id タスクID
	 * @param title タスク名
	 */
	public Task(final int id, final String title) {
		this.id = id;
		this.title = title;
		this.createDate = new Date();
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
}
