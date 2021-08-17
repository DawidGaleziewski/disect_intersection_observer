class Event {
  constructor() {
    // Map of handlers (functions), those have to be unique
    this.handlers = new Map();
    // Used to keep track and asign a unique key to a handler
    this.count = 0;
  }

  // Handler is some callback that gets invoked on event
  subscribe(handler) {
    this.handlers.set(++this.count, handler);
    return this.count;
  }

  // We use the key index generated during subscribtion to a event in order to unsubscribe a handler
  unsubscribe(idx) {
    this.handlers.delete(idx);
  }

  // 1) who fires the event? (sender)
  // 2) additional data (event args)
  fire(sender, args) {
    // when we call fire we will loop on handlers map and fire each of them. handler should be constructed so that it recives a 'sender' argument
    this.handlers.forEach((value, key) => value(sender, args));
  }
}

class FallsIllArgs {
  constructor(address) {
    this.address = address;
  }
}

class Person {
  constructor(address) {
    this.address = address;
    this.fallsIll = new Event();
  }

  catchCold() {
    this.fallsIll.fire(this, new FallsIllArgs(this.address));
  }
}

let person = new Person("123 London Road");
let sub = person.fallsIll.subscribe((sender, args) => {
  console.log(`A doctor has been called to ${args.address}`);
});

person.catchCold();
person.catchCold();

person.fallsIll.unsubscribe(sub);

// Gets unsubscribed
person.catchCold();
