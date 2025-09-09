1) Difference between var, let, const
     - var: function-scoped, hoisted (initialised with undefined), can be redeclared.
     - let: block-scoped, hoisted but not initialised (temporal dead zone), cannot be redeclared in same scope.
     - const: block-scoped, must be initialised at declaration, binding is constant (object contents may still mutate).

  2) Difference between map(), forEach(), filter()
     - map(): transforms each element and returns a new array of same length.
     - forEach(): runs a callback for side-effects, returns undefined.
     - filter(): returns a new array with elements that pass a truthy test.

  3) Arrow functions in ES6
     - Shorter syntax: (a, b) => a + b
     - Don't have their own 'this' (lexical this). Cannot be used as constructors (no 'new').

  4) Destructuring assignment in ES6
     - Unpack values from arrays or properties from objects into distinct variables.
       const {a, b} = obj; const [x, y] = arr;

  5) Template literals in ES6
     - Use backticks: `Hello ${name}`. Support multi-line and interpolation. Easier and safer than concatenation with +.

  