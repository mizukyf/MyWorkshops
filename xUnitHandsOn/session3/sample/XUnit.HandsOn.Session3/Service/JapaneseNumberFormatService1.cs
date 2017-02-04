using System;
using System.Text;

namespace XUnit.HandsOn.Session3
{
	/// <summary>
	/// 日本語の数値・日時の整形（フォーマット）を行うサービスです。
	/// </summary>
	public class JapaneseNumberFormatService1 : INumberFormatService1
	{
		private static readonly string[] kanjiDigits = {
			"零", "一", "二", "三", "四", "五", "六", "七", "八", "九"
		};

		private string numberFormatResult;
		private string dateFormatResult;
		private string timeFormatResult;
		private readonly bool suppressTenDigit;

		private void BuildNumberString(int n)
		{
			var buff = new StringBuilder();
			var onesPlaceDigit = n % 10;
			var tensPlaceDigit = n / 10;
			if (tensPlaceDigit > 0)
			{
				if (tensPlaceDigit > 1)
				{
					buff.Append(kanjiDigits[tensPlaceDigit]);
				}
				buff.Append("十");
				if (onesPlaceDigit > 0)
				{
					buff.Append(kanjiDigits[onesPlaceDigit]);
				}
			}
			else {
				buff.Append(kanjiDigits[onesPlaceDigit]);
			}
			numberFormatResult = buff.ToString();
		}

		private void BuildDateString(DateTime d)
		{
			dateFormatResult =
				new StringBuilder()
					.Append(d.Month).Append("月")
					.Append(d.Day).Append("日")
					.ToString();
		}

		private void BuildTimeString(DateTime d)
		{
			timeFormatResult =
				new StringBuilder()
					.Append(d.Hour).Append("時")
					.Append(d.Minute).Append("分")
					.ToString();
		}

		public string Format(DateTime d)
		{
			return new StringBuilder()
				.Append(dateFormatResult)
				.Append(timeFormatResult).ToString();
		}

		public string Format(int n)
		{
			BuildNumberString(n);
			return numberFormatResult;
		}

		public string GetCurrentDateTime()
		{
			return Format(DateTime.Now);
		}

		public DateTime ParseDateTime(string s)
		{
			throw new NotImplementedException();
		}

		public int ParseNumber(string s)
		{
			throw new NotImplementedException();
		}
	}
}
