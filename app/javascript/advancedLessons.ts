import type { JavaScriptLesson } from "./course";

export const advancedJavaScriptLessons: JavaScriptLesson[] = [
  {
    slug: "coercion-and-equality",
    number: 2,
    unit: "values",
    title: "Coercion, Equality, and Truthiness",
    shortTitle: "Coercion",
    summary: "Predict conversions by operation instead of memorizing a list of surprising outputs.",
    objectives: [
      "Trace ToPrimitive, numeric, string, and boolean conversion",
      "Choose between strict equality, Object.is, and deliberate coercion",
      "Recognize truthiness bugs at application boundaries",
    ],
    sections: [
      {
        title: "Operators request conversions",
        body: [
          "JavaScript does not randomly change types. Each operator has an algorithm. Binary + first converts objects to primitives, then concatenates if either primitive is a string; otherwise it performs numeric addition. Arithmetic operators such as - request numeric conversion.",
          "Objects use a primitive-conversion hint. Ordinary objects generally try valueOf and toString in an order determined by that hint. Dates are a notable special case. Production code should rarely depend on custom coercion when an explicit conversion communicates intent better.",
        ],
        code: `"5" + 1              // "51"
"5" - 1              // 4
[1, 2] + [3, 4]      // "1,23,4"
Number("")           // 0
Number(undefined)    // NaN
String(null)         // "null"`,
      },
      {
        title: "Truthiness is boolean conversion, not emptiness",
        body: [
          "Conditions apply boolean conversion. Only false, 0, -0, 0n, NaN, the empty string, null, and undefined are falsy. Every object is truthy, including empty arrays, empty objects, and wrapper objects containing false.",
          "The || operator returns an operand, not necessarily a boolean. It treats all falsy values as missing. The ?? operator only falls back for null or undefined, which is usually correct for numeric and string configuration values.",
        ],
        code: `Boolean([])           // true
Boolean("false")      // true

const retries = 0;
retries || 3           // 3: loses a valid zero
retries ?? 3           // 0

const label = "";
label || "Untitled"    // "Untitled"
label ?? "Untitled"    // ""`,
      },
      {
        title: "Equality has several useful relations",
        body: [
          "=== avoids type coercion but still has numeric edge cases: NaN is not equal to itself, while +0 and -0 compare equal. Object.is treats NaN as equal to itself and distinguishes signed zero. SameValueZero, used by includes, treats NaN as equal and signed zeros as equal.",
          "Loose equality is not simply bad or random, but its coercion table is difficult to review. One defensible use is value == null when intentionally matching only null and undefined. Use that convention only when the team recognizes it.",
        ],
        code: `NaN === NaN                  // false
Object.is(NaN, NaN)          // true
Object.is(0, -0)             // false
[NaN].includes(NaN)          // true

null == undefined            // true
0 == false                   // true
"" == false                  // true`,
      },
    ],
    production: {
      title: "Configuration defaults that erase valid data",
      body: "Using || for defaults commonly replaces 0, false, or an empty string even when those values are valid. Decide whether the application means 'absent' or 'falsy' and use ?? or an explicit check accordingly.",
      code: `const pageSize = options.pageSize ?? 25;
const showArchived = options.showArchived ?? true;`,
    },
    debugging: {
      prompt: "A form sends an empty string and the API receives zero. Trace the conversion boundary.",
      steps: [
        "Inspect the raw DOM value and confirm that input values are strings.",
        "Find the exact Number, unary +, arithmetic, or schema conversion.",
        "Decide whether empty means absent, zero, or invalid before converting.",
      ],
    },
    exercises: [
      {
        prompt: "Predict all four results before running the code.",
        code: `[1] + 1
[1] - 1
[] == false
[] === false`,
        answer: `"11", 0, true, false. Array-to-primitive conversion produces strings for the arithmetic comparison paths; strict equality performs no coercion.`,
      },
      {
        prompt: "Repair a default that must preserve 0 and false.",
        code: `const value = supplied || fallback;`,
        answer: "Use supplied ?? fallback when only null and undefined mean absent.",
      },
    ],
    check: {
      question: "Which expression preserves a deliberately configured zero?",
      choices: ["count || 10", "count ?? 10", "Boolean(count) || 10"],
      answer: 1,
      explanation: "Nullish coalescing falls back only for null and undefined, so zero remains zero.",
    },
    takeaways: [
      "Conversions follow operator-specific algorithms.",
      "Objects are truthy regardless of whether they appear empty.",
      "Choose an equality relation and fallback operator based on the domain rule.",
    ],
  },
  {
    slug: "objects-identity-and-copying",
    number: 3,
    unit: "values",
    title: "Objects, Identity, and Copying",
    shortTitle: "Objects",
    summary: "Use a precise pass-by-value model for shared objects, mutation, and shallow copies.",
    objectives: [
      "Explain object identity without calling JavaScript pass-by-reference",
      "Distinguish binding reassignment from property mutation",
      "Recognize the limits of spread, Object.freeze, and structuredClone",
    ],
    sections: [
      {
        title: "Assignment always copies a value",
        body: [
          "JavaScript is pass-by-value. For an object value, the copied value identifies the same object. Two bindings can therefore reach one mutable object, but assigning a different object to one binding does not redirect the other binding.",
          "Calling this pass-by-reference predicts the wrong behavior for parameter reassignment. A function can mutate a passed object, but it cannot replace the caller's binding by assigning a new object to its parameter.",
        ],
        code: `const first = { count: 0 };
const second = first;
second.count += 1;
console.log(first.count); // 1

function replace(value) {
  value = { count: 99 };
}
replace(first);
console.log(first.count); // still 1`,
      },
      {
        title: "Equality observes identity",
        body: [
          "Two separately created objects are not strictly equal even when their properties look identical. Equality compares object identity, not a recursive structural description.",
          "This matters for React dependencies, memoization, Map keys, Set membership, and caches. Recreating an object produces a new identity; mutating one preserves its identity even though its contents changed.",
        ],
        code: `{} === {}                         // false
const settings = { theme: "dark" };
settings === settings                  // true

const cache = new Map();
cache.set(settings, "result");
cache.get({ theme: "dark" });          // undefined`,
      },
      {
        title: "Common copies are shallow",
        body: [
          "Object spread and array spread create a new outer container while reusing nested object values. Object.freeze is also shallow. A nested mutation can therefore affect both the original and the copy.",
          "structuredClone handles many built-in data types and cycles, but not functions or every host object. Serialization through JSON loses undefined, symbols, BigInt, dates as dates, and cyclic graphs. Choose cloning based on the actual data contract rather than using cloning to hide unclear ownership.",
        ],
        code: `const original = { profile: { name: "Mina" } };
const copy = { ...original };

copy.profile.name = "Noah";
console.log(original.profile.name); // "Noah"

const independent = structuredClone(original);
independent.profile.name = "Jo";`,
      },
    ],
    production: {
      title: "React state that changes without rendering",
      body: "Mutating a state object and passing the same identity back can prevent React from observing a change. Construct a new value along every changed ownership path.",
      code: `setUser((current) => ({
  ...current,
  profile: { ...current.profile, name: nextName },
}));`,
    },
    debugging: {
      prompt: "A nested setting changes in two supposedly independent objects.",
      steps: [
        "Check identity at each level with Object.is(left, right).",
        "Find the level where a shallow copy stopped.",
        "Clarify ownership before choosing immutable update or deliberate sharing.",
      ],
    },
    exercises: [
      {
        prompt: "Predict a.count and b.count.",
        code: `const a = { count: 1 };
let b = a;
b.count = 2;
b = { count: 3 };`,
        answer: "a.count is 2; b.count is 3. Mutation reached the shared first object, then reassignment changed only b.",
      },
    ],
    check: {
      question: "What does object spread guarantee?",
      choices: ["A deep clone", "A new outer object with property values copied", "Recursive immutability"],
      answer: 1,
      explanation: "Spread creates a new outer object. Nested object values still identify the same nested objects.",
    },
    takeaways: [
      "JavaScript passes values; object values can provide shared access to one object.",
      "Object equality is identity equality.",
      "Copy depth and data ownership must be deliberate.",
    ],
  },
  {
    slug: "parsing-and-errors",
    number: 7,
    unit: "execution",
    title: "Parsing, Early Errors, and Runtime Failures",
    shortTitle: "Errors",
    summary: "Separate code that cannot become a program from failures reached during execution.",
    objectives: [
      "Distinguish syntax, early, reference, and type errors",
      "Explain why some unreachable code still prevents execution",
      "Read stack traces without confusing callers with lexical parents",
    ],
    sections: [
      {
        title: "Parsing precedes ordinary execution",
        body: [
          "The engine parses a Script or Module and builds a syntactic representation before running ordinary statements. A syntax error means no execution begins for that unit of code, even when the invalid syntax appears after statements that look runnable.",
          "Modules and scripts use different grammar and semantics. Import and export declarations belong to modules; top-level await is also a module capability in supported environments.",
        ],
        code: `console.log("never runs");

// The parser cannot complete this declaration:
const broken = ;`,
      },
      {
        title: "Early errors are static semantic rules",
        body: [
          "Some programs are grammatically parseable but rejected by additional rules before evaluation. Duplicate lexical declarations, return outside a function, invalid break targets, and assigning to certain restricted forms are examples.",
          "Because early errors occur before ordinary execution, try/catch inside the same source text cannot recover from them. Build tools may report them before the JavaScript runtime is involved.",
        ],
        code: `// Early error: duplicate lexical declaration
let status = "loading";
let status = "ready";

// Runtime ReferenceError instead:
console.log(missingName);`,
      },
      {
        title: "Runtime errors occur while evaluating",
        body: [
          "ReferenceError usually means identifier resolution failed or a binding was accessed in its TDZ. TypeError means the value was found but the requested operation is not allowed, such as calling a non-callable value or reading a property from null.",
          "A stack trace reports active or captured call frames. It helps locate the path of calls, but it does not display the lexical environment chain used for variable lookup.",
        ],
        code: `function loadUser(user) {
  return user.profile.name;
}

try {
  loadUser(null);
} catch (error) {
  console.error(error.name);  // TypeError
  console.error(error.stack); // call path
}`,
      },
    ],
    production: {
      title: "Catching too broadly destroys evidence",
      body: "A catch block that replaces every failure with a generic fallback hides programming errors alongside expected operational failures. Catch where recovery is possible, preserve the original cause, and add domain context.",
      code: `throw new Error("Could not load profile", { cause: error });`,
    },
    debugging: {
      prompt: "Classify a failure before attempting a fix.",
      steps: [
        "Determine whether the file parsed and any earlier statement executed.",
        "Read the error class and exact first application frame.",
        "Reconstruct both the call path and the identifier's lexical location.",
      ],
    },
    exercises: [
      {
        prompt: "Why cannot this catch its own parse error?",
        code: `try {
  const value = ;
} catch (error) {
  console.log(error);
}`,
        answer: "The entire unit must parse before try executes. The catch statement is never reached.",
      },
    ],
    check: {
      question: "Which failure means a value was found but cannot perform the requested operation?",
      choices: ["SyntaxError", "ReferenceError", "TypeError"],
      answer: 2,
      explanation: "TypeError concerns an operation incompatible with the runtime value, such as calling a number.",
    },
    takeaways: [
      "Parsing and early-error validation happen before ordinary evaluation.",
      "ReferenceError and TypeError describe different failed runtime operations.",
      "The stack trace shows calls, not lexical lookup.",
    ],
  },
  {
    slug: "execution-contexts-and-environment-records",
    number: 8,
    unit: "execution",
    title: "Execution Contexts and Environment Records",
    shortTitle: "Contexts",
    summary: "Trace the specification machinery behind calls, bindings, this, and scope chains.",
    objectives: [
      "Identify the running execution context and its major components",
      "Distinguish declarative, object, function, global, and module records",
      "Separate context lifetime, stack presence, and environment reachability",
    ],
    sections: [
      {
        title: "An execution context represents active evaluation",
        body: [
          "The specification uses execution contexts to track evaluation state. A context includes the code being evaluated, a LexicalEnvironment, a VariableEnvironment, and function-specific information such as PrivateEnvironment and the current Realm where applicable.",
          "The running context is the top of the execution-context stack. Calling a function suspends its caller and pushes a function context. Returning removes that context and resumes the caller. Engines can optimize this representation as long as behavior is preserved.",
        ],
        code: `function outer() {
  const label = "outer";
  return inner();
}

function inner() {
  return "done";
}

outer();
// active contexts: global -> outer -> inner`,
      },
      {
        title: "Environment Records hold bindings",
        body: [
          "A Lexical Environment combines an Environment Record with an outer reference. Declarative records hold language-level bindings. Object records use an object as part of binding resolution. Function records add this, super, and new.target behavior. Module records support live import and export bindings.",
          "The global environment is composite: an object record handles many var and function declarations associated with the global object, while a declarative record handles top-level let, const, and class bindings. This explains why top-level declarations can differ in their relationship to globalThis.",
        ],
        bullets: [
          "Declarative record: lexical bindings",
          "Function record: parameters, locals, this, new.target",
          "Global record: object record plus declarative record",
          "Module record: module-scoped live bindings",
        ],
      },
      {
        title: "LexicalEnvironment can change during evaluation",
        body: [
          "Entering a block, catch clause, or loop can create a nested lexical environment without creating a new function call or execution context. That is why the scope chain can gain a level while the call stack stays unchanged.",
          "VariableEnvironment identifies the environment used for var-style declarations in the relevant algorithms. LexicalEnvironment can temporarily point at a more deeply nested block environment. They are specification references, not two guaranteed physical memory areas.",
        ],
        code: `function inspect() {      // one function context
  var functionScoped = 1;
  {
    let blockScoped = 2; // nested lexical environment
    console.log(functionScoped, blockScoped);
  }
}`,
      },
    ],
    production: {
      title: "Debuggers expose optimized approximations",
      body: "DevTools Scope and Call Stack panels are practical views, not exact specification objects. Optimized-away variables, inlining, and source maps can alter what is displayed. Use the spec model to predict behavior and the debugger to inspect a particular engine run.",
    },
    debugging: {
      prompt: "Inspect a nested call using breakpoints.",
      steps: [
        "Pause inside the innermost function and list call frames.",
        "Expand Local, Closure, Module, and Global scope groups.",
        "Identify one outer lexical binding that is not owned by the caller frame.",
      ],
    },
    exercises: [
      {
        prompt: "Explain why entering the block changes scope but not stack depth.",
        code: `function run() {
  { const value = 1; console.log(value); }
}`,
        answer: "The block creates a lexical environment inside the existing function execution context. No function call occurs.",
      },
    ],
    check: {
      question: "What combines a binding record with an outer reference?",
      choices: ["A Lexical Environment", "A call frame only", "The event loop"],
      answer: 0,
      explanation: "A Lexical Environment contains an Environment Record and a reference to its outer environment.",
    },
    takeaways: [
      "Execution contexts track active evaluation; environments explain binding access.",
      "Blocks can add lexical environments without adding call frames.",
      "Specification structures describe behavior, not required engine storage layouts.",
    ],
  },
  {
    slug: "function-calls-and-parameters",
    number: 10,
    unit: "functions",
    title: "Function Calls, Parameters, and Identity",
    shortTitle: "Calls",
    summary: "Understand argument evaluation, parameter initialization, return behavior, and function identity.",
    objectives: [
      "Trace argument evaluation before parameter initialization",
      "Use default, rest, spread, and arguments with their real semantics",
      "Recognize identity-sensitive callback and listener bugs",
    ],
    sections: [
      {
        title: "Arguments and parameters are different",
        body: [
          "Arguments are expressions evaluated by the caller before the call begins. Parameters are bindings initialized inside the new function context. Missing arguments usually initialize parameters to undefined; extra arguments are permitted.",
          "Default initializers run when the received argument is undefined, not when it is null or otherwise falsy. They are evaluated at call time from left to right and can refer to earlier parameters, but not later body declarations.",
        ],
        code: `function connect(host, port = 443, url = host + ":" + port) {
  return url;
}

connect("api.example.com");
connect("api.example.com", undefined); // default 443
connect("api.example.com", null);      // null is preserved`,
      },
      {
        title: "Rest collects; spread supplies",
        body: [
          "A rest parameter creates a real array containing remaining arguments. Spread expands an iterable into individual arguments at the call site. They use the same punctuation but perform opposite structural operations.",
          "The legacy arguments object is array-like, not an Array. In non-arrow functions it contains supplied arguments. Arrow functions have no own arguments binding and resolve an outer one if present. Prefer rest parameters when designing modern APIs.",
        ],
        code: `function sum(first, ...rest) {
  return rest.reduce((total, value) => total + value, first);
}

const values = [1, 2, 3];
sum(...values); // spread at call, rest at declaration`,
      },
      {
        title: "Function identity is observable",
        body: [
          "Evaluating a function expression or arrow expression creates a new function object. Two functions with identical source are different values. This affects event-listener removal, memoization, subscription cleanup, and React dependency arrays.",
          "A function declaration creates its function value during declaration instantiation for that scope. Calling a function does not recreate that function object, though nested function expressions are evaluated again during each outer call.",
        ],
        code: `(() => {}) === (() => {}) // false

button.addEventListener("click", () => save());
button.removeEventListener("click", () => save());
// Removal fails: the second arrow is a different function.

const handleClick = () => save();
button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);`,
      },
    ],
    production: {
      title: "Cleanup requires the same callback identity",
      body: "Subscriptions generally remove by identity. Store or retain the callback passed during setup, and make its lifecycle explicit.",
    },
    debugging: {
      prompt: "An event handler continues firing after cleanup.",
      steps: [
        "Compare setup and cleanup callback identities with Object.is.",
        "Check that capture/options values also match where the API requires it.",
        "Verify cleanup actually runs at the intended lifecycle boundary.",
      ],
    },
    exercises: [
      {
        prompt: "Which values trigger the default?",
        code: `function read(value = 10) { return value; }
read(); read(undefined); read(null); read(0);`,
        answer: "The omitted and explicit undefined arguments produce 10. null and 0 are preserved.",
      },
    ],
    check: {
      question: "Why does removing a newly written arrow listener fail?",
      choices: ["Arrows cannot be callbacks", "It is a different function identity", "removeEventListener is asynchronous"],
      answer: 1,
      explanation: "Each arrow expression evaluation creates a new function object; listener removal needs the registered identity.",
    },
    takeaways: [
      "The caller evaluates arguments; the callee initializes parameters.",
      "Defaults react to undefined, not general falsiness.",
      "Function identity is a runtime value with lifecycle consequences.",
    ],
  },
  {
    slug: "globals-scripts-and-modules",
    number: 12,
    unit: "functions",
    title: "Globals, Scripts, and Modules",
    shortTitle: "Modules",
    summary: "Understand global bindings, module isolation, live imports, and browser/server boundaries.",
    objectives: [
      "Distinguish global bindings from properties on globalThis",
      "Explain module scope, strict mode, and live bindings",
      "Avoid browser-global assumptions in server-rendered applications",
    ],
    sections: [
      {
        title: "The global environment is not one object",
        body: [
          "In browser classic scripts, some top-level var and function declarations create global-object properties. Top-level let, const, and class create global declarative bindings without corresponding window properties.",
          "globalThis provides the standard global-object reference across environments, but the APIs installed on it differ. window and document are browser-specific; Node provides a different host environment.",
        ],
        code: `// Browser classic script
var legacy = 1;
let lexical = 2;

window.legacy;  // 1
window.lexical; // undefined

globalThis === window; // true in a browser window`,
      },
      {
        title: "Modules have their own scope",
        body: [
          "Each ES module has a Module Environment Record. Top-level declarations stay module-scoped, top-level this is undefined, and module code uses strict-mode semantics automatically.",
          "Imports are read-only live bindings to another module's exported binding, not snapshots copied at import time. Cycles can work, but accessing a binding before its exporting module initializes it can expose TDZ-like failures. Design module boundaries to reduce cyclic initialization dependencies.",
        ],
        code: `// counter.js
export let count = 0;
export function increment() { count += 1; }

// view.js
import { count, increment } from "./counter.js";
increment();
console.log(count); // 1: the import is live`,
      },
      {
        title: "Host boundaries matter in React and Next.js",
        body: [
          "A module can be evaluated in a server runtime where window does not exist, then related code can run later in a browser. Checking typeof window avoids one immediate ReferenceError but does not by itself create correct rendering or lifecycle behavior.",
          "Keep browser effects in client-side lifecycle boundaries or event handlers. Prefer dependency injection for environment-specific services when core logic should run in browsers, servers, and tests.",
        ],
        code: `// Pure core logic: portable
export function formatUser(user) { return user.name.trim(); }

// Browser boundary: explicit
export function readViewport() {
  return { width: window.innerWidth, height: window.innerHeight };
}`,
      },
    ],
    production: {
      title: "Module import has evaluation effects",
      body: "Top-level side effects run when a module is evaluated, which complicates tests, server rendering, and tree shaking. Keep registration and environment access behind explicit functions when ordering matters.",
    },
    debugging: {
      prompt: "A module works in the browser but fails during a Next.js render.",
      steps: [
        "Identify which runtime evaluates each module and component.",
        "Search top-level code for window, document, storage, or DOM library access.",
        "Move the effect to an explicit client boundary instead of masking it globally.",
      ],
    },
    exercises: [
      {
        prompt: "Explain why a top-level const is readable by name but absent from window.",
        answer: "The browser global environment has a declarative record distinct from its object record. Lexical declarations use the declarative side.",
      },
    ],
    check: {
      question: "What does an ES module import receive?",
      choices: ["A writable copied value", "A read-only live binding", "A window property"],
      answer: 1,
      explanation: "Imports observe the exporting module's binding as it changes, but importing code cannot assign to the import.",
    },
    takeaways: [
      "A global binding need not be a global-object property.",
      "Modules are scoped, strict, and connected through live bindings.",
      "Browser APIs belong behind explicit host boundaries.",
    ],
  },
  {
    slug: "closure-edge-cases-and-lifetime",
    number: 14,
    unit: "functions",
    title: "Closure Edge Cases and Lifetime",
    shortTitle: "Closure depth",
    summary: "Master loop environments, shared captures, stale values, and retained memory.",
    objectives: [
      "Explain var and let loop closure behavior",
      "Distinguish shared captured bindings from independent environments",
      "Diagnose stale closures and unintended retention",
    ],
    sections: [
      {
        title: "Closures capture bindings, not snapshots",
        body: [
          "Multiple closures created in one outer call can share the same binding. A write through one closure is visible through the others. Capturing a separately computed const creates a stable value because that binding is never reassigned, not because closures copy values.",
          "This distinction explains why a message calculated before state changes can become stale while a function reading the current state binding remains current.",
        ],
        code: `function createAccount() {
  let balance = 0;
  return {
    deposit(amount) { balance += amount; },
    read() { return balance; },
  };
}

const account = createAccount();
account.deposit(50);
account.read(); // 50`,
      },
      {
        title: "Loops may create one or many bindings",
        body: [
          "var is function-scoped, so callbacks created by a traditional var loop share one i binding. By the time they run, the loop usually finished and i contains its final value.",
          "A for loop with let creates a fresh per-iteration environment for captured loop variables. Each callback closes over its iteration's binding. This is specified behavior, not a timer feature.",
        ],
        code: `for (var i = 0; i < 3; i += 1) {
  setTimeout(() => console.log(i), 0); // 3, 3, 3
}

for (let j = 0; j < 3; j += 1) {
  setTimeout(() => console.log(j), 0); // 0, 1, 2
}`,
      },
      {
        title: "Reachable closures retain reachable data",
        body: [
          "An environment can outlive its execution context when a reachable closure still needs it. Garbage collectors determine reachability from roots; they do not simply delete every local when a function returns.",
          "A long-lived listener can retain its callback, captured environment, and objects reachable from that environment. Remove obsolete listeners and subscriptions, and avoid capturing large graphs when a small identifier is sufficient.",
        ],
        code: `function mount(panel) {
  const largeModel = buildLargeModel();
  const onClick = () => render(largeModel, panel);
  window.addEventListener("click", onClick);

  return () => window.removeEventListener("click", onClick);
}`,
      },
    ],
    production: {
      title: "Stale React callbacks capture a render",
      body: "Each render creates new bindings. A callback retained from one render observes that render's values. Use functional updates when deriving next state, correct dependency lists when synchronization must refresh, and refs only for mutable values that should not trigger rendering.",
      code: `setCount((current) => current + 1);`,
    },
    debugging: {
      prompt: "A callback logs old state or retains a removed screen.",
      steps: [
        "Identify when the callback was created and who still retains it.",
        "List every outer binding referenced by the callback.",
        "Use heap retainers for memory problems and lifecycle logs for stale callbacks.",
      ],
    },
    exercises: [
      {
        prompt: "Repair the var loop without changing var to let.",
        answer: "Create a function call per iteration and pass i as an argument, producing a new parameter binding for each returned callback.",
      },
    ],
    check: {
      question: "Why do closures from one outer call see each other's updates?",
      choices: ["They share captured bindings", "Closures are global", "The event loop copies changes"],
      answer: 0,
      explanation: "Closures created in the same environment can resolve the same binding, so writes are shared.",
    },
    takeaways: [
      "Closures retain access to bindings, not frozen snapshots.",
      "let loops can create per-iteration environments.",
      "Reachability, not stack presence, determines retained memory.",
    ],
  },
  {
    slug: "promise-mechanics",
    number: 15,
    unit: "async",
    title: "Promise Mechanics",
    shortTitle: "Promises",
    summary: "Understand states, resolution, thenables, and the synchronous Promise executor.",
    objectives: [
      "Distinguish pending, fulfilled, rejected, resolved, and settled",
      "Explain synchronous executors and asynchronous reactions",
      "Adopt thenables without confusing resolution with fulfillment",
    ],
    sections: [
      {
        title: "A Promise represents an eventual outcome",
        body: [
          "A Promise begins pending and eventually becomes fulfilled with a value or rejected with a reason. Fulfilled and rejected are the two settled states. Once settled, its state and result do not change.",
          "Resolved is broader than fulfilled. A promise resolved to another pending promise or thenable is locked to that outcome but may still be pending. This distinction matters when diagnosing chains that appear resolved but have not produced a value.",
        ],
        code: `const inner = new Promise((resolve) => {
  setTimeout(() => resolve("done"), 1000);
});

const outer = new Promise((resolve) => resolve(inner));
// outer is resolved to inner, but remains pending until inner settles`,
      },
      {
        title: "The executor runs synchronously",
        body: [
          "The function passed to new Promise is called immediately during construction. It is not scheduled as a task. Calling resolve or reject records the outcome, while then/catch/finally reactions run later as microtasks.",
          "Throwing synchronously inside the executor rejects the promise. Throwing later inside an unrelated timer is outside that executor call and does not automatically reject the already-created promise unless the timer callback catches and rejects explicitly.",
        ],
        code: `console.log("A");
const promise = new Promise((resolve) => {
  console.log("B");
  resolve("C");
});
promise.then(console.log);
console.log("D");
// A, B, D, C`,
      },
      {
        title: "Resolution adopts thenables",
        body: [
          "Promise resolution inspects objects with a callable then property and adopts their eventual behavior. This lets Promise implementations interoperate, but reading then can invoke a getter and therefore execute user code.",
          "Promise.resolve returns an existing native promise of the same constructor unchanged; otherwise it creates a promise resolved to the supplied value. Never build application logic around manually shaped thenables unless interoperability requires it.",
        ],
        code: `Promise.resolve({
  then(resolve) {
    resolve(42);
  },
}).then(console.log); // 42`,
      },
    ],
    production: {
      title: "The Promise constructor anti-pattern",
      body: "Do not wrap an API that already returns a promise merely to call resolve and reject. Return or chain the original promise; unnecessary construction often breaks error propagation.",
      code: `// Prefer
return fetch(url).then((response) => response.json());`,
    },
    debugging: {
      prompt: "A promise stays pending forever.",
      steps: [
        "Find every executor branch and verify it eventually resolves or rejects.",
        "Inspect any adopted promise or thenable rather than only the outer promise.",
        "Add lifecycle logging at the external operation boundary, not endless then handlers.",
      ],
    },
    exercises: [
      {
        prompt: "Predict the output and identify what is synchronous.",
        code: `new Promise((resolve) => {
  console.log(1);
  resolve();
}).then(() => console.log(2));
console.log(3);`,
        answer: "1, 3, 2. The executor and final console.log are synchronous; the reaction is a microtask.",
      },
    ],
    check: {
      question: "Can a resolved promise still be pending?",
      choices: ["No", "Yes, when resolved to a pending promise or thenable", "Only in Node.js"],
      answer: 1,
      explanation: "Resolution can lock a promise to another pending outcome before fulfillment or rejection occurs.",
    },
    takeaways: [
      "Settled means fulfilled or rejected; resolved is a broader concept.",
      "Promise executors run now; reactions run as microtasks.",
      "Resolution can adopt another promise or thenable.",
    ],
  },
  {
    slug: "promise-chains-and-errors",
    number: 16,
    unit: "async",
    title: "Promise Chains and Error Propagation",
    shortTitle: "Chains",
    summary: "Treat each then call as a transformation that produces a distinct promise.",
    objectives: [
      "Trace the promise returned by every chain operation",
      "Predict value and error propagation through missing handlers",
      "Use catch and finally without swallowing failures",
    ],
    sections: [
      {
        title: "then always returns a new promise",
        body: [
          "Calling then registers reactions and immediately returns a distinct pending promise. The reaction's result determines the returned promise: returning a value fulfills it, throwing rejects it, and returning a promise or thenable makes it adopt that outcome.",
          "Failing to return an inner promise detaches that work from the chain. The next handler then receives undefined and errors from the detached operation may become unhandled rejections.",
        ],
        code: `fetchUser()
  .then((user) => fetchOrders(user.id)) // returned
  .then((orders) => render(orders));

// Broken: inner promise is not returned
fetchUser().then((user) => {
  fetchOrders(user.id);
}).then((value) => console.log(value)); // undefined`,
      },
      {
        title: "Missing handlers pass outcomes through",
        body: [
          "If then lacks an applicable handler, fulfillment values or rejection reasons propagate to its returned promise. A catch is equivalent to then(undefined, onRejected). It handles rejections from earlier links, not errors thrown later in a sibling branch.",
          "A rejection handler that returns normally converts the chain back to fulfillment. Re-throw or return a rejected promise when recovery is not complete.",
        ],
        code: `loadData()
  .then(parseData)
  .catch((error) => {
    report(error);
    throw error; // preserve rejection after adding context
  })
  .then(render); // skipped when catch rethrows`,
      },
      {
        title: "finally observes settlement without replacing it",
        body: [
          "finally runs for fulfillment and rejection and normally passes the original outcome through. Its callback receives no outcome argument. Use it for cleanup that does not need to decide success versus failure.",
          "If finally throws or returns a rejected promise, that new failure replaces the previous outcome. Cleanup can therefore mask the original error, so make cleanup failures observable and intentional.",
        ],
        code: `showSpinner();
return loadData()
  .then(render)
  .catch(showError)
  .finally(hideSpinner);`,
      },
    ],
    production: {
      title: "Unhandled rejections reveal lost ownership",
      body: "Every promise chain needs an owner that awaits, returns, or deliberately handles its terminal failure. Prefixing an expression with void documents intentional fire-and-forget only when that operation handles its own errors.",
    },
    debugging: {
      prompt: "A catch does not observe an expected failure.",
      steps: [
        "Draw each promise returned by then, catch, and finally as a separate node.",
        "Verify nested async work is returned into the intended chain.",
        "Check whether an earlier rejection handler converted failure into fulfillment.",
      ],
    },
    exercises: [
      {
        prompt: "What reaches the last then?",
        code: `Promise.reject("x")
  .catch(() => 10)
  .then((value) => value * 2);`,
        answer: "20. catch returns 10, fulfilling its returned promise; the next handler doubles it.",
      },
    ],
    check: {
      question: "What happens when a rejection handler returns a normal value?",
      choices: ["The chain remains rejected", "Its returned promise is fulfilled", "The value is ignored"],
      answer: 1,
      explanation: "Returning normally from either kind of reaction fulfills the promise returned by then or catch.",
    },
    takeaways: [
      "Every chain method returns a distinct promise.",
      "Return nested asynchronous work to preserve sequencing and errors.",
      "Handling a rejection converts it to fulfillment unless the handler rethrows or rejects.",
    ],
  },
  {
    slug: "async-await-and-concurrency",
    number: 17,
    unit: "async",
    title: "async, await, and Concurrency",
    shortTitle: "async/await",
    summary: "Write sequential-looking code without accidentally serializing independent operations.",
    objectives: [
      "Translate async/await behavior into Promise mechanics",
      "Separate sequencing, concurrency, and parallel execution",
      "Choose Promise combinators based on failure and result requirements",
    ],
    sections: [
      {
        title: "async functions wrap outcomes in promises",
        body: [
          "Calling an async function returns a promise immediately. Returning a value fulfills that promise; throwing rejects it. Returning an existing promise causes adoption, though the async call still returns its own promise identity.",
          "try/catch around await handles a rejection when the suspended function resumes. It does not catch a promise that was started and never awaited or returned within that control path.",
        ],
        code: `async function readName() {
  const user = await fetchUser();
  return user.name;
}

const result = readName(); // Promise, not the name
result.then(console.log);`,
      },
      {
        title: "await suspends one async context",
        body: [
          "await converts its operand through Promise resolution, suspends the async function, and returns control to its caller. The continuation is later scheduled as a Promise reaction job, commonly described as a microtask.",
          "Even awaiting an already-fulfilled promise or a plain value yields to a later microtask. Code after await never continues synchronously in the same stack.",
        ],
        code: `async function run() {
  console.log("A");
  await 42;
  console.log("B");
}

run();
console.log("C");
// A, C, B`,
      },
      {
        title: "Start independent work before awaiting",
        body: [
          "Sequential awaits serialize start times when the second operation is not started until the first finishes. If operations are independent, create both promises first and await Promise.all. This creates concurrency; whether work executes in parallel depends on the host operations and available resources.",
          "Promise.all fails fast but does not cancel remaining operations. allSettled collects every outcome. race settles from the first outcome. any fulfills from the first fulfillment or rejects with AggregateError when all reject. Cancellation requires an API-specific mechanism such as AbortController.",
        ],
        code: `const userPromise = fetchUser();
const settingsPromise = fetchSettings();

const [user, settings] = await Promise.all([
  userPromise,
  settingsPromise,
]);`,
      },
    ],
    production: {
      title: "Array helpers do not await callback promises",
      body: "forEach ignores callback return values. Use Promise.all(items.map(async ...)) for concurrent transformation or for...of with await for intentional sequencing.",
      code: `const results = await Promise.all(
  items.map((item) => processItem(item)),
);`,
    },
    debugging: {
      prompt: "An async workflow is slow or finishes before child work.",
      steps: [
        "Record when each operation starts, not only when it resolves.",
        "Find promises created inside callbacks that are neither returned nor awaited.",
        "Classify dependencies before replacing sequential awaits with Promise.all.",
      ],
    },
    exercises: [
      {
        prompt: "Rewrite two independent sequential requests to overlap safely.",
        answer: "Start both requests, then await Promise.all. Keep sequential awaits only when the second request depends on the first result.",
      },
    ],
    check: {
      question: "Does Promise.all cancel remaining work after one rejection?",
      choices: ["Yes", "No; cancellation must be implemented separately", "Only in browsers"],
      answer: 1,
      explanation: "Promise.all settles its own result early, but the input operations continue unless their APIs are explicitly cancelled.",
    },
    takeaways: [
      "async functions communicate through promises.",
      "await always resumes later through Promise job scheduling.",
      "Concurrency requires starting independent operations before waiting for them.",
    ],
  },
];
