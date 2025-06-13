The scope of this project is to demonstrate the dependencies of a Vite project.

## Installation

```
npm install
```

## Usage

The dependencies of the project can be visualized using [Madge](https://github.com/pahen/madge). To generate a dependency graph, run:

```
npm run build && npx madge ./dist --json
```

The output will be:

```json
{
  "assets/app-D6GzwUaY.js": [
    "assets/component.TodoForm-CZovwjkK.js",
    "assets/component.TodoList-44ZiI1-M.js",
    "assets/framework-CtvSml8s.js"
  ],
  "assets/component.Foo-D0Zme1m7.js": [
    "assets/component.Label-BySnBOvf.js",
    "assets/framework-CtvSml8s.js"
  ],
  "assets/component.Label-BySnBOvf.js": [
    "assets/framework-CtvSml8s.js"
  ],
  "assets/component.TodoForm-CZovwjkK.js": [
    "assets/component.Foo-D0Zme1m7.js",
    "assets/framework-CtvSml8s.js"
  ],
  "assets/component.TodoItem-CzBrJbZI.js": [
    "assets/component.Label-BySnBOvf.js",
    "assets/framework-CtvSml8s.js"
  ],
  "assets/component.TodoList-44ZiI1-M.js": [
    "assets/component.Label-BySnBOvf.js",
    "assets/component.TodoItem-CzBrJbZI.js",
    "assets/framework-CtvSml8s.js"
  ],
  "assets/framework-CtvSml8s.js": [
    "assets/component.Foo-D0Zme1m7.js"
  ],
  "assets/index-CWx-HeYK.js": [
    "assets/app-D6GzwUaY.js",
    "assets/component.Foo-D0Zme1m7.js",
    "assets/component.Label-BySnBOvf.js",
    "assets/component.TodoForm-CZovwjkK.js",
    "assets/component.TodoItem-CzBrJbZI.js",
    "assets/component.TodoList-44ZiI1-M.js",
    "assets/framework-CtvSml8s.js"
  ]
}
```

As can be seen from the preceding output, the `assets/framework-CtvSml8s.js` file is dependent on `assets/component.Foo-D0Zme1m7.js`, which is a component that is used in the `assets/app-D5DJEYJu.js` file. This is not desired because it creates a circular dependency. The `assets/framework-CtvSml8s.js` file should not depend on any components, as it is meant to be a framework file that provides utility functions and does not need to know about the components.

Looking at the contents of the `framework-CtvSml8s.js` file, we can see that it imports the `getDefaultExportFromCjs` from the `component.Foo` chunk:

```javascript
import { g as getDefaultExportFromCjs } from "./component.Foo-D0Zme1m7.js";
```

This is defined as:

```javascript
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
```

This function is used within the `component.Foo` chunk in the following line:

```javascript
const isString = /* @__PURE__ */ getDefaultExportFromCjs(isStringExports);
```

where `isString` is imported from `lodash/isString`. Removing the `lodash/isString` dependency from `src/components/Foo/index.jsx` will remove the circular dependency.