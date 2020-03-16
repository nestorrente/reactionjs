
# Reaction.js

Reactive objects, computed properties and watchers inspired by Vue.js [Composition API](https://github.com/vuejs/composition-api-rfc).

## :construction: Under construction

We are working hard to bring you a production-ready library as soon as possible :pick:

## Usage examples

### ref(value)

Creates a reactive object representing a single value:

```javascript
const name = ref('Pikachu');
console.log(name.value); // "Pikachu"

name.value = 'Charizard';
console.log(name.value); // "Charizad"
```

### reactive(object)

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

You can also use a reference as the value of a property. When getting the value of a reactive object's property, references are automatically unwrapped (as Vue.js does):

```javascript
const name = ref('Pikachu');

const pokemon = reactive({
    name,
    level: 5,
    // ... other properties...
});

console.log(name.value); // "Pikachu"
console.log(pokemon.name); // "Pikachu", no '.value' is needed

name.value = 'Charizard';
console.log(pokemon.name); // "Charizard"

pokemon.name = 'Mewtwo';
console.log(name.value); // "Mewtwo"
```

_Note:_

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

However, changes made to the original object will not tracked by the system. The recommendation is to not store the original object and always use the one created by `reactive()`:

```javascript
// Bad 👎
const pokemon = {
	// ...
};
reactive(pokemon);

// Good 👍
const pokemon = reactive({
	// ...
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

We recommend you to use the great [Immutable.js](https://github.com/immutable-js/immutable-js) library for this purpouse.

### computed(callback)

Creates a read-only reference whose value is the result of invoking the `callback` function. It's value is automatically updated when any of its dependencies change:

```javascript
const pokemon = reactive({
	name: 'Pikachu',
	level: 5,
    // ... other properties...
});

const validLevel = computed(() => {
	const { level } = pokemon;
	return level > 1 && level <= 100;
});

console.log(validLevel.value); // true

pokemon.level = 0;
console.log(validLevel.value); // false
```

You can also use a reference as a dependency:

```javascript
const level = ref(5);

const validLevel = computed(() => {
	const { value } = level;
	return value > 1 && value <= 100;
});

console.log(validLevel.value); // true

level.value = 0;
console.log(validLevel.value); // false

validLevel.value = true; // Error: Cannot modify the value of a readonly reference
```

### watch(callback)

Allows you to execute a function when a value changes:

```javascript
const pokemon = reactive({
	name: 'Pikachu',
	level: 5,
    // ... other properties...
});

watch(() => {
	const { name, level } = pokemon;
	console.log(`${name} grew to level ${level}`);
});
// console output: "Pikachu grew to level 5"

pokemon.level = 6;
// console output: "Pikachu grew to level 6"
```

Watchers are executed asynchronously, so you can do several modifications in a row:

```javascript
pokemon.name = 'Charizard';
pokemon.level = 36;
// watcher is only executed once
// console output: "Charizard grew to level 36"
```

You can force intermediate executions by using `setTimeout()` with a time of 0 ms.:

```javascript
pokemon.name = 'Mewtwo';
setTimeout(() => pokemon.level = 70, 0);
// console output: "Mewtwo grew to level 36"
// console output: "Mewtwo grew to level 70"
```
