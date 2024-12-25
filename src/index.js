export const bind = (network, getElementForNode) => {
  // Bind node sizes to HTML elements
  // NOTE: does not trigger while a node is dragged
  // too slowly to trigger a redraw(/stabilization?).
  // In the meantime, the node will be the size set
  // in the `graph` data object passed to the network.
  // TODO: may be slow for large networks...
  // True solution would be to update the `graph` data
  // with the new node sizes, but that gets messier.
  network.on("initRedraw", () => {
    Object.values(network.body.nodes)
      .forEach((node) => {
        const element = getElementForNode(node);
        if (!element) return;

        const { width, height } = DOMtoCanvasDimensions(network, element);
        node.shape.width = width;
        node.shape.height = height;
      });
  });

  // Bind HTML element positions to nodes
  network.on("afterDrawing", () => {
    Object.values(network.body.nodes).forEach((node) => {
      const element = getElementForNode(node);
      if (!element) return;
      const { left, top } = canvasToDOMposition(network, node, element);
      element.style.left = left;
      element.style.top = top;
    });
  });
};

function canvasToDOMposition(network, node, element) {
  const position = network.getPositions([node.id])[node.id];
  const domCoords = network.canvasToDOM(position);
  return {
    left: `${domCoords.x - element.clientWidth / 2}px`,
    top: `${domCoords.y - element.clientHeight / 2}px`,
  };
}

// Needed because canvas dimensions are affected by zoom level
function DOMtoCanvasDimensions(network, element) {
  const rect = element.getBoundingClientRect();
  const { x: left, y: top } = network.DOMtoCanvas({ x: rect.x, y: rect.y });
  const { x: right, y: bottom } = network.DOMtoCanvas({
    x: rect.x + rect.width,
    y: rect.y + rect.height,
  });
  return { width: right - left, height: bottom - top };
}
