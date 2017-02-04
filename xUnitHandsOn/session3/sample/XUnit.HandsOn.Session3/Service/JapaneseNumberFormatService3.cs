using System;
using System.Text;

namespace XUnit.HandsOn.Session3
{
	/// <summary>
	/// 日本語の数値・日時の整形（フォーマット）を行うサービスです。
	/// <para>
    /// サポートしている数値の範囲は<c>0</c>から<c>99</c>までです。
	/// サポートしている日時に範囲制限はありませんが、整形にあたり月日時分以外の情報は切り捨てられます。
    /// </para>
	/// </summary>
	public class JapaneseNumberFormatService3 : INumberFormatService2
	{
		private static readonly string[] kanjiDigits = {
			"零", "一", "二", "三", "四", "五", "六", "七", "八", "九"
		};

		private readonly Func<DateTime> timeResolver;

		public JapaneseNumberFormatService3(Func<DateTime> timeResolver)
		{
			this.timeResolver = timeResolver;
		}

		public JapaneseNumberFormatService3()
		{
			this.timeResolver = () => DateTime.Now;
		}

		private string BuildNumberString(int n)
		{
            // フォーマット結果の文字列を詰め込むバッファ
			var buff = new StringBuilder();
            
            // 10の位の数字と1の位の数字を求める
			var onesPlaceDigit = n % 10;
			var tensPlaceDigit = n / 10;

            // 10の位の数字をチェック
			if (tensPlaceDigit > 0)
			{
                //  10の位の数字が0より大きい場合

                // 10の位の数字をチェック
				if (tensPlaceDigit > 1)
				{
                    // 10の位の数字が1より大きい場合
                    // 10の位の漢数字を取得してバッファに追加
					buff.Append(kanjiDigits[tensPlaceDigit]);
				}
                
                // 「十」をバッファに追加
				buff.Append("十");

                // 1の位の数字をチェック
				if (onesPlaceDigit > 0)
				{
                    // 1の位の数字が0より大きい場合
                    // 1の位の漢数字を取得してバッファに追加
					buff.Append(kanjiDigits[onesPlaceDigit]);
				}
			}
			else {
                //  10の位の数字が0である場合
                // 1の位の漢数字を取得してバッファに追加
                buff.Append(kanjiDigits[onesPlaceDigit]);
			}

            // バッファ内容を文字列化して呼び出し元に返す
			return buff.ToString();
		}

		private string BuildDateString(DateTime d)
		{
			return
				new StringBuilder()
					.Append(d.Month).Append("月")
					.Append(d.Day).Append("日")
					.ToString();
		}

		private string BuildTimeString(DateTime d)
		{
			return
				new StringBuilder()
					.Append(d.Hour).Append("時")
					.Append(d.Minute).Append("分")
					.ToString();
		}

		public string Format(DateTime d)
		{
			return new StringBuilder()
				.Append(BuildDateString(d))
				.Append(BuildTimeString(d)).ToString();
		}

		public string Format(int n)
		{
			if (n < 0 || 99 < n)
			{
				throw new ArgumentOutOfRangeException();
			}
			return BuildNumberString(n);
		}

		public string GetCurrentDateTime()
		{
			return Format(timeResolver());
		}

		public DateTime ParseDateTime(string s)
		{
			if (s == null)
			{
				throw new ArgumentNullException();
			}
			throw new NotImplementedException();
		}

		public int ParseNumber(string s)
		{
			if (s == null)
			{
				throw new ArgumentNullException();
			}
			throw new NotImplementedException();
		}
	}
}
