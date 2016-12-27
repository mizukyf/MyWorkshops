using NUnit.Framework;
using System;
using xUnitSample;
using System.Linq;
using System.Text;

namespace Test.xUnitSample
{
	[TestFixture()]
	public class StringExtensionTest
	{
		[Test()]
		public void Times_WhenArg1Is2_ReturnsNewString()
		{
			var s = "hello";
			Assert.That(s.Times(2), Is.EqualTo(s + s));
		}

		[Test()]
		public void Times_WhenArg1Is1_ReturnsSameString()
		{
			var s = "hello";
			Assert.That(s.Times(1), Is.EqualTo(s));
		}

		[Test()]
		public void Times_WhenArg1Is0_ReturnsEmptyString()
		{
			var s = "hello";
			Assert.That(s.Times(0), Is.EqualTo(string.Empty));
		}

		[Test()]
		public void Times_WhenArg1IsLessThan0_ThrowsException()
		{
			Assert.Throws<ArgumentException>(() =>
			{
				// 「こんにちは」を-1回繰り返す
				"hello".Times(-1);
			});
		}

		[Test()]
		public void Times_WhenArg1Is123_ReturnsNewString()
		{
			var s = "hello";
			var s2 = Enumerable.Repeat(s, 123)
			                   .Aggregate(new StringBuilder(),
			                   (a0, a1) => a0.Append(a1)).ToString();
			Assert.That(s.Times(123), Is.EqualTo(s2));
		}
	}
}
