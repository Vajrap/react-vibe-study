export type LessonSection = {
  title: string;
  body: string[];
  code?: string;
  output?: string;
  bullets?: string[];
  note?: string;
};

export type JavaScriptLesson = {
  slug: string;
  number: number;
  unit: "values" | "execution" | "functions" | "async";
  title: string;
  shortTitle: string;
  summary: string;
  objectives: string[];
  sections: LessonSection[];
  check: {
    question: string;
    code?: string;
    choices: string[];
    answer: number;
    explanation: string;
  };
  takeaways: string[];
  production?: {
    title: string;
    body: string;
    code?: string;
  };
  debugging?: {
    prompt: string;
    steps: string[];
  };
  exercises?: Array<{
    prompt: string;
    code?: string;
    answer: string;
  }>;
};

export const courseUnits = [
  {
    id: "values" as const,
    number: 1,
    title: "Values and State",
    summary: "Types, coercion, identity, mutation, and missing values.",
  },
  {
    id: "execution" as const,
    number: 2,
    title: "Scope and Execution",
    summary: "Lookup, declarations, parsing, contexts, and environments.",
  },
  {
    id: "functions" as const,
    number: 3,
    title: "Functions and Lifetime",
    summary: "Calls, callbacks, this, modules, and retained closures.",
  },
  {
    id: "async" as const,
    number: 4,
    title: "Asynchronous Execution",
    summary: "Promises, async functions, queues, and the event loop.",
  },
];

const coreLessons: JavaScriptLesson[] = [
  {
    slug: "values-and-types",
    number: 1,
    unit: "values",
    title: "Values and Types",
    shortTitle: "Values",
    summary: "Start with the data JavaScript operates on and what dynamic typing really means.",
    objectives: [
      "Distinguish values, expressions, and types",
      "Explain dynamic typing without saying variables have fixed types",
      "Recognize coercion and prefer explicit conversions",
    ],
    sections: [
      {
        title: "Values come first",
        body: [
          "A value is a piece of data JavaScript can work with. An expression is code that produces a value. Literals such as 42 and \"hello\" are values written directly in source code.",
          "JavaScript has seven primitive types. Objects, arrays, and functions belong to the object side of the language; functions are callable objects.",
        ],
        bullets: ["string", "number", "bigint", "boolean", "undefined", "symbol", "null"],
        code: `42                 // number
"hello"            // string
true               // boolean
undefined          // undefined
null               // null (but typeof null is a historical bug)
{ name: "Mina" }   // object
[1, 2, 3]          // object
function greet() {} // function`,
      },
      {
        title: "JavaScript is dynamically typed",
        body: [
          "Types belong to values, not permanently to variable names. The same let binding can refer to values of different types over time. That is dynamic typing.",
          "People also call JavaScript loosely or weakly typed because many operators perform implicit conversion. Those labels are informal; dynamic typing and coercion describe the behavior more precisely.",
        ],
        code: `let result = 10;       // result refers to a number
result = "ten";       // now it refers to a string

typeof 10             // "number"
typeof "10"           // "string"
typeof null           // "object" (legacy behavior)`,
        note: "TypeScript checks possible types before the program runs. It does not change JavaScript's runtime typing model.",
      },
      {
        title: "Coercion changes the operation",
        body: [
          "Implicit coercion converts a value because an operator requires or prefers another type. The + operator can mean numeric addition or string concatenation, which makes mixed operands easy to misread.",
          "Use strict equality and explicit conversion when the intended type matters.",
        ],
        code: `1 + 2                 // 3
"1" + 2               // "12"
"6" * 2               // 12
0 == false             // true (coercion)
0 === false            // false
Number("42")           // 42
String(42)              // "42"`,
      },
    ],
    check: {
      question: "Which statement best describes JavaScript's type system?",
      choices: [
        "Each variable receives one permanent type when declared.",
        "Values have types, and a let binding may refer to different types over time.",
        "JavaScript values do not have types until TypeScript checks them.",
      ],
      answer: 1,
      explanation: "JavaScript is dynamically typed: runtime values have types, while a mutable binding is not permanently restricted to one type.",
    },
    takeaways: [
      "Expressions produce values.",
      "Runtime values have types; variable names do not receive a permanent type.",
      "Coercion is real behavior, but explicit conversion is usually clearer.",
    ],
    production: {
      title: "Runtime data ignores TypeScript annotations",
      body: "Network, storage, DOM, and JSON values enter at runtime. A TypeScript assertion does not validate them. Parse unknown input at the boundary before application code relies on its shape.",
    },
    debugging: {
      prompt: "A value has a different runtime type than its TypeScript annotation.",
      steps: ["Inspect the unparsed boundary value.", "Log typeof plus Array.isArray where useful.", "Replace assertions with runtime validation and explicit conversion."],
    },
    exercises: [{
      prompt: "Explain why JSON.parse cannot guarantee a TypeScript interface.",
      answer: "JSON.parse creates runtime JavaScript values and returns any. Interfaces are erased and perform no runtime validation.",
    }],
  },
  {
    slug: "variables-and-undefined",
    number: 4,
    unit: "values",
    title: "Variables, Bindings, and Undefined",
    shortTitle: "Variables",
    summary: "Separate declaration, initialization, assignment, undefined, and missing names.",
    objectives: [
      "Describe a variable as a binding to a value",
      "Separate undefined from an undeclared identifier",
      "Choose const, let, or var deliberately",
    ],
    sections: [
      {
        title: "A binding connects a name to a value",
        body: [
          "The word variable is useful, but binding is more precise. A declaration creates a name in a scope. Initialization gives that binding its first value. Assignment changes the value afterward.",
          "These operations can happen together, but they are not the same operation.",
        ],
        code: `let score;       // declaration, then initialized to undefined
score = 10;      // assignment
score = 20;      // reassignment

const name = "Mina"; // declaration and required initialization`,
      },
      {
        title: "Undefined is a value; not defined is an error",
        body: [
          "undefined is a primitive value used when no more specific value is present. An existing binding can contain undefined.",
          "An identifier that cannot be found through variable lookup is undeclared. Reading it throws a ReferenceError often worded as 'x is not defined'. That message is not a special JavaScript value.",
        ],
        code: `let coffee;
console.log(coffee); // undefined

console.log(tea);    // ReferenceError: tea is not defined

function greet(name) {
  console.log(name); // undefined when no argument is supplied
}
greet();`,
        note: "typeof missingName returns \"undefined\" for an undeclared name, but typeof a let binding inside its temporal dead zone still throws.",
      },
      {
        title: "const protects the binding",
        body: [
          "const prevents reassignment of the binding. It does not freeze an object. Mutating a property keeps the binding connected to the same object.",
          "Prefer const when the binding does not need reassignment, let when it does, and avoid var in modern application code unless studying legacy semantics.",
        ],
        code: `const user = { name: "Mina" };
user.name = "Noah";  // allowed: same object
user = { name: "Jo" }; // TypeError: binding reassignment

Object.freeze(user); // shallow runtime protection`,
      },
    ],
    check: {
      question: "What happens when this code runs?",
      code: `let total;
console.log(total);
console.log(discount);`,
      choices: [
        "It logs undefined twice.",
        "It logs undefined, then throws ReferenceError.",
        "It throws before logging anything.",
      ],
      answer: 1,
      explanation: "total is declared and contains undefined. No discount binding can be found, so the second read throws ReferenceError.",
    },
    takeaways: [
      "Declaration, initialization, and assignment are distinct operations.",
      "undefined is a value; 'not defined' usually describes failed identifier lookup.",
      "const prevents reassignment, not object mutation.",
    ],
    production: {
      title: "Missing data has several meanings",
      body: "An absent property, a present property containing undefined, null from an API, and an undeclared identifier are observably different. Define one domain representation instead of mixing them accidentally.",
    },
    debugging: {
      prompt: "A property appears undefined even though the containing object exists.",
      steps: ["Check Object.hasOwn rather than truthiness.", "Inspect the exact property spelling and prototype chain.", "Trace where absence is converted to null or undefined."],
    },
    exercises: [{
      prompt: "Distinguish an absent property from one explicitly set to undefined.",
      code: `Object.hasOwn({}, "value")
Object.hasOwn({ value: undefined }, "value")`,
      answer: "The first is false and the second true, even though reading both properties produces undefined.",
    }],
  },
  {
    slug: "scope-and-lookup",
    number: 5,
    unit: "execution",
    title: "Scope and Variable Lookup",
    shortTitle: "Scope",
    summary: "Follow lexical nesting to predict exactly which binding JavaScript reads.",
    objectives: [
      "Recognize global, module, function, and block scope",
      "Perform variable lookup through the lexical environment chain",
      "Distinguish shadowing from reassignment",
    ],
    sections: [
      {
        title: "Scope answers where a name is available",
        body: [
          "JavaScript is lexically scoped. A function's accessible outer scopes are determined by where the function is written, not where it is called.",
          "let, const, and class are block-scoped. var is function-scoped. Functions create scopes, while modules have their own top-level scope.",
        ],
        code: `const course = "JavaScript";

function teach() {
  const topic = "scope";
  if (true) {
    const example = "block scoped";
    console.log(course, topic, example);
  }
  // example is not available here
}`,
      },
      {
        title: "Lookup walks outward",
        body: [
          "When JavaScript evaluates a name, it checks the current lexical environment. If the binding is absent, it follows the outer reference and repeats. Lookup stops at the first match.",
          "If the chain ends without a match, the read throws ReferenceError. JavaScript does not search callers on the call stack.",
        ],
        code: `const label = "global";

function outer() {
  const label = "outer";
  function inner() {
    console.log(label); // "outer"
  }
  return inner;
}

const readLabel = outer();
readLabel();`,
        output: "outer",
      },
      {
        title: "Shadowing creates another binding",
        body: [
          "A declaration in an inner scope may use the same name as an outer binding. The inner binding shadows the outer one inside that scope; it does not modify it.",
          "A temporal dead zone can shadow an outer binding even before the inner declaration line executes.",
        ],
        code: `const count = 1;

{
  // console.log(count); // ReferenceError, not outer count
  const count = 2;
  console.log(count);    // 2
}

console.log(count);      // 1`,
      },
    ],
    check: {
      question: "What does show() print?",
      code: `const color = "red";
function show() {
  console.log(color);
}
function run() {
  const color = "blue";
  show();
}
run();`,
      choices: ["red", "blue", "ReferenceError"],
      answer: 0,
      explanation: "show was defined in the scope containing the red binding. Lexical lookup does not inspect run's local variables.",
    },
    takeaways: [
      "Lexical position determines a function's outer scope.",
      "Lookup checks the current environment and then walks outward.",
      "The scope chain and call stack answer different questions.",
    ],
    production: {
      title: "Dynamic callers cannot supply lexical variables",
      body: "Moving a helper to another module or scope can break accidental free-variable access. Prefer explicit parameters for dependencies that are part of the function's contract.",
    },
    debugging: {
      prompt: "A variable resolves to an unexpected binding.",
      steps: ["Start at the identifier's source position.", "List lexical parents, not callers.", "Locate the first declaration with the same name and check for TDZ shadowing."],
    },
    exercises: [{
      prompt: "Draw the lexical chain and call stack for the lesson's show/run example.",
      answer: "The call stack is global -> run -> show. show's lexical chain is show -> global; run's local color is not in that chain.",
    }],
  },
  {
    slug: "functions-and-environments",
    number: 9,
    unit: "functions",
    title: "Functions and Their Environments",
    shortTitle: "Functions",
    summary: "See functions as values and understand what a call creates.",
    objectives: [
      "Compare declarations, expressions, and arrow functions",
      "Connect first-class functions, higher-order functions, and callbacks",
      "Trace parameters, local bindings, and return values",
      "Use Lexical Environment and Variable Environment accurately",
    ],
    sections: [
      {
        title: "Functions are first-class values",
        body: [
          "JavaScript treats functions as first-class values. A function can be stored in a binding, placed in an object or array, passed as an argument, and returned from another function.",
          "First-class describes what the language allows us to do with functions. Calling and referring to a function are different operations: greet is the function value, while greet() calls it.",
          "Function declarations are initialized during scope preparation. Function expressions and arrow functions follow the initialization rules of their containing binding.",
        ],
        code: `greet(); // works: declaration is already initialized

function greet() {
  return "Hello";
}

const welcome = function () { return "Welcome"; };
const wave = () => "Wave";

console.log(greet);   // function value
console.log(greet()); // returned string`,
      },
      {
        title: "Higher-order functions receive or return functions",
        body: [
          "A higher-order function is a function that accepts a function as an argument, returns a function, or does both. First-class functions make this pattern possible.",
          "Array methods such as map, filter, and reduce are familiar higher-order functions because they receive functions that control part of their behavior.",
        ],
        code: `function repeat(action, times) {
  for (let index = 0; index < times; index += 1) {
    action(index);
  }
}

repeat((index) => console.log(index), 3);

function multiplyBy(factor) {
  return (number) => number * factor;
}

const double = multiplyBy(2);
double(5); // 10`,
        note: "Higher-order describes a function's inputs or output. It does not mean the function is asynchronous.",
      },
      {
        title: "A callback is a function passed for later invocation",
        body: [
          "A callback is a function supplied to other code so that code can call it at the appropriate point. The receiving code is a higher-order function; the supplied function plays the callback role.",
          "Callbacks may be synchronous or asynchronous. map calls its callback during map's current execution. A timer asks the host to arrange a callback for a later task.",
        ],
        code: `// Synchronous callback
const doubled = [1, 2, 3].map((number) => number * 2);

// Asynchronous callback
setTimeout(() => {
  console.log("timer finished");
}, 1000);`,
        bullets: [
          "map is a higher-order function",
          "number => number * 2 is its callback",
          "setTimeout receives a callback but does not call it immediately",
          "The same function can be a callback in one context and a normal direct call in another",
        ],
      },
      {
        title: "Each call gets an execution context",
        body: [
          "Calling a function creates an execution context containing the information needed to run that call. Parameters receive argument values, local declarations are prepared, statements execute, and the call eventually returns.",
          "Two calls to the same function get separate parameter and local bindings.",
        ],
        code: `function total(price, taxRate = 0.07) {
  const tax = price * taxRate;
  return price + tax;
}

const first = total(100); // its own price, taxRate, tax
const second = total(50); // a separate set of bindings`,
      },
      {
        title: "Lexical Environment and Variable Environment",
        body: [
          "A Lexical Environment is a specification model: a record of bindings plus a reference to an outer environment. It explains scope and lookup; it is not necessarily a literal object inside the engine.",
          "Execution contexts also have a VariableEnvironment field. It matters when the specification handles var declarations differently from lexical declarations. In most modern teaching, use the lexical-environment chain as the main lookup model and introduce Variable Environment as precise var-related specification detail.",
        ],
        bullets: [
          "Lexical declarations: let, const, class",
          "Variable declarations: var and some function declarations",
          "Engine storage may be optimized; the specification describes observable behavior",
        ],
        note: "Do not teach two physical boxes called Lexical Environment and Variable Environment. They are specification mechanisms for reasoning about bindings.",
      },
    ],
    check: {
      question: "What is created each time addTax is called?",
      code: `function addTax(price) {
  const tax = price * 0.07;
  return price + tax;
}`,
      choices: [
        "A new execution context with fresh parameter and local bindings",
        "A permanent new global scope",
        "A copy of the function's source code in window",
      ],
      answer: 0,
      explanation: "Each call runs in a new execution context. Its price and tax bindings are separate from every other call.",
    },
    takeaways: [
      "First-class functions can be stored, passed, and returned.",
      "Higher-order functions receive or return functions; a callback is a function passed to be invoked by other code.",
      "Each call receives its own execution context and local bindings.",
      "Lexical Environment is the central model for scope and lookup.",
    ],
    production: {
      title: "Callback APIs transfer control",
      body: "Passing a callback gives another function control over when, how often, and with which arguments it is called. Document those rules; type signatures alone may not express timing or reentrancy.",
    },
    debugging: {
      prompt: "A callback fires more often or earlier than expected.",
      steps: ["Identify the higher-order function that owns invocation.", "Check whether invocation is synchronous and reentrant.", "Record call count, arguments, and callback identity."],
    },
    exercises: [{
      prompt: "Classify map, its supplied arrow, and multiplyBy.",
      answer: "map is higher-order and its arrow is a synchronous callback. multiplyBy is higher-order because it returns a function.",
    }],
  },
  {
    slug: "execution-and-hoisting",
    number: 6,
    unit: "execution",
    title: "Execution Context, Hoisting, and the Stack",
    shortTitle: "Execution",
    summary: "Replace the 'JavaScript moves code' myth with a preparation-and-execution model.",
    objectives: [
      "Explain hoisting without imagining moved source code",
      "Predict var, let, const, and function behavior before declaration lines",
      "Trace nested calls on the call stack",
    ],
    sections: [
      {
        title: "Preparation happens before statements run",
        body: [
          "JavaScript parses source, determines scopes, creates bindings, and initializes different declaration types according to their rules before ordinary statements execute.",
          "Hoisting is a teaching label for the observable result. The engine does not move declaration text to the top of the file.",
        ],
        code: `console.log(oldScore); // undefined
var oldScore = 10;

// console.log(score); // ReferenceError: TDZ
let score = 10;

sayHi(); // works
function sayHi() { console.log("Hi"); }`,
      },
      {
        title: "The temporal dead zone protects lexical bindings",
        body: [
          "A let, const, or class binding exists from the beginning of its scope but remains uninitialized until execution reaches its declaration. Access during that interval throws ReferenceError.",
          "var is initialized to undefined during preparation. That older behavior can hide ordering mistakes, which is one reason modern code favors const and let.",
        ],
        code: `{
  // TDZ for status starts at block entry
  // console.log(status); // ReferenceError
  const status = "ready";
  console.log(status);    // "ready"
}`,
      },
      {
        title: "The call stack tracks active calls",
        body: [
          "The global execution context begins first. A function call pushes a new frame. A nested call pushes another. Returning removes the top frame, so execution resumes in its caller.",
          "The stack is last-in, first-out. Unbounded recursion eventually exhausts the available stack and throws a RangeError.",
        ],
        code: `function double(value) {
  return value * 2;
}

function calculate() {
  return double(5) + 1;
}

calculate();

// Push: global -> calculate -> double
// Pop:  double -> calculate -> global`,
      },
    ],
    check: {
      question: "What is the first result?",
      code: `console.log(value);
var value = 3;`,
      choices: ["3", "undefined", "ReferenceError"],
      answer: 1,
      explanation: "The var binding is created and initialized to undefined before statement execution. The assignment to 3 happens later.",
    },
    takeaways: [
      "Hoisting describes declaration preparation, not source-code movement.",
      "Lexical bindings exist in a TDZ until initialized.",
      "The call stack tracks active calls; it does not control lexical lookup.",
    ],
    production: {
      title: "Hoisting myths produce fragile refactors",
      body: "Code that relies on var reading as undefined or functions being callable before their declaration can change behavior when declarations are converted or moved across block and module boundaries. Reason from declaration instantiation instead.",
    },
    debugging: {
      prompt: "A declaration behaves differently after var becomes let.",
      steps: ["Mark the binding's entire scope.", "Separate binding creation from initialization.", "Locate every access before the declaration evaluation point."],
    },
    exercises: [{
      prompt: "Explain why typeof is not a universal safe-before-declaration check.",
      answer: "typeof returns undefined for an unresolvable name, but accessing an existing lexical binding in its TDZ throws ReferenceError.",
    }],
  },
  {
    slug: "this-window-and-globalthis",
    number: 11,
    unit: "functions",
    title: "this, window, and globalThis",
    shortTitle: "this & globals",
    summary: "Separate function call context from browser globals and module behavior.",
    objectives: [
      "Determine this from a normal function's call site",
      "Explain arrow-function this",
      "Distinguish window, globalThis, scripts, and modules",
    ],
    sections: [
      {
        title: "this is not variable lookup",
        body: [
          "For a normal function, this is generally determined by how the function is called. Calling object.method() supplies object as this. Extracting that function and calling it separately loses that receiver.",
          "Strict-mode plain function calls receive undefined as this. Classes and ES modules use strict semantics.",
        ],
        code: `const user = {
  name: "Mina",
  introduce() {
    return this.name;
  },
};

user.introduce();       // "Mina"
const speak = user.introduce;
// speak();             // this is undefined in strict mode
const fixed = speak.bind(user);
fixed();                // "Mina"`,
      },
      {
        title: "Arrow functions inherit this",
        body: [
          "Arrow functions do not create their own this. They close over this from the surrounding lexical context. That makes them useful for callbacks that should retain an outer method's receiver.",
          "It also means an arrow function is usually the wrong choice for an object method when the method should receive the object through its call site.",
        ],
        code: `const timer = {
  seconds: 0,
  start() {
    setTimeout(() => {
      this.seconds += 1; // this comes from start()
    }, 1000);
  },
};`,
      },
      {
        title: "window is a browser object",
        body: [
          "window represents a browser window and exposes host APIs such as document, location, and setTimeout. It does not exist in every JavaScript environment or during all server rendering.",
          "globalThis is the standard cross-environment way to reference the global object. At the top level of an ES module, this is undefined, and top-level let or const declarations do not become window properties. Older classic scripts have different global-declaration behavior.",
        ],
        code: `// Browser only
window.document === document; // true

// Standard global reference
globalThis.setTimeout;

// In an ES module
console.log(this); // undefined
const course = "JavaScript";
window.course;     // undefined`,
        note: "In React and Next.js, access browser-only APIs in event handlers or appropriate client-side effects, not during server rendering.",
      },
    ],
    check: {
      question: "What does this refer to inside introduce when called as user.introduce()?",
      choices: ["The user object", "The global window in every environment", "The function's outer lexical scope"],
      answer: 0,
      explanation: "A normal method call supplies the object before the dot as the receiver. That receiver becomes this for the call.",
    },
    takeaways: [
      "Normal-function this comes from the call form, not lexical variable lookup.",
      "Arrow functions inherit this from their surroundings.",
      "window is browser-specific; globalThis is the standard global reference.",
    ],
    production: {
      title: "Method extraction silently loses the receiver",
      body: "Passing object.method directly to a callback API often removes its object receiver. Bind deliberately, wrap the call, or design the method so it does not depend on dynamic this.",
    },
    debugging: {
      prompt: "A method reads this as undefined.",
      steps: ["Inspect the exact call expression.", "Determine whether call, apply, bind, new, or a receiver supplies this.", "Check whether an arrow or nested callback changes the intended behavior."],
    },
    exercises: [{
      prompt: "Order normal-function this precedence for common calls.",
      answer: "new binding wins over explicit bind/call/apply, which wins over an implicit object receiver, which wins over default binding. Arrow this is lexical and does not use that precedence.",
    }],
  },
  {
    slug: "closures",
    number: 13,
    unit: "functions",
    title: "Closures",
    shortTitle: "Closures",
    summary: "Understand how functions keep access to outer bindings after a call returns.",
    objectives: [
      "Define a closure using lexical environments",
      "Explain independent private state across calls",
      "Connect closures to callbacks and stale React values",
    ],
    sections: [
      {
        title: "A function closes over its outer scope",
        body: [
          "A closure is a function together with access to the lexical environment where it was created. The function can use those outer bindings even after the outer function has returned.",
          "The binding is retained, not a frozen copy of the value from creation time.",
        ],
        code: `function createCounter() {
  let count = 0;
  return function increment() {
    count += 1;
    return count;
  };
}

const next = createCounter();
next(); // 1
next(); // 2`,
      },
      {
        title: "Each outer call creates an environment",
        body: [
          "Calling createCounter again creates a new count binding. Each returned function closes over the environment from its own outer call, so the counters do not share state.",
          "Closures make private state and function factories possible without global variables.",
        ],
        code: `const first = createCounter();
const second = createCounter();

first();  // 1
first();  // 2
second(); // 1`,
      },
      {
        title: "Callbacks are closures too",
        body: [
          "Event handlers, timer callbacks, and promise callbacks often execute later, but they still use the lexical environment from where they were created.",
          "A React render creates new bindings and new callback closures. An older callback can therefore observe values from an older render: a stale closure. Dependency arrays, functional state updates, or refs solve different versions of that problem.",
        ],
        code: `function attachGreeting(name) {
  button.addEventListener("click", () => {
    console.log("Hello " + name);
  });
}

// The callback can still read name when the click happens later.`,
        note: "Closures are normal JavaScript behavior, not a special React feature.",
      },
    ],
    check: {
      question: "What does the final call return?",
      code: `const a = createCounter();
const b = createCounter();
a();
a();
b();`,
      choices: ["1", "2", "3"],
      answer: 0,
      explanation: "a and b close over different count bindings. Calling a twice does not change b's private count.",
    },
    takeaways: [
      "A closure retains access to bindings in its creation environment.",
      "Separate outer calls create separate captured environments.",
      "Delayed callbacks and React handlers rely on ordinary closure behavior.",
    ],
    production: {
      title: "A closure can preserve stale render state",
      body: "React does not mutate a render's state binding. Delayed work created by that render continues to see its snapshot. Choose functional updates, renewed synchronization, or a ref based on whether the code needs an update rule, rerun, or latest mutable value.",
    },
    debugging: {
      prompt: "A delayed callback observes an old value.",
      steps: ["Identify the render or outer call that created it.", "List captured bindings.", "Determine whether the callback should be recreated or should read a deliberately current source."],
    },
    exercises: [{
      prompt: "Explain why returning a closure does not keep the outer call on the stack.",
      answer: "The outer execution context returns and leaves the stack. Its required environment remains reachable through the returned function.",
    }],
  },
  {
    slug: "event-loop",
    number: 18,
    unit: "async",
    title: "The Event Loop",
    shortTitle: "Event loop",
    summary: "Predict synchronous code, promise microtasks, timers, and async/await ordering.",
    objectives: [
      "Separate the JavaScript engine from host APIs",
      "Order synchronous work, microtasks, and tasks",
      "Explain what await schedules and what it does not parallelize",
    ],
    sections: [
      {
        title: "JavaScript runs one stack at a time",
        body: [
          "A browser or Node.js provides host APIs around the JavaScript engine. When code requests a timer, the host tracks it while JavaScript continues running the current stack.",
          "Run-to-completion means another callback does not interrupt the middle of the current synchronous job. When the stack becomes empty, the event loop can choose queued work.",
        ],
        code: `console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");

// A, C, B`,
        output: `A
C
B`,
      },
      {
        title: "Microtasks run before the next task",
        body: [
          "Timer callbacks are tasks. Promise reactions and the continuation after await are microtasks. After the current task finishes, JavaScript drains the microtask queue before starting the next task.",
          "A zero-delay timer means eligible after at least that delay; it never means execute immediately.",
        ],
        code: `console.log("start");

setTimeout(() => console.log("timer"), 0);
Promise.resolve().then(() => console.log("promise"));

console.log("end");`,
        output: `start
end
promise
timer`,
      },
      {
        title: "await pauses one async function",
        body: [
          "An async function always returns a promise. Reaching await suspends the rest of that async function and lets the caller continue. When the awaited value settles, the continuation is queued as a microtask.",
          "await does not block the thread, and writing sequential awaits does not make independent operations parallel. Start independent promises first and await them together with Promise.all.",
        ],
        code: `async function run() {
  console.log("inside 1");
  await Promise.resolve();
  console.log("inside 2");
}

console.log("A");
run();
console.log("B");

// A, inside 1, B, inside 2`,
      },
      {
        title: "One complete trace",
        body: [
          "First run every synchronous statement. Then drain all available microtasks, including microtasks added by other microtasks. Only then can the next task, such as a timer callback, run.",
        ],
        code: `console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve()
  .then(() => {
    console.log("3");
    queueMicrotask(() => console.log("4"));
  })
  .then(() => console.log("5"));

console.log("6");`,
        output: `1
6
3
4
5
2`,
        note: "Rendering opportunities usually occur between tasks, after microtasks drain. Exact host scheduling details can differ between browsers and Node.js.",
      },
    ],
    check: {
      question: "Choose the output order.",
      code: `console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");`,
      choices: ["A, B, C, D", "A, D, C, B", "A, C, D, B"],
      answer: 1,
      explanation: "A and D are synchronous. The promise reaction is a microtask and runs before the timer task.",
    },
    takeaways: [
      "The current synchronous job runs to completion.",
      "Microtasks drain before the next task begins.",
      "await schedules a continuation; it does not make independent work parallel by itself.",
    ],
    production: {
      title: "Microtask chains can delay rendering and input",
      body: "The host drains microtasks before moving to the next task and usually before rendering. Recursively scheduling microtasks can starve timers, painting, and user input even though each callback is short.",
    },
    debugging: {
      prompt: "A zero-delay timer and UI update run much later than expected.",
      steps: ["Measure the current synchronous task.", "Inspect Promise and queueMicrotask recursion.", "Use the performance timeline to find long tasks and delayed rendering opportunities."],
    },
    exercises: [{
      prompt: "Trace a microtask that schedules another microtask and a timer.",
      answer: "Finish the current task, drain the original and newly added microtasks until empty, then allow the timer task. Rendering opportunities are host-controlled between tasks.",
    }],
  },
];

import { advancedJavaScriptLessons } from "./advancedLessons";

export const javascriptLessons = [...coreLessons, ...advancedJavaScriptLessons].sort(
  (left, right) => left.number - right.number,
);

export function getJavaScriptLesson(slug: string) {
  return javascriptLessons.find((lesson) => lesson.slug === slug);
}
