
export interface Greeter {
  greet() : string
}

export class GreeterEn implements Greeter {
  greet() {
    return 'hello world';
  }
}

export class GreeterFr implements Greeter {
  greet() {
    return 'bonjour tout le monde';
  }
}

export class GreeterX implements Greeter {
  constructor(private x: string) {

  }
  greet() {
    return this.x;
  }
}
