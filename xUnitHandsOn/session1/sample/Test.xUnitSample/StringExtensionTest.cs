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

	[TestFixture]
	public class MyTestFixtureClass
	{
		[Test]
		public void MyTestMethod()
		{
			// Arrange
			var hello = "hello";
			var expected = Enumerable.Repeat(hello, 123)
				.Aggregate(new StringBuilder(),
				(a0, a1) => a0.Append(a1)).ToString();

			// Act
			var result = hello.Times(123);

			// Assert
			Assert.That(result, Is.EqualTo(expected));
		}

		[Test(Description = "XXメソッドはXXのときXXを返す")]
		public void TestMethodWithDesctiption() {
			// Test code...
		}

		[Test(ExpectedResult = "期待値")]
		public string TestMethodWithExpectedValue()
		{
			return "期待値";
		}

		[TestCase("hello", 123)]
		[TestCase("bonjour", 456)]
		public void TestCaseMethod(string arg0, int arg1)
		{
			// Test code here...
		}

		[Test]
		public void TestMethodWithValues(
			[Values("hello world", "bonjour tout le monde")] string arg0,
			[Values(123, 456, 789)] int arg1)
		{
			// 1st call : ("hello world", 123)
			// 2nd call : ("bonjour tout le monde", 456)
			// 3rd ...
		}

		[SetUp]
		public void DoSomethingBeforeEveryTest()
		{
			// Set up code here...
		}

		[TearDown]
		public void DoSomethingAfterEveryTest()
		{
			// Tear down code here...
		}

		[Test]
		public void TestMethodUsingHasHelper()
		{
			var result = new int[] { 1, 2, 3 };
			Assert.That(result, Has.Property("Length").GreaterThan(2));
		}

		[Test]
		public void TestMethodUsingThrowsHelper()
		{
			Assert.That(() => {
				throw new ArgumentNullException();
			}, Throws.InstanceOf<ArgumentException>());
		}
	}
}
