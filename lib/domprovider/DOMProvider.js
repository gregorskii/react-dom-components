"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The <code>DOMProvider</code> Class provides the properties
 * and methods to map a DOMModel to a React Component. It is
 * only rendered when the DOMRegistry provides the specific
 * element to render. It is different from a DOMComponent in that
 * it uses a React Portal to render the component. Which preserves
 * the structure of the original provider component
 */
var DOMProvider =
/*#__PURE__*/
function () {
  function DOMProvider() {
    _classCallCheck(this, DOMProvider);
  }

  _createClass(DOMProvider, [{
    key: "render",

    /**
     * Render the DOM Component into the supplied element.
     * @param {node} element 
     */
    value: function render(element) {
      // Instantiate our DomModel
      var domModel = new this.model(element); // Set our properties

      this.props = domModel.props; // Create our React element

      var el = _react.default.createElement(this.component, this.props); // Place it


      return (0, _reactDom.createPortal)(el, element);
    }
  }]);

  return DOMProvider;
}();

exports.default = DOMProvider;