import * as $ from 'jquery';
import * as sub from './sub';

function showMessage(g : sub.Greeter) : void {
  $('h1').text(g.greet());
}

showMessage(new sub.GreeterEn());
