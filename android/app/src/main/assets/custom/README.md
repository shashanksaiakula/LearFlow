# locate-path

> Get the first path that exists on disk of multiple paths

## Install

```sh
npm install locate-path
```

## Usage

Here we find the first file that exists on disk, in array order.

```js
import {locatePath} from 'locate-path';

const files = [
	'unicorn.png',
	'rainbow.png', // Only this one actually exists on disk
	'pony.png'
];

console.log(await locatePath(files));
//=> 'rainbow.png'
```

## API

### locatePath(paths, options?)

Returns a `Promise<string>` for the first path that exists or `undefined` if none exists.

#### paths

Type: `Iterable<string>`

The paths to check.

#### options

Type: `object`

##### concurrency

Type: `number`\
Default: `Infinity`\
Minimum: `1`

The number of concurrently pending promises.

##### preserveOrder

Type: `boolean`\
Default: `true`

Preserve `paths` order when searching.

Disable this to improve performance if you don't care about the order.

##### cwd

Type: `URL | string`\
Default: `process.cwd()`

The current working directory.

##### type

Type: `string`\
Default: `'file'`\
Values: `'file' | 'directory' | 'both'`

The type of path to match.

- `'file'` - Only match files
- `'directory'` - Only match directories
- `'both'` - Match both files and directories

##### allowSymlinks

Type: `boolean`\
Default: `true`

Allow symbolic links to match if they point to the chosen path type.

### locatePathSync(paths, options?)

Returns the first path that exists or `undefined` if none exists.

#### paths

Type: `Iterable<string>`

The paths to check.

#### options

Type: `object`

##### cwd

Same as above.

##### type

Same as above.

##### allowSymlinks

Same as above.

## Related

- [path-exists](https://github.com/sindresorhus/path-exists) - Check if a path exists
ing to convert the queue to an array. Don't do this unless you really need to though, since it's slow.

#### `.enqueue(value)`

Add a value to the queue.

#### `.dequeue()`

Remove the next value in the queue.

Returns the removed value or `undefined` if the queue is empty.

#### `.peek()`

Get the next value in the queue without removing it.

Returns the value or `undefined` if the queue is empty.

#### `.drain()`

Returns an iterator that dequeues items as you consume it.

This allows you to empty the queue while processing its items.

If you want to not remove items as you consume it, use the `Queue` object as an iterator.

#### `.clear()`

Clear the queue.

#### `.size`

The size of the queue.

## Related

- [quick-lru](https://github.com/sindresorhus/quick-lru) - Simple “Least Recently Used” (LRU) cache
