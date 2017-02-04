import * as $ from 'jquery';
import {polyfill} from 'es6-promise';
import * as sub from './sub';

polyfill();

async function showMessageAsync(g : sub.Greeter) {

  console.log('new Promise<string>(...)の前');

  var p = new Promise<string>(function(resolve, reject) {

    console.log('setTimeout(...)の前');

    // 1秒待機したのちただちにresolve(string)を呼び出す
    setTimeout(() => resolve(g.greet()), 1000);

    console.log('setTimeout(...)の後');
  });

  console.log('awaitの前');

  var s = await p;

  console.log('awaitの後');

  $('h1').text(s);

  console.log('$(...).text(...)の後');
}

showMessageAsync(new sub.GreeterFr());
