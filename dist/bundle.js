/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 2 */
/***/ (function(module) {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
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
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ (function(module) {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),
/* 4 */
/***/ (function(module) {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
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
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),
/* 5 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 6 */
/***/ (function(module) {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),
/* 7 */
/***/ (function(module) {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* ============================================================\n   Design tokens\n   ============================================================ */\n:root {\n\t--bg:          #08080f;\n\t--bg-2:        #0e0e1a;\n\t--surface:     rgba(255, 255, 255, 0.04);\n\t--surface-2:   rgba(255, 255, 255, 0.07);\n\t--border:      rgba(255, 255, 255, 0.08);\n\t--border-2:    rgba(255, 255, 255, 0.14);\n\t--text-1:      #f1f5f9;\n\t--text-2:      #94a3b8;\n\t--text-3:      #64748b;\n\t--accent-1:    #818cf8;\n\t--accent-2:    #22d3ee;\n\t--success:     #4ade80;\n\t--warning:     #fbbf24;\n\t--radius-sm:   10px;\n\t--radius-md:   18px;\n\t--radius-lg:   26px;\n\t--font:        system-ui, -apple-system, \"Segoe UI\", sans-serif;\n\t--font-mono:   ui-monospace, \"Fira Code\", \"Cascadia Code\", monospace;\n}\n\n/* ============================================================\n   Reset & base\n   ============================================================ */\n*, *::before, *::after {\n\tbox-sizing: border-box;\n\tmargin: 0;\n\tpadding: 0;\n}\n\n/* Ensure [hidden] is never overridden by display declarations in this sheet */\n[hidden] { display: none !important; }\n\nhtml {\n\tscroll-behavior: smooth;\n}\n\nbody {\n\tbackground-color: var(--bg);\n\tbackground-image:\n\t\tradial-gradient(ellipse 80% 50% at 50% -20%, rgba(129, 140, 248, 0.12), transparent),\n\t\tradial-gradient(ellipse 60% 40% at 80% 80%,  rgba(34, 211, 238, 0.06),  transparent);\n\tcolor: var(--text-1);\n\tfont-family: var(--font);\n\tmin-height: 100vh;\n\tline-height: 1.6;\n\t-webkit-font-smoothing: antialiased;\n}\n\n/* ============================================================\n   Topbar (compact header)\n   ============================================================ */\n.topbar {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: space-between;\n\tgap: 1rem;\n\tpadding: 1rem 1.5rem 0.75rem;\n\tmax-width: 980px;\n\tmargin: 0 auto;\n}\n\n.topbar__left,\n.topbar__right {\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.6rem;\n\tflex: 1;\n\tmin-width: 0;\n}\n\n.topbar__right {\n\tjustify-content: flex-end;\n}\n\n.topbar__center {\n\ttext-align: center;\n\tflex: 2;\n\tmin-width: 0;\n}\n\n.topbar__title {\n\tfont-size: clamp(1rem, 3.5vw, 1.4rem);\n\tfont-weight: 800;\n\tletter-spacing: -0.02em;\n\tline-height: 1.2;\n\tmargin-bottom: 0.2rem;\n\twhite-space: nowrap;\n}\n\n.gradient-text {\n\tbackground: linear-gradient(135deg, var(--accent-1) 0%, var(--accent-2) 100%);\n\t-webkit-background-clip: text;\n\t-webkit-text-fill-color: transparent;\n\tbackground-clip: text;\n}\n\n.topbar__subtitle {\n\tfont-size: 0.72rem;\n\tcolor: var(--text-2);\n\tline-height: 1.4;\n\tmargin: 0;\n}\n\n.topbar__subtitle code {\n\tfont-family: var(--font-mono);\n\tfont-size: 0.9em;\n\tcolor: var(--accent-1);\n\tbackground: rgba(129, 140, 248, 0.1);\n\tpadding: 0.1em 0.35em;\n\tborder-radius: 3px;\n}\n\n/* Ghost install button */\n.btn--ghost {\n\tbackground: transparent;\n\tcolor: var(--text-2);\n\tborder: 1px solid var(--border-2);\n\tfont-size: 0.72rem;\n\tpadding: 0.38rem 0.8rem;\n}\n\n.btn--ghost:hover {\n\tcolor: var(--text-1);\n\tbackground: var(--surface-2);\n}\n\n.topbar__install {\n\twhite-space: nowrap;\n}\n\n/* Language toggle */\n.lang-toggle {\n\tdisplay: inline-flex;\n\talign-items: center;\n\tgap: 0;\n\tfont-size: 0.7rem;\n\tfont-weight: 700;\n\tfont-family: var(--font);\n\tletter-spacing: 0.06em;\n\tbackground: var(--surface);\n\tborder: 1px solid var(--border);\n\tborder-radius: 6px;\n\tpadding: 0.3em 0.55em;\n\tcursor: pointer;\n\tcolor: var(--text-3);\n\ttransition: background 0.15s ease, border-color 0.15s ease;\n}\n\n.lang-toggle:hover {\n\tbackground: var(--surface-2);\n\tborder-color: var(--border-2);\n}\n\n.lang-toggle__sep {\n\tmargin: 0 0.2em;\n\topacity: 0.4;\n}\n\n.lang-toggle__fi.is-active,\n.lang-toggle__en.is-active {\n\tcolor: var(--accent-1);\n}\n\n/* GitHub icon link */\n.topbar__github {\n\tcolor: var(--text-3);\n\tdisplay: flex;\n\talign-items: center;\n\ttext-decoration: none;\n\ttransition: color 0.15s ease;\n\tflex-shrink: 0;\n}\n\n.topbar__github:hover {\n\tcolor: var(--text-1);\n}\n\n/* ============================================================\n   Main layout\n   ============================================================ */\nmain {\n\tmax-width: 980px;\n\tmargin: 0 auto;\n\tpadding: 0 1.5rem 5rem;\n\tdisplay: flex;\n\tflex-direction: column;\n\tgap: 4rem;\n}\n\n/* ============================================================\n   Glass card utility\n   ============================================================ */\n.glass-card {\n\tbackground: var(--surface);\n\tborder: 1px solid var(--border);\n\tborder-radius: var(--radius-md);\n\tbackdrop-filter: blur(20px);\n\t-webkit-backdrop-filter: blur(20px);\n}\n\n/* ============================================================\n   Section header\n   ============================================================ */\n.section-header {\n\tmargin-bottom: 1.5rem;\n}\n\n.section-header h2 {\n\tfont-size: 1.5rem;\n\tfont-weight: 700;\n\tletter-spacing: -0.02em;\n\tmargin-bottom: 0.4rem;\n}\n\n.section-desc {\n\tcolor: var(--text-2);\n\tfont-size: 0.9rem;\n}\n\n/* ============================================================\n   Scanner section\n   ============================================================ */\n.scanner-card {\n\toverflow: hidden;\n\tmax-width: 480px;\n\tmargin-left: auto;\n\tmargin-right: auto;\n}\n\n.video-wrapper {\n\tposition: relative;\n\tbackground: #000;\n\tborder-radius: var(--radius-md) var(--radius-md) 0 0;\n\toverflow: hidden;\n\taspect-ratio: 4/3;\n\ttransition: box-shadow 0.25s ease;\n}\n\n.video-wrapper.detected {\n\tanimation: detectedFlash 0.65s ease-out forwards;\n}\n\n@keyframes detectedFlash {\n\t0%   {\n\t\tbox-shadow:\n\t\t\t0 0 0 4px var(--success),\n\t\t\t0 0 0 8px rgba(74, 222, 128, 0.4),\n\t\t\tinset 0 0 40px rgba(74, 222, 128, 0.18);\n\t}\n\t30%  {\n\t\tbox-shadow:\n\t\t\t0 0 0 6px var(--success),\n\t\t\t0 0 0 16px rgba(74, 222, 128, 0.25),\n\t\t\tinset 0 0 60px rgba(74, 222, 128, 0.28);\n\t}\n\t100% {\n\t\tbox-shadow:\n\t\t\t0 0 0 2px rgba(74, 222, 128, 0.2),\n\t\t\t0 0 0 4px transparent,\n\t\t\tinset 0 0 0px transparent;\n\t}\n}\n\n#barcodecamera {\n\twidth: 100%;\n\theight: 100%;\n\tobject-fit: cover;\n\tdisplay: block;\n\tborder-radius: 0;\n}\n\n/* Scan overlay */\n.scan-overlay {\n\tposition: absolute;\n\tinset: 0;\n\tpointer-events: none;\n}\n\n/* Animated scan line */\n.scan-line {\n\tposition: absolute;\n\tleft: 5%;\n\tright: 5%;\n\theight: 2px;\n\tbackground: linear-gradient(90deg, transparent, var(--accent-1), var(--accent-2), transparent);\n\ttop: 10%;\n\tborder-radius: 1px;\n\topacity: 0;\n}\n\n.scan-overlay.is-active .scan-line {\n\tanimation: scanMove 2.6s ease-in-out infinite;\n}\n\n@keyframes scanMove {\n\t0%   { top: 8%;  opacity: 0; }\n\t8%   { opacity: 1; }\n\t92%  { opacity: 1; }\n\t100% { top: 88%; opacity: 0; }\n}\n\n/* Corner brackets */\n.scan-corners {\n\tposition: absolute;\n\tinset: 12%;\n}\n\n.scan-corners span {\n\tposition: absolute;\n\twidth: 22px;\n\theight: 22px;\n\tborder-color: var(--accent-1);\n\tborder-style: solid;\n\topacity: 0;\n\ttransition: opacity 0.4s ease;\n}\n\n.scan-overlay.is-active .scan-corners span {\n\topacity: 0.7;\n}\n\n.scan-corners span:nth-child(1) { top: 0; left: 0;  border-width: 2px 0 0 2px; border-radius: 3px 0 0 0; }\n.scan-corners span:nth-child(2) { top: 0; right: 0; border-width: 2px 2px 0 0; border-radius: 0 3px 0 0; }\n.scan-corners span:nth-child(3) { bottom: 0; left: 0;  border-width: 0 0 2px 2px; border-radius: 0 0 0 3px; }\n.scan-corners span:nth-child(4) { bottom: 0; right: 0; border-width: 0 2px 2px 0; border-radius: 0 0 3px 0; }\n\n/* Status badge */\n.status-badge {\n\tposition: absolute;\n\tbottom: 1rem;\n\tleft: 50%;\n\ttransform: translateX(-50%);\n\tfont-size: 0.75rem;\n\tfont-weight: 600;\n\tletter-spacing: 0.04em;\n\tcolor: var(--text-1);\n\tbackground: rgba(8, 8, 15, 0.7);\n\tborder: 1px solid var(--border);\n\tborder-radius: 999px;\n\tpadding: 0.35em 1em;\n\twhite-space: nowrap;\n\tbackdrop-filter: blur(8px);\n\t-webkit-backdrop-filter: blur(8px);\n}\n\n/* Controls */\n.scanner-controls {\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: center;\n\tgap: 0.75rem;\n\tpadding: 1.25rem 1.5rem;\n}\n\n/* ============================================================\n   Button\n   ============================================================ */\n.btn {\n\tdisplay: inline-flex;\n\talign-items: center;\n\tgap: 0.5rem;\n\tpadding: 0.65rem 1.5rem;\n\tborder: none;\n\tborder-radius: var(--radius-sm);\n\tfont-family: var(--font);\n\tfont-size: 0.9rem;\n\tfont-weight: 600;\n\tcursor: pointer;\n\ttransition: opacity 0.2s ease, transform 0.15s ease;\n\ttext-decoration: none;\n}\n\n.btn--primary {\n\tbackground: linear-gradient(135deg, var(--accent-1) 0%, var(--accent-2) 100%);\n\tcolor: #fff;\n}\n\n.btn--primary:hover {\n\topacity: 0.88;\n\ttransform: translateY(-1px);\n}\n\n.btn--primary:active {\n\ttransform: translateY(0);\n\topacity: 0.95;\n}\n\n.btn:disabled {\n\topacity: 0.4;\n\tcursor: not-allowed;\n\ttransform: none;\n}\n\n/* Compat warning */\n.compat-warning {\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.5rem;\n\tfont-size: 0.8rem;\n\tcolor: var(--warning);\n\tbackground: rgba(251, 191, 36, 0.08);\n\tborder: 1px solid rgba(251, 191, 36, 0.2);\n\tborder-radius: var(--radius-sm);\n\tpadding: 0.6rem 1rem;\n\tmax-width: 420px;\n\ttext-align: left;\n}\n\n/* ============================================================\n   Sample barcodes — bento grid\n   ============================================================ */\n.bento-grid {\n\tdisplay: grid;\n\tgrid-template-columns: repeat(auto-fill, minmax(180px, 1fr));\n\tgap: 1rem;\n}\n\n.sample-card {\n\tpadding: 1.25rem 1rem 1rem;\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: center;\n\tgap: 0.5rem;\n\ttransition: border-color 0.2s ease, background 0.2s ease;\n}\n\n.sample-card:hover {\n\tbackground: var(--surface-2);\n\tborder-color: var(--border-2);\n}\n\n.sample-card h3 {\n\tfont-size: 0.8rem;\n\tfont-weight: 700;\n\tletter-spacing: 0.06em;\n\ttext-transform: uppercase;\n\tcolor: var(--accent-1);\n\talign-self: flex-start;\n}\n\n.sample-value {\n\tfont-family: var(--font-mono);\n\tfont-size: 0.65rem;\n\tcolor: var(--text-3);\n\tword-break: break-all;\n\ttext-align: center;\n\tline-height: 1.4;\n\talign-self: flex-start;\n}\n\n.sample-canvas-wrap {\n\twidth: 100%;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tmargin-top: 0.5rem;\n}\n\n.sample-canvas-wrap canvas,\n.sample-canvas-wrap svg {\n\tmax-width: 100%;\n\theight: auto;\n}\n\n/* ============================================================\n   Code section\n   ============================================================ */\n.code-card {\n\tposition: relative;\n\toverflow: hidden;\n}\n\n.code-card__header {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: space-between;\n\tpadding: 0.75rem 1.25rem;\n\tborder-bottom: 1px solid var(--border);\n\tbackground: rgba(255, 255, 255, 0.02);\n}\n\n.code-card__actions {\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.5rem;\n}\n\n.code-lang {\n\tfont-size: 0.7rem;\n\tfont-weight: 700;\n\tletter-spacing: 0.1em;\n\ttext-transform: uppercase;\n\tcolor: var(--text-3);\n}\n\n.copy-btn {\n\tdisplay: inline-flex;\n\talign-items: center;\n\tgap: 0.4rem;\n\tfont-size: 0.78rem;\n\tfont-weight: 600;\n\tfont-family: var(--font);\n\tcolor: var(--text-2);\n\tbackground: var(--surface-2);\n\tborder: 1px solid var(--border);\n\tborder-radius: 6px;\n\tpadding: 0.35em 0.75em;\n\tcursor: pointer;\n\ttransition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease;\n}\n\n.copy-btn:hover {\n\tcolor: var(--text-1);\n\tbackground: rgba(255, 255, 255, 0.1);\n\tborder-color: var(--border-2);\n}\n\n.copy-btn.copied {\n\tcolor: var(--success);\n\tborder-color: rgba(74, 222, 128, 0.3);\n}\n\na.copy-btn {\n\tcolor: var(--accent-1);\n\ttext-decoration: none;\n}\n\na.copy-btn:hover {\n\tcolor: var(--accent-2);\n\tbackground: rgba(129, 140, 248, 0.1);\n\tborder-color: rgba(129, 140, 248, 0.3);\n}\n\n.code-card pre {\n\toverflow-x: auto;\n\tpadding: 1.5rem;\n}\n\n.code-card code {\n\tfont-family: var(--font-mono);\n\tfont-size: 0.8rem;\n\tline-height: 1.75;\n\tcolor: #adbac7;\n\twhite-space: pre;\n\tdisplay: block;\n}\n\n/* ── Syntax highlighting ── */\n.hl-doctype    { color: #768390; font-style: italic; }\n.hl-tag-bracket{ color: #6cb6ff; }\n.hl-tag-name   { color: #7ee787; }\n.hl-attr-name  { color: #6cb6ff; }\n.hl-attr-value { color: #96d0ff; }\n.hl-keyword    { color: #f47067; }\n.hl-builtin    { color: #dcbdfb; }\n.hl-string     { color: #96d0ff; }\n.hl-number     { color: #6cb6ff; }\n.hl-comment    { color: #768390; font-style: italic; }\n\n\n/* ============================================================\n   Footer\n   ============================================================ */\n.site-footer {\n\ttext-align: center;\n\tpadding: 2rem 1.5rem 3rem;\n\tfont-size: 0.8rem;\n\tcolor: var(--text-3);\n}\n\n.site-footer a {\n\tcolor: var(--accent-1);\n\ttext-decoration: none;\n}\n\n.site-footer a:hover {\n\ttext-decoration: underline;\n}\n\n/* ============================================================\n   Snackbar\n   ============================================================ */\n.snackbar {\n\tposition: fixed;\n\tbottom: 2rem;\n\tleft: 50%;\n\ttransform: translateX(-50%) translateY(200%);\n\ttransition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n\tz-index: 100;\n\tmin-width: 280px;\n\tmax-width: min(480px, calc(100vw - 2rem));\n\tbackground: rgba(14, 14, 26, 0.95);\n\tbackdrop-filter: blur(24px);\n\t-webkit-backdrop-filter: blur(24px);\n\tborder: 1px solid rgba(129, 140, 248, 0.25);\n\tborder-radius: var(--radius-md);\n\tbox-shadow:\n\t\t0 8px 32px rgba(0, 0, 0, 0.5),\n\t\t0 0 40px rgba(129, 140, 248, 0.08);\n\toverflow: hidden;\n}\n\n.snackbar.is-visible {\n\ttransform: translateX(-50%) translateY(0);\n}\n\n.snackbar__content {\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.75rem;\n\tpadding: 0.9rem 1.25rem 0.75rem;\n}\n\n.snackbar__badge {\n\tflex-shrink: 0;\n\tfont-size: 0.62rem;\n\tfont-weight: 800;\n\ttext-transform: uppercase;\n\tletter-spacing: 0.07em;\n\tpadding: 0.22em 0.6em;\n\tborder-radius: 5px;\n\tbackground: linear-gradient(135deg, var(--accent-1), var(--accent-2));\n\tcolor: #fff;\n\twhite-space: nowrap;\n}\n\n.snackbar__value {\n\tfont-family: var(--font-mono);\n\tfont-size: 0.88rem;\n\tcolor: var(--text-1);\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\twhite-space: nowrap;\n\tflex: 1;\n}\n\n.snackbar__progress {\n\theight: 3px;\n\tbackground: linear-gradient(90deg, var(--accent-1), var(--accent-2));\n\ttransform-origin: left center;\n\ttransform: scaleX(1);\n}\n\n.snackbar.is-visible .snackbar__progress {\n\tanimation: progressShrink 4s linear forwards;\n}\n\n@keyframes progressShrink {\n\tto { transform: scaleX(0); }\n}\n\n/* ============================================================\n   Browser compatibility section\n   ============================================================ */\n.compat-grid {\n\tdisplay: grid;\n\tgrid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n\tgap: 1rem;\n\tmargin-bottom: 1.5rem;\n}\n\n.compat-card {\n\tpadding: 1.25rem;\n\tdisplay: flex;\n\tflex-direction: column;\n\tgap: 0.5rem;\n}\n\n.compat-card__browser {\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.6rem;\n\tfont-weight: 700;\n\tfont-size: 0.95rem;\n}\n\n.browser-icon {\n\twidth: 22px;\n\theight: 22px;\n\tflex-shrink: 0;\n\tcolor: var(--text-2);\n}\n\n.compat-card p {\n\tfont-size: 0.78rem;\n\tcolor: var(--text-3);\n\tline-height: 1.4;\n}\n\n.compat-badge {\n\tdisplay: inline-block;\n\tfont-size: 0.7rem;\n\tfont-weight: 700;\n\tletter-spacing: 0.05em;\n\tpadding: 0.25em 0.7em;\n\tborder-radius: 999px;\n\talign-self: flex-start;\n}\n\n.compat-badge--yes {\n\tbackground: rgba(74, 222, 128, 0.12);\n\tcolor: var(--success);\n\tborder: 1px solid rgba(74, 222, 128, 0.25);\n}\n\n.compat-badge--no {\n\tbackground: rgba(248, 113, 113, 0.1);\n\tcolor: #f87171;\n\tborder: 1px solid rgba(248, 113, 113, 0.2);\n}\n\n.compat-card--yes {\n\tborder-color: rgba(74, 222, 128, 0.12);\n}\n\n.compat-card--no {\n\tborder-color: rgba(248, 113, 113, 0.08);\n\topacity: 0.8;\n}\n\n/* Device/browser table */\n.device-table-wrap {\n\tpadding: 1.5rem;\n\toverflow-x: auto;\n}\n\n.device-table {\n\twidth: 100%;\n\tborder-collapse: collapse;\n\tfont-size: 0.85rem;\n\tmin-width: 380px;\n}\n\n.device-table th,\n.device-table td {\n\tpadding: 0.7rem 1rem;\n\ttext-align: center;\n\tborder-bottom: 1px solid var(--border);\n}\n\n.device-table th {\n\tfont-weight: 700;\n\tfont-size: 0.75rem;\n\tletter-spacing: 0.05em;\n\ttext-transform: uppercase;\n\tcolor: var(--text-2);\n}\n\n.device-table th:first-child,\n.device-table td:first-child {\n\ttext-align: left;\n}\n\n.device-table tbody tr:last-child td {\n\tborder-bottom: none;\n}\n\n.td-yes  { color: var(--success); font-weight: 700; }\n.td-no   { color: #f87171; font-weight: 700; }\n.td-na   { color: var(--text-3); }\n\n.device-table__note {\n\tmargin-top: 1rem;\n\tfont-size: 0.75rem;\n\tcolor: var(--text-3);\n\tline-height: 1.6;\n\tborder-top: 1px solid var(--border);\n\tpadding-top: 0.75rem;\n}\n\n\n/* ============================================================\n   Responsive\n   ============================================================ */\n@media (max-width: 640px) {\n\t.topbar {\n\t\tpadding: 0.75rem 1rem 0.5rem;\n\t\tgap: 0.5rem;\n\t}\n\n\t.topbar__title {\n\t\tfont-size: 0.95rem;\n\t}\n\n\t.topbar__subtitle {\n\t\tdisplay: none;\n\t}\n\n\t.video-wrapper {\n\t\taspect-ratio: 3/4;\n\t\tmax-height: 420px;\n\t}\n\n\t.bento-grid {\n\t\tgrid-template-columns: repeat(2, 1fr);\n\t}\n\n\t.snackbar {\n\t\tbottom: 1rem;\n\t}\n}\n\n@media (max-width: 400px) {\n\t.bento-grid {\n\t\tgrid-template-columns: 1fr;\n\t}\n}\n", "",{"version":3,"sources":["webpack://./src/styles/main.css"],"names":[],"mappings":"AAAA;;iEAEiE;AACjE;CACC,sBAAsB;CACtB,sBAAsB;CACtB,wCAAwC;CACxC,wCAAwC;CACxC,wCAAwC;CACxC,wCAAwC;CACxC,sBAAsB;CACtB,sBAAsB;CACtB,sBAAsB;CACtB,sBAAsB;CACtB,sBAAsB;CACtB,sBAAsB;CACtB,sBAAsB;CACtB,mBAAmB;CACnB,mBAAmB;CACnB,mBAAmB;CACnB,+DAA+D;CAC/D,oEAAoE;AACrE;;AAEA;;iEAEiE;AACjE;CACC,sBAAsB;CACtB,SAAS;CACT,UAAU;AACX;;AAEA,8EAA8E;AAC9E,WAAW,wBAAwB,EAAE;;AAErC;CACC,uBAAuB;AACxB;;AAEA;CACC,2BAA2B;CAC3B;;sFAEqF;CACrF,oBAAoB;CACpB,wBAAwB;CACxB,iBAAiB;CACjB,gBAAgB;CAChB,mCAAmC;AACpC;;AAEA;;iEAEiE;AACjE;CACC,aAAa;CACb,mBAAmB;CACnB,8BAA8B;CAC9B,SAAS;CACT,4BAA4B;CAC5B,gBAAgB;CAChB,cAAc;AACf;;AAEA;;CAEC,aAAa;CACb,mBAAmB;CACnB,WAAW;CACX,OAAO;CACP,YAAY;AACb;;AAEA;CACC,yBAAyB;AAC1B;;AAEA;CACC,kBAAkB;CAClB,OAAO;CACP,YAAY;AACb;;AAEA;CACC,qCAAqC;CACrC,gBAAgB;CAChB,uBAAuB;CACvB,gBAAgB;CAChB,qBAAqB;CACrB,mBAAmB;AACpB;;AAEA;CACC,6EAA6E;CAC7E,6BAA6B;CAC7B,oCAAoC;CACpC,qBAAqB;AACtB;;AAEA;CACC,kBAAkB;CAClB,oBAAoB;CACpB,gBAAgB;CAChB,SAAS;AACV;;AAEA;CACC,6BAA6B;CAC7B,gBAAgB;CAChB,sBAAsB;CACtB,oCAAoC;CACpC,qBAAqB;CACrB,kBAAkB;AACnB;;AAEA,yBAAyB;AACzB;CACC,uBAAuB;CACvB,oBAAoB;CACpB,iCAAiC;CACjC,kBAAkB;CAClB,uBAAuB;AACxB;;AAEA;CACC,oBAAoB;CACpB,4BAA4B;AAC7B;;AAEA;CACC,mBAAmB;AACpB;;AAEA,oBAAoB;AACpB;CACC,oBAAoB;CACpB,mBAAmB;CACnB,MAAM;CACN,iBAAiB;CACjB,gBAAgB;CAChB,wBAAwB;CACxB,sBAAsB;CACtB,0BAA0B;CAC1B,+BAA+B;CAC/B,kBAAkB;CAClB,qBAAqB;CACrB,eAAe;CACf,oBAAoB;CACpB,0DAA0D;AAC3D;;AAEA;CACC,4BAA4B;CAC5B,6BAA6B;AAC9B;;AAEA;CACC,eAAe;CACf,YAAY;AACb;;AAEA;;CAEC,sBAAsB;AACvB;;AAEA,qBAAqB;AACrB;CACC,oBAAoB;CACpB,aAAa;CACb,mBAAmB;CACnB,qBAAqB;CACrB,4BAA4B;CAC5B,cAAc;AACf;;AAEA;CACC,oBAAoB;AACrB;;AAEA;;iEAEiE;AACjE;CACC,gBAAgB;CAChB,cAAc;CACd,sBAAsB;CACtB,aAAa;CACb,sBAAsB;CACtB,SAAS;AACV;;AAEA;;iEAEiE;AACjE;CACC,0BAA0B;CAC1B,+BAA+B;CAC/B,+BAA+B;CAC/B,2BAA2B;CAC3B,mCAAmC;AACpC;;AAEA;;iEAEiE;AACjE;CACC,qBAAqB;AACtB;;AAEA;CACC,iBAAiB;CACjB,gBAAgB;CAChB,uBAAuB;CACvB,qBAAqB;AACtB;;AAEA;CACC,oBAAoB;CACpB,iBAAiB;AAClB;;AAEA;;iEAEiE;AACjE;CACC,gBAAgB;CAChB,gBAAgB;CAChB,iBAAiB;CACjB,kBAAkB;AACnB;;AAEA;CACC,kBAAkB;CAClB,gBAAgB;CAChB,oDAAoD;CACpD,gBAAgB;CAChB,iBAAiB;CACjB,iCAAiC;AAClC;;AAEA;CACC,gDAAgD;AACjD;;AAEA;CACC;EACC;;;0CAGwC;CACzC;CACA;EACC;;;0CAGwC;CACzC;CACA;EACC;;;4BAG0B;CAC3B;AACD;;AAEA;CACC,WAAW;CACX,YAAY;CACZ,iBAAiB;CACjB,cAAc;CACd,gBAAgB;AACjB;;AAEA,iBAAiB;AACjB;CACC,kBAAkB;CAClB,QAAQ;CACR,oBAAoB;AACrB;;AAEA,uBAAuB;AACvB;CACC,kBAAkB;CAClB,QAAQ;CACR,SAAS;CACT,WAAW;CACX,8FAA8F;CAC9F,QAAQ;CACR,kBAAkB;CAClB,UAAU;AACX;;AAEA;CACC,6CAA6C;AAC9C;;AAEA;CACC,OAAO,OAAO,GAAG,UAAU,EAAE;CAC7B,OAAO,UAAU,EAAE;CACnB,OAAO,UAAU,EAAE;CACnB,OAAO,QAAQ,EAAE,UAAU,EAAE;AAC9B;;AAEA,oBAAoB;AACpB;CACC,kBAAkB;CAClB,UAAU;AACX;;AAEA;CACC,kBAAkB;CAClB,WAAW;CACX,YAAY;CACZ,6BAA6B;CAC7B,mBAAmB;CACnB,UAAU;CACV,6BAA6B;AAC9B;;AAEA;CACC,YAAY;AACb;;AAEA,kCAAkC,MAAM,EAAE,OAAO,GAAG,yBAAyB,EAAE,wBAAwB,EAAE;AACzG,kCAAkC,MAAM,EAAE,QAAQ,EAAE,yBAAyB,EAAE,wBAAwB,EAAE;AACzG,kCAAkC,SAAS,EAAE,OAAO,GAAG,yBAAyB,EAAE,wBAAwB,EAAE;AAC5G,kCAAkC,SAAS,EAAE,QAAQ,EAAE,yBAAyB,EAAE,wBAAwB,EAAE;;AAE5G,iBAAiB;AACjB;CACC,kBAAkB;CAClB,YAAY;CACZ,SAAS;CACT,2BAA2B;CAC3B,kBAAkB;CAClB,gBAAgB;CAChB,sBAAsB;CACtB,oBAAoB;CACpB,+BAA+B;CAC/B,+BAA+B;CAC/B,oBAAoB;CACpB,mBAAmB;CACnB,mBAAmB;CACnB,0BAA0B;CAC1B,kCAAkC;AACnC;;AAEA,aAAa;AACb;CACC,aAAa;CACb,sBAAsB;CACtB,mBAAmB;CACnB,YAAY;CACZ,uBAAuB;AACxB;;AAEA;;iEAEiE;AACjE;CACC,oBAAoB;CACpB,mBAAmB;CACnB,WAAW;CACX,uBAAuB;CACvB,YAAY;CACZ,+BAA+B;CAC/B,wBAAwB;CACxB,iBAAiB;CACjB,gBAAgB;CAChB,eAAe;CACf,mDAAmD;CACnD,qBAAqB;AACtB;;AAEA;CACC,6EAA6E;CAC7E,WAAW;AACZ;;AAEA;CACC,aAAa;CACb,2BAA2B;AAC5B;;AAEA;CACC,wBAAwB;CACxB,aAAa;AACd;;AAEA;CACC,YAAY;CACZ,mBAAmB;CACnB,eAAe;AAChB;;AAEA,mBAAmB;AACnB;CACC,aAAa;CACb,mBAAmB;CACnB,WAAW;CACX,iBAAiB;CACjB,qBAAqB;CACrB,oCAAoC;CACpC,yCAAyC;CACzC,+BAA+B;CAC/B,oBAAoB;CACpB,gBAAgB;CAChB,gBAAgB;AACjB;;AAEA;;iEAEiE;AACjE;CACC,aAAa;CACb,4DAA4D;CAC5D,SAAS;AACV;;AAEA;CACC,0BAA0B;CAC1B,aAAa;CACb,sBAAsB;CACtB,mBAAmB;CACnB,WAAW;CACX,wDAAwD;AACzD;;AAEA;CACC,4BAA4B;CAC5B,6BAA6B;AAC9B;;AAEA;CACC,iBAAiB;CACjB,gBAAgB;CAChB,sBAAsB;CACtB,yBAAyB;CACzB,sBAAsB;CACtB,sBAAsB;AACvB;;AAEA;CACC,6BAA6B;CAC7B,kBAAkB;CAClB,oBAAoB;CACpB,qBAAqB;CACrB,kBAAkB;CAClB,gBAAgB;CAChB,sBAAsB;AACvB;;AAEA;CACC,WAAW;CACX,aAAa;CACb,uBAAuB;CACvB,mBAAmB;CACnB,kBAAkB;AACnB;;AAEA;;CAEC,eAAe;CACf,YAAY;AACb;;AAEA;;iEAEiE;AACjE;CACC,kBAAkB;CAClB,gBAAgB;AACjB;;AAEA;CACC,aAAa;CACb,mBAAmB;CACnB,8BAA8B;CAC9B,wBAAwB;CACxB,sCAAsC;CACtC,qCAAqC;AACtC;;AAEA;CACC,aAAa;CACb,mBAAmB;CACnB,WAAW;AACZ;;AAEA;CACC,iBAAiB;CACjB,gBAAgB;CAChB,qBAAqB;CACrB,yBAAyB;CACzB,oBAAoB;AACrB;;AAEA;CACC,oBAAoB;CACpB,mBAAmB;CACnB,WAAW;CACX,kBAAkB;CAClB,gBAAgB;CAChB,wBAAwB;CACxB,oBAAoB;CACpB,4BAA4B;CAC5B,+BAA+B;CAC/B,kBAAkB;CAClB,sBAAsB;CACtB,eAAe;CACf,4EAA4E;AAC7E;;AAEA;CACC,oBAAoB;CACpB,oCAAoC;CACpC,6BAA6B;AAC9B;;AAEA;CACC,qBAAqB;CACrB,qCAAqC;AACtC;;AAEA;CACC,sBAAsB;CACtB,qBAAqB;AACtB;;AAEA;CACC,sBAAsB;CACtB,oCAAoC;CACpC,sCAAsC;AACvC;;AAEA;CACC,gBAAgB;CAChB,eAAe;AAChB;;AAEA;CACC,6BAA6B;CAC7B,iBAAiB;CACjB,iBAAiB;CACjB,cAAc;CACd,gBAAgB;CAChB,cAAc;AACf;;AAEA,8BAA8B;AAC9B,iBAAiB,cAAc,EAAE,kBAAkB,EAAE;AACrD,iBAAiB,cAAc,EAAE;AACjC,iBAAiB,cAAc,EAAE;AACjC,iBAAiB,cAAc,EAAE;AACjC,iBAAiB,cAAc,EAAE;AACjC,iBAAiB,cAAc,EAAE;AACjC,iBAAiB,cAAc,EAAE;AACjC,iBAAiB,cAAc,EAAE;AACjC,iBAAiB,cAAc,EAAE;AACjC,iBAAiB,cAAc,EAAE,kBAAkB,EAAE;;;AAGrD;;iEAEiE;AACjE;CACC,kBAAkB;CAClB,yBAAyB;CACzB,iBAAiB;CACjB,oBAAoB;AACrB;;AAEA;CACC,sBAAsB;CACtB,qBAAqB;AACtB;;AAEA;CACC,0BAA0B;AAC3B;;AAEA;;iEAEiE;AACjE;CACC,eAAe;CACf,YAAY;CACZ,SAAS;CACT,4CAA4C;CAC5C,4DAA4D;CAC5D,YAAY;CACZ,gBAAgB;CAChB,yCAAyC;CACzC,kCAAkC;CAClC,2BAA2B;CAC3B,mCAAmC;CACnC,2CAA2C;CAC3C,+BAA+B;CAC/B;;oCAEmC;CACnC,gBAAgB;AACjB;;AAEA;CACC,yCAAyC;AAC1C;;AAEA;CACC,aAAa;CACb,mBAAmB;CACnB,YAAY;CACZ,+BAA+B;AAChC;;AAEA;CACC,cAAc;CACd,kBAAkB;CAClB,gBAAgB;CAChB,yBAAyB;CACzB,sBAAsB;CACtB,qBAAqB;CACrB,kBAAkB;CAClB,qEAAqE;CACrE,WAAW;CACX,mBAAmB;AACpB;;AAEA;CACC,6BAA6B;CAC7B,kBAAkB;CAClB,oBAAoB;CACpB,gBAAgB;CAChB,uBAAuB;CACvB,mBAAmB;CACnB,OAAO;AACR;;AAEA;CACC,WAAW;CACX,oEAAoE;CACpE,6BAA6B;CAC7B,oBAAoB;AACrB;;AAEA;CACC,4CAA4C;AAC7C;;AAEA;CACC,KAAK,oBAAoB,EAAE;AAC5B;;AAEA;;iEAEiE;AACjE;CACC,aAAa;CACb,4DAA4D;CAC5D,SAAS;CACT,qBAAqB;AACtB;;AAEA;CACC,gBAAgB;CAChB,aAAa;CACb,sBAAsB;CACtB,WAAW;AACZ;;AAEA;CACC,aAAa;CACb,mBAAmB;CACnB,WAAW;CACX,gBAAgB;CAChB,kBAAkB;AACnB;;AAEA;CACC,WAAW;CACX,YAAY;CACZ,cAAc;CACd,oBAAoB;AACrB;;AAEA;CACC,kBAAkB;CAClB,oBAAoB;CACpB,gBAAgB;AACjB;;AAEA;CACC,qBAAqB;CACrB,iBAAiB;CACjB,gBAAgB;CAChB,sBAAsB;CACtB,qBAAqB;CACrB,oBAAoB;CACpB,sBAAsB;AACvB;;AAEA;CACC,oCAAoC;CACpC,qBAAqB;CACrB,0CAA0C;AAC3C;;AAEA;CACC,oCAAoC;CACpC,cAAc;CACd,0CAA0C;AAC3C;;AAEA;CACC,sCAAsC;AACvC;;AAEA;CACC,uCAAuC;CACvC,YAAY;AACb;;AAEA,yBAAyB;AACzB;CACC,eAAe;CACf,gBAAgB;AACjB;;AAEA;CACC,WAAW;CACX,yBAAyB;CACzB,kBAAkB;CAClB,gBAAgB;AACjB;;AAEA;;CAEC,oBAAoB;CACpB,kBAAkB;CAClB,sCAAsC;AACvC;;AAEA;CACC,gBAAgB;CAChB,kBAAkB;CAClB,sBAAsB;CACtB,yBAAyB;CACzB,oBAAoB;AACrB;;AAEA;;CAEC,gBAAgB;AACjB;;AAEA;CACC,mBAAmB;AACpB;;AAEA,WAAW,qBAAqB,EAAE,gBAAgB,EAAE;AACpD,WAAW,cAAc,EAAE,gBAAgB,EAAE;AAC7C,WAAW,oBAAoB,EAAE;;AAEjC;CACC,gBAAgB;CAChB,kBAAkB;CAClB,oBAAoB;CACpB,gBAAgB;CAChB,mCAAmC;CACnC,oBAAoB;AACrB;;;AAGA;;iEAEiE;AACjE;CACC;EACC,4BAA4B;EAC5B,WAAW;CACZ;;CAEA;EACC,kBAAkB;CACnB;;CAEA;EACC,aAAa;CACd;;CAEA;EACC,iBAAiB;EACjB,iBAAiB;CAClB;;CAEA;EACC,qCAAqC;CACtC;;CAEA;EACC,YAAY;CACb;AACD;;AAEA;CACC;EACC,0BAA0B;CAC3B;AACD","sourcesContent":["/* ============================================================\n   Design tokens\n   ============================================================ */\n:root {\n\t--bg:          #08080f;\n\t--bg-2:        #0e0e1a;\n\t--surface:     rgba(255, 255, 255, 0.04);\n\t--surface-2:   rgba(255, 255, 255, 0.07);\n\t--border:      rgba(255, 255, 255, 0.08);\n\t--border-2:    rgba(255, 255, 255, 0.14);\n\t--text-1:      #f1f5f9;\n\t--text-2:      #94a3b8;\n\t--text-3:      #64748b;\n\t--accent-1:    #818cf8;\n\t--accent-2:    #22d3ee;\n\t--success:     #4ade80;\n\t--warning:     #fbbf24;\n\t--radius-sm:   10px;\n\t--radius-md:   18px;\n\t--radius-lg:   26px;\n\t--font:        system-ui, -apple-system, \"Segoe UI\", sans-serif;\n\t--font-mono:   ui-monospace, \"Fira Code\", \"Cascadia Code\", monospace;\n}\n\n/* ============================================================\n   Reset & base\n   ============================================================ */\n*, *::before, *::after {\n\tbox-sizing: border-box;\n\tmargin: 0;\n\tpadding: 0;\n}\n\n/* Ensure [hidden] is never overridden by display declarations in this sheet */\n[hidden] { display: none !important; }\n\nhtml {\n\tscroll-behavior: smooth;\n}\n\nbody {\n\tbackground-color: var(--bg);\n\tbackground-image:\n\t\tradial-gradient(ellipse 80% 50% at 50% -20%, rgba(129, 140, 248, 0.12), transparent),\n\t\tradial-gradient(ellipse 60% 40% at 80% 80%,  rgba(34, 211, 238, 0.06),  transparent);\n\tcolor: var(--text-1);\n\tfont-family: var(--font);\n\tmin-height: 100vh;\n\tline-height: 1.6;\n\t-webkit-font-smoothing: antialiased;\n}\n\n/* ============================================================\n   Topbar (compact header)\n   ============================================================ */\n.topbar {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: space-between;\n\tgap: 1rem;\n\tpadding: 1rem 1.5rem 0.75rem;\n\tmax-width: 980px;\n\tmargin: 0 auto;\n}\n\n.topbar__left,\n.topbar__right {\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.6rem;\n\tflex: 1;\n\tmin-width: 0;\n}\n\n.topbar__right {\n\tjustify-content: flex-end;\n}\n\n.topbar__center {\n\ttext-align: center;\n\tflex: 2;\n\tmin-width: 0;\n}\n\n.topbar__title {\n\tfont-size: clamp(1rem, 3.5vw, 1.4rem);\n\tfont-weight: 800;\n\tletter-spacing: -0.02em;\n\tline-height: 1.2;\n\tmargin-bottom: 0.2rem;\n\twhite-space: nowrap;\n}\n\n.gradient-text {\n\tbackground: linear-gradient(135deg, var(--accent-1) 0%, var(--accent-2) 100%);\n\t-webkit-background-clip: text;\n\t-webkit-text-fill-color: transparent;\n\tbackground-clip: text;\n}\n\n.topbar__subtitle {\n\tfont-size: 0.72rem;\n\tcolor: var(--text-2);\n\tline-height: 1.4;\n\tmargin: 0;\n}\n\n.topbar__subtitle code {\n\tfont-family: var(--font-mono);\n\tfont-size: 0.9em;\n\tcolor: var(--accent-1);\n\tbackground: rgba(129, 140, 248, 0.1);\n\tpadding: 0.1em 0.35em;\n\tborder-radius: 3px;\n}\n\n/* Ghost install button */\n.btn--ghost {\n\tbackground: transparent;\n\tcolor: var(--text-2);\n\tborder: 1px solid var(--border-2);\n\tfont-size: 0.72rem;\n\tpadding: 0.38rem 0.8rem;\n}\n\n.btn--ghost:hover {\n\tcolor: var(--text-1);\n\tbackground: var(--surface-2);\n}\n\n.topbar__install {\n\twhite-space: nowrap;\n}\n\n/* Language toggle */\n.lang-toggle {\n\tdisplay: inline-flex;\n\talign-items: center;\n\tgap: 0;\n\tfont-size: 0.7rem;\n\tfont-weight: 700;\n\tfont-family: var(--font);\n\tletter-spacing: 0.06em;\n\tbackground: var(--surface);\n\tborder: 1px solid var(--border);\n\tborder-radius: 6px;\n\tpadding: 0.3em 0.55em;\n\tcursor: pointer;\n\tcolor: var(--text-3);\n\ttransition: background 0.15s ease, border-color 0.15s ease;\n}\n\n.lang-toggle:hover {\n\tbackground: var(--surface-2);\n\tborder-color: var(--border-2);\n}\n\n.lang-toggle__sep {\n\tmargin: 0 0.2em;\n\topacity: 0.4;\n}\n\n.lang-toggle__fi.is-active,\n.lang-toggle__en.is-active {\n\tcolor: var(--accent-1);\n}\n\n/* GitHub icon link */\n.topbar__github {\n\tcolor: var(--text-3);\n\tdisplay: flex;\n\talign-items: center;\n\ttext-decoration: none;\n\ttransition: color 0.15s ease;\n\tflex-shrink: 0;\n}\n\n.topbar__github:hover {\n\tcolor: var(--text-1);\n}\n\n/* ============================================================\n   Main layout\n   ============================================================ */\nmain {\n\tmax-width: 980px;\n\tmargin: 0 auto;\n\tpadding: 0 1.5rem 5rem;\n\tdisplay: flex;\n\tflex-direction: column;\n\tgap: 4rem;\n}\n\n/* ============================================================\n   Glass card utility\n   ============================================================ */\n.glass-card {\n\tbackground: var(--surface);\n\tborder: 1px solid var(--border);\n\tborder-radius: var(--radius-md);\n\tbackdrop-filter: blur(20px);\n\t-webkit-backdrop-filter: blur(20px);\n}\n\n/* ============================================================\n   Section header\n   ============================================================ */\n.section-header {\n\tmargin-bottom: 1.5rem;\n}\n\n.section-header h2 {\n\tfont-size: 1.5rem;\n\tfont-weight: 700;\n\tletter-spacing: -0.02em;\n\tmargin-bottom: 0.4rem;\n}\n\n.section-desc {\n\tcolor: var(--text-2);\n\tfont-size: 0.9rem;\n}\n\n/* ============================================================\n   Scanner section\n   ============================================================ */\n.scanner-card {\n\toverflow: hidden;\n\tmax-width: 480px;\n\tmargin-left: auto;\n\tmargin-right: auto;\n}\n\n.video-wrapper {\n\tposition: relative;\n\tbackground: #000;\n\tborder-radius: var(--radius-md) var(--radius-md) 0 0;\n\toverflow: hidden;\n\taspect-ratio: 4/3;\n\ttransition: box-shadow 0.25s ease;\n}\n\n.video-wrapper.detected {\n\tanimation: detectedFlash 0.65s ease-out forwards;\n}\n\n@keyframes detectedFlash {\n\t0%   {\n\t\tbox-shadow:\n\t\t\t0 0 0 4px var(--success),\n\t\t\t0 0 0 8px rgba(74, 222, 128, 0.4),\n\t\t\tinset 0 0 40px rgba(74, 222, 128, 0.18);\n\t}\n\t30%  {\n\t\tbox-shadow:\n\t\t\t0 0 0 6px var(--success),\n\t\t\t0 0 0 16px rgba(74, 222, 128, 0.25),\n\t\t\tinset 0 0 60px rgba(74, 222, 128, 0.28);\n\t}\n\t100% {\n\t\tbox-shadow:\n\t\t\t0 0 0 2px rgba(74, 222, 128, 0.2),\n\t\t\t0 0 0 4px transparent,\n\t\t\tinset 0 0 0px transparent;\n\t}\n}\n\n#barcodecamera {\n\twidth: 100%;\n\theight: 100%;\n\tobject-fit: cover;\n\tdisplay: block;\n\tborder-radius: 0;\n}\n\n/* Scan overlay */\n.scan-overlay {\n\tposition: absolute;\n\tinset: 0;\n\tpointer-events: none;\n}\n\n/* Animated scan line */\n.scan-line {\n\tposition: absolute;\n\tleft: 5%;\n\tright: 5%;\n\theight: 2px;\n\tbackground: linear-gradient(90deg, transparent, var(--accent-1), var(--accent-2), transparent);\n\ttop: 10%;\n\tborder-radius: 1px;\n\topacity: 0;\n}\n\n.scan-overlay.is-active .scan-line {\n\tanimation: scanMove 2.6s ease-in-out infinite;\n}\n\n@keyframes scanMove {\n\t0%   { top: 8%;  opacity: 0; }\n\t8%   { opacity: 1; }\n\t92%  { opacity: 1; }\n\t100% { top: 88%; opacity: 0; }\n}\n\n/* Corner brackets */\n.scan-corners {\n\tposition: absolute;\n\tinset: 12%;\n}\n\n.scan-corners span {\n\tposition: absolute;\n\twidth: 22px;\n\theight: 22px;\n\tborder-color: var(--accent-1);\n\tborder-style: solid;\n\topacity: 0;\n\ttransition: opacity 0.4s ease;\n}\n\n.scan-overlay.is-active .scan-corners span {\n\topacity: 0.7;\n}\n\n.scan-corners span:nth-child(1) { top: 0; left: 0;  border-width: 2px 0 0 2px; border-radius: 3px 0 0 0; }\n.scan-corners span:nth-child(2) { top: 0; right: 0; border-width: 2px 2px 0 0; border-radius: 0 3px 0 0; }\n.scan-corners span:nth-child(3) { bottom: 0; left: 0;  border-width: 0 0 2px 2px; border-radius: 0 0 0 3px; }\n.scan-corners span:nth-child(4) { bottom: 0; right: 0; border-width: 0 2px 2px 0; border-radius: 0 0 3px 0; }\n\n/* Status badge */\n.status-badge {\n\tposition: absolute;\n\tbottom: 1rem;\n\tleft: 50%;\n\ttransform: translateX(-50%);\n\tfont-size: 0.75rem;\n\tfont-weight: 600;\n\tletter-spacing: 0.04em;\n\tcolor: var(--text-1);\n\tbackground: rgba(8, 8, 15, 0.7);\n\tborder: 1px solid var(--border);\n\tborder-radius: 999px;\n\tpadding: 0.35em 1em;\n\twhite-space: nowrap;\n\tbackdrop-filter: blur(8px);\n\t-webkit-backdrop-filter: blur(8px);\n}\n\n/* Controls */\n.scanner-controls {\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: center;\n\tgap: 0.75rem;\n\tpadding: 1.25rem 1.5rem;\n}\n\n/* ============================================================\n   Button\n   ============================================================ */\n.btn {\n\tdisplay: inline-flex;\n\talign-items: center;\n\tgap: 0.5rem;\n\tpadding: 0.65rem 1.5rem;\n\tborder: none;\n\tborder-radius: var(--radius-sm);\n\tfont-family: var(--font);\n\tfont-size: 0.9rem;\n\tfont-weight: 600;\n\tcursor: pointer;\n\ttransition: opacity 0.2s ease, transform 0.15s ease;\n\ttext-decoration: none;\n}\n\n.btn--primary {\n\tbackground: linear-gradient(135deg, var(--accent-1) 0%, var(--accent-2) 100%);\n\tcolor: #fff;\n}\n\n.btn--primary:hover {\n\topacity: 0.88;\n\ttransform: translateY(-1px);\n}\n\n.btn--primary:active {\n\ttransform: translateY(0);\n\topacity: 0.95;\n}\n\n.btn:disabled {\n\topacity: 0.4;\n\tcursor: not-allowed;\n\ttransform: none;\n}\n\n/* Compat warning */\n.compat-warning {\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.5rem;\n\tfont-size: 0.8rem;\n\tcolor: var(--warning);\n\tbackground: rgba(251, 191, 36, 0.08);\n\tborder: 1px solid rgba(251, 191, 36, 0.2);\n\tborder-radius: var(--radius-sm);\n\tpadding: 0.6rem 1rem;\n\tmax-width: 420px;\n\ttext-align: left;\n}\n\n/* ============================================================\n   Sample barcodes — bento grid\n   ============================================================ */\n.bento-grid {\n\tdisplay: grid;\n\tgrid-template-columns: repeat(auto-fill, minmax(180px, 1fr));\n\tgap: 1rem;\n}\n\n.sample-card {\n\tpadding: 1.25rem 1rem 1rem;\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: center;\n\tgap: 0.5rem;\n\ttransition: border-color 0.2s ease, background 0.2s ease;\n}\n\n.sample-card:hover {\n\tbackground: var(--surface-2);\n\tborder-color: var(--border-2);\n}\n\n.sample-card h3 {\n\tfont-size: 0.8rem;\n\tfont-weight: 700;\n\tletter-spacing: 0.06em;\n\ttext-transform: uppercase;\n\tcolor: var(--accent-1);\n\talign-self: flex-start;\n}\n\n.sample-value {\n\tfont-family: var(--font-mono);\n\tfont-size: 0.65rem;\n\tcolor: var(--text-3);\n\tword-break: break-all;\n\ttext-align: center;\n\tline-height: 1.4;\n\talign-self: flex-start;\n}\n\n.sample-canvas-wrap {\n\twidth: 100%;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tmargin-top: 0.5rem;\n}\n\n.sample-canvas-wrap canvas,\n.sample-canvas-wrap svg {\n\tmax-width: 100%;\n\theight: auto;\n}\n\n/* ============================================================\n   Code section\n   ============================================================ */\n.code-card {\n\tposition: relative;\n\toverflow: hidden;\n}\n\n.code-card__header {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: space-between;\n\tpadding: 0.75rem 1.25rem;\n\tborder-bottom: 1px solid var(--border);\n\tbackground: rgba(255, 255, 255, 0.02);\n}\n\n.code-card__actions {\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.5rem;\n}\n\n.code-lang {\n\tfont-size: 0.7rem;\n\tfont-weight: 700;\n\tletter-spacing: 0.1em;\n\ttext-transform: uppercase;\n\tcolor: var(--text-3);\n}\n\n.copy-btn {\n\tdisplay: inline-flex;\n\talign-items: center;\n\tgap: 0.4rem;\n\tfont-size: 0.78rem;\n\tfont-weight: 600;\n\tfont-family: var(--font);\n\tcolor: var(--text-2);\n\tbackground: var(--surface-2);\n\tborder: 1px solid var(--border);\n\tborder-radius: 6px;\n\tpadding: 0.35em 0.75em;\n\tcursor: pointer;\n\ttransition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease;\n}\n\n.copy-btn:hover {\n\tcolor: var(--text-1);\n\tbackground: rgba(255, 255, 255, 0.1);\n\tborder-color: var(--border-2);\n}\n\n.copy-btn.copied {\n\tcolor: var(--success);\n\tborder-color: rgba(74, 222, 128, 0.3);\n}\n\na.copy-btn {\n\tcolor: var(--accent-1);\n\ttext-decoration: none;\n}\n\na.copy-btn:hover {\n\tcolor: var(--accent-2);\n\tbackground: rgba(129, 140, 248, 0.1);\n\tborder-color: rgba(129, 140, 248, 0.3);\n}\n\n.code-card pre {\n\toverflow-x: auto;\n\tpadding: 1.5rem;\n}\n\n.code-card code {\n\tfont-family: var(--font-mono);\n\tfont-size: 0.8rem;\n\tline-height: 1.75;\n\tcolor: #adbac7;\n\twhite-space: pre;\n\tdisplay: block;\n}\n\n/* ── Syntax highlighting ── */\n.hl-doctype    { color: #768390; font-style: italic; }\n.hl-tag-bracket{ color: #6cb6ff; }\n.hl-tag-name   { color: #7ee787; }\n.hl-attr-name  { color: #6cb6ff; }\n.hl-attr-value { color: #96d0ff; }\n.hl-keyword    { color: #f47067; }\n.hl-builtin    { color: #dcbdfb; }\n.hl-string     { color: #96d0ff; }\n.hl-number     { color: #6cb6ff; }\n.hl-comment    { color: #768390; font-style: italic; }\n\n\n/* ============================================================\n   Footer\n   ============================================================ */\n.site-footer {\n\ttext-align: center;\n\tpadding: 2rem 1.5rem 3rem;\n\tfont-size: 0.8rem;\n\tcolor: var(--text-3);\n}\n\n.site-footer a {\n\tcolor: var(--accent-1);\n\ttext-decoration: none;\n}\n\n.site-footer a:hover {\n\ttext-decoration: underline;\n}\n\n/* ============================================================\n   Snackbar\n   ============================================================ */\n.snackbar {\n\tposition: fixed;\n\tbottom: 2rem;\n\tleft: 50%;\n\ttransform: translateX(-50%) translateY(200%);\n\ttransition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n\tz-index: 100;\n\tmin-width: 280px;\n\tmax-width: min(480px, calc(100vw - 2rem));\n\tbackground: rgba(14, 14, 26, 0.95);\n\tbackdrop-filter: blur(24px);\n\t-webkit-backdrop-filter: blur(24px);\n\tborder: 1px solid rgba(129, 140, 248, 0.25);\n\tborder-radius: var(--radius-md);\n\tbox-shadow:\n\t\t0 8px 32px rgba(0, 0, 0, 0.5),\n\t\t0 0 40px rgba(129, 140, 248, 0.08);\n\toverflow: hidden;\n}\n\n.snackbar.is-visible {\n\ttransform: translateX(-50%) translateY(0);\n}\n\n.snackbar__content {\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.75rem;\n\tpadding: 0.9rem 1.25rem 0.75rem;\n}\n\n.snackbar__badge {\n\tflex-shrink: 0;\n\tfont-size: 0.62rem;\n\tfont-weight: 800;\n\ttext-transform: uppercase;\n\tletter-spacing: 0.07em;\n\tpadding: 0.22em 0.6em;\n\tborder-radius: 5px;\n\tbackground: linear-gradient(135deg, var(--accent-1), var(--accent-2));\n\tcolor: #fff;\n\twhite-space: nowrap;\n}\n\n.snackbar__value {\n\tfont-family: var(--font-mono);\n\tfont-size: 0.88rem;\n\tcolor: var(--text-1);\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\twhite-space: nowrap;\n\tflex: 1;\n}\n\n.snackbar__progress {\n\theight: 3px;\n\tbackground: linear-gradient(90deg, var(--accent-1), var(--accent-2));\n\ttransform-origin: left center;\n\ttransform: scaleX(1);\n}\n\n.snackbar.is-visible .snackbar__progress {\n\tanimation: progressShrink 4s linear forwards;\n}\n\n@keyframes progressShrink {\n\tto { transform: scaleX(0); }\n}\n\n/* ============================================================\n   Browser compatibility section\n   ============================================================ */\n.compat-grid {\n\tdisplay: grid;\n\tgrid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n\tgap: 1rem;\n\tmargin-bottom: 1.5rem;\n}\n\n.compat-card {\n\tpadding: 1.25rem;\n\tdisplay: flex;\n\tflex-direction: column;\n\tgap: 0.5rem;\n}\n\n.compat-card__browser {\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.6rem;\n\tfont-weight: 700;\n\tfont-size: 0.95rem;\n}\n\n.browser-icon {\n\twidth: 22px;\n\theight: 22px;\n\tflex-shrink: 0;\n\tcolor: var(--text-2);\n}\n\n.compat-card p {\n\tfont-size: 0.78rem;\n\tcolor: var(--text-3);\n\tline-height: 1.4;\n}\n\n.compat-badge {\n\tdisplay: inline-block;\n\tfont-size: 0.7rem;\n\tfont-weight: 700;\n\tletter-spacing: 0.05em;\n\tpadding: 0.25em 0.7em;\n\tborder-radius: 999px;\n\talign-self: flex-start;\n}\n\n.compat-badge--yes {\n\tbackground: rgba(74, 222, 128, 0.12);\n\tcolor: var(--success);\n\tborder: 1px solid rgba(74, 222, 128, 0.25);\n}\n\n.compat-badge--no {\n\tbackground: rgba(248, 113, 113, 0.1);\n\tcolor: #f87171;\n\tborder: 1px solid rgba(248, 113, 113, 0.2);\n}\n\n.compat-card--yes {\n\tborder-color: rgba(74, 222, 128, 0.12);\n}\n\n.compat-card--no {\n\tborder-color: rgba(248, 113, 113, 0.08);\n\topacity: 0.8;\n}\n\n/* Device/browser table */\n.device-table-wrap {\n\tpadding: 1.5rem;\n\toverflow-x: auto;\n}\n\n.device-table {\n\twidth: 100%;\n\tborder-collapse: collapse;\n\tfont-size: 0.85rem;\n\tmin-width: 380px;\n}\n\n.device-table th,\n.device-table td {\n\tpadding: 0.7rem 1rem;\n\ttext-align: center;\n\tborder-bottom: 1px solid var(--border);\n}\n\n.device-table th {\n\tfont-weight: 700;\n\tfont-size: 0.75rem;\n\tletter-spacing: 0.05em;\n\ttext-transform: uppercase;\n\tcolor: var(--text-2);\n}\n\n.device-table th:first-child,\n.device-table td:first-child {\n\ttext-align: left;\n}\n\n.device-table tbody tr:last-child td {\n\tborder-bottom: none;\n}\n\n.td-yes  { color: var(--success); font-weight: 700; }\n.td-no   { color: #f87171; font-weight: 700; }\n.td-na   { color: var(--text-3); }\n\n.device-table__note {\n\tmargin-top: 1rem;\n\tfont-size: 0.75rem;\n\tcolor: var(--text-3);\n\tline-height: 1.6;\n\tborder-top: 1px solid var(--border);\n\tpadding-top: 0.75rem;\n}\n\n\n/* ============================================================\n   Responsive\n   ============================================================ */\n@media (max-width: 640px) {\n\t.topbar {\n\t\tpadding: 0.75rem 1rem 0.5rem;\n\t\tgap: 0.5rem;\n\t}\n\n\t.topbar__title {\n\t\tfont-size: 0.95rem;\n\t}\n\n\t.topbar__subtitle {\n\t\tdisplay: none;\n\t}\n\n\t.video-wrapper {\n\t\taspect-ratio: 3/4;\n\t\tmax-height: 420px;\n\t}\n\n\t.bento-grid {\n\t\tgrid-template-columns: repeat(2, 1fr);\n\t}\n\n\t.snackbar {\n\t\tbottom: 1rem;\n\t}\n}\n\n@media (max-width: 400px) {\n\t.bento-grid {\n\t\tgrid-template-columns: 1fr;\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 9 */
/***/ (function(module) {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),
/* 10 */
/***/ (function(module) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),
/* 11 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var _barcodes = __webpack_require__(12);

var _barcodes2 = _interopRequireDefault(_barcodes);

var _merge = __webpack_require__(51);

var _merge2 = _interopRequireDefault(_merge);

var _linearizeEncodings = __webpack_require__(52);

var _linearizeEncodings2 = _interopRequireDefault(_linearizeEncodings);

var _fixOptions = __webpack_require__(53);

var _fixOptions2 = _interopRequireDefault(_fixOptions);

var _getRenderProperties = __webpack_require__(54);

var _getRenderProperties2 = _interopRequireDefault(_getRenderProperties);

var _optionsFromStrings = __webpack_require__(56);

var _optionsFromStrings2 = _interopRequireDefault(_optionsFromStrings);

var _ErrorHandler = __webpack_require__(64);

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

var _exceptions = __webpack_require__(63);

var _defaults = __webpack_require__(57);

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The protype of the object returned from the JsBarcode() call


// Help functions
var API = function API() {};

// The first call of the library API
// Will return an object with all barcodes calls and the data that is used
// by the renderers


// Default values


// Exceptions
// Import all the barcodes
var JsBarcode = function JsBarcode(element, text, options) {
	var api = new API();

	if (typeof element === "undefined") {
		throw Error("No element to render on was provided.");
	}

	// Variables that will be pased through the API calls
	api._renderProperties = (0, _getRenderProperties2.default)(element);
	api._encodings = [];
	api._options = _defaults2.default;
	api._errorHandler = new _ErrorHandler2.default(api);

	// If text is set, use the simple syntax (render the barcode directly)
	if (typeof text !== "undefined") {
		options = options || {};

		if (!options.format) {
			options.format = autoSelectBarcode();
		}

		api.options(options)[options.format](text, options).render();
	}

	return api;
};

// To make tests work TODO: remove
JsBarcode.getModule = function (name) {
	return _barcodes2.default[name];
};

// Register all barcodes
for (var name in _barcodes2.default) {
	if (_barcodes2.default.hasOwnProperty(name)) {
		// Security check if the propery is a prototype property
		registerBarcode(_barcodes2.default, name);
	}
}
function registerBarcode(barcodes, name) {
	API.prototype[name] = API.prototype[name.toUpperCase()] = API.prototype[name.toLowerCase()] = function (text, options) {
		var api = this;
		return api._errorHandler.wrapBarcodeCall(function () {
			// Ensure text is options.text
			options.text = typeof options.text === 'undefined' ? undefined : '' + options.text;

			var newOptions = (0, _merge2.default)(api._options, options);
			newOptions = (0, _optionsFromStrings2.default)(newOptions);
			var Encoder = barcodes[name];
			var encoded = encode(text, Encoder, newOptions);
			api._encodings.push(encoded);

			return api;
		});
	};
}

// encode() handles the Encoder call and builds the binary string to be rendered
function encode(text, Encoder, options) {
	// Ensure that text is a string
	text = "" + text;

	var encoder = new Encoder(text, options);

	// If the input is not valid for the encoder, throw error.
	// If the valid callback option is set, call it instead of throwing error
	if (!encoder.valid()) {
		throw new _exceptions.InvalidInputException(encoder.constructor.name, text);
	}

	// Make a request for the binary data (and other infromation) that should be rendered
	var encoded = encoder.encode();

	// Encodings can be nestled like [[1-1, 1-2], 2, [3-1, 3-2]
	// Convert to [1-1, 1-2, 2, 3-1, 3-2]
	encoded = (0, _linearizeEncodings2.default)(encoded);

	// Merge
	for (var i = 0; i < encoded.length; i++) {
		encoded[i].options = (0, _merge2.default)(options, encoded[i].options);
	}

	return encoded;
}

function autoSelectBarcode() {
	// If CODE128 exists. Use it
	if (_barcodes2.default["CODE128"]) {
		return "CODE128";
	}

	// Else, take the first (probably only) barcode
	return Object.keys(_barcodes2.default)[0];
}

// Sets global encoder options
// Added to the api by the JsBarcode function
API.prototype.options = function (options) {
	this._options = (0, _merge2.default)(this._options, options);
	return this;
};

// Will create a blank space (usually in between barcodes)
API.prototype.blank = function (size) {
	var zeroes = new Array(size + 1).join("0");
	this._encodings.push({ data: zeroes });
	return this;
};

// Initialize JsBarcode on all HTML elements defined.
API.prototype.init = function () {
	// Should do nothing if no elements where found
	if (!this._renderProperties) {
		return;
	}

	// Make sure renderProperies is an array
	if (!Array.isArray(this._renderProperties)) {
		this._renderProperties = [this._renderProperties];
	}

	var renderProperty;
	for (var i in this._renderProperties) {
		renderProperty = this._renderProperties[i];
		var options = (0, _merge2.default)(this._options, renderProperty.options);

		if (options.format == "auto") {
			options.format = autoSelectBarcode();
		}

		this._errorHandler.wrapBarcodeCall(function () {
			var text = options.value;
			var Encoder = _barcodes2.default[options.format.toUpperCase()];
			var encoded = encode(text, Encoder, options);

			render(renderProperty, encoded, options);
		});
	}
};

// The render API call. Calls the real render function.
API.prototype.render = function () {
	if (!this._renderProperties) {
		throw new _exceptions.NoElementException();
	}

	if (Array.isArray(this._renderProperties)) {
		for (var i = 0; i < this._renderProperties.length; i++) {
			render(this._renderProperties[i], this._encodings, this._options);
		}
	} else {
		render(this._renderProperties, this._encodings, this._options);
	}

	return this;
};

API.prototype._defaults = _defaults2.default;

// Prepares the encodings and calls the renderer
function render(renderProperties, encodings, options) {
	encodings = (0, _linearizeEncodings2.default)(encodings);

	for (var i = 0; i < encodings.length; i++) {
		encodings[i].options = (0, _merge2.default)(options, encodings[i].options);
		(0, _fixOptions2.default)(encodings[i].options);
	}

	(0, _fixOptions2.default)(options);

	var Renderer = renderProperties.renderer;
	var renderer = new Renderer(renderProperties.element, encodings, options);
	renderer.render();

	if (renderProperties.afterRender) {
		renderProperties.afterRender();
	}
}

// Export to browser
if (typeof window !== "undefined") {
	window.JsBarcode = JsBarcode;
}

// Export to jQuery
/*global jQuery */
if (typeof jQuery !== 'undefined') {
	jQuery.fn.JsBarcode = function (content, options) {
		var elementArray = [];
		jQuery(this).each(function () {
			elementArray.push(this);
		});
		return JsBarcode(elementArray, content, options);
	};
}

// Export to commonJS
module.exports = JsBarcode;

/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _CODE = __webpack_require__(13);

var _CODE2 = __webpack_require__(15);

var _EAN_UPC = __webpack_require__(23);

var _ITF = __webpack_require__(33);

var _MSI = __webpack_require__(37);

var _pharmacode = __webpack_require__(44);

var _codabar = __webpack_require__(45);

var _CODE3 = __webpack_require__(46);

var _GenericBarcode = __webpack_require__(50);

exports["default"] = {
	CODE39: _CODE.CODE39,
	CODE128: _CODE2.CODE128, CODE128A: _CODE2.CODE128A, CODE128B: _CODE2.CODE128B, CODE128C: _CODE2.CODE128C,
	EAN13: _EAN_UPC.EAN13, EAN8: _EAN_UPC.EAN8, EAN5: _EAN_UPC.EAN5, EAN2: _EAN_UPC.EAN2, UPC: _EAN_UPC.UPC, UPCE: _EAN_UPC.UPCE,
	ITF14: _ITF.ITF14,
	ITF: _ITF.ITF,
	MSI: _MSI.MSI, MSI10: _MSI.MSI10, MSI11: _MSI.MSI11, MSI1010: _MSI.MSI1010, MSI1110: _MSI.MSI1110,
	pharmacode: _pharmacode.pharmacode,
	codabar: _codabar.codabar,
	CODE93: _CODE3.CODE93, CODE93FullASCII: _CODE3.CODE93FullASCII,
	GenericBarcode: _GenericBarcode.GenericBarcode
};

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.CODE39 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Barcode2 = __webpack_require__(14);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/Code_39#Encoding

var CODE39 = function (_Barcode) {
	_inherits(CODE39, _Barcode);

	function CODE39(data, options) {
		_classCallCheck(this, CODE39);

		data = data.toUpperCase();

		// Calculate mod43 checksum if enabled
		if (options.mod43) {
			data += getCharacter(mod43checksum(data));
		}

		return _possibleConstructorReturn(this, (CODE39.__proto__ || Object.getPrototypeOf(CODE39)).call(this, data, options));
	}

	_createClass(CODE39, [{
		key: "encode",
		value: function encode() {
			// First character is always a *
			var result = getEncoding("*");

			// Take every character and add the binary representation to the result
			for (var i = 0; i < this.data.length; i++) {
				result += getEncoding(this.data[i]) + "0";
			}

			// Last character is always a *
			result += getEncoding("*");

			return {
				data: result,
				text: this.text
			};
		}
	}, {
		key: "valid",
		value: function valid() {
			return this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1;
		}
	}]);

	return CODE39;
}(_Barcode3.default);

// All characters. The position in the array is the (checksum) value


var characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "-", ".", " ", "$", "/", "+", "%", "*"];

// The decimal representation of the characters, is converted to the
// corresponding binary with the getEncoding function
var encodings = [20957, 29783, 23639, 30485, 20951, 29813, 23669, 20855, 29789, 23645, 29975, 23831, 30533, 22295, 30149, 24005, 21623, 29981, 23837, 22301, 30023, 23879, 30545, 22343, 30161, 24017, 21959, 30065, 23921, 22385, 29015, 18263, 29141, 17879, 29045, 18293, 17783, 29021, 18269, 17477, 17489, 17681, 20753, 35770];

// Get the binary representation of a character by converting the encodings
// from decimal to binary
function getEncoding(character) {
	return getBinary(characterValue(character));
}

function getBinary(characterValue) {
	return encodings[characterValue].toString(2);
}

function getCharacter(characterValue) {
	return characters[characterValue];
}

function characterValue(character) {
	return characters.indexOf(character);
}

function mod43checksum(data) {
	var checksum = 0;
	for (var i = 0; i < data.length; i++) {
		checksum += characterValue(data[i]);
	}

	checksum = checksum % 43;
	return checksum;
}

exports.CODE39 = CODE39;

/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Barcode = function Barcode(data, options) {
	_classCallCheck(this, Barcode);

	this.data = data;
	this.text = options.text || data;
	this.options = options;
};

exports["default"] = Barcode;

/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.CODE128C = exports.CODE128B = exports.CODE128A = exports.CODE128 = undefined;

var _CODE128_AUTO = __webpack_require__(16);

var _CODE128_AUTO2 = _interopRequireDefault(_CODE128_AUTO);

var _CODE128A = __webpack_require__(20);

var _CODE128A2 = _interopRequireDefault(_CODE128A);

var _CODE128B = __webpack_require__(21);

var _CODE128B2 = _interopRequireDefault(_CODE128B);

var _CODE128C = __webpack_require__(22);

var _CODE128C2 = _interopRequireDefault(_CODE128C);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.CODE128 = _CODE128_AUTO2.default;
exports.CODE128A = _CODE128A2.default;
exports.CODE128B = _CODE128B2.default;
exports.CODE128C = _CODE128C2.default;

/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _CODE2 = __webpack_require__(17);

var _CODE3 = _interopRequireDefault(_CODE2);

var _auto = __webpack_require__(19);

var _auto2 = _interopRequireDefault(_auto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CODE128AUTO = function (_CODE) {
	_inherits(CODE128AUTO, _CODE);

	function CODE128AUTO(data, options) {
		_classCallCheck(this, CODE128AUTO);

		// ASCII value ranges 0-127, 200-211
		if (/^[\x00-\x7F\xC8-\xD3]+$/.test(data)) {
			var _this = _possibleConstructorReturn(this, (CODE128AUTO.__proto__ || Object.getPrototypeOf(CODE128AUTO)).call(this, (0, _auto2.default)(data), options));
		} else {
			var _this = _possibleConstructorReturn(this, (CODE128AUTO.__proto__ || Object.getPrototypeOf(CODE128AUTO)).call(this, data, options));
		}
		return _possibleConstructorReturn(_this);
	}

	return CODE128AUTO;
}(_CODE3.default);

exports["default"] = CODE128AUTO;

/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Barcode2 = __webpack_require__(14);

var _Barcode3 = _interopRequireDefault(_Barcode2);

var _constants = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// This is the master class,
// it does require the start code to be included in the string
var CODE128 = function (_Barcode) {
	_inherits(CODE128, _Barcode);

	function CODE128(data, options) {
		_classCallCheck(this, CODE128);

		// Get array of ascii codes from data
		var _this = _possibleConstructorReturn(this, (CODE128.__proto__ || Object.getPrototypeOf(CODE128)).call(this, data.substring(1), options));

		_this.bytes = data.split('').map(function (char) {
			return char.charCodeAt(0);
		});
		return _this;
	}

	_createClass(CODE128, [{
		key: 'valid',
		value: function valid() {
			// ASCII value ranges 0-127, 200-211
			return (/^[\x00-\x7F\xC8-\xD3]+$/.test(this.data)
			);
		}

		// The public encoding function

	}, {
		key: 'encode',
		value: function encode() {
			var bytes = this.bytes;
			// Remove the start code from the bytes and set its index
			var startIndex = bytes.shift() - 105;
			// Get start set by index
			var startSet = _constants.SET_BY_CODE[startIndex];

			if (startSet === undefined) {
				throw new RangeError('The encoding does not start with a start character.');
			}

			if (this.shouldEncodeAsEan128() === true) {
				bytes.unshift(_constants.FNC1);
			}

			// Start encode with the right type
			var encodingResult = CODE128.next(bytes, 1, startSet);

			return {
				text: this.text === this.data ? this.text.replace(/[^\x20-\x7E]/g, '') : this.text,
				data:
				// Add the start bits
				CODE128.getBar(startIndex) +
				// Add the encoded bits
				encodingResult.result +
				// Add the checksum
				CODE128.getBar((encodingResult.checksum + startIndex) % _constants.MODULO) +
				// Add the end bits
				CODE128.getBar(_constants.STOP)
			};
		}

		// GS1-128/EAN-128

	}, {
		key: 'shouldEncodeAsEan128',
		value: function shouldEncodeAsEan128() {
			var isEAN128 = this.options.ean128 || false;
			if (typeof isEAN128 === 'string') {
				isEAN128 = isEAN128.toLowerCase() === 'true';
			}
			return isEAN128;
		}

		// Get a bar symbol by index

	}], [{
		key: 'getBar',
		value: function getBar(index) {
			return _constants.BARS[index] ? _constants.BARS[index].toString() : '';
		}

		// Correct an index by a set and shift it from the bytes array

	}, {
		key: 'correctIndex',
		value: function correctIndex(bytes, set) {
			if (set === _constants.SET_A) {
				var charCode = bytes.shift();
				return charCode < 32 ? charCode + 64 : charCode - 32;
			} else if (set === _constants.SET_B) {
				return bytes.shift() - 32;
			} else {
				return (bytes.shift() - 48) * 10 + bytes.shift() - 48;
			}
		}
	}, {
		key: 'next',
		value: function next(bytes, pos, set) {
			if (!bytes.length) {
				return { result: '', checksum: 0 };
			}

			var nextCode = void 0,
			    index = void 0;

			// Special characters
			if (bytes[0] >= 200) {
				index = bytes.shift() - 105;
				var nextSet = _constants.SWAP[index];

				// Swap to other set
				if (nextSet !== undefined) {
					nextCode = CODE128.next(bytes, pos + 1, nextSet);
				}
				// Continue on current set but encode a special character
				else {
						// Shift
						if ((set === _constants.SET_A || set === _constants.SET_B) && index === _constants.SHIFT) {
							// Convert the next character so that is encoded correctly
							bytes[0] = set === _constants.SET_A ? bytes[0] > 95 ? bytes[0] - 96 : bytes[0] : bytes[0] < 32 ? bytes[0] + 96 : bytes[0];
						}
						nextCode = CODE128.next(bytes, pos + 1, set);
					}
			}
			// Continue encoding
			else {
					index = CODE128.correctIndex(bytes, set);
					nextCode = CODE128.next(bytes, pos + 1, set);
				}

			// Get the correct binary encoding and calculate the weight
			var enc = CODE128.getBar(index);
			var weight = index * pos;

			return {
				result: enc + nextCode.result,
				checksum: weight + nextCode.checksum
			};
		}
	}]);

	return CODE128;
}(_Barcode3.default);

exports["default"] = CODE128;

/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _SET_BY_CODE;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// constants for internal usage
var SET_A = exports.SET_A = 0;
var SET_B = exports.SET_B = 1;
var SET_C = exports.SET_C = 2;

// Special characters
var SHIFT = exports.SHIFT = 98;
var START_A = exports.START_A = 103;
var START_B = exports.START_B = 104;
var START_C = exports.START_C = 105;
var MODULO = exports.MODULO = 103;
var STOP = exports.STOP = 106;
var FNC1 = exports.FNC1 = 207;

// Get set by start code
var SET_BY_CODE = exports.SET_BY_CODE = (_SET_BY_CODE = {}, _defineProperty(_SET_BY_CODE, START_A, SET_A), _defineProperty(_SET_BY_CODE, START_B, SET_B), _defineProperty(_SET_BY_CODE, START_C, SET_C), _SET_BY_CODE);

// Get next set by code
var SWAP = exports.SWAP = {
	101: SET_A,
	100: SET_B,
	99: SET_C
};

var A_START_CHAR = exports.A_START_CHAR = String.fromCharCode(208); // START_A + 105
var B_START_CHAR = exports.B_START_CHAR = String.fromCharCode(209); // START_B + 105
var C_START_CHAR = exports.C_START_CHAR = String.fromCharCode(210); // START_C + 105

// 128A (Code Set A)
// ASCII characters 00 to 95 (0–9, A–Z and control codes), special characters, and FNC 1–4
var A_CHARS = exports.A_CHARS = "[\x00-\x5F\xC8-\xCF]";

// 128B (Code Set B)
// ASCII characters 32 to 127 (0–9, A–Z, a–z), special characters, and FNC 1–4
var B_CHARS = exports.B_CHARS = "[\x20-\x7F\xC8-\xCF]";

// 128C (Code Set C)
// 00–99 (encodes two digits with a single code point) and FNC1
var C_CHARS = exports.C_CHARS = "(\xCF*[0-9]{2}\xCF*)";

// CODE128 includes 107 symbols:
// 103 data symbols, 3 start symbols (A, B and C), and 1 stop symbol (the last one)
// Each symbol consist of three black bars (1) and three white spaces (0).
var BARS = exports.BARS = [11011001100, 11001101100, 11001100110, 10010011000, 10010001100, 10001001100, 10011001000, 10011000100, 10001100100, 11001001000, 11001000100, 11000100100, 10110011100, 10011011100, 10011001110, 10111001100, 10011101100, 10011100110, 11001110010, 11001011100, 11001001110, 11011100100, 11001110100, 11101101110, 11101001100, 11100101100, 11100100110, 11101100100, 11100110100, 11100110010, 11011011000, 11011000110, 11000110110, 10100011000, 10001011000, 10001000110, 10110001000, 10001101000, 10001100010, 11010001000, 11000101000, 11000100010, 10110111000, 10110001110, 10001101110, 10111011000, 10111000110, 10001110110, 11101110110, 11010001110, 11000101110, 11011101000, 11011100010, 11011101110, 11101011000, 11101000110, 11100010110, 11101101000, 11101100010, 11100011010, 11101111010, 11001000010, 11110001010, 10100110000, 10100001100, 10010110000, 10010000110, 10000101100, 10000100110, 10110010000, 10110000100, 10011010000, 10011000010, 10000110100, 10000110010, 11000010010, 11001010000, 11110111010, 11000010100, 10001111010, 10100111100, 10010111100, 10010011110, 10111100100, 10011110100, 10011110010, 11110100100, 11110010100, 11110010010, 11011011110, 11011110110, 11110110110, 10101111000, 10100011110, 10001011110, 10111101000, 10111100010, 11110101000, 11110100010, 10111011110, 10111101110, 11101011110, 11110101110, 11010000100, 11010010000, 11010011100, 1100011101011];

/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _constants = __webpack_require__(18);

// Match Set functions
var matchSetALength = function matchSetALength(string) {
	return string.match(new RegExp('^' + _constants.A_CHARS + '*'))[0].length;
};
var matchSetBLength = function matchSetBLength(string) {
	return string.match(new RegExp('^' + _constants.B_CHARS + '*'))[0].length;
};
var matchSetC = function matchSetC(string) {
	return string.match(new RegExp('^' + _constants.C_CHARS + '*'))[0];
};

// CODE128A or CODE128B
function autoSelectFromAB(string, isA) {
	var ranges = isA ? _constants.A_CHARS : _constants.B_CHARS;
	var untilC = string.match(new RegExp('^(' + ranges + '+?)(([0-9]{2}){2,})([^0-9]|$)'));

	if (untilC) {
		return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length));
	}

	var chars = string.match(new RegExp('^' + ranges + '+'))[0];

	if (chars.length === string.length) {
		return string;
	}

	return chars + String.fromCharCode(isA ? 205 : 206) + autoSelectFromAB(string.substring(chars.length), !isA);
}

// CODE128C
function autoSelectFromC(string) {
	var cMatch = matchSetC(string);
	var length = cMatch.length;

	if (length === string.length) {
		return string;
	}

	string = string.substring(length);

	// Select A/B depending on the longest match
	var isA = matchSetALength(string) >= matchSetBLength(string);
	return cMatch + String.fromCharCode(isA ? 206 : 205) + autoSelectFromAB(string, isA);
}

// Detect Code Set (A, B or C) and format the string

exports["default"] = function (string) {
	var newString = void 0;
	var cLength = matchSetC(string).length;

	// Select 128C if the string start with enough digits
	if (cLength >= 2) {
		newString = _constants.C_START_CHAR + autoSelectFromC(string);
	} else {
		// Select A/B depending on the longest match
		var isA = matchSetALength(string) > matchSetBLength(string);
		newString = (isA ? _constants.A_START_CHAR : _constants.B_START_CHAR) + autoSelectFromAB(string, isA);
	}

	return newString.replace(/[\xCD\xCE]([^])[\xCD\xCE]/, // Any sequence between 205 and 206 characters
	function (match, char) {
		return String.fromCharCode(203) + char;
	});
};

/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CODE2 = __webpack_require__(17);

var _CODE3 = _interopRequireDefault(_CODE2);

var _constants = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CODE128A = function (_CODE) {
	_inherits(CODE128A, _CODE);

	function CODE128A(string, options) {
		_classCallCheck(this, CODE128A);

		return _possibleConstructorReturn(this, (CODE128A.__proto__ || Object.getPrototypeOf(CODE128A)).call(this, _constants.A_START_CHAR + string, options));
	}

	_createClass(CODE128A, [{
		key: 'valid',
		value: function valid() {
			return new RegExp('^' + _constants.A_CHARS + '+$').test(this.data);
		}
	}]);

	return CODE128A;
}(_CODE3.default);

exports["default"] = CODE128A;

/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CODE2 = __webpack_require__(17);

var _CODE3 = _interopRequireDefault(_CODE2);

var _constants = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CODE128B = function (_CODE) {
	_inherits(CODE128B, _CODE);

	function CODE128B(string, options) {
		_classCallCheck(this, CODE128B);

		return _possibleConstructorReturn(this, (CODE128B.__proto__ || Object.getPrototypeOf(CODE128B)).call(this, _constants.B_START_CHAR + string, options));
	}

	_createClass(CODE128B, [{
		key: 'valid',
		value: function valid() {
			return new RegExp('^' + _constants.B_CHARS + '+$').test(this.data);
		}
	}]);

	return CODE128B;
}(_CODE3.default);

exports["default"] = CODE128B;

/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CODE2 = __webpack_require__(17);

var _CODE3 = _interopRequireDefault(_CODE2);

var _constants = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CODE128C = function (_CODE) {
	_inherits(CODE128C, _CODE);

	function CODE128C(string, options) {
		_classCallCheck(this, CODE128C);

		return _possibleConstructorReturn(this, (CODE128C.__proto__ || Object.getPrototypeOf(CODE128C)).call(this, _constants.C_START_CHAR + string, options));
	}

	_createClass(CODE128C, [{
		key: 'valid',
		value: function valid() {
			return new RegExp('^' + _constants.C_CHARS + '+$').test(this.data);
		}
	}]);

	return CODE128C;
}(_CODE3.default);

exports["default"] = CODE128C;

/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.UPCE = exports.UPC = exports.EAN2 = exports.EAN5 = exports.EAN8 = exports.EAN13 = undefined;

var _EAN = __webpack_require__(24);

var _EAN2 = _interopRequireDefault(_EAN);

var _EAN3 = __webpack_require__(28);

var _EAN4 = _interopRequireDefault(_EAN3);

var _EAN5 = __webpack_require__(29);

var _EAN6 = _interopRequireDefault(_EAN5);

var _EAN7 = __webpack_require__(30);

var _EAN8 = _interopRequireDefault(_EAN7);

var _UPC = __webpack_require__(31);

var _UPC2 = _interopRequireDefault(_UPC);

var _UPCE = __webpack_require__(32);

var _UPCE2 = _interopRequireDefault(_UPCE);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.EAN13 = _EAN2.default;
exports.EAN8 = _EAN4.default;
exports.EAN5 = _EAN6.default;
exports.EAN2 = _EAN8.default;
exports.UPC = _UPC2.default;
exports.UPCE = _UPCE2.default;

/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _constants = __webpack_require__(25);

var _EAN2 = __webpack_require__(26);

var _EAN3 = _interopRequireDefault(_EAN2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Binary_encoding_of_data_digits_into_EAN-13_barcode

// Calculate the checksum digit
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit
var checksum = function checksum(number) {
	var res = number.substr(0, 12).split('').map(function (n) {
		return +n;
	}).reduce(function (sum, a, idx) {
		return idx % 2 ? sum + a * 3 : sum + a;
	}, 0);

	return (10 - res % 10) % 10;
};

var EAN13 = function (_EAN) {
	_inherits(EAN13, _EAN);

	function EAN13(data, options) {
		_classCallCheck(this, EAN13);

		// Add checksum if it does not exist
		if (data.search(/^[0-9]{12}$/) !== -1) {
			data += checksum(data);
		}

		// Adds a last character to the end of the barcode
		var _this = _possibleConstructorReturn(this, (EAN13.__proto__ || Object.getPrototypeOf(EAN13)).call(this, data, options));

		_this.lastChar = options.lastChar;
		return _this;
	}

	_createClass(EAN13, [{
		key: 'valid',
		value: function valid() {
			return this.data.search(/^[0-9]{13}$/) !== -1 && +this.data[12] === checksum(this.data);
		}
	}, {
		key: 'leftText',
		value: function leftText() {
			return _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'leftText', this).call(this, 1, 6);
		}
	}, {
		key: 'leftEncode',
		value: function leftEncode() {
			var data = this.data.substr(1, 6);
			var structure = _constants.EAN13_STRUCTURE[this.data[0]];
			return _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'leftEncode', this).call(this, data, structure);
		}
	}, {
		key: 'rightText',
		value: function rightText() {
			return _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'rightText', this).call(this, 7, 6);
		}
	}, {
		key: 'rightEncode',
		value: function rightEncode() {
			var data = this.data.substr(7, 6);
			return _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'rightEncode', this).call(this, data, 'RRRRRR');
		}

		// The "standard" way of printing EAN13 barcodes with guard bars

	}, {
		key: 'encodeGuarded',
		value: function encodeGuarded() {
			var data = _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'encodeGuarded', this).call(this);

			// Extend data with left digit & last character
			if (this.options.displayValue) {
				data.unshift({
					data: '000000000000',
					text: this.text.substr(0, 1),
					options: { textAlign: 'left', fontSize: this.fontSize }
				});

				if (this.options.lastChar) {
					data.push({
						data: '00'
					});
					data.push({
						data: '00000',
						text: this.options.lastChar,
						options: { fontSize: this.fontSize }
					});
				}
			}

			return data;
		}
	}]);

	return EAN13;
}(_EAN3.default);

exports["default"] = EAN13;

/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));
// Standard start end and middle bits
var SIDE_BIN = exports.SIDE_BIN = '101';
var MIDDLE_BIN = exports.MIDDLE_BIN = '01010';

var BINARIES = exports.BINARIES = {
	'L': [// The L (left) type of encoding
	'0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'],
	'G': [// The G type of encoding
	'0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111'],
	'R': [// The R (right) type of encoding
	'1110010', '1100110', '1101100', '1000010', '1011100', '1001110', '1010000', '1000100', '1001000', '1110100'],
	'O': [// The O (odd) encoding for UPC-E
	'0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'],
	'E': [// The E (even) encoding for UPC-E
	'0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111']
};

// Define the EAN-2 structure
var EAN2_STRUCTURE = exports.EAN2_STRUCTURE = ['LL', 'LG', 'GL', 'GG'];

// Define the EAN-5 structure
var EAN5_STRUCTURE = exports.EAN5_STRUCTURE = ['GGLLL', 'GLGLL', 'GLLGL', 'GLLLG', 'LGGLL', 'LLGGL', 'LLLGG', 'LGLGL', 'LGLLG', 'LLGLG'];

// Define the EAN-13 structure
var EAN13_STRUCTURE = exports.EAN13_STRUCTURE = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL'];

/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(25);

var _encoder = __webpack_require__(27);

var _encoder2 = _interopRequireDefault(_encoder);

var _Barcode2 = __webpack_require__(14);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Base class for EAN8 & EAN13
var EAN = function (_Barcode) {
	_inherits(EAN, _Barcode);

	function EAN(data, options) {
		_classCallCheck(this, EAN);

		// Make sure the font is not bigger than the space between the guard bars
		var _this = _possibleConstructorReturn(this, (EAN.__proto__ || Object.getPrototypeOf(EAN)).call(this, data, options));

		_this.fontSize = !options.flat && options.fontSize > options.width * 10 ? options.width * 10 : options.fontSize;

		// Make the guard bars go down half the way of the text
		_this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;
		return _this;
	}

	_createClass(EAN, [{
		key: 'encode',
		value: function encode() {
			return this.options.flat ? this.encodeFlat() : this.encodeGuarded();
		}
	}, {
		key: 'leftText',
		value: function leftText(from, to) {
			return this.text.substr(from, to);
		}
	}, {
		key: 'leftEncode',
		value: function leftEncode(data, structure) {
			return (0, _encoder2.default)(data, structure);
		}
	}, {
		key: 'rightText',
		value: function rightText(from, to) {
			return this.text.substr(from, to);
		}
	}, {
		key: 'rightEncode',
		value: function rightEncode(data, structure) {
			return (0, _encoder2.default)(data, structure);
		}
	}, {
		key: 'encodeGuarded',
		value: function encodeGuarded() {
			var textOptions = { fontSize: this.fontSize };
			var guardOptions = { height: this.guardHeight };

			return [{ data: _constants.SIDE_BIN, options: guardOptions }, { data: this.leftEncode(), text: this.leftText(), options: textOptions }, { data: _constants.MIDDLE_BIN, options: guardOptions }, { data: this.rightEncode(), text: this.rightText(), options: textOptions }, { data: _constants.SIDE_BIN, options: guardOptions }];
		}
	}, {
		key: 'encodeFlat',
		value: function encodeFlat() {
			var data = [_constants.SIDE_BIN, this.leftEncode(), _constants.MIDDLE_BIN, this.rightEncode(), _constants.SIDE_BIN];

			return {
				data: data.join(''),
				text: this.text
			};
		}
	}]);

	return EAN;
}(_Barcode3.default);

exports["default"] = EAN;

/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _constants = __webpack_require__(25);

// Encode data string
var encode = function encode(data, structure, separator) {
	var encoded = data.split('').map(function (val, idx) {
		return _constants.BINARIES[structure[idx]];
	}).map(function (val, idx) {
		return val ? val[data[idx]] : '';
	});

	if (separator) {
		var last = data.length - 1;
		encoded = encoded.map(function (val, idx) {
			return idx < last ? val + separator : val;
		});
	}

	return encoded.join('');
};

exports["default"] = encode;

/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _EAN2 = __webpack_require__(26);

var _EAN3 = _interopRequireDefault(_EAN2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// http://www.barcodeisland.com/ean8.phtml

// Calculate the checksum digit
var checksum = function checksum(number) {
	var res = number.substr(0, 7).split('').map(function (n) {
		return +n;
	}).reduce(function (sum, a, idx) {
		return idx % 2 ? sum + a : sum + a * 3;
	}, 0);

	return (10 - res % 10) % 10;
};

var EAN8 = function (_EAN) {
	_inherits(EAN8, _EAN);

	function EAN8(data, options) {
		_classCallCheck(this, EAN8);

		// Add checksum if it does not exist
		if (data.search(/^[0-9]{7}$/) !== -1) {
			data += checksum(data);
		}

		return _possibleConstructorReturn(this, (EAN8.__proto__ || Object.getPrototypeOf(EAN8)).call(this, data, options));
	}

	_createClass(EAN8, [{
		key: 'valid',
		value: function valid() {
			return this.data.search(/^[0-9]{8}$/) !== -1 && +this.data[7] === checksum(this.data);
		}
	}, {
		key: 'leftText',
		value: function leftText() {
			return _get(EAN8.prototype.__proto__ || Object.getPrototypeOf(EAN8.prototype), 'leftText', this).call(this, 0, 4);
		}
	}, {
		key: 'leftEncode',
		value: function leftEncode() {
			var data = this.data.substr(0, 4);
			return _get(EAN8.prototype.__proto__ || Object.getPrototypeOf(EAN8.prototype), 'leftEncode', this).call(this, data, 'LLLL');
		}
	}, {
		key: 'rightText',
		value: function rightText() {
			return _get(EAN8.prototype.__proto__ || Object.getPrototypeOf(EAN8.prototype), 'rightText', this).call(this, 4, 4);
		}
	}, {
		key: 'rightEncode',
		value: function rightEncode() {
			var data = this.data.substr(4, 4);
			return _get(EAN8.prototype.__proto__ || Object.getPrototypeOf(EAN8.prototype), 'rightEncode', this).call(this, data, 'RRRR');
		}
	}]);

	return EAN8;
}(_EAN3.default);

exports["default"] = EAN8;

/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(25);

var _encoder = __webpack_require__(27);

var _encoder2 = _interopRequireDefault(_encoder);

var _Barcode2 = __webpack_require__(14);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/EAN_5#Encoding

var checksum = function checksum(data) {
	var result = data.split('').map(function (n) {
		return +n;
	}).reduce(function (sum, a, idx) {
		return idx % 2 ? sum + a * 9 : sum + a * 3;
	}, 0);
	return result % 10;
};

var EAN5 = function (_Barcode) {
	_inherits(EAN5, _Barcode);

	function EAN5(data, options) {
		_classCallCheck(this, EAN5);

		return _possibleConstructorReturn(this, (EAN5.__proto__ || Object.getPrototypeOf(EAN5)).call(this, data, options));
	}

	_createClass(EAN5, [{
		key: 'valid',
		value: function valid() {
			return this.data.search(/^[0-9]{5}$/) !== -1;
		}
	}, {
		key: 'encode',
		value: function encode() {
			var structure = _constants.EAN5_STRUCTURE[checksum(this.data)];
			return {
				data: '1011' + (0, _encoder2.default)(this.data, structure, '01'),
				text: this.text
			};
		}
	}]);

	return EAN5;
}(_Barcode3.default);

exports["default"] = EAN5;

/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(25);

var _encoder = __webpack_require__(27);

var _encoder2 = _interopRequireDefault(_encoder);

var _Barcode2 = __webpack_require__(14);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/EAN_2#Encoding

var EAN2 = function (_Barcode) {
	_inherits(EAN2, _Barcode);

	function EAN2(data, options) {
		_classCallCheck(this, EAN2);

		return _possibleConstructorReturn(this, (EAN2.__proto__ || Object.getPrototypeOf(EAN2)).call(this, data, options));
	}

	_createClass(EAN2, [{
		key: 'valid',
		value: function valid() {
			return this.data.search(/^[0-9]{2}$/) !== -1;
		}
	}, {
		key: 'encode',
		value: function encode() {
			// Choose the structure based on the number mod 4
			var structure = _constants.EAN2_STRUCTURE[parseInt(this.data) % 4];
			return {
				// Start bits + Encode the two digits with 01 in between
				data: '1011' + (0, _encoder2.default)(this.data, structure, '01'),
				text: this.text
			};
		}
	}]);

	return EAN2;
}(_Barcode3.default);

exports["default"] = EAN2;

/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.checksum = checksum;

var _encoder = __webpack_require__(27);

var _encoder2 = _interopRequireDefault(_encoder);

var _Barcode2 = __webpack_require__(14);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/Universal_Product_Code#Encoding

var UPC = function (_Barcode) {
	_inherits(UPC, _Barcode);

	function UPC(data, options) {
		_classCallCheck(this, UPC);

		// Add checksum if it does not exist
		if (data.search(/^[0-9]{11}$/) !== -1) {
			data += checksum(data);
		}

		var _this = _possibleConstructorReturn(this, (UPC.__proto__ || Object.getPrototypeOf(UPC)).call(this, data, options));

		_this.displayValue = options.displayValue;

		// Make sure the font is not bigger than the space between the guard bars
		if (options.fontSize > options.width * 10) {
			_this.fontSize = options.width * 10;
		} else {
			_this.fontSize = options.fontSize;
		}

		// Make the guard bars go down half the way of the text
		_this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;
		return _this;
	}

	_createClass(UPC, [{
		key: "valid",
		value: function valid() {
			return this.data.search(/^[0-9]{12}$/) !== -1 && this.data[11] == checksum(this.data);
		}
	}, {
		key: "encode",
		value: function encode() {
			if (this.options.flat) {
				return this.flatEncoding();
			} else {
				return this.guardedEncoding();
			}
		}
	}, {
		key: "flatEncoding",
		value: function flatEncoding() {
			var result = "";

			result += "101";
			result += (0, _encoder2.default)(this.data.substr(0, 6), "LLLLLL");
			result += "01010";
			result += (0, _encoder2.default)(this.data.substr(6, 6), "RRRRRR");
			result += "101";

			return {
				data: result,
				text: this.text
			};
		}
	}, {
		key: "guardedEncoding",
		value: function guardedEncoding() {
			var result = [];

			// Add the first digit
			if (this.displayValue) {
				result.push({
					data: "00000000",
					text: this.text.substr(0, 1),
					options: { textAlign: "left", fontSize: this.fontSize }
				});
			}

			// Add the guard bars
			result.push({
				data: "101" + (0, _encoder2.default)(this.data[0], "L"),
				options: { height: this.guardHeight }
			});

			// Add the left side
			result.push({
				data: (0, _encoder2.default)(this.data.substr(1, 5), "LLLLL"),
				text: this.text.substr(1, 5),
				options: { fontSize: this.fontSize }
			});

			// Add the middle bits
			result.push({
				data: "01010",
				options: { height: this.guardHeight }
			});

			// Add the right side
			result.push({
				data: (0, _encoder2.default)(this.data.substr(6, 5), "RRRRR"),
				text: this.text.substr(6, 5),
				options: { fontSize: this.fontSize }
			});

			// Add the end bits
			result.push({
				data: (0, _encoder2.default)(this.data[11], "R") + "101",
				options: { height: this.guardHeight }
			});

			// Add the last digit
			if (this.displayValue) {
				result.push({
					data: "00000000",
					text: this.text.substr(11, 1),
					options: { textAlign: "right", fontSize: this.fontSize }
				});
			}

			return result;
		}
	}]);

	return UPC;
}(_Barcode3.default);

// Calulate the checksum digit
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit


function checksum(number) {
	var result = 0;

	var i;
	for (i = 1; i < 11; i += 2) {
		result += parseInt(number[i]);
	}
	for (i = 0; i < 11; i += 2) {
		result += parseInt(number[i]) * 3;
	}

	return (10 - result % 10) % 10;
}

exports["default"] = UPC;

/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _encoder = __webpack_require__(27);

var _encoder2 = _interopRequireDefault(_encoder);

var _Barcode2 = __webpack_require__(14);

var _Barcode3 = _interopRequireDefault(_Barcode2);

var _UPC = __webpack_require__(31);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/Universal_Product_Code#Encoding
//
// UPC-E documentation:
// https://en.wikipedia.org/wiki/Universal_Product_Code#UPC-E

var EXPANSIONS = ["XX00000XXX", "XX10000XXX", "XX20000XXX", "XXX00000XX", "XXXX00000X", "XXXXX00005", "XXXXX00006", "XXXXX00007", "XXXXX00008", "XXXXX00009"];

var PARITIES = [["EEEOOO", "OOOEEE"], ["EEOEOO", "OOEOEE"], ["EEOOEO", "OOEEOE"], ["EEOOOE", "OOEEEO"], ["EOEEOO", "OEOOEE"], ["EOOEEO", "OEEOOE"], ["EOOOEE", "OEEEOO"], ["EOEOEO", "OEOEOE"], ["EOEOOE", "OEOEEO"], ["EOOEOE", "OEEOEO"]];

var UPCE = function (_Barcode) {
	_inherits(UPCE, _Barcode);

	function UPCE(data, options) {
		_classCallCheck(this, UPCE);

		var _this = _possibleConstructorReturn(this, (UPCE.__proto__ || Object.getPrototypeOf(UPCE)).call(this, data, options));
		// Code may be 6 or 8 digits;
		// A 7 digit code is ambiguous as to whether the extra digit
		// is a UPC-A check or number system digit.


		_this.isValid = false;
		if (data.search(/^[0-9]{6}$/) !== -1) {
			_this.middleDigits = data;
			_this.upcA = expandToUPCA(data, "0");
			_this.text = options.text || '' + _this.upcA[0] + data + _this.upcA[_this.upcA.length - 1];
			_this.isValid = true;
		} else if (data.search(/^[01][0-9]{7}$/) !== -1) {
			_this.middleDigits = data.substring(1, data.length - 1);
			_this.upcA = expandToUPCA(_this.middleDigits, data[0]);

			if (_this.upcA[_this.upcA.length - 1] === data[data.length - 1]) {
				_this.isValid = true;
			} else {
				// checksum mismatch
				return _possibleConstructorReturn(_this);
			}
		} else {
			return _possibleConstructorReturn(_this);
		}

		_this.displayValue = options.displayValue;

		// Make sure the font is not bigger than the space between the guard bars
		if (options.fontSize > options.width * 10) {
			_this.fontSize = options.width * 10;
		} else {
			_this.fontSize = options.fontSize;
		}

		// Make the guard bars go down half the way of the text
		_this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;
		return _this;
	}

	_createClass(UPCE, [{
		key: 'valid',
		value: function valid() {
			return this.isValid;
		}
	}, {
		key: 'encode',
		value: function encode() {
			if (this.options.flat) {
				return this.flatEncoding();
			} else {
				return this.guardedEncoding();
			}
		}
	}, {
		key: 'flatEncoding',
		value: function flatEncoding() {
			var result = "";

			result += "101";
			result += this.encodeMiddleDigits();
			result += "010101";

			return {
				data: result,
				text: this.text
			};
		}
	}, {
		key: 'guardedEncoding',
		value: function guardedEncoding() {
			var result = [];

			// Add the UPC-A number system digit beneath the quiet zone
			if (this.displayValue) {
				result.push({
					data: "00000000",
					text: this.text[0],
					options: { textAlign: "left", fontSize: this.fontSize }
				});
			}

			// Add the guard bars
			result.push({
				data: "101",
				options: { height: this.guardHeight }
			});

			// Add the 6 UPC-E digits
			result.push({
				data: this.encodeMiddleDigits(),
				text: this.text.substring(1, 7),
				options: { fontSize: this.fontSize }
			});

			// Add the end bits
			result.push({
				data: "010101",
				options: { height: this.guardHeight }
			});

			// Add the UPC-A check digit beneath the quiet zone
			if (this.displayValue) {
				result.push({
					data: "00000000",
					text: this.text[7],
					options: { textAlign: "right", fontSize: this.fontSize }
				});
			}

			return result;
		}
	}, {
		key: 'encodeMiddleDigits',
		value: function encodeMiddleDigits() {
			var numberSystem = this.upcA[0];
			var checkDigit = this.upcA[this.upcA.length - 1];
			var parity = PARITIES[parseInt(checkDigit)][parseInt(numberSystem)];
			return (0, _encoder2.default)(this.middleDigits, parity);
		}
	}]);

	return UPCE;
}(_Barcode3.default);

function expandToUPCA(middleDigits, numberSystem) {
	var lastUpcE = parseInt(middleDigits[middleDigits.length - 1]);
	var expansion = EXPANSIONS[lastUpcE];

	var result = "";
	var digitIndex = 0;
	for (var i = 0; i < expansion.length; i++) {
		var c = expansion[i];
		if (c === 'X') {
			result += middleDigits[digitIndex++];
		} else {
			result += c;
		}
	}

	result = '' + numberSystem + result;
	return '' + result + (0, _UPC.checksum)(result);
}

exports["default"] = UPCE;

/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ITF14 = exports.ITF = undefined;

var _ITF = __webpack_require__(34);

var _ITF2 = _interopRequireDefault(_ITF);

var _ITF3 = __webpack_require__(36);

var _ITF4 = _interopRequireDefault(_ITF3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ITF = _ITF2.default;
exports.ITF14 = _ITF4.default;

/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(35);

var _Barcode2 = __webpack_require__(14);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ITF = function (_Barcode) {
	_inherits(ITF, _Barcode);

	function ITF() {
		_classCallCheck(this, ITF);

		return _possibleConstructorReturn(this, (ITF.__proto__ || Object.getPrototypeOf(ITF)).apply(this, arguments));
	}

	_createClass(ITF, [{
		key: 'valid',
		value: function valid() {
			return this.data.search(/^([0-9]{2})+$/) !== -1;
		}
	}, {
		key: 'encode',
		value: function encode() {
			var _this2 = this;

			// Calculate all the digit pairs
			var encoded = this.data.match(/.{2}/g).map(function (pair) {
				return _this2.encodePair(pair);
			}).join('');

			return {
				data: _constants.START_BIN + encoded + _constants.END_BIN,
				text: this.text
			};
		}

		// Calculate the data of a number pair

	}, {
		key: 'encodePair',
		value: function encodePair(pair) {
			var second = _constants.BINARIES[pair[1]];

			return _constants.BINARIES[pair[0]].split('').map(function (first, idx) {
				return (first === '1' ? '111' : '1') + (second[idx] === '1' ? '000' : '0');
			}).join('');
		}
	}]);

	return ITF;
}(_Barcode3.default);

exports["default"] = ITF;

/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));
var START_BIN = exports.START_BIN = '1010';
var END_BIN = exports.END_BIN = '11101';

var BINARIES = exports.BINARIES = ['00110', '10001', '01001', '11000', '00101', '10100', '01100', '00011', '10010', '01010'];

/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ITF2 = __webpack_require__(34);

var _ITF3 = _interopRequireDefault(_ITF2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Calculate the checksum digit
var checksum = function checksum(data) {
	var res = data.substr(0, 13).split('').map(function (num) {
		return parseInt(num, 10);
	}).reduce(function (sum, n, idx) {
		return sum + n * (3 - idx % 2 * 2);
	}, 0);

	return Math.ceil(res / 10) * 10 - res;
};

var ITF14 = function (_ITF) {
	_inherits(ITF14, _ITF);

	function ITF14(data, options) {
		_classCallCheck(this, ITF14);

		// Add checksum if it does not exist
		if (data.search(/^[0-9]{13}$/) !== -1) {
			data += checksum(data);
		}
		return _possibleConstructorReturn(this, (ITF14.__proto__ || Object.getPrototypeOf(ITF14)).call(this, data, options));
	}

	_createClass(ITF14, [{
		key: 'valid',
		value: function valid() {
			return this.data.search(/^[0-9]{14}$/) !== -1 && +this.data[13] === checksum(this.data);
		}
	}]);

	return ITF14;
}(_ITF3.default);

exports["default"] = ITF14;

/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.MSI1110 = exports.MSI1010 = exports.MSI11 = exports.MSI10 = exports.MSI = undefined;

var _MSI = __webpack_require__(38);

var _MSI2 = _interopRequireDefault(_MSI);

var _MSI3 = __webpack_require__(39);

var _MSI4 = _interopRequireDefault(_MSI3);

var _MSI5 = __webpack_require__(41);

var _MSI6 = _interopRequireDefault(_MSI5);

var _MSI7 = __webpack_require__(42);

var _MSI8 = _interopRequireDefault(_MSI7);

var _MSI9 = __webpack_require__(43);

var _MSI10 = _interopRequireDefault(_MSI9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.MSI = _MSI2.default;
exports.MSI10 = _MSI4.default;
exports.MSI11 = _MSI6.default;
exports.MSI1010 = _MSI8.default;
exports.MSI1110 = _MSI10.default;

/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Barcode2 = __webpack_require__(14);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation
// https://en.wikipedia.org/wiki/MSI_Barcode#Character_set_and_binary_lookup

var MSI = function (_Barcode) {
	_inherits(MSI, _Barcode);

	function MSI(data, options) {
		_classCallCheck(this, MSI);

		return _possibleConstructorReturn(this, (MSI.__proto__ || Object.getPrototypeOf(MSI)).call(this, data, options));
	}

	_createClass(MSI, [{
		key: "encode",
		value: function encode() {
			// Start bits
			var ret = "110";

			for (var i = 0; i < this.data.length; i++) {
				// Convert the character to binary (always 4 binary digits)
				var digit = parseInt(this.data[i]);
				var bin = digit.toString(2);
				bin = addZeroes(bin, 4 - bin.length);

				// Add 100 for every zero and 110 for every 1
				for (var b = 0; b < bin.length; b++) {
					ret += bin[b] == "0" ? "100" : "110";
				}
			}

			// End bits
			ret += "1001";

			return {
				data: ret,
				text: this.text
			};
		}
	}, {
		key: "valid",
		value: function valid() {
			return this.data.search(/^[0-9]+$/) !== -1;
		}
	}]);

	return MSI;
}(_Barcode3.default);

function addZeroes(number, n) {
	for (var i = 0; i < n; i++) {
		number = "0" + number;
	}
	return number;
}

exports["default"] = MSI;

/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _MSI2 = __webpack_require__(38);

var _MSI3 = _interopRequireDefault(_MSI2);

var _checksums = __webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MSI10 = function (_MSI) {
	_inherits(MSI10, _MSI);

	function MSI10(data, options) {
		_classCallCheck(this, MSI10);

		return _possibleConstructorReturn(this, (MSI10.__proto__ || Object.getPrototypeOf(MSI10)).call(this, data + (0, _checksums.mod10)(data), options));
	}

	return MSI10;
}(_MSI3.default);

exports["default"] = MSI10;

/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.mod10 = mod10;
exports.mod11 = mod11;
function mod10(number) {
	var sum = 0;
	for (var i = 0; i < number.length; i++) {
		var n = parseInt(number[i]);
		if ((i + number.length) % 2 === 0) {
			sum += n;
		} else {
			sum += n * 2 % 10 + Math.floor(n * 2 / 10);
		}
	}
	return (10 - sum % 10) % 10;
}

function mod11(number) {
	var sum = 0;
	var weights = [2, 3, 4, 5, 6, 7];
	for (var i = 0; i < number.length; i++) {
		var n = parseInt(number[number.length - 1 - i]);
		sum += weights[i % weights.length] * n;
	}
	return (11 - sum % 11) % 11;
}

/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _MSI2 = __webpack_require__(38);

var _MSI3 = _interopRequireDefault(_MSI2);

var _checksums = __webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MSI11 = function (_MSI) {
	_inherits(MSI11, _MSI);

	function MSI11(data, options) {
		_classCallCheck(this, MSI11);

		return _possibleConstructorReturn(this, (MSI11.__proto__ || Object.getPrototypeOf(MSI11)).call(this, data + (0, _checksums.mod11)(data), options));
	}

	return MSI11;
}(_MSI3.default);

exports["default"] = MSI11;

/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _MSI2 = __webpack_require__(38);

var _MSI3 = _interopRequireDefault(_MSI2);

var _checksums = __webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MSI1010 = function (_MSI) {
	_inherits(MSI1010, _MSI);

	function MSI1010(data, options) {
		_classCallCheck(this, MSI1010);

		data += (0, _checksums.mod10)(data);
		data += (0, _checksums.mod10)(data);
		return _possibleConstructorReturn(this, (MSI1010.__proto__ || Object.getPrototypeOf(MSI1010)).call(this, data, options));
	}

	return MSI1010;
}(_MSI3.default);

exports["default"] = MSI1010;

/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _MSI2 = __webpack_require__(38);

var _MSI3 = _interopRequireDefault(_MSI2);

var _checksums = __webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MSI1110 = function (_MSI) {
	_inherits(MSI1110, _MSI);

	function MSI1110(data, options) {
		_classCallCheck(this, MSI1110);

		data += (0, _checksums.mod11)(data);
		data += (0, _checksums.mod10)(data);
		return _possibleConstructorReturn(this, (MSI1110.__proto__ || Object.getPrototypeOf(MSI1110)).call(this, data, options));
	}

	return MSI1110;
}(_MSI3.default);

exports["default"] = MSI1110;

/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.pharmacode = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Barcode2 = __webpack_require__(14);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation
// http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf

var pharmacode = function (_Barcode) {
	_inherits(pharmacode, _Barcode);

	function pharmacode(data, options) {
		_classCallCheck(this, pharmacode);

		var _this = _possibleConstructorReturn(this, (pharmacode.__proto__ || Object.getPrototypeOf(pharmacode)).call(this, data, options));

		_this.number = parseInt(data, 10);
		return _this;
	}

	_createClass(pharmacode, [{
		key: "encode",
		value: function encode() {
			var z = this.number;
			var result = "";

			// http://i.imgur.com/RMm4UDJ.png
			// (source: http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf, page: 34)
			while (!isNaN(z) && z != 0) {
				if (z % 2 === 0) {
					// Even
					result = "11100" + result;
					z = (z - 2) / 2;
				} else {
					// Odd
					result = "100" + result;
					z = (z - 1) / 2;
				}
			}

			// Remove the two last zeroes
			result = result.slice(0, -2);

			return {
				data: result,
				text: this.text
			};
		}
	}, {
		key: "valid",
		value: function valid() {
			return this.number >= 3 && this.number <= 131070;
		}
	}]);

	return pharmacode;
}(_Barcode3.default);

exports.pharmacode = pharmacode;

/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.codabar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Barcode2 = __webpack_require__(14);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding specification:
// http://www.barcodeisland.com/codabar.phtml

var codabar = function (_Barcode) {
	_inherits(codabar, _Barcode);

	function codabar(data, options) {
		_classCallCheck(this, codabar);

		if (data.search(/^[0-9\-\$\:\.\+\/]+$/) === 0) {
			data = "A" + data + "A";
		}

		var _this = _possibleConstructorReturn(this, (codabar.__proto__ || Object.getPrototypeOf(codabar)).call(this, data.toUpperCase(), options));

		_this.text = _this.options.text || _this.text.replace(/[A-D]/g, '');
		return _this;
	}

	_createClass(codabar, [{
		key: "valid",
		value: function valid() {
			return this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/) !== -1;
		}
	}, {
		key: "encode",
		value: function encode() {
			var result = [];
			var encodings = this.getEncodings();
			for (var i = 0; i < this.data.length; i++) {
				result.push(encodings[this.data.charAt(i)]);
				// for all characters except the last, append a narrow-space ("0")
				if (i !== this.data.length - 1) {
					result.push("0");
				}
			}
			return {
				text: this.text,
				data: result.join('')
			};
		}
	}, {
		key: "getEncodings",
		value: function getEncodings() {
			return {
				"0": "101010011",
				"1": "101011001",
				"2": "101001011",
				"3": "110010101",
				"4": "101101001",
				"5": "110101001",
				"6": "100101011",
				"7": "100101101",
				"8": "100110101",
				"9": "110100101",
				"-": "101001101",
				"$": "101100101",
				":": "1101011011",
				"/": "1101101011",
				".": "1101101101",
				"+": "1011011011",
				"A": "1011001001",
				"B": "1001001011",
				"C": "1010010011",
				"D": "1010011001"
			};
		}
	}]);

	return codabar;
}(_Barcode3.default);

exports.codabar = codabar;

/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.CODE93FullASCII = exports.CODE93 = undefined;

var _CODE = __webpack_require__(47);

var _CODE2 = _interopRequireDefault(_CODE);

var _CODE93FullASCII = __webpack_require__(49);

var _CODE93FullASCII2 = _interopRequireDefault(_CODE93FullASCII);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.CODE93 = _CODE2.default;
exports.CODE93FullASCII = _CODE93FullASCII2.default;

/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(48);

var _Barcode2 = __webpack_require__(14);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/Code_93#Detailed_outline

var CODE93 = function (_Barcode) {
	_inherits(CODE93, _Barcode);

	function CODE93(data, options) {
		_classCallCheck(this, CODE93);

		return _possibleConstructorReturn(this, (CODE93.__proto__ || Object.getPrototypeOf(CODE93)).call(this, data, options));
	}

	_createClass(CODE93, [{
		key: 'valid',
		value: function valid() {
			return (/^[0-9A-Z\-. $/+%]+$/.test(this.data)
			);
		}
	}, {
		key: 'encode',
		value: function encode() {
			var symbols = this.data.split('').flatMap(function (c) {
				return _constants.MULTI_SYMBOLS[c] || c;
			});
			var encoded = symbols.map(function (s) {
				return CODE93.getEncoding(s);
			}).join('');

			// Compute checksum symbols
			var csumC = CODE93.checksum(symbols, 20);
			var csumK = CODE93.checksum(symbols.concat(csumC), 15);

			return {
				text: this.text,
				data:
				// Add the start bits
				CODE93.getEncoding('\xff') +
				// Add the encoded bits
				encoded +
				// Add the checksum
				CODE93.getEncoding(csumC) + CODE93.getEncoding(csumK) +
				// Add the stop bits
				CODE93.getEncoding('\xff') +
				// Add the termination bit
				'1'
			};
		}

		// Get the binary encoding of a symbol

	}], [{
		key: 'getEncoding',
		value: function getEncoding(symbol) {
			return _constants.BINARIES[CODE93.symbolValue(symbol)];
		}

		// Get the symbol for a symbol value

	}, {
		key: 'getSymbol',
		value: function getSymbol(symbolValue) {
			return _constants.SYMBOLS[symbolValue];
		}

		// Get the symbol value of a symbol

	}, {
		key: 'symbolValue',
		value: function symbolValue(symbol) {
			return _constants.SYMBOLS.indexOf(symbol);
		}

		// Calculate a checksum symbol

	}, {
		key: 'checksum',
		value: function checksum(symbols, maxWeight) {
			var csum = symbols.slice().reverse().reduce(function (sum, symbol, idx) {
				var weight = idx % maxWeight + 1;
				return sum + CODE93.symbolValue(symbol) * weight;
			}, 0);

			return CODE93.getSymbol(csum % 47);
		}
	}]);

	return CODE93;
}(_Barcode3.default);

exports["default"] = CODE93;

/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));
// The position in the array is the (checksum) value
var SYMBOLS = exports.SYMBOLS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '-', '.', ' ', '$', '/', '+', '%',
// Only used for csum and multi-symbols character encodings
'($)', '(%)', '(/)', '(+)',
// Start/Stop
'\xff'];

// Order matches SYMBOLS array
var BINARIES = exports.BINARIES = ['100010100', '101001000', '101000100', '101000010', '100101000', '100100100', '100100010', '101010000', '100010010', '100001010', '110101000', '110100100', '110100010', '110010100', '110010010', '110001010', '101101000', '101100100', '101100010', '100110100', '100011010', '101011000', '101001100', '101000110', '100101100', '100010110', '110110100', '110110010', '110101100', '110100110', '110010110', '110011010', '101101100', '101100110', '100110110', '100111010', '100101110', '111010100', '111010010', '111001010', '101101110', '101110110', '110101110', '100100110', '111011010', '111010110', '100110010', '101011110'];

// Multi-symbol characters (Full ASCII Code 93)
var MULTI_SYMBOLS = exports.MULTI_SYMBOLS = {
	'\x00': ['(%)', 'U'],
	'\x01': ['($)', 'A'],
	'\x02': ['($)', 'B'],
	'\x03': ['($)', 'C'],
	'\x04': ['($)', 'D'],
	'\x05': ['($)', 'E'],
	'\x06': ['($)', 'F'],
	'\x07': ['($)', 'G'],
	'\x08': ['($)', 'H'],
	'\x09': ['($)', 'I'],
	'\x0a': ['($)', 'J'],
	'\x0b': ['($)', 'K'],
	'\x0c': ['($)', 'L'],
	'\x0d': ['($)', 'M'],
	'\x0e': ['($)', 'N'],
	'\x0f': ['($)', 'O'],
	'\x10': ['($)', 'P'],
	'\x11': ['($)', 'Q'],
	'\x12': ['($)', 'R'],
	'\x13': ['($)', 'S'],
	'\x14': ['($)', 'T'],
	'\x15': ['($)', 'U'],
	'\x16': ['($)', 'V'],
	'\x17': ['($)', 'W'],
	'\x18': ['($)', 'X'],
	'\x19': ['($)', 'Y'],
	'\x1a': ['($)', 'Z'],
	'\x1b': ['(%)', 'A'],
	'\x1c': ['(%)', 'B'],
	'\x1d': ['(%)', 'C'],
	'\x1e': ['(%)', 'D'],
	'\x1f': ['(%)', 'E'],
	'!': ['(/)', 'A'],
	'"': ['(/)', 'B'],
	'#': ['(/)', 'C'],
	'&': ['(/)', 'F'],
	'\'': ['(/)', 'G'],
	'(': ['(/)', 'H'],
	')': ['(/)', 'I'],
	'*': ['(/)', 'J'],
	',': ['(/)', 'L'],
	':': ['(/)', 'Z'],
	';': ['(%)', 'F'],
	'<': ['(%)', 'G'],
	'=': ['(%)', 'H'],
	'>': ['(%)', 'I'],
	'?': ['(%)', 'J'],
	'@': ['(%)', 'V'],
	'[': ['(%)', 'K'],
	'\\': ['(%)', 'L'],
	']': ['(%)', 'M'],
	'^': ['(%)', 'N'],
	'_': ['(%)', 'O'],
	'`': ['(%)', 'W'],
	'a': ['(+)', 'A'],
	'b': ['(+)', 'B'],
	'c': ['(+)', 'C'],
	'd': ['(+)', 'D'],
	'e': ['(+)', 'E'],
	'f': ['(+)', 'F'],
	'g': ['(+)', 'G'],
	'h': ['(+)', 'H'],
	'i': ['(+)', 'I'],
	'j': ['(+)', 'J'],
	'k': ['(+)', 'K'],
	'l': ['(+)', 'L'],
	'm': ['(+)', 'M'],
	'n': ['(+)', 'N'],
	'o': ['(+)', 'O'],
	'p': ['(+)', 'P'],
	'q': ['(+)', 'Q'],
	'r': ['(+)', 'R'],
	's': ['(+)', 'S'],
	't': ['(+)', 'T'],
	'u': ['(+)', 'U'],
	'v': ['(+)', 'V'],
	'w': ['(+)', 'W'],
	'x': ['(+)', 'X'],
	'y': ['(+)', 'Y'],
	'z': ['(+)', 'Z'],
	'{': ['(%)', 'P'],
	'|': ['(%)', 'Q'],
	'}': ['(%)', 'R'],
	'~': ['(%)', 'S'],
	'\x7f': ['(%)', 'T']
};

/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CODE2 = __webpack_require__(47);

var _CODE3 = _interopRequireDefault(_CODE2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation
// https://en.wikipedia.org/wiki/Code_93#Full_ASCII_Code_93

var CODE93FullASCII = function (_CODE) {
	_inherits(CODE93FullASCII, _CODE);

	function CODE93FullASCII(data, options) {
		_classCallCheck(this, CODE93FullASCII);

		return _possibleConstructorReturn(this, (CODE93FullASCII.__proto__ || Object.getPrototypeOf(CODE93FullASCII)).call(this, data, options));
	}

	_createClass(CODE93FullASCII, [{
		key: 'valid',
		value: function valid() {
			return (/^[\x00-\x7f]+$/.test(this.data)
			);
		}
	}]);

	return CODE93FullASCII;
}(_CODE3.default);

exports["default"] = CODE93FullASCII;

/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.GenericBarcode = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Barcode2 = __webpack_require__(14);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GenericBarcode = function (_Barcode) {
	_inherits(GenericBarcode, _Barcode);

	function GenericBarcode(data, options) {
		_classCallCheck(this, GenericBarcode);

		return _possibleConstructorReturn(this, (GenericBarcode.__proto__ || Object.getPrototypeOf(GenericBarcode)).call(this, data, options)); // Sets this.data and this.text
	}

	// Return the corresponding binary numbers for the data provided


	_createClass(GenericBarcode, [{
		key: "encode",
		value: function encode() {
			return {
				data: "10101010101010101010101010101010101010101",
				text: this.text
			};
		}

		// Resturn true/false if the string provided is valid for this encoder

	}, {
		key: "valid",
		value: function valid() {
			return true;
		}
	}]);

	return GenericBarcode;
}(_Barcode3.default);

exports.GenericBarcode = GenericBarcode;

/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports["default"] = function (old, replaceObj) {
  return _extends({}, old, replaceObj);
};

/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports["default"] = linearizeEncodings;

// Encodings can be nestled like [[1-1, 1-2], 2, [3-1, 3-2]
// Convert to [1-1, 1-2, 2, 3-1, 3-2]

function linearizeEncodings(encodings) {
	var linearEncodings = [];
	function nextLevel(encoded) {
		if (Array.isArray(encoded)) {
			for (var i = 0; i < encoded.length; i++) {
				nextLevel(encoded[i]);
			}
		} else {
			encoded.text = encoded.text || "";
			encoded.data = encoded.data || "";
			linearEncodings.push(encoded);
		}
	}
	nextLevel(encodings);

	return linearEncodings;
}

/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports["default"] = fixOptions;


function fixOptions(options) {
	// Fix the margins
	options.marginTop = options.marginTop || options.margin;
	options.marginBottom = options.marginBottom || options.margin;
	options.marginRight = options.marginRight || options.margin;
	options.marginLeft = options.marginLeft || options.margin;

	return options;
}

/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* global HTMLImageElement */
/* global HTMLCanvasElement */
/* global SVGElement */

var _getOptionsFromElement = __webpack_require__(55);

var _getOptionsFromElement2 = _interopRequireDefault(_getOptionsFromElement);

var _renderers = __webpack_require__(58);

var _renderers2 = _interopRequireDefault(_renderers);

var _exceptions = __webpack_require__(63);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Takes an element and returns an object with information about how
// it should be rendered
// This could also return an array with these objects
// {
//   element: The element that the renderer should draw on
//   renderer: The name of the renderer
//   afterRender (optional): If something has to done after the renderer
//     completed, calls afterRender (function)
//   options (optional): Options that can be defined in the element
// }

function getRenderProperties(element) {
	// If the element is a string, query select call again
	if (typeof element === "string") {
		return querySelectedRenderProperties(element);
	}
	// If element is array. Recursivly call with every object in the array
	else if (Array.isArray(element)) {
			var returnArray = [];
			for (var i = 0; i < element.length; i++) {
				returnArray.push(getRenderProperties(element[i]));
			}
			return returnArray;
		}
		// If element, render on canvas and set the uri as src
		else if (typeof HTMLCanvasElement !== 'undefined' && element instanceof HTMLImageElement) {
				return newCanvasRenderProperties(element);
			}
			// If SVG
			else if (element && element.nodeName && element.nodeName.toLowerCase() === 'svg' || typeof SVGElement !== 'undefined' && element instanceof SVGElement) {
					return {
						element: element,
						options: (0, _getOptionsFromElement2.default)(element),
						renderer: _renderers2.default.SVGRenderer
					};
				}
				// If canvas (in browser)
				else if (typeof HTMLCanvasElement !== 'undefined' && element instanceof HTMLCanvasElement) {
						return {
							element: element,
							options: (0, _getOptionsFromElement2.default)(element),
							renderer: _renderers2.default.CanvasRenderer
						};
					}
					// If canvas (in node)
					else if (element && element.getContext) {
							return {
								element: element,
								renderer: _renderers2.default.CanvasRenderer
							};
						} else if (element && (typeof element === "undefined" ? "undefined" : _typeof(element)) === 'object' && !element.nodeName) {
							return {
								element: element,
								renderer: _renderers2.default.ObjectRenderer
							};
						} else {
							throw new _exceptions.InvalidElementException();
						}
}

function querySelectedRenderProperties(string) {
	var selector = document.querySelectorAll(string);
	if (selector.length === 0) {
		return undefined;
	} else {
		var returnArray = [];
		for (var i = 0; i < selector.length; i++) {
			returnArray.push(getRenderProperties(selector[i]));
		}
		return returnArray;
	}
}

function newCanvasRenderProperties(imgElement) {
	var canvas = document.createElement('canvas');
	return {
		element: canvas,
		options: (0, _getOptionsFromElement2.default)(imgElement),
		renderer: _renderers2.default.CanvasRenderer,
		afterRender: function afterRender() {
			imgElement.setAttribute("src", canvas.toDataURL());
		}
	};
}

exports["default"] = getRenderProperties;

/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _optionsFromStrings = __webpack_require__(56);

var _optionsFromStrings2 = _interopRequireDefault(_optionsFromStrings);

var _defaults = __webpack_require__(57);

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOptionsFromElement(element) {
	var options = {};
	for (var property in _defaults2.default) {
		if (_defaults2.default.hasOwnProperty(property)) {
			// jsbarcode-*
			if (element.hasAttribute("jsbarcode-" + property.toLowerCase())) {
				options[property] = element.getAttribute("jsbarcode-" + property.toLowerCase());
			}

			// data-*
			if (element.hasAttribute("data-" + property.toLowerCase())) {
				options[property] = element.getAttribute("data-" + property.toLowerCase());
			}
		}
	}

	options["value"] = element.getAttribute("jsbarcode-value") || element.getAttribute("data-value");

	// Since all atributes are string they need to be converted to integers
	options = (0, _optionsFromStrings2.default)(options);

	return options;
}

exports["default"] = getOptionsFromElement;

/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports["default"] = optionsFromStrings;

// Convert string to integers/booleans where it should be

function optionsFromStrings(options) {
	var intOptions = ["width", "height", "textMargin", "fontSize", "margin", "marginTop", "marginBottom", "marginLeft", "marginRight"];

	for (var intOption in intOptions) {
		if (intOptions.hasOwnProperty(intOption)) {
			intOption = intOptions[intOption];
			if (typeof options[intOption] === "string") {
				options[intOption] = parseInt(options[intOption], 10);
			}
		}
	}

	if (typeof options["displayValue"] === "string") {
		options["displayValue"] = options["displayValue"] != "false";
	}

	return options;
}

/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));
var defaults = {
	width: 2,
	height: 100,
	format: "auto",
	displayValue: true,
	fontOptions: "",
	font: "monospace",
	text: undefined,
	textAlign: "center",
	textPosition: "bottom",
	textMargin: 2,
	fontSize: 20,
	background: "#ffffff",
	lineColor: "#000000",
	margin: 10,
	marginTop: undefined,
	marginBottom: undefined,
	marginLeft: undefined,
	marginRight: undefined,
	valid: function valid() {}
};

exports["default"] = defaults;

/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _canvas = __webpack_require__(59);

var _canvas2 = _interopRequireDefault(_canvas);

var _svg = __webpack_require__(61);

var _svg2 = _interopRequireDefault(_svg);

var _object = __webpack_require__(62);

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["default"] = { CanvasRenderer: _canvas2.default, SVGRenderer: _svg2.default, ObjectRenderer: _object2.default };

/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _merge = __webpack_require__(51);

var _merge2 = _interopRequireDefault(_merge);

var _shared = __webpack_require__(60);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CanvasRenderer = function () {
	function CanvasRenderer(canvas, encodings, options) {
		_classCallCheck(this, CanvasRenderer);

		this.canvas = canvas;
		this.encodings = encodings;
		this.options = options;
	}

	_createClass(CanvasRenderer, [{
		key: "render",
		value: function render() {
			// Abort if the browser does not support HTML5 canvas
			if (!this.canvas.getContext) {
				throw new Error('The browser does not support canvas.');
			}

			this.prepareCanvas();
			for (var i = 0; i < this.encodings.length; i++) {
				var encodingOptions = (0, _merge2.default)(this.options, this.encodings[i].options);

				this.drawCanvasBarcode(encodingOptions, this.encodings[i]);
				this.drawCanvasText(encodingOptions, this.encodings[i]);

				this.moveCanvasDrawing(this.encodings[i]);
			}

			this.restoreCanvas();
		}
	}, {
		key: "prepareCanvas",
		value: function prepareCanvas() {
			// Get the canvas context
			var ctx = this.canvas.getContext("2d");

			ctx.save();

			(0, _shared.calculateEncodingAttributes)(this.encodings, this.options, ctx);
			var totalWidth = (0, _shared.getTotalWidthOfEncodings)(this.encodings);
			var maxHeight = (0, _shared.getMaximumHeightOfEncodings)(this.encodings);

			this.canvas.width = totalWidth + this.options.marginLeft + this.options.marginRight;

			this.canvas.height = maxHeight;

			// Paint the canvas
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			if (this.options.background) {
				ctx.fillStyle = this.options.background;
				ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
			}

			ctx.translate(this.options.marginLeft, 0);
		}
	}, {
		key: "drawCanvasBarcode",
		value: function drawCanvasBarcode(options, encoding) {
			// Get the canvas context
			var ctx = this.canvas.getContext("2d");

			var binary = encoding.data;

			// Creates the barcode out of the encoded binary
			var yFrom;
			if (options.textPosition == "top") {
				yFrom = options.marginTop + options.fontSize + options.textMargin;
			} else {
				yFrom = options.marginTop;
			}

			ctx.fillStyle = options.lineColor;

			for (var b = 0; b < binary.length; b++) {
				var x = b * options.width + encoding.barcodePadding;

				if (binary[b] === "1") {
					ctx.fillRect(x, yFrom, options.width, options.height);
				} else if (binary[b]) {
					ctx.fillRect(x, yFrom, options.width, options.height * binary[b]);
				}
			}
		}
	}, {
		key: "drawCanvasText",
		value: function drawCanvasText(options, encoding) {
			// Get the canvas context
			var ctx = this.canvas.getContext("2d");

			var font = options.fontOptions + " " + options.fontSize + "px " + options.font;

			// Draw the text if displayValue is set
			if (options.displayValue) {
				var x, y;

				if (options.textPosition == "top") {
					y = options.marginTop + options.fontSize - options.textMargin;
				} else {
					y = options.height + options.textMargin + options.marginTop + options.fontSize;
				}

				ctx.font = font;

				// Draw the text in the correct X depending on the textAlign option
				if (options.textAlign == "left" || encoding.barcodePadding > 0) {
					x = 0;
					ctx.textAlign = 'left';
				} else if (options.textAlign == "right") {
					x = encoding.width - 1;
					ctx.textAlign = 'right';
				}
				// In all other cases, center the text
				else {
						x = encoding.width / 2;
						ctx.textAlign = 'center';
					}

				ctx.fillText(encoding.text, x, y);
			}
		}
	}, {
		key: "moveCanvasDrawing",
		value: function moveCanvasDrawing(encoding) {
			var ctx = this.canvas.getContext("2d");

			ctx.translate(encoding.width, 0);
		}
	}, {
		key: "restoreCanvas",
		value: function restoreCanvas() {
			// Get the canvas context
			var ctx = this.canvas.getContext("2d");

			ctx.restore();
		}
	}]);

	return CanvasRenderer;
}();

exports["default"] = CanvasRenderer;

/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.getTotalWidthOfEncodings = exports.calculateEncodingAttributes = exports.getBarcodePadding = exports.getEncodingHeight = exports.getMaximumHeightOfEncodings = undefined;

var _merge = __webpack_require__(51);

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEncodingHeight(encoding, options) {
	return options.height + (options.displayValue && encoding.text.length > 0 ? options.fontSize + options.textMargin : 0) + options.marginTop + options.marginBottom;
}

function getBarcodePadding(textWidth, barcodeWidth, options) {
	if (options.displayValue && barcodeWidth < textWidth) {
		if (options.textAlign == "center") {
			return Math.floor((textWidth - barcodeWidth) / 2);
		} else if (options.textAlign == "left") {
			return 0;
		} else if (options.textAlign == "right") {
			return Math.floor(textWidth - barcodeWidth);
		}
	}
	return 0;
}

function calculateEncodingAttributes(encodings, barcodeOptions, context) {
	for (var i = 0; i < encodings.length; i++) {
		var encoding = encodings[i];
		var options = (0, _merge2.default)(barcodeOptions, encoding.options);

		// Calculate the width of the encoding
		var textWidth;
		if (options.displayValue) {
			textWidth = messureText(encoding.text, options, context);
		} else {
			textWidth = 0;
		}

		var barcodeWidth = encoding.data.length * options.width;
		encoding.width = Math.ceil(Math.max(textWidth, barcodeWidth));

		encoding.height = getEncodingHeight(encoding, options);

		encoding.barcodePadding = getBarcodePadding(textWidth, barcodeWidth, options);
	}
}

function getTotalWidthOfEncodings(encodings) {
	var totalWidth = 0;
	for (var i = 0; i < encodings.length; i++) {
		totalWidth += encodings[i].width;
	}
	return totalWidth;
}

function getMaximumHeightOfEncodings(encodings) {
	var maxHeight = 0;
	for (var i = 0; i < encodings.length; i++) {
		if (encodings[i].height > maxHeight) {
			maxHeight = encodings[i].height;
		}
	}
	return maxHeight;
}

function messureText(string, options, context) {
	var ctx;

	if (context) {
		ctx = context;
	} else if (typeof document !== "undefined") {
		ctx = document.createElement("canvas").getContext("2d");
	} else {
		// If the text cannot be messured we will return 0.
		// This will make some barcode with big text render incorrectly
		return 0;
	}
	ctx.font = options.fontOptions + " " + options.fontSize + "px " + options.font;

	// Calculate the width of the encoding
	var measureTextResult = ctx.measureText(string);
	if (!measureTextResult) {
		// Some implementations don't implement measureText and return undefined.
		// If the text cannot be measured we will return 0.
		// This will make some barcode with big text render incorrectly
		return 0;
	}
	var size = measureTextResult.width;
	return size;
}

exports.getMaximumHeightOfEncodings = getMaximumHeightOfEncodings;
exports.getEncodingHeight = getEncodingHeight;
exports.getBarcodePadding = getBarcodePadding;
exports.calculateEncodingAttributes = calculateEncodingAttributes;
exports.getTotalWidthOfEncodings = getTotalWidthOfEncodings;

/***/ }),
/* 61 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _merge = __webpack_require__(51);

var _merge2 = _interopRequireDefault(_merge);

var _shared = __webpack_require__(60);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var svgns = "http://www.w3.org/2000/svg";

var SVGRenderer = function () {
	function SVGRenderer(svg, encodings, options) {
		_classCallCheck(this, SVGRenderer);

		this.svg = svg;
		this.encodings = encodings;
		this.options = options;
		this.document = options.xmlDocument || document;
	}

	_createClass(SVGRenderer, [{
		key: "render",
		value: function render() {
			var currentX = this.options.marginLeft;

			this.prepareSVG();
			for (var i = 0; i < this.encodings.length; i++) {
				var encoding = this.encodings[i];
				var encodingOptions = (0, _merge2.default)(this.options, encoding.options);

				var group = this.createGroup(currentX, encodingOptions.marginTop, this.svg);

				this.setGroupOptions(group, encodingOptions);

				this.drawSvgBarcode(group, encodingOptions, encoding);
				this.drawSVGText(group, encodingOptions, encoding);

				currentX += encoding.width;
			}
		}
	}, {
		key: "prepareSVG",
		value: function prepareSVG() {
			// Clear the SVG
			while (this.svg.firstChild) {
				this.svg.removeChild(this.svg.firstChild);
			}

			(0, _shared.calculateEncodingAttributes)(this.encodings, this.options);
			var totalWidth = (0, _shared.getTotalWidthOfEncodings)(this.encodings);
			var maxHeight = (0, _shared.getMaximumHeightOfEncodings)(this.encodings);

			var width = totalWidth + this.options.marginLeft + this.options.marginRight;
			this.setSvgAttributes(width, maxHeight);

			if (this.options.background) {
				this.drawRect(0, 0, width, maxHeight, this.svg).setAttribute("fill", this.options.background);
			}
		}
	}, {
		key: "drawSvgBarcode",
		value: function drawSvgBarcode(parent, options, encoding) {
			var binary = encoding.data;

			// Creates the barcode out of the encoded binary
			var yFrom;
			if (options.textPosition == "top") {
				yFrom = options.fontSize + options.textMargin;
			} else {
				yFrom = 0;
			}

			var barWidth = 0;
			var x = 0;
			for (var b = 0; b < binary.length; b++) {
				x = b * options.width + encoding.barcodePadding;

				if (binary[b] === "1") {
					barWidth++;
				} else if (barWidth > 0) {
					this.drawRect(x - options.width * barWidth, yFrom, options.width * barWidth, options.height, parent);
					barWidth = 0;
				}
			}

			// Last draw is needed since the barcode ends with 1
			if (barWidth > 0) {
				this.drawRect(x - options.width * (barWidth - 1), yFrom, options.width * barWidth, options.height, parent);
			}
		}
	}, {
		key: "drawSVGText",
		value: function drawSVGText(parent, options, encoding) {
			var textElem = this.document.createElementNS(svgns, 'text');

			// Draw the text if displayValue is set
			if (options.displayValue) {
				var x, y;

				textElem.setAttribute("font-family", options.font);
				textElem.setAttribute("font-size", options.fontSize);
				if (options.fontOptions.includes("bold")) {
					textElem.setAttribute("font-weight", "bold");
				}
				if (options.fontOptions.includes("italic")) {
					textElem.setAttribute("font-style", "italic");
				}

				if (options.textPosition == "top") {
					y = options.fontSize - options.textMargin;
				} else {
					y = options.height + options.textMargin + options.fontSize;
				}

				// Draw the text in the correct X depending on the textAlign option
				if (options.textAlign == "left" || encoding.barcodePadding > 0) {
					x = 0;
					textElem.setAttribute("text-anchor", "start");
				} else if (options.textAlign == "right") {
					x = encoding.width - 1;
					textElem.setAttribute("text-anchor", "end");
				}
				// In all other cases, center the text
				else {
						x = encoding.width / 2;
						textElem.setAttribute("text-anchor", "middle");
					}

				textElem.setAttribute("x", x);
				textElem.setAttribute("y", y);

				textElem.appendChild(this.document.createTextNode(encoding.text));

				parent.appendChild(textElem);
			}
		}
	}, {
		key: "setSvgAttributes",
		value: function setSvgAttributes(width, height) {
			var svg = this.svg;
			svg.setAttribute("width", width + "px");
			svg.setAttribute("height", height + "px");
			svg.setAttribute("x", "0px");
			svg.setAttribute("y", "0px");
			svg.setAttribute("viewBox", "0 0 " + width + " " + height);

			svg.setAttribute("xmlns", svgns);
			svg.setAttribute("version", "1.1");
		}
	}, {
		key: "createGroup",
		value: function createGroup(x, y, parent) {
			var group = this.document.createElementNS(svgns, 'g');
			group.setAttribute("transform", "translate(" + x + ", " + y + ")");

			parent.appendChild(group);

			return group;
		}
	}, {
		key: "setGroupOptions",
		value: function setGroupOptions(group, options) {
			group.setAttribute("fill", options.lineColor);
		}
	}, {
		key: "drawRect",
		value: function drawRect(x, y, width, height, parent) {
			var rect = this.document.createElementNS(svgns, 'rect');

			rect.setAttribute("x", x);
			rect.setAttribute("y", y);
			rect.setAttribute("width", width);
			rect.setAttribute("height", height);

			parent.appendChild(rect);

			return rect;
		}
	}]);

	return SVGRenderer;
}();

exports["default"] = SVGRenderer;

/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectRenderer = function () {
	function ObjectRenderer(object, encodings, options) {
		_classCallCheck(this, ObjectRenderer);

		this.object = object;
		this.encodings = encodings;
		this.options = options;
	}

	_createClass(ObjectRenderer, [{
		key: "render",
		value: function render() {
			this.object.encodings = this.encodings;
		}
	}]);

	return ObjectRenderer;
}();

exports["default"] = ObjectRenderer;

/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InvalidInputException = function (_Error) {
	_inherits(InvalidInputException, _Error);

	function InvalidInputException(symbology, input) {
		_classCallCheck(this, InvalidInputException);

		var _this = _possibleConstructorReturn(this, (InvalidInputException.__proto__ || Object.getPrototypeOf(InvalidInputException)).call(this));

		_this.name = "InvalidInputException";

		_this.symbology = symbology;
		_this.input = input;

		_this.message = '"' + _this.input + '" is not a valid input for ' + _this.symbology;
		return _this;
	}

	return InvalidInputException;
}(Error);

var InvalidElementException = function (_Error2) {
	_inherits(InvalidElementException, _Error2);

	function InvalidElementException() {
		_classCallCheck(this, InvalidElementException);

		var _this2 = _possibleConstructorReturn(this, (InvalidElementException.__proto__ || Object.getPrototypeOf(InvalidElementException)).call(this));

		_this2.name = "InvalidElementException";
		_this2.message = "Not supported type to render on";
		return _this2;
	}

	return InvalidElementException;
}(Error);

var NoElementException = function (_Error3) {
	_inherits(NoElementException, _Error3);

	function NoElementException() {
		_classCallCheck(this, NoElementException);

		var _this3 = _possibleConstructorReturn(this, (NoElementException.__proto__ || Object.getPrototypeOf(NoElementException)).call(this));

		_this3.name = "NoElementException";
		_this3.message = "No element to render on.";
		return _this3;
	}

	return NoElementException;
}(Error);

exports.InvalidInputException = InvalidInputException;
exports.InvalidElementException = InvalidElementException;
exports.NoElementException = NoElementException;

/***/ }),
/* 64 */
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*eslint no-console: 0 */

var ErrorHandler = function () {
	function ErrorHandler(api) {
		_classCallCheck(this, ErrorHandler);

		this.api = api;
	}

	_createClass(ErrorHandler, [{
		key: "handleCatch",
		value: function handleCatch(e) {
			// If babel supported extending of Error in a correct way instanceof would be used here
			if (e.name === "InvalidInputException") {
				if (this.api._options.valid !== this.api._defaults.valid) {
					this.api._options.valid(false);
				} else {
					throw e.message;
				}
			} else {
				throw e;
			}

			this.api.render = function () {};
		}
	}, {
		key: "wrapBarcodeCall",
		value: function wrapBarcodeCall(func) {
			try {
				var result = func.apply(undefined, arguments);
				this.api._options.valid(true);
				return result;
			} catch (e) {
				this.handleCatch(e);

				return this.api;
			}
		}
	}]);

	return ErrorHandler;
}();

exports["default"] = ErrorHandler;

/***/ }),
/* 65 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


const canPromise = __webpack_require__(66)

const QRCode = __webpack_require__(67)
const CanvasRenderer = __webpack_require__(90)
const SvgRenderer = __webpack_require__(92)

function renderCanvas (renderFunc, canvas, text, opts, cb) {
  const args = [].slice.call(arguments, 1)
  const argsNum = args.length
  const isLastArgCb = typeof args[argsNum - 1] === 'function'

  if (!isLastArgCb && !canPromise()) {
    throw new Error('Callback required as last argument')
  }

  if (isLastArgCb) {
    if (argsNum < 2) {
      throw new Error('Too few arguments provided')
    }

    if (argsNum === 2) {
      cb = text
      text = canvas
      canvas = opts = undefined
    } else if (argsNum === 3) {
      if (canvas.getContext && typeof cb === 'undefined') {
        cb = opts
        opts = undefined
      } else {
        cb = opts
        opts = text
        text = canvas
        canvas = undefined
      }
    }
  } else {
    if (argsNum < 1) {
      throw new Error('Too few arguments provided')
    }

    if (argsNum === 1) {
      text = canvas
      canvas = opts = undefined
    } else if (argsNum === 2 && !canvas.getContext) {
      opts = text
      text = canvas
      canvas = undefined
    }

    return new Promise(function (resolve, reject) {
      try {
        const data = QRCode.create(text, opts)
        resolve(renderFunc(data, canvas, opts))
      } catch (e) {
        reject(e)
      }
    })
  }

  try {
    const data = QRCode.create(text, opts)
    cb(null, renderFunc(data, canvas, opts))
  } catch (e) {
    cb(e)
  }
}

exports.create = QRCode.create
exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render)
exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL)

// only svg for now.
exports.toString = renderCanvas.bind(null, function (data, _, opts) {
  return SvgRenderer.render(data, opts)
})


/***/ }),
/* 66 */
/***/ (function(module) {

// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157

module.exports = function () {
  return typeof Promise === 'function' && Promise.prototype && Promise.prototype.then
}


/***/ }),
/* 67 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

const Utils = __webpack_require__(68)
const ECLevel = __webpack_require__(69)
const BitBuffer = __webpack_require__(70)
const BitMatrix = __webpack_require__(71)
const AlignmentPattern = __webpack_require__(72)
const FinderPattern = __webpack_require__(73)
const MaskPattern = __webpack_require__(74)
const ECCode = __webpack_require__(75)
const ReedSolomonEncoder = __webpack_require__(76)
const Version = __webpack_require__(79)
const FormatInfo = __webpack_require__(83)
const Mode = __webpack_require__(80)
const Segments = __webpack_require__(84)

/**
 * QRCode for JavaScript
 *
 * modified by Ryan Day for nodejs support
 * Copyright (c) 2011 Ryan Day
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
*/

/**
 * Add finder patterns bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupFinderPattern (matrix, version) {
  const size = matrix.size
  const pos = FinderPattern.getPositions(version)

  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0]
    const col = pos[i][1]

    for (let r = -1; r <= 7; r++) {
      if (row + r <= -1 || size <= row + r) continue

      for (let c = -1; c <= 7; c++) {
        if (col + c <= -1 || size <= col + c) continue

        if ((r >= 0 && r <= 6 && (c === 0 || c === 6)) ||
          (c >= 0 && c <= 6 && (r === 0 || r === 6)) ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          matrix.set(row + r, col + c, true, true)
        } else {
          matrix.set(row + r, col + c, false, true)
        }
      }
    }
  }
}

/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */
function setupTimingPattern (matrix) {
  const size = matrix.size

  for (let r = 8; r < size - 8; r++) {
    const value = r % 2 === 0
    matrix.set(r, 6, value, true)
    matrix.set(6, r, value, true)
  }
}

/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupAlignmentPattern (matrix, version) {
  const pos = AlignmentPattern.getPositions(version)

  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0]
    const col = pos[i][1]

    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        if (r === -2 || r === 2 || c === -2 || c === 2 ||
          (r === 0 && c === 0)) {
          matrix.set(row + r, col + c, true, true)
        } else {
          matrix.set(row + r, col + c, false, true)
        }
      }
    }
  }
}

/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupVersionInfo (matrix, version) {
  const size = matrix.size
  const bits = Version.getEncodedBits(version)
  let row, col, mod

  for (let i = 0; i < 18; i++) {
    row = Math.floor(i / 3)
    col = i % 3 + size - 8 - 3
    mod = ((bits >> i) & 1) === 1

    matrix.set(row, col, mod, true)
    matrix.set(col, row, mod, true)
  }
}

/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */
function setupFormatInfo (matrix, errorCorrectionLevel, maskPattern) {
  const size = matrix.size
  const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern)
  let i, mod

  for (i = 0; i < 15; i++) {
    mod = ((bits >> i) & 1) === 1

    // vertical
    if (i < 6) {
      matrix.set(i, 8, mod, true)
    } else if (i < 8) {
      matrix.set(i + 1, 8, mod, true)
    } else {
      matrix.set(size - 15 + i, 8, mod, true)
    }

    // horizontal
    if (i < 8) {
      matrix.set(8, size - i - 1, mod, true)
    } else if (i < 9) {
      matrix.set(8, 15 - i - 1 + 1, mod, true)
    } else {
      matrix.set(8, 15 - i - 1, mod, true)
    }
  }

  // fixed module
  matrix.set(size - 8, 8, 1, true)
}

/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix}  matrix Modules matrix
 * @param  {Uint8Array} data   Data codewords
 */
function setupData (matrix, data) {
  const size = matrix.size
  let inc = -1
  let row = size - 1
  let bitIndex = 7
  let byteIndex = 0

  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6) col--

    while (true) {
      for (let c = 0; c < 2; c++) {
        if (!matrix.isReserved(row, col - c)) {
          let dark = false

          if (byteIndex < data.length) {
            dark = (((data[byteIndex] >>> bitIndex) & 1) === 1)
          }

          matrix.set(row, col - c, dark)
          bitIndex--

          if (bitIndex === -1) {
            byteIndex++
            bitIndex = 7
          }
        }
      }

      row += inc

      if (row < 0 || size <= row) {
        row -= inc
        inc = -inc
        break
      }
    }
  }
}

/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Uint8Array}                    Buffer containing encoded codewords
 */
function createData (version, errorCorrectionLevel, segments) {
  // Prepare data buffer
  const buffer = new BitBuffer()

  segments.forEach(function (data) {
    // prefix data with mode indicator (4 bits)
    buffer.put(data.mode.bit, 4)

    // Prefix data with character count indicator.
    // The character count indicator is a string of bits that represents the
    // number of characters that are being encoded.
    // The character count indicator must be placed after the mode indicator
    // and must be a certain number of bits long, depending on the QR version
    // and data mode
    // @see {@link Mode.getCharCountIndicator}.
    buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version))

    // add binary data sequence to buffer
    data.write(buffer)
  })

  // Calculate required number of bits
  const totalCodewords = Utils.getSymbolTotalCodewords(version)
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel)
  const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8

  // Add a terminator.
  // If the bit string is shorter than the total number of required bits,
  // a terminator of up to four 0s must be added to the right side of the string.
  // If the bit string is more than four bits shorter than the required number of bits,
  // add four 0s to the end.
  if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
    buffer.put(0, 4)
  }

  // If the bit string is fewer than four bits shorter, add only the number of 0s that
  // are needed to reach the required number of bits.

  // After adding the terminator, if the number of bits in the string is not a multiple of 8,
  // pad the string on the right with 0s to make the string's length a multiple of 8.
  while (buffer.getLengthInBits() % 8 !== 0) {
    buffer.putBit(0)
  }

  // Add pad bytes if the string is still shorter than the total number of required bits.
  // Extend the buffer to fill the data capacity of the symbol corresponding to
  // the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
  // and 00010001 (0x11) alternately.
  const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8
  for (let i = 0; i < remainingByte; i++) {
    buffer.put(i % 2 ? 0x11 : 0xEC, 8)
  }

  return createCodewords(buffer, version, errorCorrectionLevel)
}

/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Uint8Array}                     Buffer containing encoded codewords
 */
function createCodewords (bitBuffer, version, errorCorrectionLevel) {
  // Total codewords for this QR code version (Data + Error correction)
  const totalCodewords = Utils.getSymbolTotalCodewords(version)

  // Total number of error correction codewords
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel)

  // Total number of data codewords
  const dataTotalCodewords = totalCodewords - ecTotalCodewords

  // Total number of blocks
  const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel)

  // Calculate how many blocks each group should contain
  const blocksInGroup2 = totalCodewords % ecTotalBlocks
  const blocksInGroup1 = ecTotalBlocks - blocksInGroup2

  const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks)

  const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks)
  const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1

  // Number of EC codewords is the same for both groups
  const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1

  // Initialize a Reed-Solomon encoder with a generator polynomial of degree ecCount
  const rs = new ReedSolomonEncoder(ecCount)

  let offset = 0
  const dcData = new Array(ecTotalBlocks)
  const ecData = new Array(ecTotalBlocks)
  let maxDataSize = 0
  const buffer = new Uint8Array(bitBuffer.buffer)

  // Divide the buffer into the required number of blocks
  for (let b = 0; b < ecTotalBlocks; b++) {
    const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2

    // extract a block of data from buffer
    dcData[b] = buffer.slice(offset, offset + dataSize)

    // Calculate EC codewords for this data block
    ecData[b] = rs.encode(dcData[b])

    offset += dataSize
    maxDataSize = Math.max(maxDataSize, dataSize)
  }

  // Create final data
  // Interleave the data and error correction codewords from each block
  const data = new Uint8Array(totalCodewords)
  let index = 0
  let i, r

  // Add data codewords
  for (i = 0; i < maxDataSize; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      if (i < dcData[r].length) {
        data[index++] = dcData[r][i]
      }
    }
  }

  // Apped EC codewords
  for (i = 0; i < ecCount; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      data[index++] = ecData[r][i]
    }
  }

  return data
}

/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */
function createSymbol (data, version, errorCorrectionLevel, maskPattern) {
  let segments

  if (Array.isArray(data)) {
    segments = Segments.fromArray(data)
  } else if (typeof data === 'string') {
    let estimatedVersion = version

    if (!estimatedVersion) {
      const rawSegments = Segments.rawSplit(data)

      // Estimate best version that can contain raw splitted segments
      estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel)
    }

    // Build optimized segments
    // If estimated version is undefined, try with the highest version
    segments = Segments.fromString(data, estimatedVersion || 40)
  } else {
    throw new Error('Invalid data')
  }

  // Get the min version that can contain data
  const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel)

  // If no version is found, data cannot be stored
  if (!bestVersion) {
    throw new Error('The amount of data is too big to be stored in a QR Code')
  }

  // If not specified, use min version as default
  if (!version) {
    version = bestVersion

  // Check if the specified version can contain the data
  } else if (version < bestVersion) {
    throw new Error('\n' +
      'The chosen QR Code version cannot contain this amount of data.\n' +
      'Minimum version required to store current data is: ' + bestVersion + '.\n'
    )
  }

  const dataBits = createData(version, errorCorrectionLevel, segments)

  // Allocate matrix buffer
  const moduleCount = Utils.getSymbolSize(version)
  const modules = new BitMatrix(moduleCount)

  // Add function modules
  setupFinderPattern(modules, version)
  setupTimingPattern(modules)
  setupAlignmentPattern(modules, version)

  // Add temporary dummy bits for format info just to set them as reserved.
  // This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
  // since the masking operation must be performed only on the encoding region.
  // These blocks will be replaced with correct values later in code.
  setupFormatInfo(modules, errorCorrectionLevel, 0)

  if (version >= 7) {
    setupVersionInfo(modules, version)
  }

  // Add data codewords
  setupData(modules, dataBits)

  if (isNaN(maskPattern)) {
    // Find best mask pattern
    maskPattern = MaskPattern.getBestMask(modules,
      setupFormatInfo.bind(null, modules, errorCorrectionLevel))
  }

  // Apply mask pattern
  MaskPattern.applyMask(maskPattern, modules)

  // Replace format info bits with correct values
  setupFormatInfo(modules, errorCorrectionLevel, maskPattern)

  return {
    modules: modules,
    version: version,
    errorCorrectionLevel: errorCorrectionLevel,
    maskPattern: maskPattern,
    segments: segments
  }
}

/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */
exports.create = function create (data, options) {
  if (typeof data === 'undefined' || data === '') {
    throw new Error('No input text')
  }

  let errorCorrectionLevel = ECLevel.M
  let version
  let mask

  if (typeof options !== 'undefined') {
    // Use higher error correction level as default
    errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M)
    version = Version.from(options.version)
    mask = MaskPattern.from(options.maskPattern)

    if (options.toSJISFunc) {
      Utils.setToSJISFunction(options.toSJISFunc)
    }
  }

  return createSymbol(data, version, errorCorrectionLevel, mask)
}


/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, exports) {

let toSJISFunction
const CODEWORDS_COUNT = [
  0, // Not used
  26, 44, 70, 100, 134, 172, 196, 242, 292, 346,
  404, 466, 532, 581, 655, 733, 815, 901, 991, 1085,
  1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185,
  2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706
]

/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */
exports.getSymbolSize = function getSymbolSize (version) {
  if (!version) throw new Error('"version" cannot be null or undefined')
  if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40')
  return version * 4 + 17
}

/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */
exports.getSymbolTotalCodewords = function getSymbolTotalCodewords (version) {
  return CODEWORDS_COUNT[version]
}

/**
 * Encode data with Bose-Chaudhuri-Hocquenghem
 *
 * @param  {Number} data Value to encode
 * @return {Number}      Encoded value
 */
exports.getBCHDigit = function (data) {
  let digit = 0

  while (data !== 0) {
    digit++
    data >>>= 1
  }

  return digit
}

exports.setToSJISFunction = function setToSJISFunction (f) {
  if (typeof f !== 'function') {
    throw new Error('"toSJISFunc" is not a valid function.')
  }

  toSJISFunction = f
}

exports.isKanjiModeEnabled = function () {
  return typeof toSJISFunction !== 'undefined'
}

exports.toSJIS = function toSJIS (kanji) {
  return toSJISFunction(kanji)
}


/***/ }),
/* 69 */
/***/ (function(__unused_webpack_module, exports) {

exports.L = { bit: 1 }
exports.M = { bit: 0 }
exports.Q = { bit: 3 }
exports.H = { bit: 2 }

function fromString (string) {
  if (typeof string !== 'string') {
    throw new Error('Param is not a string')
  }

  const lcStr = string.toLowerCase()

  switch (lcStr) {
    case 'l':
    case 'low':
      return exports.L

    case 'm':
    case 'medium':
      return exports.M

    case 'q':
    case 'quartile':
      return exports.Q

    case 'h':
    case 'high':
      return exports.H

    default:
      throw new Error('Unknown EC Level: ' + string)
  }
}

exports.isValid = function isValid (level) {
  return level && typeof level.bit !== 'undefined' &&
    level.bit >= 0 && level.bit < 4
}

exports.from = function from (value, defaultValue) {
  if (exports.isValid(value)) {
    return value
  }

  try {
    return fromString(value)
  } catch (e) {
    return defaultValue
  }
}


/***/ }),
/* 70 */
/***/ (function(module) {

function BitBuffer () {
  this.buffer = []
  this.length = 0
}

BitBuffer.prototype = {

  get: function (index) {
    const bufIndex = Math.floor(index / 8)
    return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1) === 1
  },

  put: function (num, length) {
    for (let i = 0; i < length; i++) {
      this.putBit(((num >>> (length - i - 1)) & 1) === 1)
    }
  },

  getLengthInBits: function () {
    return this.length
  },

  putBit: function (bit) {
    const bufIndex = Math.floor(this.length / 8)
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0)
    }

    if (bit) {
      this.buffer[bufIndex] |= (0x80 >>> (this.length % 8))
    }

    this.length++
  }
}

module.exports = BitBuffer


/***/ }),
/* 71 */
/***/ (function(module) {

/**
 * Helper class to handle QR Code symbol modules
 *
 * @param {Number} size Symbol size
 */
function BitMatrix (size) {
  if (!size || size < 1) {
    throw new Error('BitMatrix size must be defined and greater than 0')
  }

  this.size = size
  this.data = new Uint8Array(size * size)
  this.reservedBit = new Uint8Array(size * size)
}

/**
 * Set bit value at specified location
 * If reserved flag is set, this bit will be ignored during masking process
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 * @param {Boolean} reserved
 */
BitMatrix.prototype.set = function (row, col, value, reserved) {
  const index = row * this.size + col
  this.data[index] = value
  if (reserved) this.reservedBit[index] = true
}

/**
 * Returns bit value at specified location
 *
 * @param  {Number}  row
 * @param  {Number}  col
 * @return {Boolean}
 */
BitMatrix.prototype.get = function (row, col) {
  return this.data[row * this.size + col]
}

/**
 * Applies xor operator at specified location
 * (used during masking process)
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 */
BitMatrix.prototype.xor = function (row, col, value) {
  this.data[row * this.size + col] ^= value
}

/**
 * Check if bit at specified location is reserved
 *
 * @param {Number}   row
 * @param {Number}   col
 * @return {Boolean}
 */
BitMatrix.prototype.isReserved = function (row, col) {
  return this.reservedBit[row * this.size + col]
}

module.exports = BitMatrix


/***/ }),
/* 72 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */

const getSymbolSize = (__webpack_require__(68).getSymbolSize)

/**
 * Calculate the row/column coordinates of the center module of each alignment pattern
 * for the specified QR Code version.
 *
 * The alignment patterns are positioned symmetrically on either side of the diagonal
 * running from the top left corner of the symbol to the bottom right corner.
 *
 * Since positions are simmetrical only half of the coordinates are returned.
 * Each item of the array will represent in turn the x and y coordinate.
 * @see {@link getPositions}
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinate
 */
exports.getRowColCoords = function getRowColCoords (version) {
  if (version === 1) return []

  const posCount = Math.floor(version / 7) + 2
  const size = getSymbolSize(version)
  const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2
  const positions = [size - 7] // Last coord is always (size - 7)

  for (let i = 1; i < posCount - 1; i++) {
    positions[i] = positions[i - 1] - intervals
  }

  positions.push(6) // First coord is always 6

  return positions.reverse()
}

/**
 * Returns an array containing the positions of each alignment pattern.
 * Each array's element represent the center point of the pattern as (x, y) coordinates
 *
 * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}
 * and filtering out the items that overlaps with finder pattern
 *
 * @example
 * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.
 * The alignment patterns, therefore, are to be centered on (row, column)
 * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).
 * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns
 * and are not therefore used for alignment patterns.
 *
 * let pos = getPositions(7)
 * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */
exports.getPositions = function getPositions (version) {
  const coords = []
  const pos = exports.getRowColCoords(version)
  const posLength = pos.length

  for (let i = 0; i < posLength; i++) {
    for (let j = 0; j < posLength; j++) {
      // Skip if position is occupied by finder patterns
      if ((i === 0 && j === 0) || // top-left
          (i === 0 && j === posLength - 1) || // bottom-left
          (i === posLength - 1 && j === 0)) { // top-right
        continue
      }

      coords.push([pos[i], pos[j]])
    }
  }

  return coords
}


/***/ }),
/* 73 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

const getSymbolSize = (__webpack_require__(68).getSymbolSize)
const FINDER_PATTERN_SIZE = 7

/**
 * Returns an array containing the positions of each finder pattern.
 * Each array's element represent the top-left point of the pattern as (x, y) coordinates
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */
exports.getPositions = function getPositions (version) {
  const size = getSymbolSize(version)

  return [
    // top-left
    [0, 0],
    // top-right
    [size - FINDER_PATTERN_SIZE, 0],
    // bottom-left
    [0, size - FINDER_PATTERN_SIZE]
  ]
}


/***/ }),
/* 74 */
/***/ (function(__unused_webpack_module, exports) {

/**
 * Data mask pattern reference
 * @type {Object}
 */
exports.Patterns = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
}

/**
 * Weighted penalty scores for the undesirable features
 * @type {Object}
 */
const PenaltyScores = {
  N1: 3,
  N2: 3,
  N3: 40,
  N4: 10
}

/**
 * Check if mask pattern value is valid
 *
 * @param  {Number}  mask    Mask pattern
 * @return {Boolean}         true if valid, false otherwise
 */
exports.isValid = function isValid (mask) {
  return mask != null && mask !== '' && !isNaN(mask) && mask >= 0 && mask <= 7
}

/**
 * Returns mask pattern from a value.
 * If value is not valid, returns undefined
 *
 * @param  {Number|String} value        Mask pattern value
 * @return {Number}                     Valid mask pattern or undefined
 */
exports.from = function from (value) {
  return exports.isValid(value) ? parseInt(value, 10) : undefined
}

/**
* Find adjacent modules in row/column with the same color
* and assign a penalty value.
*
* Points: N1 + i
* i is the amount by which the number of adjacent modules of the same color exceeds 5
*/
exports.getPenaltyN1 = function getPenaltyN1 (data) {
  const size = data.size
  let points = 0
  let sameCountCol = 0
  let sameCountRow = 0
  let lastCol = null
  let lastRow = null

  for (let row = 0; row < size; row++) {
    sameCountCol = sameCountRow = 0
    lastCol = lastRow = null

    for (let col = 0; col < size; col++) {
      let module = data.get(row, col)
      if (module === lastCol) {
        sameCountCol++
      } else {
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5)
        lastCol = module
        sameCountCol = 1
      }

      module = data.get(col, row)
      if (module === lastRow) {
        sameCountRow++
      } else {
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5)
        lastRow = module
        sameCountRow = 1
      }
    }

    if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5)
    if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5)
  }

  return points
}

/**
 * Find 2x2 blocks with the same color and assign a penalty value
 *
 * Points: N2 * (m - 1) * (n - 1)
 */
exports.getPenaltyN2 = function getPenaltyN2 (data) {
  const size = data.size
  let points = 0

  for (let row = 0; row < size - 1; row++) {
    for (let col = 0; col < size - 1; col++) {
      const last = data.get(row, col) +
        data.get(row, col + 1) +
        data.get(row + 1, col) +
        data.get(row + 1, col + 1)

      if (last === 4 || last === 0) points++
    }
  }

  return points * PenaltyScores.N2
}

/**
 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
 * preceded or followed by light area 4 modules wide
 *
 * Points: N3 * number of pattern found
 */
exports.getPenaltyN3 = function getPenaltyN3 (data) {
  const size = data.size
  let points = 0
  let bitsCol = 0
  let bitsRow = 0

  for (let row = 0; row < size; row++) {
    bitsCol = bitsRow = 0
    for (let col = 0; col < size; col++) {
      bitsCol = ((bitsCol << 1) & 0x7FF) | data.get(row, col)
      if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++

      bitsRow = ((bitsRow << 1) & 0x7FF) | data.get(col, row)
      if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++
    }
  }

  return points * PenaltyScores.N3
}

/**
 * Calculate proportion of dark modules in entire symbol
 *
 * Points: N4 * k
 *
 * k is the rating of the deviation of the proportion of dark modules
 * in the symbol from 50% in steps of 5%
 */
exports.getPenaltyN4 = function getPenaltyN4 (data) {
  let darkCount = 0
  const modulesCount = data.data.length

  for (let i = 0; i < modulesCount; i++) darkCount += data.data[i]

  const k = Math.abs(Math.ceil((darkCount * 100 / modulesCount) / 5) - 10)

  return k * PenaltyScores.N4
}

/**
 * Return mask value at given position
 *
 * @param  {Number} maskPattern Pattern reference value
 * @param  {Number} i           Row
 * @param  {Number} j           Column
 * @return {Boolean}            Mask value
 */
function getMaskAt (maskPattern, i, j) {
  switch (maskPattern) {
    case exports.Patterns.PATTERN000: return (i + j) % 2 === 0
    case exports.Patterns.PATTERN001: return i % 2 === 0
    case exports.Patterns.PATTERN010: return j % 3 === 0
    case exports.Patterns.PATTERN011: return (i + j) % 3 === 0
    case exports.Patterns.PATTERN100: return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0
    case exports.Patterns.PATTERN101: return (i * j) % 2 + (i * j) % 3 === 0
    case exports.Patterns.PATTERN110: return ((i * j) % 2 + (i * j) % 3) % 2 === 0
    case exports.Patterns.PATTERN111: return ((i * j) % 3 + (i + j) % 2) % 2 === 0

    default: throw new Error('bad maskPattern:' + maskPattern)
  }
}

/**
 * Apply a mask pattern to a BitMatrix
 *
 * @param  {Number}    pattern Pattern reference number
 * @param  {BitMatrix} data    BitMatrix data
 */
exports.applyMask = function applyMask (pattern, data) {
  const size = data.size

  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size; row++) {
      if (data.isReserved(row, col)) continue
      data.xor(row, col, getMaskAt(pattern, row, col))
    }
  }
}

/**
 * Returns the best mask pattern for data
 *
 * @param  {BitMatrix} data
 * @return {Number} Mask pattern reference number
 */
exports.getBestMask = function getBestMask (data, setupFormatFunc) {
  const numPatterns = Object.keys(exports.Patterns).length
  let bestPattern = 0
  let lowerPenalty = Infinity

  for (let p = 0; p < numPatterns; p++) {
    setupFormatFunc(p)
    exports.applyMask(p, data)

    // Calculate penalty
    const penalty =
      exports.getPenaltyN1(data) +
      exports.getPenaltyN2(data) +
      exports.getPenaltyN3(data) +
      exports.getPenaltyN4(data)

    // Undo previously applied mask
    exports.applyMask(p, data)

    if (penalty < lowerPenalty) {
      lowerPenalty = penalty
      bestPattern = p
    }
  }

  return bestPattern
}


/***/ }),
/* 75 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

const ECLevel = __webpack_require__(69)

const EC_BLOCKS_TABLE = [
// L  M  Q  H
  1, 1, 1, 1,
  1, 1, 1, 1,
  1, 1, 2, 2,
  1, 2, 2, 4,
  1, 2, 4, 4,
  2, 4, 4, 4,
  2, 4, 6, 5,
  2, 4, 6, 6,
  2, 5, 8, 8,
  4, 5, 8, 8,
  4, 5, 8, 11,
  4, 8, 10, 11,
  4, 9, 12, 16,
  4, 9, 16, 16,
  6, 10, 12, 18,
  6, 10, 17, 16,
  6, 11, 16, 19,
  6, 13, 18, 21,
  7, 14, 21, 25,
  8, 16, 20, 25,
  8, 17, 23, 25,
  9, 17, 23, 34,
  9, 18, 25, 30,
  10, 20, 27, 32,
  12, 21, 29, 35,
  12, 23, 34, 37,
  12, 25, 34, 40,
  13, 26, 35, 42,
  14, 28, 38, 45,
  15, 29, 40, 48,
  16, 31, 43, 51,
  17, 33, 45, 54,
  18, 35, 48, 57,
  19, 37, 51, 60,
  19, 38, 53, 63,
  20, 40, 56, 66,
  21, 43, 59, 70,
  22, 45, 62, 74,
  24, 47, 65, 77,
  25, 49, 68, 81
]

const EC_CODEWORDS_TABLE = [
// L  M  Q  H
  7, 10, 13, 17,
  10, 16, 22, 28,
  15, 26, 36, 44,
  20, 36, 52, 64,
  26, 48, 72, 88,
  36, 64, 96, 112,
  40, 72, 108, 130,
  48, 88, 132, 156,
  60, 110, 160, 192,
  72, 130, 192, 224,
  80, 150, 224, 264,
  96, 176, 260, 308,
  104, 198, 288, 352,
  120, 216, 320, 384,
  132, 240, 360, 432,
  144, 280, 408, 480,
  168, 308, 448, 532,
  180, 338, 504, 588,
  196, 364, 546, 650,
  224, 416, 600, 700,
  224, 442, 644, 750,
  252, 476, 690, 816,
  270, 504, 750, 900,
  300, 560, 810, 960,
  312, 588, 870, 1050,
  336, 644, 952, 1110,
  360, 700, 1020, 1200,
  390, 728, 1050, 1260,
  420, 784, 1140, 1350,
  450, 812, 1200, 1440,
  480, 868, 1290, 1530,
  510, 924, 1350, 1620,
  540, 980, 1440, 1710,
  570, 1036, 1530, 1800,
  570, 1064, 1590, 1890,
  600, 1120, 1680, 1980,
  630, 1204, 1770, 2100,
  660, 1260, 1860, 2220,
  720, 1316, 1950, 2310,
  750, 1372, 2040, 2430
]

/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */
exports.getBlocksCount = function getBlocksCount (version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel.L:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 0]
    case ECLevel.M:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 1]
    case ECLevel.Q:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 2]
    case ECLevel.H:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 3]
    default:
      return undefined
  }
}

/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */
exports.getTotalCodewordsCount = function getTotalCodewordsCount (version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel.L:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0]
    case ECLevel.M:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1]
    case ECLevel.Q:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2]
    case ECLevel.H:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3]
    default:
      return undefined
  }
}


/***/ }),
/* 76 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Polynomial = __webpack_require__(77)

function ReedSolomonEncoder (degree) {
  this.genPoly = undefined
  this.degree = degree

  if (this.degree) this.initialize(this.degree)
}

/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */
ReedSolomonEncoder.prototype.initialize = function initialize (degree) {
  // create an irreducible generator polynomial
  this.degree = degree
  this.genPoly = Polynomial.generateECPolynomial(this.degree)
}

/**
 * Encodes a chunk of data
 *
 * @param  {Uint8Array} data Buffer containing input data
 * @return {Uint8Array}      Buffer containing encoded data
 */
ReedSolomonEncoder.prototype.encode = function encode (data) {
  if (!this.genPoly) {
    throw new Error('Encoder not initialized')
  }

  // Calculate EC for this data block
  // extends data size to data+genPoly size
  const paddedData = new Uint8Array(data.length + this.degree)
  paddedData.set(data)

  // The error correction codewords are the remainder after dividing the data codewords
  // by a generator polynomial
  const remainder = Polynomial.mod(paddedData, this.genPoly)

  // return EC data blocks (last n byte, where n is the degree of genPoly)
  // If coefficients number in remainder are less than genPoly degree,
  // pad with 0s to the left to reach the needed number of coefficients
  const start = this.degree - remainder.length
  if (start > 0) {
    const buff = new Uint8Array(this.degree)
    buff.set(remainder, start)

    return buff
  }

  return remainder
}

module.exports = ReedSolomonEncoder


/***/ }),
/* 77 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

const GF = __webpack_require__(78)

/**
 * Multiplies two polynomials inside Galois Field
 *
 * @param  {Uint8Array} p1 Polynomial
 * @param  {Uint8Array} p2 Polynomial
 * @return {Uint8Array}    Product of p1 and p2
 */
exports.mul = function mul (p1, p2) {
  const coeff = new Uint8Array(p1.length + p2.length - 1)

  for (let i = 0; i < p1.length; i++) {
    for (let j = 0; j < p2.length; j++) {
      coeff[i + j] ^= GF.mul(p1[i], p2[j])
    }
  }

  return coeff
}

/**
 * Calculate the remainder of polynomials division
 *
 * @param  {Uint8Array} divident Polynomial
 * @param  {Uint8Array} divisor  Polynomial
 * @return {Uint8Array}          Remainder
 */
exports.mod = function mod (divident, divisor) {
  let result = new Uint8Array(divident)

  while ((result.length - divisor.length) >= 0) {
    const coeff = result[0]

    for (let i = 0; i < divisor.length; i++) {
      result[i] ^= GF.mul(divisor[i], coeff)
    }

    // remove all zeros from buffer head
    let offset = 0
    while (offset < result.length && result[offset] === 0) offset++
    result = result.slice(offset)
  }

  return result
}

/**
 * Generate an irreducible generator polynomial of specified degree
 * (used by Reed-Solomon encoder)
 *
 * @param  {Number} degree Degree of the generator polynomial
 * @return {Uint8Array}    Buffer containing polynomial coefficients
 */
exports.generateECPolynomial = function generateECPolynomial (degree) {
  let poly = new Uint8Array([1])
  for (let i = 0; i < degree; i++) {
    poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]))
  }

  return poly
}


/***/ }),
/* 78 */
/***/ (function(__unused_webpack_module, exports) {

const EXP_TABLE = new Uint8Array(512)
const LOG_TABLE = new Uint8Array(256)
/**
 * Precompute the log and anti-log tables for faster computation later
 *
 * For each possible value in the galois field 2^8, we will pre-compute
 * the logarithm and anti-logarithm (exponential) of this value
 *
 * ref {@link https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Introduction_to_mathematical_fields}
 */
;(function initTables () {
  let x = 1
  for (let i = 0; i < 255; i++) {
    EXP_TABLE[i] = x
    LOG_TABLE[x] = i

    x <<= 1 // multiply by 2

    // The QR code specification says to use byte-wise modulo 100011101 arithmetic.
    // This means that when a number is 256 or larger, it should be XORed with 0x11D.
    if (x & 0x100) { // similar to x >= 256, but a lot faster (because 0x100 == 256)
      x ^= 0x11D
    }
  }

  // Optimization: double the size of the anti-log table so that we don't need to mod 255 to
  // stay inside the bounds (because we will mainly use this table for the multiplication of
  // two GF numbers, no more).
  // @see {@link mul}
  for (let i = 255; i < 512; i++) {
    EXP_TABLE[i] = EXP_TABLE[i - 255]
  }
}())

/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */
exports.log = function log (n) {
  if (n < 1) throw new Error('log(' + n + ')')
  return LOG_TABLE[n]
}

/**
 * Returns anti-log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */
exports.exp = function exp (n) {
  return EXP_TABLE[n]
}

/**
 * Multiplies two number inside Galois Field
 *
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number}
 */
exports.mul = function mul (x, y) {
  if (x === 0 || y === 0) return 0

  // should be EXP_TABLE[(LOG_TABLE[x] + LOG_TABLE[y]) % 255] if EXP_TABLE wasn't oversized
  // @see {@link initTables}
  return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]]
}


/***/ }),
/* 79 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

const Utils = __webpack_require__(68)
const ECCode = __webpack_require__(75)
const ECLevel = __webpack_require__(69)
const Mode = __webpack_require__(80)
const VersionCheck = __webpack_require__(81)

// Generator polynomial used to encode version information
const G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0)
const G18_BCH = Utils.getBCHDigit(G18)

function getBestVersionForDataLength (mode, length, errorCorrectionLevel) {
  for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
      return currentVersion
    }
  }

  return undefined
}

function getReservedBitsCount (mode, version) {
  // Character count indicator + mode indicator bits
  return Mode.getCharCountIndicator(mode, version) + 4
}

function getTotalBitsFromDataArray (segments, version) {
  let totalBits = 0

  segments.forEach(function (data) {
    const reservedBits = getReservedBitsCount(data.mode, version)
    totalBits += reservedBits + data.getBitsLength()
  })

  return totalBits
}

function getBestVersionForMixedData (segments, errorCorrectionLevel) {
  for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
    const length = getTotalBitsFromDataArray(segments, currentVersion)
    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
      return currentVersion
    }
  }

  return undefined
}

/**
 * Returns version number from a value.
 * If value is not a valid version, returns defaultValue
 *
 * @param  {Number|String} value        QR Code version
 * @param  {Number}        defaultValue Fallback value
 * @return {Number}                     QR Code version number
 */
exports.from = function from (value, defaultValue) {
  if (VersionCheck.isValid(value)) {
    return parseInt(value, 10)
  }

  return defaultValue
}

/**
 * Returns how much data can be stored with the specified QR code version
 * and error correction level
 *
 * @param  {Number} version              QR Code version (1-40)
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Mode}   mode                 Data mode
 * @return {Number}                      Quantity of storable data
 */
exports.getCapacity = function getCapacity (version, errorCorrectionLevel, mode) {
  if (!VersionCheck.isValid(version)) {
    throw new Error('Invalid QR Code version')
  }

  // Use Byte mode as default
  if (typeof mode === 'undefined') mode = Mode.BYTE

  // Total codewords for this QR code version (Data + Error correction)
  const totalCodewords = Utils.getSymbolTotalCodewords(version)

  // Total number of error correction codewords
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel)

  // Total number of data codewords
  const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8

  if (mode === Mode.MIXED) return dataTotalCodewordsBits

  const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version)

  // Return max number of storable codewords
  switch (mode) {
    case Mode.NUMERIC:
      return Math.floor((usableBits / 10) * 3)

    case Mode.ALPHANUMERIC:
      return Math.floor((usableBits / 11) * 2)

    case Mode.KANJI:
      return Math.floor(usableBits / 13)

    case Mode.BYTE:
    default:
      return Math.floor(usableBits / 8)
  }
}

/**
 * Returns the minimum version needed to contain the amount of data
 *
 * @param  {Segment} data                    Segment of data
 * @param  {Number} [errorCorrectionLevel=H] Error correction level
 * @param  {Mode} mode                       Data mode
 * @return {Number}                          QR Code version
 */
exports.getBestVersionForData = function getBestVersionForData (data, errorCorrectionLevel) {
  let seg

  const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M)

  if (Array.isArray(data)) {
    if (data.length > 1) {
      return getBestVersionForMixedData(data, ecl)
    }

    if (data.length === 0) {
      return 1
    }

    seg = data[0]
  } else {
    seg = data
  }

  return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl)
}

/**
 * Returns version information with relative error correction bits
 *
 * The version information is included in QR Code symbols of version 7 or larger.
 * It consists of an 18-bit sequence containing 6 data bits,
 * with 12 error correction bits calculated using the (18, 6) Golay code.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Encoded version info bits
 */
exports.getEncodedBits = function getEncodedBits (version) {
  if (!VersionCheck.isValid(version) || version < 7) {
    throw new Error('Invalid QR Code version')
  }

  let d = version << 12

  while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
    d ^= (G18 << (Utils.getBCHDigit(d) - G18_BCH))
  }

  return (version << 12) | d
}


/***/ }),
/* 80 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

const VersionCheck = __webpack_require__(81)
const Regex = __webpack_require__(82)

/**
 * Numeric mode encodes data from the decimal digit set (0 - 9)
 * (byte values 30HEX to 39HEX).
 * Normally, 3 data characters are represented by 10 bits.
 *
 * @type {Object}
 */
exports.NUMERIC = {
  id: 'Numeric',
  bit: 1 << 0,
  ccBits: [10, 12, 14]
}

/**
 * Alphanumeric mode encodes data from a set of 45 characters,
 * i.e. 10 numeric digits (0 - 9),
 *      26 alphabetic characters (A - Z),
 *   and 9 symbols (SP, $, %, *, +, -, ., /, :).
 * Normally, two input characters are represented by 11 bits.
 *
 * @type {Object}
 */
exports.ALPHANUMERIC = {
  id: 'Alphanumeric',
  bit: 1 << 1,
  ccBits: [9, 11, 13]
}

/**
 * In byte mode, data is encoded at 8 bits per character.
 *
 * @type {Object}
 */
exports.BYTE = {
  id: 'Byte',
  bit: 1 << 2,
  ccBits: [8, 16, 16]
}

/**
 * The Kanji mode efficiently encodes Kanji characters in accordance with
 * the Shift JIS system based on JIS X 0208.
 * The Shift JIS values are shifted from the JIS X 0208 values.
 * JIS X 0208 gives details of the shift coded representation.
 * Each two-byte character value is compacted to a 13-bit binary codeword.
 *
 * @type {Object}
 */
exports.KANJI = {
  id: 'Kanji',
  bit: 1 << 3,
  ccBits: [8, 10, 12]
}

/**
 * Mixed mode will contain a sequences of data in a combination of any of
 * the modes described above
 *
 * @type {Object}
 */
exports.MIXED = {
  bit: -1
}

/**
 * Returns the number of bits needed to store the data length
 * according to QR Code specifications.
 *
 * @param  {Mode}   mode    Data mode
 * @param  {Number} version QR Code version
 * @return {Number}         Number of bits
 */
exports.getCharCountIndicator = function getCharCountIndicator (mode, version) {
  if (!mode.ccBits) throw new Error('Invalid mode: ' + mode)

  if (!VersionCheck.isValid(version)) {
    throw new Error('Invalid version: ' + version)
  }

  if (version >= 1 && version < 10) return mode.ccBits[0]
  else if (version < 27) return mode.ccBits[1]
  return mode.ccBits[2]
}

/**
 * Returns the most efficient mode to store the specified data
 *
 * @param  {String} dataStr Input data string
 * @return {Mode}           Best mode
 */
exports.getBestModeForData = function getBestModeForData (dataStr) {
  if (Regex.testNumeric(dataStr)) return exports.NUMERIC
  else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC
  else if (Regex.testKanji(dataStr)) return exports.KANJI
  else return exports.BYTE
}

/**
 * Return mode name as string
 *
 * @param {Mode} mode Mode object
 * @returns {String}  Mode name
 */
exports.toString = function toString (mode) {
  if (mode && mode.id) return mode.id
  throw new Error('Invalid mode')
}

/**
 * Check if input param is a valid mode object
 *
 * @param   {Mode}    mode Mode object
 * @returns {Boolean} True if valid mode, false otherwise
 */
exports.isValid = function isValid (mode) {
  return mode && mode.bit && mode.ccBits
}

/**
 * Get mode object from its name
 *
 * @param   {String} string Mode name
 * @returns {Mode}          Mode object
 */
function fromString (string) {
  if (typeof string !== 'string') {
    throw new Error('Param is not a string')
  }

  const lcStr = string.toLowerCase()

  switch (lcStr) {
    case 'numeric':
      return exports.NUMERIC
    case 'alphanumeric':
      return exports.ALPHANUMERIC
    case 'kanji':
      return exports.KANJI
    case 'byte':
      return exports.BYTE
    default:
      throw new Error('Unknown mode: ' + string)
  }
}

/**
 * Returns mode from a value.
 * If value is not a valid mode, returns defaultValue
 *
 * @param  {Mode|String} value        Encoding mode
 * @param  {Mode}        defaultValue Fallback value
 * @return {Mode}                     Encoding mode
 */
exports.from = function from (value, defaultValue) {
  if (exports.isValid(value)) {
    return value
  }

  try {
    return fromString(value)
  } catch (e) {
    return defaultValue
  }
}


/***/ }),
/* 81 */
/***/ (function(__unused_webpack_module, exports) {

/**
 * Check if QR Code version is valid
 *
 * @param  {Number}  version QR Code version
 * @return {Boolean}         true if valid version, false otherwise
 */
exports.isValid = function isValid (version) {
  return !isNaN(version) && version >= 1 && version <= 40
}


/***/ }),
/* 82 */
/***/ (function(__unused_webpack_module, exports) {

const numeric = '[0-9]+'
const alphanumeric = '[A-Z $%*+\\-./:]+'
let kanji = '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|' +
  '[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|' +
  '[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|' +
  '[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+'
kanji = kanji.replace(/u/g, '\\u')

const byte = '(?:(?![A-Z0-9 $%*+\\-./:]|' + kanji + ')(?:.|[\r\n]))+'

exports.KANJI = new RegExp(kanji, 'g')
exports.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g')
exports.BYTE = new RegExp(byte, 'g')
exports.NUMERIC = new RegExp(numeric, 'g')
exports.ALPHANUMERIC = new RegExp(alphanumeric, 'g')

const TEST_KANJI = new RegExp('^' + kanji + '$')
const TEST_NUMERIC = new RegExp('^' + numeric + '$')
const TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\-./:]+$')

exports.testKanji = function testKanji (str) {
  return TEST_KANJI.test(str)
}

exports.testNumeric = function testNumeric (str) {
  return TEST_NUMERIC.test(str)
}

exports.testAlphanumeric = function testAlphanumeric (str) {
  return TEST_ALPHANUMERIC.test(str)
}


/***/ }),
/* 83 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

const Utils = __webpack_require__(68)

const G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0)
const G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1)
const G15_BCH = Utils.getBCHDigit(G15)

/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */
exports.getEncodedBits = function getEncodedBits (errorCorrectionLevel, mask) {
  const data = ((errorCorrectionLevel.bit << 3) | mask)
  let d = data << 10

  while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
    d ^= (G15 << (Utils.getBCHDigit(d) - G15_BCH))
  }

  // xor final data with mask pattern in order to ensure that
  // no combination of Error Correction Level and data mask pattern
  // will result in an all-zero data string
  return ((data << 10) | d) ^ G15_MASK
}


/***/ }),
/* 84 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

const Mode = __webpack_require__(80)
const NumericData = __webpack_require__(85)
const AlphanumericData = __webpack_require__(86)
const ByteData = __webpack_require__(87)
const KanjiData = __webpack_require__(88)
const Regex = __webpack_require__(82)
const Utils = __webpack_require__(68)
const dijkstra = __webpack_require__(89)

/**
 * Returns UTF8 byte length
 *
 * @param  {String} str Input string
 * @return {Number}     Number of byte
 */
function getStringByteLength (str) {
  return unescape(encodeURIComponent(str)).length
}

/**
 * Get a list of segments of the specified mode
 * from a string
 *
 * @param  {Mode}   mode Segment mode
 * @param  {String} str  String to process
 * @return {Array}       Array of object with segments data
 */
function getSegments (regex, mode, str) {
  const segments = []
  let result

  while ((result = regex.exec(str)) !== null) {
    segments.push({
      data: result[0],
      index: result.index,
      mode: mode,
      length: result[0].length
    })
  }

  return segments
}

/**
 * Extracts a series of segments with the appropriate
 * modes from a string
 *
 * @param  {String} dataStr Input string
 * @return {Array}          Array of object with segments data
 */
function getSegmentsFromString (dataStr) {
  const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr)
  const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr)
  let byteSegs
  let kanjiSegs

  if (Utils.isKanjiModeEnabled()) {
    byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr)
    kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr)
  } else {
    byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr)
    kanjiSegs = []
  }

  const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs)

  return segs
    .sort(function (s1, s2) {
      return s1.index - s2.index
    })
    .map(function (obj) {
      return {
        data: obj.data,
        mode: obj.mode,
        length: obj.length
      }
    })
}

/**
 * Returns how many bits are needed to encode a string of
 * specified length with the specified mode
 *
 * @param  {Number} length String length
 * @param  {Mode} mode     Segment mode
 * @return {Number}        Bit length
 */
function getSegmentBitsLength (length, mode) {
  switch (mode) {
    case Mode.NUMERIC:
      return NumericData.getBitsLength(length)
    case Mode.ALPHANUMERIC:
      return AlphanumericData.getBitsLength(length)
    case Mode.KANJI:
      return KanjiData.getBitsLength(length)
    case Mode.BYTE:
      return ByteData.getBitsLength(length)
  }
}

/**
 * Merges adjacent segments which have the same mode
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */
function mergeSegments (segs) {
  return segs.reduce(function (acc, curr) {
    const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null
    if (prevSeg && prevSeg.mode === curr.mode) {
      acc[acc.length - 1].data += curr.data
      return acc
    }

    acc.push(curr)
    return acc
  }, [])
}

/**
 * Generates a list of all possible nodes combination which
 * will be used to build a segments graph.
 *
 * Nodes are divided by groups. Each group will contain a list of all the modes
 * in which is possible to encode the given text.
 *
 * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.
 * The group for '12345' will contain then 3 objects, one for each
 * possible encoding mode.
 *
 * Each node represents a possible segment.
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */
function buildNodes (segs) {
  const nodes = []
  for (let i = 0; i < segs.length; i++) {
    const seg = segs[i]

    switch (seg.mode) {
      case Mode.NUMERIC:
        nodes.push([seg,
          { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
          { data: seg.data, mode: Mode.BYTE, length: seg.length }
        ])
        break
      case Mode.ALPHANUMERIC:
        nodes.push([seg,
          { data: seg.data, mode: Mode.BYTE, length: seg.length }
        ])
        break
      case Mode.KANJI:
        nodes.push([seg,
          { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
        ])
        break
      case Mode.BYTE:
        nodes.push([
          { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
        ])
    }
  }

  return nodes
}

/**
 * Builds a graph from a list of nodes.
 * All segments in each node group will be connected with all the segments of
 * the next group and so on.
 *
 * At each connection will be assigned a weight depending on the
 * segment's byte length.
 *
 * @param  {Array} nodes    Array of object with segments data
 * @param  {Number} version QR Code version
 * @return {Object}         Graph of all possible segments
 */
function buildGraph (nodes, version) {
  const table = {}
  const graph = { start: {} }
  let prevNodeIds = ['start']

  for (let i = 0; i < nodes.length; i++) {
    const nodeGroup = nodes[i]
    const currentNodeIds = []

    for (let j = 0; j < nodeGroup.length; j++) {
      const node = nodeGroup[j]
      const key = '' + i + j

      currentNodeIds.push(key)
      table[key] = { node: node, lastCount: 0 }
      graph[key] = {}

      for (let n = 0; n < prevNodeIds.length; n++) {
        const prevNodeId = prevNodeIds[n]

        if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
          graph[prevNodeId][key] =
            getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) -
            getSegmentBitsLength(table[prevNodeId].lastCount, node.mode)

          table[prevNodeId].lastCount += node.length
        } else {
          if (table[prevNodeId]) table[prevNodeId].lastCount = node.length

          graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) +
            4 + Mode.getCharCountIndicator(node.mode, version) // switch cost
        }
      }
    }

    prevNodeIds = currentNodeIds
  }

  for (let n = 0; n < prevNodeIds.length; n++) {
    graph[prevNodeIds[n]].end = 0
  }

  return { map: graph, table: table }
}

/**
 * Builds a segment from a specified data and mode.
 * If a mode is not specified, the more suitable will be used.
 *
 * @param  {String} data             Input data
 * @param  {Mode | String} modesHint Data mode
 * @return {Segment}                 Segment
 */
function buildSingleSegment (data, modesHint) {
  let mode
  const bestMode = Mode.getBestModeForData(data)

  mode = Mode.from(modesHint, bestMode)

  // Make sure data can be encoded
  if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
    throw new Error('"' + data + '"' +
      ' cannot be encoded with mode ' + Mode.toString(mode) +
      '.\n Suggested mode is: ' + Mode.toString(bestMode))
  }

  // Use Mode.BYTE if Kanji support is disabled
  if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
    mode = Mode.BYTE
  }

  switch (mode) {
    case Mode.NUMERIC:
      return new NumericData(data)

    case Mode.ALPHANUMERIC:
      return new AlphanumericData(data)

    case Mode.KANJI:
      return new KanjiData(data)

    case Mode.BYTE:
      return new ByteData(data)
  }
}

/**
 * Builds a list of segments from an array.
 * Array can contain Strings or Objects with segment's info.
 *
 * For each item which is a string, will be generated a segment with the given
 * string and the more appropriate encoding mode.
 *
 * For each item which is an object, will be generated a segment with the given
 * data and mode.
 * Objects must contain at least the property "data".
 * If property "mode" is not present, the more suitable mode will be used.
 *
 * @param  {Array} array Array of objects with segments data
 * @return {Array}       Array of Segments
 */
exports.fromArray = function fromArray (array) {
  return array.reduce(function (acc, seg) {
    if (typeof seg === 'string') {
      acc.push(buildSingleSegment(seg, null))
    } else if (seg.data) {
      acc.push(buildSingleSegment(seg.data, seg.mode))
    }

    return acc
  }, [])
}

/**
 * Builds an optimized sequence of segments from a string,
 * which will produce the shortest possible bitstream.
 *
 * @param  {String} data    Input string
 * @param  {Number} version QR Code version
 * @return {Array}          Array of segments
 */
exports.fromString = function fromString (data, version) {
  const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled())

  const nodes = buildNodes(segs)
  const graph = buildGraph(nodes, version)
  const path = dijkstra.find_path(graph.map, 'start', 'end')

  const optimizedSegs = []
  for (let i = 1; i < path.length - 1; i++) {
    optimizedSegs.push(graph.table[path[i]].node)
  }

  return exports.fromArray(mergeSegments(optimizedSegs))
}

/**
 * Splits a string in various segments with the modes which
 * best represent their content.
 * The produced segments are far from being optimized.
 * The output of this function is only used to estimate a QR Code version
 * which may contain the data.
 *
 * @param  {string} data Input string
 * @return {Array}       Array of segments
 */
exports.rawSplit = function rawSplit (data) {
  return exports.fromArray(
    getSegmentsFromString(data, Utils.isKanjiModeEnabled())
  )
}


/***/ }),
/* 85 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Mode = __webpack_require__(80)

function NumericData (data) {
  this.mode = Mode.NUMERIC
  this.data = data.toString()
}

NumericData.getBitsLength = function getBitsLength (length) {
  return 10 * Math.floor(length / 3) + ((length % 3) ? ((length % 3) * 3 + 1) : 0)
}

NumericData.prototype.getLength = function getLength () {
  return this.data.length
}

NumericData.prototype.getBitsLength = function getBitsLength () {
  return NumericData.getBitsLength(this.data.length)
}

NumericData.prototype.write = function write (bitBuffer) {
  let i, group, value

  // The input data string is divided into groups of three digits,
  // and each group is converted to its 10-bit binary equivalent.
  for (i = 0; i + 3 <= this.data.length; i += 3) {
    group = this.data.substr(i, 3)
    value = parseInt(group, 10)

    bitBuffer.put(value, 10)
  }

  // If the number of input digits is not an exact multiple of three,
  // the final one or two digits are converted to 4 or 7 bits respectively.
  const remainingNum = this.data.length - i
  if (remainingNum > 0) {
    group = this.data.substr(i)
    value = parseInt(group, 10)

    bitBuffer.put(value, remainingNum * 3 + 1)
  }
}

module.exports = NumericData


/***/ }),
/* 86 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Mode = __webpack_require__(80)

/**
 * Array of characters available in alphanumeric mode
 *
 * As per QR Code specification, to each character
 * is assigned a value from 0 to 44 which in this case coincides
 * with the array index
 *
 * @type {Array}
 */
const ALPHA_NUM_CHARS = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  ' ', '$', '%', '*', '+', '-', '.', '/', ':'
]

function AlphanumericData (data) {
  this.mode = Mode.ALPHANUMERIC
  this.data = data
}

AlphanumericData.getBitsLength = function getBitsLength (length) {
  return 11 * Math.floor(length / 2) + 6 * (length % 2)
}

AlphanumericData.prototype.getLength = function getLength () {
  return this.data.length
}

AlphanumericData.prototype.getBitsLength = function getBitsLength () {
  return AlphanumericData.getBitsLength(this.data.length)
}

AlphanumericData.prototype.write = function write (bitBuffer) {
  let i

  // Input data characters are divided into groups of two characters
  // and encoded as 11-bit binary codes.
  for (i = 0; i + 2 <= this.data.length; i += 2) {
    // The character value of the first character is multiplied by 45
    let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45

    // The character value of the second digit is added to the product
    value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1])

    // The sum is then stored as 11-bit binary number
    bitBuffer.put(value, 11)
  }

  // If the number of input data characters is not a multiple of two,
  // the character value of the final character is encoded as a 6-bit binary number.
  if (this.data.length % 2) {
    bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6)
  }
}

module.exports = AlphanumericData


/***/ }),
/* 87 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Mode = __webpack_require__(80)

function ByteData (data) {
  this.mode = Mode.BYTE
  if (typeof (data) === 'string') {
    this.data = new TextEncoder().encode(data)
  } else {
    this.data = new Uint8Array(data)
  }
}

ByteData.getBitsLength = function getBitsLength (length) {
  return length * 8
}

ByteData.prototype.getLength = function getLength () {
  return this.data.length
}

ByteData.prototype.getBitsLength = function getBitsLength () {
  return ByteData.getBitsLength(this.data.length)
}

ByteData.prototype.write = function (bitBuffer) {
  for (let i = 0, l = this.data.length; i < l; i++) {
    bitBuffer.put(this.data[i], 8)
  }
}

module.exports = ByteData


/***/ }),
/* 88 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Mode = __webpack_require__(80)
const Utils = __webpack_require__(68)

function KanjiData (data) {
  this.mode = Mode.KANJI
  this.data = data
}

KanjiData.getBitsLength = function getBitsLength (length) {
  return length * 13
}

KanjiData.prototype.getLength = function getLength () {
  return this.data.length
}

KanjiData.prototype.getBitsLength = function getBitsLength () {
  return KanjiData.getBitsLength(this.data.length)
}

KanjiData.prototype.write = function (bitBuffer) {
  let i

  // In the Shift JIS system, Kanji characters are represented by a two byte combination.
  // These byte values are shifted from the JIS X 0208 values.
  // JIS X 0208 gives details of the shift coded representation.
  for (i = 0; i < this.data.length; i++) {
    let value = Utils.toSJIS(this.data[i])

    // For characters with Shift JIS values from 0x8140 to 0x9FFC:
    if (value >= 0x8140 && value <= 0x9FFC) {
      // Subtract 0x8140 from Shift JIS value
      value -= 0x8140

    // For characters with Shift JIS values from 0xE040 to 0xEBBF
    } else if (value >= 0xE040 && value <= 0xEBBF) {
      // Subtract 0xC140 from Shift JIS value
      value -= 0xC140
    } else {
      throw new Error(
        'Invalid SJIS character: ' + this.data[i] + '\n' +
        'Make sure your charset is UTF-8')
    }

    // Multiply most significant byte of result by 0xC0
    // and add least significant byte to product
    value = (((value >>> 8) & 0xff) * 0xC0) + (value & 0xff)

    // Convert result to a 13-bit binary string
    bitBuffer.put(value, 13)
  }
}

module.exports = KanjiData


/***/ }),
/* 89 */
/***/ (function(module) {

"use strict";


/******************************************************************************
 * Created 2008-08-19.
 *
 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
 *
 * Copyright (C) 2008
 *   Wyatt Baldwin <self@wyattbaldwin.com>
 *   All rights reserved
 *
 * Licensed under the MIT license.
 *
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *****************************************************************************/
var dijkstra = {
  single_source_shortest_paths: function(graph, s, d) {
    // Predecessor map for each node that has been encountered.
    // node ID => predecessor node ID
    var predecessors = {};

    // Costs of shortest paths from s to all nodes encountered.
    // node ID => cost
    var costs = {};
    costs[s] = 0;

    // Costs of shortest paths from s to all nodes encountered; differs from
    // `costs` in that it provides easy access to the node that currently has
    // the known shortest path from s.
    // XXX: Do we actually need both `costs` and `open`?
    var open = dijkstra.PriorityQueue.make();
    open.push(s, 0);

    var closest,
        u, v,
        cost_of_s_to_u,
        adjacent_nodes,
        cost_of_e,
        cost_of_s_to_u_plus_cost_of_e,
        cost_of_s_to_v,
        first_visit;
    while (!open.empty()) {
      // In the nodes remaining in graph that have a known cost from s,
      // find the node, u, that currently has the shortest path from s.
      closest = open.pop();
      u = closest.value;
      cost_of_s_to_u = closest.cost;

      // Get nodes adjacent to u...
      adjacent_nodes = graph[u] || {};

      // ...and explore the edges that connect u to those nodes, updating
      // the cost of the shortest paths to any or all of those nodes as
      // necessary. v is the node across the current edge from u.
      for (v in adjacent_nodes) {
        if (adjacent_nodes.hasOwnProperty(v)) {
          // Get the cost of the edge running from u to v.
          cost_of_e = adjacent_nodes[v];

          // Cost of s to u plus the cost of u to v across e--this is *a*
          // cost from s to v that may or may not be less than the current
          // known cost to v.
          cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;

          // If we haven't visited v yet OR if the current known cost from s to
          // v is greater than the new cost we just found (cost of s to u plus
          // cost of u to v across e), update v's cost in the cost list and
          // update v's predecessor in the predecessor list (it's now u).
          cost_of_s_to_v = costs[v];
          first_visit = (typeof costs[v] === 'undefined');
          if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
            costs[v] = cost_of_s_to_u_plus_cost_of_e;
            open.push(v, cost_of_s_to_u_plus_cost_of_e);
            predecessors[v] = u;
          }
        }
      }
    }

    if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
      var msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');
      throw new Error(msg);
    }

    return predecessors;
  },

  extract_shortest_path_from_predecessor_list: function(predecessors, d) {
    var nodes = [];
    var u = d;
    var predecessor;
    while (u) {
      nodes.push(u);
      predecessor = predecessors[u];
      u = predecessors[u];
    }
    nodes.reverse();
    return nodes;
  },

  find_path: function(graph, s, d) {
    var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
    return dijkstra.extract_shortest_path_from_predecessor_list(
      predecessors, d);
  },

  /**
   * A very naive priority queue implementation.
   */
  PriorityQueue: {
    make: function (opts) {
      var T = dijkstra.PriorityQueue,
          t = {},
          key;
      opts = opts || {};
      for (key in T) {
        if (T.hasOwnProperty(key)) {
          t[key] = T[key];
        }
      }
      t.queue = [];
      t.sorter = opts.sorter || T.default_sorter;
      return t;
    },

    default_sorter: function (a, b) {
      return a.cost - b.cost;
    },

    /**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */
    push: function (value, cost) {
      var item = {value: value, cost: cost};
      this.queue.push(item);
      this.queue.sort(this.sorter);
    },

    /**
     * Return the highest priority element in the queue.
     */
    pop: function () {
      return this.queue.shift();
    },

    empty: function () {
      return this.queue.length === 0;
    }
  }
};


// node.js module exports
if (true) {
  module.exports = dijkstra;
}


/***/ }),
/* 90 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

const Utils = __webpack_require__(91)

function clearCanvas (ctx, canvas, size) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (!canvas.style) canvas.style = {}
  canvas.height = size
  canvas.width = size
  canvas.style.height = size + 'px'
  canvas.style.width = size + 'px'
}

function getCanvasElement () {
  try {
    return document.createElement('canvas')
  } catch (e) {
    throw new Error('You need to specify a canvas element')
  }
}

exports.render = function render (qrData, canvas, options) {
  let opts = options
  let canvasEl = canvas

  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
    opts = canvas
    canvas = undefined
  }

  if (!canvas) {
    canvasEl = getCanvasElement()
  }

  opts = Utils.getOptions(opts)
  const size = Utils.getImageWidth(qrData.modules.size, opts)

  const ctx = canvasEl.getContext('2d')
  const image = ctx.createImageData(size, size)
  Utils.qrToImageData(image.data, qrData, opts)

  clearCanvas(ctx, canvasEl, size)
  ctx.putImageData(image, 0, 0)

  return canvasEl
}

exports.renderToDataURL = function renderToDataURL (qrData, canvas, options) {
  let opts = options

  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
    opts = canvas
    canvas = undefined
  }

  if (!opts) opts = {}

  const canvasEl = exports.render(qrData, canvas, opts)

  const type = opts.type || 'image/png'
  const rendererOpts = opts.rendererOpts || {}

  return canvasEl.toDataURL(type, rendererOpts.quality)
}


/***/ }),
/* 91 */
/***/ (function(__unused_webpack_module, exports) {

function hex2rgba (hex) {
  if (typeof hex === 'number') {
    hex = hex.toString()
  }

  if (typeof hex !== 'string') {
    throw new Error('Color should be defined as hex string')
  }

  let hexCode = hex.slice().replace('#', '').split('')
  if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
    throw new Error('Invalid hex color: ' + hex)
  }

  // Convert from short to long form (fff -> ffffff)
  if (hexCode.length === 3 || hexCode.length === 4) {
    hexCode = Array.prototype.concat.apply([], hexCode.map(function (c) {
      return [c, c]
    }))
  }

  // Add default alpha value
  if (hexCode.length === 6) hexCode.push('F', 'F')

  const hexValue = parseInt(hexCode.join(''), 16)

  return {
    r: (hexValue >> 24) & 255,
    g: (hexValue >> 16) & 255,
    b: (hexValue >> 8) & 255,
    a: hexValue & 255,
    hex: '#' + hexCode.slice(0, 6).join('')
  }
}

exports.getOptions = function getOptions (options) {
  if (!options) options = {}
  if (!options.color) options.color = {}

  const margin = typeof options.margin === 'undefined' ||
    options.margin === null ||
    options.margin < 0
    ? 4
    : options.margin

  const width = options.width && options.width >= 21 ? options.width : undefined
  const scale = options.scale || 4

  return {
    width: width,
    scale: width ? 4 : scale,
    margin: margin,
    color: {
      dark: hex2rgba(options.color.dark || '#000000ff'),
      light: hex2rgba(options.color.light || '#ffffffff')
    },
    type: options.type,
    rendererOpts: options.rendererOpts || {}
  }
}

exports.getScale = function getScale (qrSize, opts) {
  return opts.width && opts.width >= qrSize + opts.margin * 2
    ? opts.width / (qrSize + opts.margin * 2)
    : opts.scale
}

exports.getImageWidth = function getImageWidth (qrSize, opts) {
  const scale = exports.getScale(qrSize, opts)
  return Math.floor((qrSize + opts.margin * 2) * scale)
}

exports.qrToImageData = function qrToImageData (imgData, qr, opts) {
  const size = qr.modules.size
  const data = qr.modules.data
  const scale = exports.getScale(size, opts)
  const symbolSize = Math.floor((size + opts.margin * 2) * scale)
  const scaledMargin = opts.margin * scale
  const palette = [opts.color.light, opts.color.dark]

  for (let i = 0; i < symbolSize; i++) {
    for (let j = 0; j < symbolSize; j++) {
      let posDst = (i * symbolSize + j) * 4
      let pxColor = opts.color.light

      if (i >= scaledMargin && j >= scaledMargin &&
        i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
        const iSrc = Math.floor((i - scaledMargin) / scale)
        const jSrc = Math.floor((j - scaledMargin) / scale)
        pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0]
      }

      imgData[posDst++] = pxColor.r
      imgData[posDst++] = pxColor.g
      imgData[posDst++] = pxColor.b
      imgData[posDst] = pxColor.a
    }
  }
}


/***/ }),
/* 92 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

const Utils = __webpack_require__(91)

function getColorAttrib (color, attrib) {
  const alpha = color.a / 255
  const str = attrib + '="' + color.hex + '"'

  return alpha < 1
    ? str + ' ' + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"'
    : str
}

function svgCmd (cmd, x, y) {
  let str = cmd + x
  if (typeof y !== 'undefined') str += ' ' + y

  return str
}

function qrToPath (data, size, margin) {
  let path = ''
  let moveBy = 0
  let newRow = false
  let lineLength = 0

  for (let i = 0; i < data.length; i++) {
    const col = Math.floor(i % size)
    const row = Math.floor(i / size)

    if (!col && !newRow) newRow = true

    if (data[i]) {
      lineLength++

      if (!(i > 0 && col > 0 && data[i - 1])) {
        path += newRow
          ? svgCmd('M', col + margin, 0.5 + row + margin)
          : svgCmd('m', moveBy, 0)

        moveBy = 0
        newRow = false
      }

      if (!(col + 1 < size && data[i + 1])) {
        path += svgCmd('h', lineLength)
        lineLength = 0
      }
    } else {
      moveBy++
    }
  }

  return path
}

exports.render = function render (qrData, options, cb) {
  const opts = Utils.getOptions(options)
  const size = qrData.modules.size
  const data = qrData.modules.data
  const qrcodesize = size + opts.margin * 2

  const bg = !opts.color.light.a
    ? ''
    : '<path ' + getColorAttrib(opts.color.light, 'fill') +
      ' d="M0 0h' + qrcodesize + 'v' + qrcodesize + 'H0z"/>'

  const path =
    '<path ' + getColorAttrib(opts.color.dark, 'stroke') +
    ' d="' + qrToPath(data, size, opts.margin) + '"/>'

  const viewBox = 'viewBox="' + '0 0 ' + qrcodesize + ' ' + qrcodesize + '"'

  const width = !opts.width ? '' : 'width="' + opts.width + '" height="' + opts.width + '" '

  const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + '</svg>\n'

  if (typeof cb === 'function') {
    cb(null, svgTag)
  }

  return svgTag
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	!function() {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
!function() {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jsbarcode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var jsbarcode__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsbarcode__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var qrcode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(65);




// ── i18n ─────────────────────────────────────────────────────
var LANG = function () {
  var saved = localStorage.getItem("lang");
  if (saved === "fi" || saved === "en") return saved;
  return (navigator.language || "en").startsWith("fi") ? "fi" : "en";
}();
var i18n = {
  fi: {
    heroTitle: "Web",
    heroTitleAccent: "Viivakoodinlukija",
    heroSubtitle: "Lue viivakoodeja kameralla natiivilla <code>BarcodeDetector</code>-rajapinnalla – suoraan selaimessa.",
    startCamera: "Käynnistä kamera",
    stopCamera: "Pysäytä kamera",
    scanning: "Skannataan\u2026",
    tapToScan: "Käynnistä kamera skannataksesi",
    notSupported: "BarcodeDetector-rajapintaa ei tueta tässä selaimessa. Kokeile Chromea tai Edgeä.",
    samplesTitle: "Kokeile skannata näitä",
    samplesDesc: "Osoita kamera johonkin näistä – ne toimivat yläpuolella olevan lukijan kanssa.",
    codeTitle: "Minimikonfiguraatio",
    codeDesc: "Kaikki mitä tarvitset viivakoodien lukemiseen kameralla – alle 25 rivillä.",
    codeLang: "HTML",
    copyBtn: "Kopioi",
    copiedBtn: "Kopioitu!",
    viewLiveBtn: "Kokeile livenä",
    compatTitle: "Yhteensopivuus",
    compatDesc: "BarcodeDetector on Chromium-pohjainen API. Tällä hetkellä tuettu:",
    compatSupported: "Tuettu",
    compatPartial: "Osittainen",
    compatNone: "Ei tuettu",
    footerText: "Avoin l\xE4hdekoodi \xB7 MIT \xB7",
    footerLink: "BarcodeDetector MDN-dokumentaatio",
    installBtn: "Lisää kotinäytölle"
  },
  en: {
    heroTitle: "Web Barcode",
    heroTitleAccent: "Reader",
    heroSubtitle: "Scan barcodes with your camera using the native <code>BarcodeDetector</code> API \u2014 runs entirely in your browser.",
    startCamera: "Start Camera",
    stopCamera: "Stop Camera",
    scanning: "Scanning\u2026",
    tapToScan: "Tap Start to scan",
    notSupported: "BarcodeDetector API not supported in this browser. Try Chrome or Edge.",
    samplesTitle: "Try scanning these",
    samplesDesc: "Point your camera at any of these \u2014 they work with the scanner above.",
    codeTitle: "Minimal Setup",
    codeDesc: "Everything you need to read barcodes with a camera \u2014 under 25 lines.",
    codeLang: "HTML",
    copyBtn: "Copy",
    copiedBtn: "Copied!",
    viewLiveBtn: "View live",
    compatTitle: "Browser Compatibility",
    compatDesc: "BarcodeDetector is a Chromium-based API. Currently supported in:",
    compatSupported: "Supported",
    compatPartial: "Partial",
    compatNone: "Not supported",
    footerText: "Open source \xB7 MIT \xB7",
    footerLink: "BarcodeDetector MDN docs",
    installBtn: "Add to Home Screen"
  }
};
function t(key) {
  return (i18n[LANG] || i18n["en"])[key] || key;
}

// ── BarcodeDetector ──────────────────────────────────────────
var FORMATS = ["code_128", "code_93", "code_39", "codabar", "data_matrix", "ean_8", "ean_13", "itf", "pdf417", "qr_code", "upc_e"];
var FORMAT_LABELS = {
  qr_code: "QR Code",
  ean_13: "EAN-13",
  ean_8: "EAN-8",
  code_128: "Code 128",
  code_39: "Code 39",
  code_93: "Code 93",
  upc_e: "UPC-E",
  itf: "ITF",
  pdf417: "PDF417",
  codabar: "Codabar",
  data_matrix: "Data Matrix"
};
var detector = "BarcodeDetector" in window ? new BarcodeDetector({
  formats: FORMATS
}) : null;

// ── DOM refs ─────────────────────────────────────────────────
var video = document.getElementById("barcodecamera");
var startBtn = document.getElementById("startBtn");
var scanOverlay = document.getElementById("scanOverlay");
var videoWrapper = document.getElementById("videoWrapper");
var statusBadge = document.getElementById("statusBadge");
var compatWarn = document.getElementById("compatWarn");
var snackbar = document.getElementById("snackbar");
var snackBadge = document.getElementById("snackBadge");
var snackValue = document.getElementById("snackValue");
var snackProgress = document.getElementById("snackProgress");
var copyBtn = document.getElementById("copyBtn");
var codeExample = document.getElementById("codeExample");
var installBtn = document.getElementById("installBtn");
var langToggle = document.getElementById("langToggle");
var langFiEl = document.getElementById("langFi");
var langEnEl = document.getElementById("langEn");

// ── State ────────────────────────────────────────────────────
var detecting = false;
var lastSnackValue = null;
var snackTimer = null;
var deferredInstallPrompt = null;

// ── Apply translations ────────────────────────────────────────
function applyTranslations() {
  document.documentElement.lang = LANG;
  // Elements with data-i18n attribute
  var els = document.querySelectorAll("[data-i18n]");
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    var key = el.getAttribute("data-i18n");
    var html = el.getAttribute("data-i18n-html");
    if (html) {
      el.innerHTML = t(key);
    } else {
      el.textContent = t(key);
    }
  }
  // Special: topbar subtitle uses innerHTML for <code> tag
  var subtitle = document.querySelector(".topbar__subtitle");
  if (subtitle) subtitle.innerHTML = t("heroSubtitle");
}

// ── Camera ───────────────────────────────────────────────────
startBtn.addEventListener("click", toggleCamera);
function toggleCamera() {
  if (video.srcObject) {
    stopCamera();
  } else {
    startCamera();
  }
}
function startCamera() {
  if (!detector) {
    compatWarn.hidden = false;
    return;
  }
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: "environment"
    }
  }).then(function (stream) {
    video.srcObject = stream;
    startBtn.innerHTML = svgPause() + " " + t("stopCamera");
    setStatus(t("scanning"));
  })["catch"](function () {
    setStatus(LANG === "fi" ? "Kameran käyttö estetty" : "Camera access denied");
  });
}
function stopCamera() {
  if (video.srcObject) {
    video.srcObject.getTracks().forEach(function (t) {
      t.stop();
    });
    video.srcObject = null;
  }
  detecting = false;
  scanOverlay.classList.remove("is-active");
  startBtn.innerHTML = svgCamera() + " " + t("startCamera");
  setStatus(t("tapToScan"));
}
function setStatus(text) {
  statusBadge.textContent = text;
}
function svgCamera() {
  return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>';
}
function svgPause() {
  return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
}

// ── Detection loop ────────────────────────────────────────────
video.addEventListener("play", function () {
  detecting = true;
  scanOverlay.classList.add("is-active");
  requestAnimationFrame(detect);
});
video.addEventListener("pause", function () {
  scanOverlay.classList.remove("is-active");
});
function detect() {
  if (!detecting || video.paused || video.ended) return;
  detector.detect(video).then(function (barcodes) {
    if (barcodes.length > 0 && barcodes[0].rawValue !== lastSnackValue) {
      var bc = barcodes[0];
      lastSnackValue = bc.rawValue;
      playDetectSound();
      showSnackbar(bc.rawValue, bc.format);
      videoWrapper.classList.remove("detected");
      videoWrapper.offsetWidth; // force reflow so animation re-triggers
      videoWrapper.classList.add("detected");
      video.pause();
      setTimeout(function () {
        videoWrapper.classList.remove("detected");
        video.play();
        lastSnackValue = null;
      }, 2000);
      return;
    }
    requestAnimationFrame(detect);
  })["catch"](function () {
    requestAnimationFrame(detect);
  });
}

// ── Detection sound (Web Audio API) ──────────────────────────
var audioCtx = null;
function playDetectSound() {
  try {
    var tone = function tone(freq, startTime, duration, gain) {
      var osc = audioCtx.createOscillator();
      var gainNode = audioCtx.createGain();
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Two-tone pleasant "ping": high note then a softer harmonic
    var now = audioCtx.currentTime;
    tone(1047, now, 0.18, 0.30); // C6 — main ping
    tone(1319, now + 0.09, 0.14, 0.18); // E6 — harmonic follow
  } catch (e) {
    // AudioContext blocked or unavailable — silently ignore
  }
}

// ── Snackbar ─────────────────────────────────────────────────
function showSnackbar(value, format) {
  clearTimeout(snackTimer);
  snackBadge.textContent = FORMAT_LABELS[format] || format.replace(/_/g, " ");
  snackValue.textContent = value;
  snackbar.classList.remove("is-visible");
  snackProgress.style.animation = "none";
  snackbar.hidden = false;
  snackbar.offsetHeight; // eslint-disable-line no-unused-expressions
  snackProgress.style.animation = "";
  snackbar.classList.add("is-visible");
  snackTimer = setTimeout(hideSnackbar, 4000);
}
function hideSnackbar() {
  snackbar.classList.remove("is-visible");
  snackbar.addEventListener("transitionend", function handler() {
    snackbar.hidden = true;
    snackbar.removeEventListener("transitionend", handler);
  });
}

// ── Copy button ───────────────────────────────────────────────
var CODE_RAW = ['<!DOCTYPE html>', '<html>', '<head>', '  <meta charset="utf-8" />', '  <title>Barcode Scanner</title>', '</head>', '<body>', '  <video id="v" autoplay muted playsinline style="width:100%"></video>', '', '  <script>', "    const video = document.getElementById('v');", '', '    navigator.mediaDevices', "      .getUserMedia({ video: { facingMode: 'environment' } })", '      .then(stream => (video.srcObject = stream));', '', '    const detector = new BarcodeDetector({', "      formats: ['qr_code', 'ean_13', 'code_128']", '    });', '', '    function scan() {', '      if (video.paused) return;', '      detector.detect(video).then(codes => {', '        if (codes.length > 0) {', "          alert(codes[0].format + ': ' + codes[0].rawValue);", '          video.pause();', '          setTimeout(() => video.play(), 2000);', '        }', '      });', '      requestAnimationFrame(scan);', '    }', '', "    video.addEventListener('play', () => setTimeout(scan, 500));", '  </script>', '</body>', '</html>'].join('\n');
function highlightCode(code) {
  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function sp(cls, s) {
    return '<span class="hl-' + cls + '">' + esc(s) + "</span>";
  }
  var JS_KEYWORDS = ["const", "let", "var", "function", "return", "if", "else", "new", "for", "while", "of", "in", "typeof"];
  var JS_BUILTINS = ["document", "navigator", "window", "console", "setTimeout", "requestAnimationFrame", "BarcodeDetector", "alert", "mediaDevices", "serviceWorker", "Promise"];
  var out = "";
  var pos = 0;
  var inScript = false;
  var n = code.length;
  while (pos < n) {
    // Script end tag
    if (inScript && code.slice(pos, pos + 9) === "</script>") {
      out += sp("tag-bracket", "</") + sp("tag-name", "script") + sp("tag-bracket", ">");
      pos += 9;
      inScript = false;
      continue;
    }
    if (inScript) {
      var ch = code[pos];

      // Line comment
      if (code.slice(pos, pos + 2) === "//") {
        var end = code.indexOf("\n", pos);
        if (end === -1) end = n;
        out += sp("comment", code.slice(pos, end));
        pos = end;
        continue;
      }

      // Single-quoted string
      if (ch === "'") {
        var j = pos + 1;
        while (j < n && code[j] !== "'" && code[j] !== "\n") {
          if (code[j] === "\\") j++;
          j++;
        }
        if (j < n && code[j] === "'") j++;
        out += sp("string", code.slice(pos, j));
        pos = j;
        continue;
      }

      // Backtick string
      if (ch === "`") {
        var j = pos + 1;
        while (j < n && code[j] !== "`") {
          if (code[j] === "\\") j++;
          j++;
        }
        if (j < n) j++;
        out += sp("string", code.slice(pos, j));
        pos = j;
        continue;
      }

      // Arrow =>
      if (code.slice(pos, pos + 2) === "=>") {
        out += sp("keyword", "=>");
        pos += 2;
        continue;
      }

      // Identifier / keyword / builtin
      if (/[a-zA-Z_$]/.test(ch)) {
        var j = pos;
        while (j < n && /[a-zA-Z0-9_$]/.test(code[j])) j++;
        var word = code.slice(pos, j);
        if (JS_KEYWORDS.indexOf(word) !== -1) {
          out += sp("keyword", word);
        } else if (JS_BUILTINS.indexOf(word) !== -1) {
          out += sp("builtin", word);
        } else {
          out += esc(word);
        }
        pos = j;
        continue;
      }

      // Number
      if (/[0-9]/.test(ch)) {
        var j = pos;
        while (j < n && /[0-9.]/.test(code[j])) j++;
        out += sp("number", code.slice(pos, j));
        pos = j;
        continue;
      }

      // Dot accessor — don't colour, but parse so identifiers after . aren't matched as builtins
      out += esc(ch);
      pos++;
    } else {
      // HTML mode
      var ch = code[pos];

      // DOCTYPE
      if (code.slice(pos, pos + 9).toUpperCase() === "<!DOCTYPE") {
        var end = code.indexOf(">", pos);
        if (end === -1) end = n - 1;
        out += sp("doctype", code.slice(pos, end + 1));
        pos = end + 1;
        continue;
      }

      // Opening / closing tag
      if (ch === "<") {
        var isClose = code[pos + 1] === "/";
        var nameStart = pos + (isClose ? 2 : 1);
        var j = nameStart;
        while (j < n && /[a-zA-Z0-9-]/.test(code[j])) j++;
        var tagName = code.slice(nameStart, j);
        if (tagName === "script") inScript = !isClose;
        out += sp("tag-bracket", isClose ? "</" : "<");
        out += sp("tag-name", tagName);
        pos = j;

        // Attributes
        while (pos < n && code[pos] !== ">") {
          // Self-close
          if (code.slice(pos, pos + 2) === "/>") {
            out += sp("tag-bracket", "/>");
            pos += 2;
            break;
          }
          // Attribute name
          if (/[a-zA-Z_:@*#.]/.test(code[pos])) {
            var k = pos;
            while (k < n && /[a-zA-Z0-9_:.-]/.test(code[k])) k++;
            out += sp("attr-name", code.slice(pos, k));
            pos = k;
            continue;
          }
          // = sign
          if (code[pos] === "=") {
            out += sp("tag-bracket", "=");
            pos++;
            continue;
          }
          // Attribute value (double-quoted)
          if (code[pos] === '"') {
            var k = code.indexOf('"', pos + 1);
            if (k === -1) k = n - 1;
            out += sp("attr-value", code.slice(pos, k + 1));
            pos = k + 1;
            continue;
          }
          out += esc(code[pos]);
          pos++;
        }

        // Closing >
        if (pos < n && code[pos] === ">") {
          out += sp("tag-bracket", ">");
          pos++;
        }
        continue;
      }
      out += esc(ch);
      pos++;
    }
  }
  return out;
}
copyBtn.addEventListener("click", function () {
  var ta = document.createElement("textarea");
  ta.value = CODE_RAW;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
  copyBtn.textContent = t("copiedBtn");
  copyBtn.classList.add("copied");
  setTimeout(function () {
    copyBtn.innerHTML = svgCopy() + " " + t("copyBtn");
    copyBtn.classList.remove("copied");
  }, 2000);
});
function svgCopy() {
  return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
}

// ── Language toggle ───────────────────────────────────────────
function updateLangToggle() {
  if (langFiEl) langFiEl.classList.toggle("is-active", LANG === "fi");
  if (langEnEl) langEnEl.classList.toggle("is-active", LANG === "en");
}
if (langToggle) {
  langToggle.addEventListener("click", function () {
    LANG = LANG === "fi" ? "en" : "fi";
    localStorage.setItem("lang", LANG);
    applyTranslations();
    updateLangToggle();
    // Refresh dynamic labels
    if (video.srcObject) {
      startBtn.innerHTML = svgPause() + " " + t("stopCamera");
      setStatus(t("scanning"));
    } else {
      startBtn.innerHTML = svgCamera() + " " + t("startCamera");
      setStatus(t("tapToScan"));
    }
    copyBtn.innerHTML = svgCopy() + " " + t("copyBtn");
    var liveBtn = document.getElementById("liveBtn");
    if (liveBtn) liveBtn.textContent = t("viewLiveBtn");
  });
}

// ── PWA install prompt ────────────────────────────────────────
window.addEventListener("beforeinstallprompt", function (e) {
  e.preventDefault();
  deferredInstallPrompt = e;
  if (installBtn) installBtn.hidden = false;
});
window.addEventListener("appinstalled", function () {
  if (installBtn) installBtn.hidden = true;
  deferredInstallPrompt = null;
});
if (installBtn) {
  installBtn.addEventListener("click", function () {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then(function () {
      deferredInstallPrompt = null;
      if (installBtn) installBtn.hidden = true;
    });
  });
}

// ── Sample barcode generation ─────────────────────────────────
function generateSamples() {
  var opts = {
    lineColor: "#e2e8f0",
    background: "transparent",
    displayValue: true,
    fontSize: 11,
    fontOptions: "bold",
    textMargin: 4,
    margin: 4,
    width: 1.4,
    height: 52
  };
  function o(extra) {
    return Object.assign({}, opts, extra);
  }
  qrcode__WEBPACK_IMPORTED_MODULE_2__.toCanvas(document.getElementById("qr-canvas"), "https://web-viivakoodi.vercel.app/", {
    width: 160,
    margin: 1,
    color: {
      dark: "#e2e8f0",
      light: "#00000000"
    }
  })["catch"](function () {});
  jsbarcode__WEBPACK_IMPORTED_MODULE_1___default()("#ean13-svg", "5901234123457", o({
    format: "EAN13"
  }));
  jsbarcode__WEBPACK_IMPORTED_MODULE_1___default()("#code128-svg", "WEB-BARCODE", o({
    format: "CODE128"
  }));
  jsbarcode__WEBPACK_IMPORTED_MODULE_1___default()("#code39-svg", "CODE39", o({
    format: "CODE39"
  }));
  jsbarcode__WEBPACK_IMPORTED_MODULE_1___default()("#ean8-svg", "96385074", o({
    format: "EAN8"
  }));
}

// ── Init ──────────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", function () {
  applyTranslations();
  updateLangToggle();
  generateSamples();

  // Render syntax-highlighted code example
  codeExample.innerHTML = highlightCode(CODE_RAW);

  // Set initial button state with SVG
  startBtn.innerHTML = svgCamera() + " " + t("startCamera");
  copyBtn.innerHTML = svgCopy() + " " + t("copyBtn");
  var liveBtn = document.getElementById("liveBtn");
  if (liveBtn) liveBtn.textContent = t("viewLiveBtn");
  setStatus(t("tapToScan"));
  if (!detector) {
    compatWarn.hidden = false;
    startBtn.disabled = true;
  }

  // Check if URL has ?action=scan shortcut (PWA shortcut)
  if (window.location.search.indexOf("action=scan") !== -1 && detector) {
    startCamera();
  }
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map