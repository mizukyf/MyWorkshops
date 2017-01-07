using System;
using System.Linq;
using System.Text;

namespace xUnitSample
{
	/// <summary>
	/// <see cref="System.String"/>のための拡張メソッドを定義するクラスです。
	/// </summary>
	public static class StringExtension
	{
		/// <summary>
		/// レシーバ文字列を指定された回数連結した新しい文字列を返します。
		/// </summary>
		/// <param name="s">レシーバ文字列</param>
		/// <param name="n">連結する回数</param>
		/// <returns>連結結果の文字列</returns>
		/// <exception cref="System.ArgumentNullException">レシーバ文字列が<c>null</c>の場合</exception>
		/// <exception cref="System.ArgumentException">連結回数として指定された数値が0未満の場合</exception>
		public static string Times(this string s, int n)
		{
			if (s == null)
			{
				throw new ArgumentNullException(nameof(s));
			}
			if (s.Length == 0 || n == 1)
			{
				return s;
			}
			if (n < 0)
			{
				throw new ArgumentException("argument \"{0}\" must not be less than 0.", nameof(n));
			}

			var buff = new StringBuilder();
			for (var i = 0; i < n; i++)
			{
				buff.Append(s);
			}
			return buff.ToString();
		}
	}
}
