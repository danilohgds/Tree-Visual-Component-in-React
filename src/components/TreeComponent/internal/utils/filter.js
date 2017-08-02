if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun/*, thisArg*/) {

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];

        // NOTE: Technically this should Object.defineProperty at
        //       the next index, as push can be affected by
        //       properties on Object.prototype and Array.prototype.
        //       But that method's new, and collisions should be
        //       rare, so use the more-compatible alternative.
        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
};

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      var len = o.length >>> 0;

      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      var thisArg = arguments[1];

      var k = 0;

      while (k < len) {
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }

        k++;
      }

      return undefined;
    }
  });
};

export const defaultMatcher = (filterText, node) => {
  //add the + signs and exact match here.
    return node.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
};

export const findNode = (node, filter, matcher) => {
    return matcher(filter, node) ||
        (node.children &&
        node.children.length &&
        !!node.children.find(child => findNode(child, filter, matcher)));
};

export function getChosenNodes (nodes) {
  let result = [];

  nodes.forEach(node => {
    if (node.chosen) {
      if(node.pushed !== true){
        node.pushed = true;
        result = result.concat([{name:node.name, id:node.nodeid}]);
      }
    }

    if (node.children) {
      result = result.concat(getChosenNodes(node.children));
    }
  })

  return result;
}

export function getChosenNodesWithSubLevel (nodes) {
  let result = [];

  nodes.forEach(node => {
    if (node.chosen && node.blocked !== true) {
      if(node.pushed !== true){
        node.pushed = true;
        node.subLevel = true;
        result = result.concat([{name:node.name, id:node.nodeid}]);
        if (node.children) {
          blockSubLevel(node.children);
        }
      }
    }

    if (node.children) {
        result = result.concat(getChosenNodesWithSubLevel(node.children));
    }
  })

  return result;
}


function blockSubLevel (nodes) {
  let result = [];

  nodes.forEach(node => {
    node.blocked = true;

    if (node.children) {
        blockSubLevel(node.children);
    }
  })

  return result;
}

export function unpushAllNodes (nodes) {

  nodes.forEach(node => {
    if (node.chosen) {
        node.pushed = false;
        node.chosen = false;
    }
    if (node.children) {
      unpushAllNodes(node.children);
    }
  })
}

export function pushAllNodes (nodes) {

  nodes.forEach(node => {
    node.chosen = true;
    node.pushed = true;

    if (node.children) {
      pushAllNodes(node.children);
    }
  })
}


export function unpushAllAssignedNodes (nodes, text, counter) {
  let unpushCounter = counter;
  nodes.forEach(node => {
    if (node.chosenToUnpush) {
        unpushCounter = unpushCounter + 1;
        node.chosenToUnpush = !node.chosenToUnpush;
        node.pushed = false;
        node.chosen = false;
        if(node.subLevel === true && node.children){
          node.subLevel = false;
          unblockSubLevel(node.children);
        }
    }
    if (node.children) {
      unpushCounter = unpushAllAssignedNodes(node.children, text, unpushCounter);
    }
  })

  return unpushCounter;
}

function unblockSubLevel (nodes) {
  let result = [];

  nodes.forEach(node => {
    node.blocked = false;

    if (node.children) {
        unblockSubLevel(node.children);
    }
  })

  return result;
}

export function blockNodes (nodes) {
  nodes.forEach(node => {
    if (node.chosen) {
      node.pushed = true;
    }

    if (node.children) {
      blockNodes(node.children);
    }
  })
  return nodes;
}

export const filterTree = (node, filter, matcher = defaultMatcher) => {
    if(matcher(filter, node) || !node.children){ return node; }
    const filtered = node.children
      .filter(child => findNode(child, filter, matcher))
      .map(child => filterTree(child, filter, matcher));
    return Object.assign({}, node, { children: filtered });
};

export const filterTreeChosen = (nodes) => {
  let result = [];

  nodes.forEach(node => {
    if (node.chosen) {
      result = result.concat([node]);
    }

    if (node.children) {
      result = result.concat(filterTreeChosen(node.children));
    }
  })

  return result;
};

/*
export const filterTreeChosen = (node, matcher = chosenMatcher) => {
    if(matcher(node) || !node.children){ return node; }
    const filtered = node.children
      .filter(child => findNodeChosen(child, matcher))
      .map(child => filterTreeChosen(child, matcher));
    return Object.assign({}, node, { children: filtered });
};
*/

export const expandFilteredNodes = (node, filter, matcher = defaultMatcher) => {
    let children = node.children;
    if(!children || children.length === 0){
      return Object.assign({}, node, { toggled: false });
    }
    const childrenWithMatches = node.children.filter(child => findNode(child, filter, matcher));
    const shouldExpand = childrenWithMatches.length > 0;
    if(shouldExpand){
      children = childrenWithMatches.map(child => {
          return expandFilteredNodes(child, filter, matcher);
      });
    }
    return Object.assign({}, node, {
      children: children,
      toggled: shouldExpand
    });
};
