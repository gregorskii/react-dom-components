"use strict";

var _DOMRegistry = _interopRequireDefault(require("../DOMRegistry"));

var _RDCSectionDOM = _interopRequireDefault(require("../../../sample/src/components/rdcSection/RDCSectionDOM"));

var _dom = _interopRequireDefault(require("../__mocks__/dom.html"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.body.innerHTML = _dom.default;
describe('DOM Registry', function () {
  var rdcSection = new _RDCSectionDOM.default();
  var domRegistry = new _DOMRegistry.default(document);
  domRegistry.register({
    rdcSection: rdcSection
  });
  it('if supplied a document, registry returns document', function () {
    expect(domRegistry.element).toBe(document);
  });
  it('only has one node name', function () {
    expect(domRegistry.nodeNames[0]).toBe('rdc-section');
  });
  it('section has properties', function () {
    expect(domRegistry.components['rdcSection'].props.title).toBe('Problem');
  });
});