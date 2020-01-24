# Nosta

This is a skeleton for a small single page application. This project comes
without dependencies. By following a few conventions while utilizing modern
JavaScript features like Dynamic Imports, we circumvent the weightiness of our
usual web development stack.

## How it works
The file structure looks like this:

```bash
$ tree
├── about
│   ├── app.js
│   ├── index.html -> ../index.html
│   └── README.md
├── app.js
├── index.html
├── js
│   └── marked.esm.js
├── nosta.js
├── README.md
└── style.css
```

There is nothing more about it. Start by looking at the `index.html` file. This
is where the layout gets defined, global style included and Nosta takes over:

```js
import { Nosta } from '/nosta.js'
Nosta({
  elements: {
    header,
    article,
    aside
  }
})
```

Nosta is a tiny JavaScript (<40 LOC) which provides basic routing via pushState.
On route change the components `app.js` is loaded. For example, when you browse
to `/about/`, the JavaScript module located in `/about/app.js` is loaded and
executed.

Let's take a look at how an `app.js` looks like:

```js
import marked from '/js/marked.esm.js'

export const App = async ({ elements: { article } }) => {
  const readme = await fetch('/README.md', { cache: 'no-cache' }) 
  const text = await readme.text()

  article.innerHTML = marked(text)
}
```

First of all we import the Marked library, which is globally available in the
`js` directory. The app must expose an `App` function. It receives some
configuration passed from the html file and then this file, `README.md` gets
fetched, rendered by <a href=https://github.com/markedjs/marked>Marked</a> and
inserted into the dom. And that's mostly it.


## Features and Unfeatures

* Lazy loading of js dependencies via Dynamic Imports
* Runs on every webserver (but also sadly needs one, does not work on filesystem)
* Zero dependencies, just a few lines of code
* A few conventions only
* Works with every framework
* Decoupling: components of the app can be run individually and can include other frameworks (react, d3, threejs, prosemirror)
* ES6 syntax & features, only modern browser support
* Use filesystems links to provide server side pushState compatibility
* Offline installable, architecture enables asset caching (not implemented yet)


Thanks for reading. If you find this interesting, consider contributing to the
project :) I'd love to hear from you.

Johannes
