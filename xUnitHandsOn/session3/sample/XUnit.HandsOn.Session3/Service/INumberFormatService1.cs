using System;
namespace XUnit.HandsOn.Session3
{
	/// <summary>
	/// 数値・日時の整形（フォーマット）を行うサービスのインターフェースです。
	/// どのような書式化を行うかは実装クラスの開発者に委ねられています。
	/// </summary>
	public interface INumberFormatService1
	{
		/// <summary>
		/// 数値を整形した文字列表現を返します。
		/// </summary>
		/// <param name="n">整形対象の数値</param>
		/// <returns>数値の文字列表現</returns>
		string Format(int n);
		/// <summary>
		/// 日時を整形した文字列表現を返します。
		/// </summary>
		/// <param name="d">整形対象の日時</param>
		/// <returns>日時の文字列表現</returns>
		string Format(DateTime d);
		/// <summary>
		/// 現在日時を整形した文字列表現を返します。
		/// </summary>
		/// <returns>現在日時の文字列表現</returns>
		string GetCurrentDateTime();
		/// <summary>
		/// 数値の文字列表現を読み込み（パースし）結果の数値を返します。
		/// </summary>
		/// <returns>読込結果の数値</returns>
		/// <param name="s">数値の文字列表現</param>
		int ParseNumber(string s);
		/// <summary>
		/// 日時文字列表現を読み込み（パースし）結果の数値を返します。
		/// </summary>
		/// <returns>読込結果の日時</returns>
		/// <param name="s">日時の文字列表現</param>
		DateTime ParseDateTime(string s);
	}
}
