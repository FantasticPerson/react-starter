const BLACKLIST = ['template', 'script', 'style'];

let isHidable = ({ nodeType, tagName }) =>
nodeType === 1 && BLACKLIST.indexOf(tagName.toLowerCase()) === -1;

let siblings = (container, mount, styles, cb) => {
  mount = [].concat(mount);

  [].forEach.call(container.children, node => {
    if (mount.indexOf(node) === -1 && isHidable(node)) {
      cb(node, styles);
    }
  });
};

export function ariaHidden(show, node, classStyles) {
  if (!node) {
    return;
  }
  if (show) {
    node.setAttribute('aria-hidden', 'true');

    var nodeClass = node.getAttribute('class');
    if (nodeClass) {
      nodeClass += ' ' + classStyles;
    }
    else {
      nodeClass = classStyles;
    }
    node.setAttribute('class', nodeClass);
  }
  else {
    node.removeAttribute('aria-hidden');
    node.removeAttribute('class');
  }
}

export function hideSiblings(container, mountNode, styles) {
  siblings(container, mountNode, styles, (node, style) => ariaHidden(true, node, styles));
}

export function showSiblings(container, mountNode, styles) {
  siblings(container, mountNode, styles, (node, style) => ariaHidden(false, node, styles));
}
