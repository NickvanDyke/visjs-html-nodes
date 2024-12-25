# visjs-html-nodes

[vis.js](https://visjs.org/) provides built-in support for only certain visual node types.
This package hacks in the ability to bind arbitrary HTML elements to nodes.
Inspired by https://github.com/almende/vis/issues/3300#issuecomment-326572751

To do this, it:

1. Binds the vis.js node sizes to the HTML element sizes (for physics and click targets)
2. Binds the HTML element positions to the vis.js node positions

You must provide it your vis.js network and a function that finds your corresponding HTML element for a given visjs node.

## Demo

I implemented this for a pet project, [Wanna](https://wanna.social). You can see it in action there!

## Example

```javascript
import { bind } from 'visjs-html-nodes';

function getHtmlElementForNode(node) {
    // I chose to set the HTML element's ID, then find it here.
    // But you can find your HTML element however you like.
    return document.getElementById(`my-html-element-${node.id}`)
}

bind(myVisJsNetwork, getHtmlElementForNode)
```

If using React, you probably want to call `bind` once, inside a `useEffect`.

## ⚠️ 

I made this for my needs and published it in case others would find it useful too.
I have only tested my own uses and likely missed edge-cases.
Please open an issue if you experience any trouble!
