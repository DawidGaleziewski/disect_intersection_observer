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

class PropertyChangesArgs {
  constructor(name, newValue) {
    this.name = name;
    this.newValue = newValue;
  }
}

class Person {
  constructor(age) {
    this._age = age;
    this.propertyChange = new Event();
  }

  get age() {
    return this.age;
  }

  set age(value) {
    if (!value || this._age === value) return;
    this._age = value;

    // fire eventes
    this.propertyChange.fire(this, new PropertyChangesArgs("age", value));
  }
}

class RegistrationChecker {
  constructor(person) {
    this.person = person;
    // We save a token and subscribe to propertyChange event inside the person
    this.token = person.propertyChange.subscribe(this.age_changed.bind(this));
  }

  age_changed(sender, args) {
    if (sender === this.person && args.name === "age") {
      // Do not allow a person to register
      if (args.newValue < 13) {
        console.log("sorry to young");
      } else {
        console.log(" ok you can register");
        // unsubscribe once person can register
        this.person.propertyChange.unsubscribe(this.token);
      }
    }
  }
}

let person = new Person("John");

// Registration checker gets a  person
let checker = new RegistrationChecker(person);

for (let i = 10; i < 20; ++i) {
  console.log(`changing age to ${i}`);
  person.age = i;
}
