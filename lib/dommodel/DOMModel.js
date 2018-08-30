"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The <code>DomModel</code> Class creates a data model from
 * attributes, text, and children of a given element.
 */
var DOMModel =
/*#__PURE__*/
function () {
  function DOMModel(element) {
    _classCallCheck(this, DOMModel);

    this.props = {};
    this.element = element;
    this.getId();
    this.getClassList();
    this.getChildNodes();
  }

  _createClass(DOMModel, [{
    key: "getId",
    value: function getId() {
      this.props.id = this.element.id;
    }
  }, {
    key: "getClassList",
    value: function getClassList() {
      this.props.classList = this.element.classList;
    }
  }, {
    key: "getDataAttribute",
    value: function getDataAttribute(name) {
      this.props[name] = this.element.dataset[name];
    }
  }, {
    key: "getAllDataAttributes",
    value: function getAllDataAttributes(filter) {
      var props = _objectSpread({}, this.element.dataset);

      if (filter) {
        if (typeof filter === 'string' || filter instanceof String) {
          var filteredKeys = Object.keys(props).filter(function (key) {
            return key.toLowerCase().includes(filter.toLowerCase());
          });

          if (filteredKeys.length) {
            props = filteredKeys.reduce(function (obj, key) {
              return _objectSpread({}, obj, _defineProperty({}, key, props[key]));
            }, {});
          }
        }
      }

      Object.keys(props).forEach(function (key) {
        if (props[key] === 'true' || props[key] === 'false') {
          props[key] = props[key] === 'true' ? true : false;
        }
      });
      this.props = _objectSpread({}, this.props, props);
    }
  }, {
    key: "getAttribute",
    value: function getAttribute(name, propName) {
      if (!propName) {
        propName = name;
      }

      this.props[propName] = this.element.getAttribute(name);
    }
  }, {
    key: "getTextContent",
    value: function getTextContent() {
      var textNode = this.getChildNode('#text');

      if (textNode !== null) {
        this.props['text'] = textNode.textContent;
      } else {
        this.props['text'] = null;
      }
    }
  }, {
    key: "getChildDOMModel",
    value: function getChildDOMModel(name, model) {
      var childElement = this.getChildNode(name);

      if (childElement !== null) {
        this.props[name] = new model(childElement);
      } else {
        this.props[name] = null;
      }
    }
  }, {
    key: "getChildDOMModelArray",
    value: function getChildDOMModelArray(name, model) {
      this.props[name] = [];

      for (var i = 0; i < this.nodes.length; ++i) {
        var nodeName = this.nodes[i].nodeName.toLowerCase();

        if (nodeName === name) {
          this.props[name].push(new model(this.nodes[i]));
        }
      }
    }
  }, {
    key: "queryChildDOMModel",
    value: function queryChildDOMModel(query, model) {
      var childElement = this.queryChildNode(query);

      if (childElement !== null) {
        this.props[query] = new model(childElement);
      } else {
        this.props[query] = null;
      }
    }
  }, {
    key: "queryChildDOMModelArray",
    value: function queryChildDOMModelArray(query, model) {
      var _this = this;

      this.props[query] = [];
      var elements = this.queryChildNodes(query);
      Array.prototype.forEach.call(elements, function (element) {
        _this.props[query].push(new model(element));
      });
    }
  }, {
    key: "queryChildNode",
    value: function queryChildNode(query) {
      return this.element.querySelector(query);
    }
  }, {
    key: "queryChildNodes",
    value: function queryChildNodes(query) {
      return this.element.querySelectorAll(query);
    }
  }, {
    key: "getChildNodes",
    value: function getChildNodes() {
      this.nodes = this.element.childNodes;
    }
  }, {
    key: "getChildNode",
    value: function getChildNode(name) {
      for (var i = 0; i < this.nodes.length; ++i) {
        var nodeName = this.nodes[i].nodeName.toLowerCase();

        if (nodeName === name) {
          return this.nodes[i];
        }
      }

      return null;
    }
  }, {
    key: "getObjectFromDataAttribute",
    value: function getObjectFromDataAttribute(name) {
      this.props[name] = JSON.parse(this.element.dataset[name]);
    }
  }]);

  return DOMModel;
}();

exports.default = DOMModel;