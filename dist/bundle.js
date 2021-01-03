/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);




var app = null;

function start() {
  var model = new _model_js__WEBPACK_IMPORTED_MODULE_1__.default();
  var view = new _view_js__WEBPACK_IMPORTED_MODULE_2__.default('root', 'Gerador de Letras para Adedanha - v1.0.1', 'Letras que já foram sorteadas');
  app = new _controller_js__WEBPACK_IMPORTED_MODULE_3__.default(model, view); //window.app = app;
}

start();

/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\r\n  margin: 0;\r\n  padding: 0;\r\n  font-family: Consolas, Menlo, 'Droid Sans Mono', monospace;\r\n  background-color: lightgray;\r\n}\r\n\r\nh1 {\r\n  font-size: 2rem;\r\n}\r\n\r\nh2 {\r\n  font-size: 1.8rem;\r\n}\r\n\r\n.letter {\r\n  margin-top: 20px;\r\n  font-size: 3rem;\r\n  color: darkred;\r\n  font-weight: bold;\r\n}\r\n\r\n.buttons {\r\n  display: flex;\r\n  flex-direction: row;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.button {\r\n  margin-right: 10px;\r\n}\r\n\r\n.picked-letters {\r\n  display: flex;\r\n  flex-direction: row;\r\n  align-items: flex-start;\r\n  justify-content: center;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.letter-element {\r\n  margin: 5px;\r\n  font-size: 1.3rem;\r\n  padding: 10px;\r\n  /* border: 1px solid gray; */\r\n  border-radius: 4px;\r\n}\r\n\r\n.good {\r\n  color: white;\r\n  background-color: #16a085;\r\n}\r\n\r\n.bad {\r\n  color: white;\r\n  background-color: #c0392b;\r\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Model
/* harmony export */ });
/* harmony import */ var _helpers_math_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var ALL_VALUES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); //const ALL_VALUES = Array.from({ length: 60 }).map((_, index) => index + 1);

var Model = /*#__PURE__*/function () {
  function Model() {
    _classCallCheck(this, Model);

    this.pickedLetters = [];
    this.currentLetter = '';
    this.restart();
  }

  _createClass(Model, [{
    key: "restart",
    value: function restart() {
      this.pickedLetters = ALL_VALUES.map(function (letter) {
        return {
          id: letter,
          description: letter,
          picked: false
        };
      });
      this.currentLetter = '';
    }
  }, {
    key: "shuffle",
    value: function shuffle() {
      var shuffledLetter = null;

      if (!this._canShuffle()) {
        throw new Error('Todas as letras já foram sorteadas');
      }

      do {
        shuffledLetter = this._getNewLetter();
      } while (!this._isValidShuffle(shuffledLetter));

      this.currentLetter = shuffledLetter;
      return shuffledLetter;
    }
  }, {
    key: "pickLetter",
    value: function pickLetter() {
      var _this = this;

      var index = this.pickedLetters.findIndex(function (l) {
        return l.description === _this.currentLetter;
      });
      this.pickedLetters[index].picked = true;
    }
  }, {
    key: "getPickedLetters",
    value: function getPickedLetters() {
      return _toConsumableArray(this.pickedLetters);
    }
  }, {
    key: "_canShuffle",
    value: function _canShuffle() {
      return this.pickedLetters.filter(function (l) {
        return l.picked;
      }).length < ALL_VALUES.length;
    }
  }, {
    key: "_getNewLetter",
    value: function _getNewLetter() {
      return (0,_helpers_math_helpers_js__WEBPACK_IMPORTED_MODULE_0__.helperGetRandomValueFromArray)(ALL_VALUES);
    }
  }, {
    key: "_isValidShuffle",
    value: function _isValidShuffle(letter) {
      return !this.pickedLetters.find(function (l) {
        return l.description === letter;
      }).picked;
    }
  }]);

  return Model;
}();



/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "helperGetRandomValueFromArray": () => /* binding */ helperGetRandomValueFromArray
/* harmony export */ });
/**
 * Fonte: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values_inclusive
 */
function helperGetRandomValueFromArray(array) {
  var min = 0;
  var max = array.length - 1;
  var position = Math.floor(Math.random() * (max - min + 1) + min);
  return array[position];
}

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ View
/* harmony export */ });
/* harmony import */ var _helpers_dom_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var View = /*#__PURE__*/function () {
  function View() {
    var appId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'root';
    var appTitle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var shuffledMessage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    _classCallCheck(this, View);

    this.app = (0,_helpers_dom_helpers_js__WEBPACK_IMPORTED_MODULE_0__.helperGetElementFromDom)("#".concat(appId));
    this.title = (0,_helpers_dom_helpers_js__WEBPACK_IMPORTED_MODULE_0__.helperCreateElement)('h1', appTitle);
    this.divButtons = (0,_helpers_dom_helpers_js__WEBPACK_IMPORTED_MODULE_0__.helperCreateElement)('div', null, 'buttons');
    this.shuffleButton = (0,_helpers_dom_helpers_js__WEBPACK_IMPORTED_MODULE_0__.helperCreateElement)('button', 'Sortear', 'button', 'btn', 'blue', 'darken-4');
    this.pickLetterButton = (0,_helpers_dom_helpers_js__WEBPACK_IMPORTED_MODULE_0__.helperCreateElement)('button', 'Utilizar', 'button', 'btn', 'green', 'darken-4');
    this.pickLetterButton.disabled = true;
    this.restartButton = (0,_helpers_dom_helpers_js__WEBPACK_IMPORTED_MODULE_0__.helperCreateElement)('button', 'Reiniciar', 'button', 'btn', 'red', 'darken-4');
    this.pickLetterButton.disabled = true;
    this.divButtons.append(this.shuffleButton, this.pickLetterButton, this.restartButton);
    this.divLetter = (0,_helpers_dom_helpers_js__WEBPACK_IMPORTED_MODULE_0__.helperCreateElement)('div', null, 'letter');
    this.pickedLettersTitle = (0,_helpers_dom_helpers_js__WEBPACK_IMPORTED_MODULE_0__.helperCreateElement)('h2', shuffledMessage);
    this.divPickedLetters = (0,_helpers_dom_helpers_js__WEBPACK_IMPORTED_MODULE_0__.helperCreateElement)('div', null, 'picked-letters');
    this.renderApp();
  }

  _createClass(View, [{
    key: "renderApp",
    value: function renderApp() {
      this._clearElement(this.app);

      this.app.append(this.title, this.divButtons, this.divLetter, this.pickedLettersTitle, this.divPickedLetters);
      this.displayLetter();
    }
  }, {
    key: "restart",
    value: function restart() {
      this.renderApp();
      this.shuffleButton.disabled = false;
      this.pickLetterButton.disabled = true;
    }
  }, {
    key: "displayLetter",
    value: function displayLetter() {
      var letter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '?';
      this.divLetter.textContent = letter;
    }
  }, {
    key: "startShuffle",
    value: function startShuffle() {
      this.pickLetterButton.disabled = true;
      this.shuffleButton.disabled = true;
      this.restartButton.disabled = true;
    }
  }, {
    key: "endShuffle",
    value: function endShuffle() {
      this.shuffleButton.disabled = false;
      this.pickLetterButton.disabled = false;
      this.restartButton.disabled = false;
    }
  }, {
    key: "stopShuffle",
    value: function stopShuffle() {
      this.shuffleButton.disabled = true;
      this.pickLetterButton.disabled = true;
      this.divLetter.textContent = 'Fim';
      this.restartButton.disabled = false;
    }
  }, {
    key: "bindShuffleClickTo",
    value: function bindShuffleClickTo(buttonHandler) {
      this.shuffleButton.addEventListener('click', function () {
        return buttonHandler();
      });
    }
  }, {
    key: "bindPickLetterClickTo",
    value: function bindPickLetterClickTo(pickLetterHandler) {
      this.pickLetterButton.addEventListener('click', function () {
        return pickLetterHandler();
      });
    }
  }, {
    key: "bindRestartClickTo",
    value: function bindRestartClickTo(restartHandler) {
      this.restartButton.addEventListener('click', function () {
        return restartHandler();
      });
    }
  }, {
    key: "renderAllLetters",
    value: function renderAllLetters(pickedLetters) {
      var _this = this;

      this.pickLetterButton.disabled = true;

      this._clearElement(this.divPickedLetters);

      pickedLetters.forEach(function (letter) {
        var letterElement = _this.createLetterElement(letter);

        _this.divPickedLetters.appendChild(letterElement);
      });
    }
  }, {
    key: "createLetterElement",
    value: function createLetterElement(letter) {
      var className = letter.picked ? 'good' : 'bad';
      var span = (0,_helpers_dom_helpers_js__WEBPACK_IMPORTED_MODULE_0__.helperCreateElement)('span', "".concat(letter.description), 'letter-element', className);
      return span;
    }
  }, {
    key: "_clearElement",
    value: function _clearElement(element) {
      (0,_helpers_dom_helpers_js__WEBPACK_IMPORTED_MODULE_0__.helperClearElement)(element);
    }
  }]);

  return View;
}();



/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "helperCreateElement": () => /* binding */ helperCreateElement,
/* harmony export */   "helperGetElementFromDom": () => /* binding */ helperGetElementFromDom,
/* harmony export */   "helperClearElement": () => /* binding */ helperClearElement
/* harmony export */ });
function helperCreateElement(tag) {
  var textContent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var element = document.createElement(tag);
  element.textContent = textContent;

  for (var _len = arguments.length, classNames = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    classNames[_key - 2] = arguments[_key];
  }

  if (classNames.length > 0) {
    classNames.forEach(function (className) {
      return element.classList.add(className);
    });
  }

  return element;
}
function helperGetElementFromDom(selector) {
  var element = document.querySelector(selector);
  return element;
}
function helperClearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Controller
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SHUFFLING_COUNT = 30;

var Controller = function Controller(model, view) {
  var _this = this;

  _classCallCheck(this, Controller);

  _defineProperty(this, "onShuffle", function () {
    var maxCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SHUFFLING_COUNT;
    var interval = null;

    _this.view.startShuffle();

    var count = 0;
    interval = setInterval(function () {
      try {
        var letter = _this.model.shuffle();

        _this.view.displayLetter(letter);

        count++;

        if (count === maxCount) {
          clearInterval(interval);

          _this.view.endShuffle();
        }
      } catch (error) {
        console.error(error);
        clearInterval(interval);

        _this.view.endShuffle();

        _this.view.stopShuffle();
      }
    }, 40);
  });

  _defineProperty(this, "onPickLetter", function () {
    _this.model.pickLetter();

    _this.view.renderAllLetters(_this.model.getPickedLetters());
  });

  _defineProperty(this, "onRestart", function () {
    _this.model.restart();

    _this.view.restart();

    _this.view.renderAllLetters(_this.model.getPickedLetters());
  });

  this.model = model;
  this.view = view;
  this.view.bindShuffleClickTo(this.onShuffle);
  this.view.bindPickLetterClickTo(this.onPickLetter);
  this.view.bindRestartClickTo(this.onRestart);
  this.view.renderAllLetters(model.getPickedLetters());
};



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__(0);
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;