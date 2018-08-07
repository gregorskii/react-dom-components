"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* global document, MutationObserver */

/**
 * The <code>DOMRegistry</code> Class is used to register, find, and
 * render React DOM Components. It provides a mechanism to determine if
 * a registered DOM Component is a child of an existing DOM Component.
 */
var DOMRegistry =
/*#__PURE__*/
function () {
  function DOMRegistry(element) {
    _classCallCheck(this, DOMRegistry);

    this.element = this.getParentNode(element);
  }

  _createClass(DOMRegistry, [{
    key: "getParentNode",
    value: function getParentNode(element) {
      return element ? element : document;
    }
  }, {
    key: "register",
    value: function register(components) {
      this.components = components;
      this.getNodeNames();
      this.init();
    }
    /**
     * Render the component. If an element is not supplied,
     * the element class property will be used to find all
     * nodes to be rendered.
     * @param {DOMComponent} component
     * @param {HTMLElement} element
     */

  }, {
    key: "render",
    value: function render(component, element) {
      if (element) {
        component.render(element);
      } else {
        this.renderAll(component);
      }
    }
    /**
     * Initialize the DOM Registry.
     */

  }, {
    key: "init",
    value: function init() {
      var _this = this;

      // Loop through all registred DOM Components
      var compArray = Object.keys(this.components);
      compArray.forEach(function (name) {
        _this.renderAll(_this.components[name]);
      });
    }
  }, {
    key: "renderAll",
    value: function renderAll(component) {
      // Find all potential nodes of the components
      var componentNodes = this.element.querySelectorAll(component.nodeName); // Loop through each node and determine if we can render it.

      Array.prototype.forEach.call(componentNodes, function (componentNode) {
        var canRender = this.traverseUpDom(componentNode);

        if (canRender) {
          component.render(componentNode);
        }
      }.bind(this));
    }
    /**
     * Traverse up the DOM from the supplied node to see if any parents
     * are React DOM Components.
     * @return {boolean} canRender Whether the component can render with React.
     */

  }, {
    key: "traverseUpDom",
    value: function traverseUpDom(node) {
      var parentNode = node.parentNode; // If the DOM has already been swapped out by React, the parent node will be null.

      if (parentNode !== null) {
        var parentNodeName = parentNode.nodeName.toLowerCase();

        if (this.nodeNames.includes(parentNodeName)) {
          return false;
        } else if (parentNodeName === 'body') {
          return true;
        }

        this.traverseUpDom(parentNode);
        return true;
      }

      return false;
    }
    /**
     * Create an array of element node names to look for.
     * @return {array} nodeNames
     */

  }, {
    key: "getNodeNames",
    value: function getNodeNames() {
      var _this2 = this;

      this.nodeNames = [];
      var compArray = Object.keys(this.components);
      compArray.forEach(function (name) {
        _this2.nodeNames.push(_this2.components[name].nodeName);
      });
    }
  }]);

  return DOMRegistry;
}();

exports.default = DOMRegistry;