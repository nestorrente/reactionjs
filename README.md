# Reaction.js

Reactive objects, computed properties and watchers inspired by Vue.js [Composition API](https://github.com/vuejs/composition-api-rfc).

## :construction: Under construction :construction:

We are working hard to bring you a production-ready library as soon as possible :pick:

## Table of contents

+ **[Why Reaction.js?](#why-reactionjs)**
+ **[Installation](#installation)**
    + **[Using NPM](#using-npm)**
    + **[Using `<script>` tag](#using-script-tag)**
+ **[Usage](#usage)**
    + **[ES6 module (import)](#es6-module-import)**
    + **[Reaction object (browser)](#reaction-object-browser)**
+ **[Method reference](#method-reference)**
    + **[ref()](#ref)**
    + **[reactive()](#reactive)**
    + **[computed()](#computed)**
    + **[watch()](#watch)**
    + **[nextTick()](#nexttick)**

## Why Reaction.js?

The reason behind Reaction.js is to provide a way to use **reactive models**,
computed properties and watchers in **non-Vue/React/Angular** environments.

The scope of this library **has nothing to do with UI**.
It doesn't provide a way to bind your model to de UI.
However, you can achieve some kind of binding using watchers (see [watch()](#watch) method)
and [event listeners](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener). 

## Installation

### Using NPM

Install the latest stable version...

```bash
npm install --save @nestorrente/reactionjs
```

... then you can import Reaction.js methods in your modules:

```javascript
import {ref, reactive, computed, watch} from '@nestorrente/reactionjs';
```

### Using `<script>` tag

You can [download the latest version from here](dist/reaction.bundle.js). Then, you can use it as any other JavaScript file:

```html
<script src="reaction.bundle.js"></script>
```

Or, if you prefer, you can use any of the following CDN repositories:

```html
<!-- Unpkg -->
<script src="https://unpkg.com/@nestorrente/reactionjs@0.3.1"></script>

<!-- JsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/@nestorrente/reactionjs@0.3.1"></script>
```

The script will create a global  `Reaction` object, which contains all the exported methods.

## Usage

### Using `import`

```javascript
const pokemon = reactive({
    name: 'Pikachu',
    level: 5
});
```

### Using `Reaction` object

You can invoke any method just by doing `Reaction.methodName()`:

```javascript
const pokemon = Reaction.reactive({
    name: 'Pikachu',
    level: 5
});
```

You can also use ES6 _destructuring assignment_ in order to imitate module imports:

```javascript
const pokemon = reactive({
    name: 'Pikachu',
    level: 5
});
```

## Method reference

### ref()

```typescript
ref<T>(value: T): Ref<T>
```

Creates a reactive object representing a single value:

```javascript
const name = ref('Pikachu');
console.log(name.value); // "Pikachu"

name.value = 'Charizard';
console.log(name.value); // "Charizad"
```

### reactive()

```typescript
reactive<T>(object: T): T
```

Creates a reactive object with multiple properties:

```javascript
const pokemon = reactive({
    name: 'Pikachu',
    level: 5,
    stats: {
        attack: 13,
        defense: 8,
        speed: 17,
        special: 11
    },
    moves: [
        'Thunder Shock',
        'Growl'
    ]
});

console.log(pokemon.level); // 5
console.log(pokemon.stats.attack); // 13

pokemon.level += 1;
console.log(pokemon.level); // 6
```

It's also possible to use a reference as the value of a property. When getting the value of a reactive object's property, references are automatically unwrapped (as Vue.js does):

```javascript
const name = ref('Pikachu');

const pokemon = reactive({
    name, // <-- the reference
    level: 5
});

// Access using the reference
console.log(name.value); // "Pikachu"

// Access using a reactive object (no '.value' is needed)
console.log(pokemon.name); // "Pikachu"

// Modifications made to the reference affect the object's property, and vice versa

name.value = 'Charizard';
console.log(pokemon.name); // "Charizard"

pokemon.name = 'Mewtwo';
console.log(name.value); // "Mewtwo"
```

**_Note:_**

Calling `reactive()` returns a new object that is observed. Changes made to this object will be reflected on the original one:

```javascript
const originalObject = {
    name: 'Pikachu',
    // ... other properties...
};

const reactiveObject = reactive(originalObject);

reactiveObject.name = 'Charizard';
console.log(originalObject.name); // "Charizard"
```

However, changes made to the original object will not tracked by the system. The recommendation is to not store the original object and always use the one returned by `reactive()`:

```javascript
// Don't do this 👎
const pokemon = {
    name: 'Pikachu'
};
reactive(pokemon);

// Do this instead 👍
const pokemon = reactive({
    name: 'Pikachu'
});
```

**Limitations:**

Changes in arrays are not observed. This means the library cannot react to the following operations:

```javascript
// Append one element at the end
pokemon.moves.push('Tail Whip');

// Modify one element by index
pokemon.moves[0] = 'Thunder';

// Remove the last element
pokemon.moves.pop();
```

Instead, you have to use immutable arrays and create a new one every time you want to change it:

```javascript
// Append one element at the end
pokemon.moves = [...pokemon.moves, 'Tail Whip'];

// Modify one element by index
pokemon.moves = ['Thunder', ...pokemon.moves.slice(1)];

// Remove the last element
pokemon.moves = pokemon.moves.slice(0, -1);
```

As writing code like that can be a little frustrating, we recommend you to use the great [Immutable.js](https://github.com/immutable-js/immutable-js) library for this purpouse :slightly_smiling_face:

### computed()

```typescript
computed<T>(callback: () => T): Readonly<Ref<T>>
```

This method creates a read-only reference whose value is the result of invoking the `callback` function. It's value is automatically updated when any of its dependencies change:

```javascript
const pokemon = reactive({
    name: 'Pikachu'
});

const upperCaseName = computed(() => {
    return pokemon.name.toUpperCase();
});

console.log(upperCaseName.value); // "PIKACHU"

pokemon.name = 'Charizard';
console.log(upperCaseName.value); // "CHARIZARD"
```

You can also use a reference as a dependency:

```javascript
const name = ref('Pikachu');

const upperCaseName = computed(() => {
    return name.value.toUpperCase();
});

console.log(upperCaseName.value); // "PIKACHU"

name.value = 'Charizard';
console.log(upperCaseName.value); // "CHARIZARD"
```

If you try to modify a computed property, you will get an error:

```javascript
upperCaseName.value = 'MEWTWO';
// Error: Cannot modify the value of a readonly reference
```

### watch()

```typescript
watch(callback: SimpleEffect): StopHandle;
watch<T>(source: Ref<T> | () => T, callback: WatcherCallBack<T>): StopHandle;
```
Related types:

```typescript
type SimpleEffect = (onCleanup: CleanupRegistrator) => void;
type WatcherCallBack<T> = (newVal: T, oldVal: T | undefined, onCleanup: CleanupRegistrator) => void;
type StopHandle = () => void;
type CleanupRegistrator = (invalidate: Runnable) => void;
```

**_WARNING: this section is under construction_**

Allows you to define a watcher function that will be executed every time one of it's dependencies changes. The watcher is executed immediately after being created, so it can know what its dependencies are:

```javascript
const pokemon = reactive({
    name: 'Pikachu',
    level: 5
});

watch(() => {
    const { name, level } = pokemon;
    console.log(`${name} grew to level ${level}`);
});

pokemon.level = 6;
```

Console output will be:

```javascript
"Pikachu grew to level 5" // initial watcher's execution
"Pikachu grew to level 6" // execution after changing "level" to 6
```

Watchers are executed asynchronously, so you can do several modifications in a row:

```javascript
pokemon.level = 7;
pokemon.level = 8;
pokemon.level = 9;
pokemon.level = 10;
```

Console output will be:

```javascript
"Pikachu grew to level 10" // watcher will execute only after the last change
```

You can force intermediate executions by using the [`nextTick()`](#nexttick) function.

### nextTick()

```typescript
nextTick(callback: () => void): void
```

Allows you to execute a portion of code in the next event cycle of the execution environment. This is actually the same as `setTimeout(callback, 0)`.

This method is very useful when you are doing multiple data modifications and you want to let watchers being executed between those changes:

```javascript
const pokemon = reactive({
    name: 'Pikachu',
    level: 5
});

watch(() => {
    const { name, level } = pokemon;
    console.log(`${name} grew to level ${level}`);
});

pokemon.level = 6;
pokemon.level = 7;
pokemon.level = 8;

nextTick(() => {
    pokemon.level = 9;
    pokemon.level = 10;
});

```

Console output will be:

```javascript
"Pikachu grew to level 5" // initial watcher's execution
"Pikachu grew to level 8" // watcher's execution before nextTick() callback
"Pikachu grew to level 10" // watcher's execution after nextTick() callback
```
