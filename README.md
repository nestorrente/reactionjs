# Reaction.js

Reactive objects, computed properties and watchers inspired by Vue.js [Composition API](https://github.com/vuejs/composition-api-rfc).

## :construction: Under construction :construction:

We are working hard to bring you a production-ready library as soon as possible :pick:

:warning: The current implementation follows the Composition API v0.3.4 spec.
It may differ with the current version of the Composition API (`1.0.0-beta.10` at this moment).

## Table of contents

+ **[Why Reaction.js?](#why-reactionjs)**
+ **[Installation](#installation)**
    + **[Using NPM](#using-npm)**
    + **[Using `<script>` tag](#using-script-tag)**
+ **[Usage](#usage)**
    + **[Using `import`](#using-import)**
    + **[Using `Reaction` object](#using-reaction-object)**
+ **[Method reference](#method-reference)**
    + **[ref()](#ref)**
    + **[reactive()](#reactive)**
        + **[References inside reactive objects](#references-inside-reactive-objects)**
        + **[Reactivity limitations](#reactivity-limitations)**
        + **[Caveats](#caveats)**
    + **[computed()](#computed)**
    + **[watch()](#watch)**
        + **[Simple effect watcher using watchEffect()](#simple-effect-watcher-using-watcheffect)**
        + **[Watcher with source and callback using watch()](#watcher-with-source-and-callback-using-watch)**
        + **[CleanupRegistrator](#cleanupregistrator)**
        + **[StopHandle](#stophandle)**
    + **[nextTick()](#nexttick)**

## Why Reaction.js?

The reason behind Reaction.js is to provide a way to use **reactive models**, computed properties and watchers in **non-Vue/React/Angular** environments.

The scope of this library **has nothing to do with UI**. It doesn't provide a way to bind your model to de UI. However, you can achieve some kind of binding using watchers (see [watch()](#watch) method)
and [event listeners](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener).

## Installation

### Using NPM

Install the latest stable version:

```bash
npm install --save @nestorrente/reactionjs
```

Then you can import _Reaction.js_ methods in your modules:

```javascript
import {ref, reactive, computed, watch, nextTick} from '@nestorrente/reactionjs';

// ...or import all within an object
import * as Reaction from '@nestorrente/reactionjs';
```

### Using `<script>` tag

You can [download the latest version from here](dist/reaction.bundle.js). Then, you can use it as any other JavaScript file:

```html
<script src="reaction.bundle.js"></script>
```

Or, if you prefer, you can use any of the following CDN repositories:

```html
<!-- Unpkg -->
<script src="https://unpkg.com/@nestorrente/reactionjs@0.4.1"></script>

<!-- JsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/@nestorrente/reactionjs@0.4.1"></script>
```

The script will create a global  `Reaction` object, which contains all the exported methods.

## Usage

### Using `import`

```javascript
import {ref, reactive, computed, watch, nextTick} from '@nestorrente/reactivejs';

const trainersName = ref('Ash');

const pokemon = reactive({
    name: 'Pikachu',
    level: 5
});

const nextLevel = computed(() => pokemon.level + 1);
```

### Using `Reaction` object

You can invoke any method just by doing `Reaction.methodName()`:

```javascript
const trainersName = Reaction.ref('Ash');

const pokemon = Reaction.reactive({
    name: 'Pikachu',
    level: 5
});

const nextLevel = Reaction.computed(() => pokemon.level + 1);
```

You can also use ES6 _destructuring assignment_ in order to imitate module imports:

```javascript
const {ref, reactive, computed, watch, nextTick} = Reaction;

const trainersName = ref('Ash');

const pokemon = reactive({
    name: 'Pikachu',
    level: 5
});

const nextLevel = computed(() => pokemon.level + 1);
```

## Method reference

### ref()

```typescript
function ref<T>(value: T): Ref<T>
```

Creates a reactive object representing a single value:

```javascript
const name = ref('Pikachu');
console.log(name.value); // prints "Pikachu"

name.value = 'Charizard';
console.log(name.value); // prints "Charizad"
```

### reactive()

```typescript
function reactive<T>(object: T): T
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

console.log(pokemon.level); // prints 5
console.log(pokemon.stats.attack); // prints 13

pokemon.level += 1;
console.log(pokemon.level); // prints 6
```

#### References inside reactive objects

It's also possible to use a reference as the value of a property. When getting the value of a reactive object's property, references are automatically unwrapped (as Vue.js does):

```javascript
const name = ref('Pikachu');

const pokemon = reactive({
    name, // <-- the reference
    level: 5
});

// Access using the reference
console.log(name.value); // prints "Pikachu"

// Access through the reactive object (no '.value' is needed)
console.log(pokemon.name); // prints "Pikachu"

// Modifications made to the reference affect the object's property, and vice versa

name.value = 'Charizard';
console.log(pokemon.name); // prints "Charizard"

pokemon.name = 'Mewtwo';
console.log(name.value); // prints "Mewtwo"
```

#### Reactivity limitations

_Reaction.js_ can only observe changes in JavaScript plain objects. This means it can't observe changes made to complex types like [Date](https://developer.mozilla.org/docs/Web/JavaScript/Referencia/Objetos_globales/Date), [Array](https://developer.mozilla.org/docs/Web/JavaScript/Referencia/Objetos_globales/Array), [Map](https://developer.mozilla.org/docs/Web/JavaScript/Referencia/Objetos_globales/Map), [Set](https://developer.mozilla.org/docs/Web/JavaScript/Referencia/Objetos_globales/Set), [WeakMap](https://developer.mozilla.org/docs/Web/JavaScript/Referencia/Objetos_globales/WeakMap) or [WeakSet](https://developer.mozilla.org/docs/Web/JavaScript/Referencia/Objetos_globales/WeakSet). However, you can use an immutable approach in order to achieve reactivity. We strongly recommend you to use the great [Immutable.js](https://github.com/immutable-js/immutable-js) library for this purpouse :slightly_smiling_face:

For those who doesn't want to add another library to their projects, here we show you some _vanilla JS_ immutability examples for Date and Array objects:

<ins>Date</ins>

Example data object:

```javascript
const pokemon = reactive({
    name: 'Pikachu',
    dateOfCapture: new Date(2020, 0, 1)
});
```

Don't do this 👎

```javascript
pokemon.dateOfCapture.setMonth(2);
```

Do this instead 👍

```javascript
// Clone the Date object
const newDateOfCapture = new Date(pokemon.dateOfCapture.getTime());

// Modify the new object
newDateOfCapture.setMonth(2);

// Set the new object as the value of the property
pokemon.dateOfCapture = newDateOfCapture;
```

<ins>Array</ins>

Example data object:

```javascript
const pokemon = reactive({
    name: 'Pikachu',
    moves: [
        'Thunder Shock',
        'Growl'
    ]
});
```

Don't do this 👎

```javascript
// Append one element at the end
pokemon.moves.push('Tail Whip');

// Modify one element by index
pokemon.moves[index] = 'Thunder';

// Remove the last element
pokemon.moves.pop();
```

Do this instead 👍

```javascript
// Append one element at the end
pokemon.moves = [...pokemon.moves, 'Tail Whip'];

// Modify one element by index
pokemon.moves = [
    ...pokemon.moves.slice(0, index),
    'Thunder',
    ...pokemon.moves.slice(index+1)
];

// Remove the last element
pokemon.moves = pokemon.moves.slice(0, -1);
```

#### Caveats

Calling `reactive()` returns a new object that is observed. Changes made on this object will be reflected on the original one:

```javascript
const originalObject = {
    name: 'Pikachu',
    // ... other properties...
};

const reactiveObject = reactive(originalObject);

reactiveObject.name = 'Charizard';
console.log(originalObject.name); // prints "Charizard"
```

However, changes made directly on the original object will not tracked by the system &ndash; this implies that computed properties as watchers will not work as expected. The recommendation is to not store the original object and always use the one returned by `reactive()`:

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

### computed()

```typescript
function computed<T>(callback: () => T): Readonly<Ref<T>>
```

This method creates a read-only reference whose value is the result of invoking the `callback` function. It's value is automatically invalidated and recomputed when any of its dependencies change:



```javascript
const pokemon = reactive({
    name: 'Pikachu'
});

const upperCaseName = computed(() => pokemon.name.toUpperCase());

console.log(upperCaseName.value); // prints "PIKACHU"

pokemon.name = 'Charizard'; // old value is invalidated
console.log(upperCaseName.value); // value is recomputed, and "CHARIZARD" is printed
```

You can also use a reference as a dependency:

```javascript
const name = ref('Pikachu');

const upperCaseName = computed(() => name.value.toUpperCase());

console.log(upperCaseName.value); // prints "PIKACHU"

name.value = 'Charizard';
console.log(upperCaseName.value); // prints "CHARIZARD"
```

If you try to modify a computed property, you will get an error:

```javascript
upperCaseName.value = 'MEWTWO'; // Error: Cannot modify the value of a readonly reference
```

### watch() and watchEffect()

```typescript
function watch<T>(source: Ref<T> | () => T, callback: WatcherCallBack<T>): StopHandle;
function watchEffect(callback: SimpleEffect): StopHandle;
```
Related types:

```typescript
type WatcherCallBack<T> = (newValue: T, oldValue: T | undefined, onCleanup: CleanupRegistrator) => void;
type CleanupRegistrator = (invalidate: () => void) => void;
type StopHandle = () => void;
type SimpleEffect = (onCleanup: CleanupRegistrator) => void;
```

These methods allow you to define a watcher function that will be executed every time one of it's dependencies changes. You can define its dependencies explicitly using the `source` parameter of the `watch()` method, or let _Reaction.js_ to track them for you using the `watchEffect()` method.

Watchers are executed asynchronously. This means that you can do several data modifications in a row before any watcher is executed. If you want to wait for watcher's execution before continue, you can use the [`nextTick()`](#nexttick) function.   

We will cover watcher's features in an incremental way.

#### Simple effect watcher using watchEffect()

Let's define some data:

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
});
```

Now, let's define a watcher that allows us to do some operations when the Pokemon's level changes:

```javascript
watchEffect(onCleanup => {

    const {name, level, stats} = pokemon;

    // Show info message
    console.log(`${name} grew to level ${level}`);

    // Update stats
    stats.attack += 3;
    stats.defense += 2;
    stats.speed += 4;
    stats.special += 2;

});
```

As soon as the watcher has been created, its callback is executed for the first time in order to track its dependencies. As you can see, the callback reads some properties from the `pokemon` object (`name`, `level` and `stats`). As we didn't define the dependencies of the watcher explicitly, **every property accessed** within the callback **is considered a dependency**. This means that the callback will be executed every time that `name`, `level` or any of the `stats` changes. What if we want the callback to execute only on `level` property changes? We must define a _source_ using the `watch()` method.

_Note: you may have noticed the `onCleanup` callback parameter. We will cover it in the [CleanupRegistrator](#cleanupregistrator) section._

#### Watcher with source and callback using watch()

`watch()` method allows you to define a **source**, which can be a **reference** or a **callback**, in order to specify the dependencies of the watcher.

Let's rewrite the previous example in order to define the `level` property as the only dependency of the callback:

```javascript
watch(
    // Source callback
    () => pokemon.level,

    // Execution callback
    (newValue, oldValue, onCleanup) => {

        const {name, stats} = pokemon;

        // Show info message
        console.log(`${name} grew to level ${newValue}`);

        // Update stats
        stats.attack += 3;
        stats.defense += 2;
        stats.speed += 4;
        stats.special += 2;

    }
);
```

This way, the watcher will ignore changes made on the other properties, and will execute its callback only on `level` property changes.

_Note: every property accessed within the source callback is considered a dependency, no matter if that property is returned by the callback or not._

As you can see, the execution callback now receives 2 more parameters:

 - `newValue`: the new value of the dependency&ast;.
 - `oldValue`: the previous value of the dependency&ast;. In the first watcher's execution, its value is `undefined`.
 - `onCleanup`: we will cover it in the [CleanupRegistrator](#cleanupregistrator) section.

&ast;: when using a callback as the _source_ of the watcher, the concept _value of the dependency_ refers to the value returned by the callback.

Also, when your dependency is a reference, you can use the reference itself as the source of a watcher:

```javascript
const nextLevel = computed(() => pokemon.level + 1);

watch(
    // this is equivalent to: () => nextLevel.value
    nextLevel,
    (newValue, oldValue, onCleanup) => {
        const {name} = pokemon;
        console.log(`${name}'s next level is ${newValue}`);
    }
);
```

Finally, if you want to define multiple dependencies, you can return an object or array containing all of them in the _source_ callback:

```javascript
watch(
    // Source callback - define multiple dependencies by returning an object
    () => {
        const {attack, defense} = pokemon.stats;
        return {attack, defense};
    },

    // Execution callback - "newValue" and "oldValue" are now objects
    (newValue, oldValue, onCleanup) => {
        const {name} = pokemon;
        console.log(`${name}'s attack changed from ${oldValue.attack} to ${newValue.attack}`);
        console.log(`${name}'s defense changed from ${oldValue.defense} to ${newValue.defense}`);
    }
);

watch(
    // Source callback - define multiple dependencies by returning an array
    () => [
        pokemon.stats.attack,
        pokemon.stats.defense
    ],

    // Execution callback - "newValue" and "oldValue" are now arrays
    (newValue, oldValue, onCleanup) => {
        const {name} = pokemon;
        console.log(`${name}'s attack changed from ${oldValue[0]} to ${newValue[0]}`);
        console.log(`${name}'s defense changed from ${oldValue[1]} to ${newValue[1]}`);
    }
);
```

#### CleanupRegistrator

If you have read the previous sections, you may noticed the `onCleanup` parameter of the watcher's callback. This parameter is a function that allows you to register a cleanup callback that will be executed right before the next watcher's execution. You can use it to execute some cleanup operations.

```javascript
const pokemonStatus = ref('poison');

watch(
    pokemonStatus,
    (newValue, oldValue, onCleanup) => {
        console.log(`Status changed to '${newValue}'`);

        onCleanup(() => console.log(`Status is not '${newValue}' anymore`));
    }
);

pokemonStatus.value = 'burn';
```

Console output will be:

```javascript
"Status changed to 'poison'" // initial watcher's execution
"Status is not 'poison' anymore"
"Status changed to 'burn'"
```

You can register at most 1 cleanup callback. If you call `onCleanup` multiple times, only the last callback will be registered:

```javascript
const pokemonStatus = ref('poison');

watch(
    pokemonStatus,
    (newValue, oldValue, onCleanup) => {
        console.log(`Status changed to '${newValue}'`);

        // this will be ignored
        onCleanup(() => console.log(`1st cleanup callback`));

        // this will be executed
        onCleanup(() => console.log(`2nd cleanup callback`));
    }
);

pokemonStatus.value = 'burn';
```

Console output will be:

```javascript
"Status changed to 'poison'" // initial watcher's execution
"2nd cleanup callback"
"Status changed to 'burn'"
```

#### StopHandle

The `StopHandle` object is a function returned by `watch()` method. You can call it whenever you want to stop a watcher &ndash; that is, prevent its future executions.

Fisrt, store the stop handle function like that:

```javascript
const stopWatcher = watch(() => {
    const {name} = pokemon;
    console.log(`Pokemon's name changed to: ${name}`);
});
```

Whenever you want, you can stop it this way:

```javascript
stopWatcher(); // watcher will not be executed anymore
```

This will trigger the **cleanup** callback registered in the last watcher's execution (if any).

Changes made in the same _event cycle_ in which `stopWatcher()` is called **will not trigger** the watcher's execution. In example:

```javascript
pokemon.name = 'Charizard'; // this will not trigger the watcher
stopWatcher();
```

You can know more about _event cycles_ in the [`nextTick()`](#nexttick) method section.

### nextTick()

```typescript
function nextTick(callback: () => void): void
```

Allows you to execute a portion of code in the **next event cycle** of the execution environment. This is actually the same as `setTimeout(callback, 0)`.

This method is very useful when you are doing multiple data modifications and you want to **wait for watcher's execution** before continue:

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

// Wait for watcher's execution...
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
