 <!-- README (answers & notes) -->
  <!--
  README

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

  Notes about this solution:
  - The code normalizes API responses to be resilient to slightly different shapes (data.data, data.plants, data.categories etc.).
  - Loading spinner shows while requests are pending.
  - Category buttons are generated dynamically and active state is applied.
  - Clicking a plant's name opens a modal with details (uses normalized fields). 'Add to Cart' works from card and modal.
  - Cart supports quantity increment, total calculation, and removal.
  - The grid is responsive: 1/2/3 columns via Tailwind.
  - Placeholder image and fallback price are provided in case API doesn't return expected fields.

  Git commit suggestions (make at least 5 meaningful commits):
   - "init: add base HTML structure, tailwind and fonts"
   - "feat: implement categories sidebar and All Trees button"
   - "feat: fetch and display plant cards with responsive grid"
   - "feat: add cart functionality (add/remove/total)"
   - "fix: handle API variations and add modal for plant details"

  -->
