# visjs-html-nodes

[vis.js](https://visjs.org/) supports a limited set of node visuals because they are drawn on a canvas.
This package hacks in the ability to "bind" arbitrary HTML elements to nodes.
Inspired by [this issue](https://github.com/almende/vis/issues/3300#issuecomment-326572751).

To do this, it registers callbacks on the network that continually:

1. Apply the HTML element sizes to the vis.js nodes (for physics and click targets)
2. Position the HTML elements over the vis.js nodes

You must provide it your vis.js network and a function that finds the corresponding HTML element for a given vis.js node.

## Install

```
npm i visjs-html-nodes
```

## Demo

I implemented this for a pet project, [wanna](https://wanna.social). You can see it in action there!

![image](https://github.com/user-attachments/assets/b1ed14a7-e3a3-4e7f-a739-b8cc4d484c1c)

## Usage

```javascript
import { bind } from 'visjs-html-nodes';

bind(
    myVisJsNetwork, 
    function getHtmlElementForNode(node) {
        // I chose to set the HTML element's ID, then find it here.
        // But you can find your HTML element however you like.
        return document.getElementById(`my-html-element-${node.id}`)
    }
)
```

You should only call `bind` once. i.e. in React, put it in a `useEffect`.

Additionally, if you want your HTML elements to ignore click events so vis.js
can receive them, add `pointer-events: none` to their style.

## ⚠️ 

I made this for my needs and published it in case others would find it useful too.
I have only tested my own uses and likely missed edge-cases.
Please open an issue if you experience any trouble!
