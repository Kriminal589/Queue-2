// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"classes/queue.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueueBlock = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var QueueBlock = /*#__PURE__*/function () {
  function QueueBlock(values, canAddQueue) {
    _classCallCheck(this, QueueBlock);

    this.values = values;
    this.min = true;
    this.canAddQueue = canAddQueue;
  }

  _createClass(QueueBlock, [{
    key: "ID",
    get: function get() {
      return this.values.idQueue;
    }
  }, {
    key: "toHtml",
    value: function toHtml() {
      return template(this.values);
    }
  }, {
    key: "toListHtml",
    value: function toListHtml(list) {
      return templateList(this.values, list, JSON.parse(localStorage.getItem("vk_auth")).uid);
    }
  }]);

  return QueueBlock;
}();

exports.QueueBlock = QueueBlock;

var template = function template(content) {
  return "\n    <div class=\"qItem\" id=\"".concat(content.idQueue, "\" data-action=\"open\" data-id=\"").concat(content.idQueue, "\" data-name=\"").concat(content.name, "\">\n      <div class=\"qName\">").concat(content.name, "</div>\n      <div class=\"qPos\">\u0412\u0430\u0448\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u044F: ").concat(content.positionStudent, "</div>\n      <div class=\"btn apply\" data-action=\"passed\" data-app=\"0\">\n        <span class=\"btn-text\">\u0421\u0434\u0430\u043B \u0437\u0430\u0434\u0430\u043D\u0438\u0435</span>\n      </div>\n    </div>\n    ");
};

function div(content) {
  var class_ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  return "<div class=\"".concat(class_, "\" id=\"").concat(id, "\">").concat(content, "</div>");
}

var templateList = function templateList(content, list, idStudent) {
  var HTML = div("<span>".concat(content.name, "</span>\n    <div class=\"btn_container flex-row\">\n        <div class=\"p_btn copy\" data-action=\"copy\" data-target=\"").concat(content.idQueue, "\"></div>\n        <div class=\"p_btn exit\" data-action=\"exit\" data-target=").concat(content.idQueue, "></div>\n    </div>\n    <div class=\"p_btn back\" data-action=\"back\"></div>"), "subject-name center-items");
  HTML += ul(list.responseAboutStudentList.map(function (item, index) {
    return "".concat(item.idStudent) === idStudent ? template_u(index) : template_list(item.nameOfStudent.replace("_", " "), index, "http://vk.com/id".concat(item.idStudent));
  }).join(""), "custom-scrollbar");
  return div(HTML, "qList", "queueBody");
};

var template_list = function template_list(content, index, vk_link) {
  return li("\n      <div class=\"position center-items\">".concat(index + 1, "</div>\n      <span class=\"name center-items\">").concat(content, "</span>\n      <div class=\"btn_container flex-row\">\n          <a class=\"btn vk\" href=").concat(vk_link, " data-action='link'>VK</a>\n          <div class=\"btn swap\" data-action=\"swap\" data-target=\"id\">SWAP</div>\n      </div>\n    "), 'item center-items');
};

var ul = function ul(content, class_, id) {
  return "<ul class=".concat(class_, " id=\"").concat(id, "\">").concat(content, "</ul>");
};

var li = function li(content, class_, id) {
  return "<li class=".concat(class_, " id=\"").concat(id, "\">").concat(content, "</li>");
};

var template_u = function template_u(index) {
  return li("<div class=\"position center-items\">".concat(index + 1, "</div><span class=\"center-items\">\u0412\u044B</span>"), 'item u center-items');
};
},{}],"classes/loadBar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$LoadBar = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var $LoadBar = /*#__PURE__*/function () {
  function $LoadBar() {
    _classCallCheck(this, $LoadBar);
  }

  _createClass($LoadBar, [{
    key: "load",
    value: function load(id) {
      var $load = document.createElement('div');
      $load.classList.add('load');
      $load.id = id.hashCode();
      $load.classList.add('center-items');
      $load.innerHTML = '<div class="square border-2px"></div>';
      document.body.appendChild($load);
      this.id = id;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var $load = document.getElementById(this.id.hashCode());

      if ($load) {
        document.body.removeChild($load);
      }
    }
  }]);

  return $LoadBar;
}();

exports.$LoadBar = $LoadBar;

String.prototype.hashCode = function () {
  var hash = 0,
      i,
      chr;
  if (this.length === 0) return hash;

  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
};
},{}],"../node_modules/parcel-bundler/src/builtins/_empty.js":[function(require,module,exports) {

},{}],"classes/serverReq.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serverRequest = void 0;

var _loadBar = require("./loadBar");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

"use strict";

require("fs");

var ip = "25.84.228.15";
var port = "8080";

var serverRequest = /*#__PURE__*/function () {
  function serverRequest() {
    _classCallCheck(this, serverRequest);
  }

  _createClass(serverRequest, null, [{
    key: "addStudent",
    value: function () {
      var _addStudent = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(idS, name) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return sendRequestAsync("student/add?id=".concat(idS, "&NameOfStudent=").concat(name.replace(" ", "_")));

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function addStudent(_x, _x2) {
        return _addStudent.apply(this, arguments);
      }

      return addStudent;
    }()
  }, {
    key: "getQueuesById",
    value: function () {
      var _getQueuesById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(idS) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return sendRequestAsync("listOfQueues/getByIdStudent/".concat(idS));

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getQueuesById(_x3) {
        return _getQueuesById.apply(this, arguments);
      }

      return getQueuesById;
    }()
  }, {
    key: "getQueuePropertyById",
    value: function () {
      var _getQueuePropertyById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(idQ) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return sendRequestAsync("queue/get/".concat(idQ));

              case 2:
                return _context3.abrupt("return", _context3.sent);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getQueuePropertyById(_x4) {
        return _getQueuePropertyById.apply(this, arguments);
      }

      return getQueuePropertyById;
    }()
  }, {
    key: "getListOfStudentInQueueById",
    value: function () {
      var _getListOfStudentInQueueById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(idQ) {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return sendRequestAsync("listOfQueues/getByIdQueue/".concat(idQ));

              case 2:
                return _context4.abrupt("return", _context4.sent);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getListOfStudentInQueueById(_x5) {
        return _getListOfStudentInQueueById.apply(this, arguments);
      }

      return getListOfStudentInQueueById;
    }()
  }, {
    key: "getAllStudent",
    value: function () {
      var _getAllStudent = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return sendRequestAsync("student/all");

              case 2:
                return _context5.abrupt("return", _context5.sent);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getAllStudent() {
        return _getAllStudent.apply(this, arguments);
      }

      return getAllStudent;
    }()
  }, {
    key: "appendQ",
    value: function () {
      var _appendQ = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(idS, hash, app) {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return sendRequestAsync("listOfQueues/add/".concat(hash, "/").concat(idS, "/").concat(app));

              case 2:
                return _context6.abrupt("return", _context6.sent);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function appendQ(_x6, _x7, _x8) {
        return _appendQ.apply(this, arguments);
      }

      return appendQ;
    }()
  }, {
    key: "getListNotice",
    value: function () {
      var _getListNotice = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(id) {
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", []);

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function getListNotice(_x9) {
        return _getListNotice.apply(this, arguments);
      }

      return getListNotice;
    }()
  }, {
    key: "leaveFromQueue",
    value: function () {
      var _leaveFromQueue = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(idQueue, idStudent) {
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return sendRequestAsync("listOfQueues/ByIdStudentAndQueue/".concat(idStudent, "/").concat(idQueue));

              case 2:
                return _context8.abrupt("return", _context8.sent);

              case 3:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function leaveFromQueue(_x10, _x11) {
        return _leaveFromQueue.apply(this, arguments);
      }

      return leaveFromQueue;
    }()
  }, {
    key: "createQ",
    value: function () {
      var _createQ = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(name, type, dependOnApps, CountApps, DependOnDate, DateToPass, idS) {
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return sendRequestAsync("queue/add?subjectName=".concat(name, "&type=").concat(boolToInt(type), "&dependOnApps=").concat(boolToInt(dependOnApps), "&countApps=").concat(CountApps, "&dependOnDate=").concat(boolToInt(DependOnDate), "&dateToPass=").concat(DateToPass, "&idStudent=").concat(idS));

              case 2:
                return _context9.abrupt("return", _context9.sent);

              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function createQ(_x12, _x13, _x14, _x15, _x16, _x17, _x18) {
        return _createQ.apply(this, arguments);
      }

      return createQ;
    }()
  }]);

  return serverRequest;
}();

exports.serverRequest = serverRequest;

var boolToInt = function boolToInt(int) {
  return int ? 1 : 0;
};

function sendRequestAsync(_x19) {
  return _sendRequestAsync.apply(this, arguments);
}

function _sendRequestAsync() {
  _sendRequestAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(url_to) {
    var url, loadbar, response;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            url = "https://".concat(ip, ":").concat(port, "/").concat(url_to);
            loadbar = new _loadBar.$LoadBar();
            loadbar.load(url_to);
            _context10.prev = 3;
            _context10.next = 6;
            return fetch(url, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: JSON.stringify("12345")
              }
            });

          case 6:
            response = _context10.sent;
            loadbar.destroy(url_to);
            return _context10.abrupt("return", response.json());

          case 11:
            _context10.prev = 11;
            _context10.t0 = _context10["catch"](3);
            loadbar.destroy(url_to);
            return _context10.abrupt("return", -1);

          case 15:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[3, 11]]);
  }));
  return _sendRequestAsync.apply(this, arguments);
}
},{"./loadBar":"classes/loadBar.js","fs":"../node_modules/parcel-bundler/src/builtins/_empty.js"}],"plugins/ApplyNotice.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apply = void 0;

var apply = function apply(text) {
  var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    id: 0,
    html: "",
    type: ""
  };
  return new Promise(function (resolve, reject) {
    var $apply = document.createElement("div");
    $apply.classList.add("modal", "visible", "center-items", "flex-column");
    $apply.tabIndex = 0;
    $apply.id = "modal-apply";
    $apply.dataset.action = "close";
    $apply.innerHTML = "\n\t\t\t<div class=\"notice apply padding-content center-items shadow flex-column\">\n\t\t\t".concat(text, "\n\t\t\t").concat(content.html || "", "\n\t\t\t<div class=\"btn-container flex-row\">\n\t\t\t\t\t<div class=\"btn apply\" data-action=\"ok\">\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C</div>\n\t\t\t\t\t<div class=\"btn close\" data-action=\"cancel\">\u041E\u0442\u043C\u0435\u043D\u0430</div>\n\t\t\t</div>\n\t\t\t</div>\n\t\t");
    document.body.appendChild($apply);

    var toggleStateById = function toggleStateById(id, flag, message) {
      var $elem = document.getElementById(id);

      if (flag) {
        $elem.classList.remove('error', message === 1 ? 'message' : message === 2 ? 'type_err' : null);
        $elem.classList.add('success');
      } else {
        $elem.classList.add('error', message === 1 ? 'message' : message === 2 ? 'type_err' : null);
        $elem.classList.remove('success');
      }
    };

    if (content.type === 'input') {
      var $input = document.getElementById(content.id);

      $input.oninput = function (e) {
        e.preventDefault();
        var number = e.target.valueAsNumber;

        if (number > 100 || number <= 0 || isNaN(parseInt(e.data)) && e.data) {
          e.target.value = '';
          toggleStateById(e.target.parentNode.id, 0, 2);
        } else {
          toggleStateById(e.target.parentNode.id, 1);
        }
      };
    } // $apply.onkeydown = e => {
    //     e.preventDefault()
    //     console.log(e.key);
    //     if (e.key === 'escape') {
    //         resolve(false);
    //         document.body.removeChild($apply);
    //     }
    // }


    $apply.addEventListener("click", function (e) {
      var action = e.target.dataset.action;

      if (action) {
        console.log("clicked on btn ".concat(action));

        if (action === "ok") {
          if (content.type === 'input') {
            var value = document.getElementById(content.id).value;

            if (value) {
              resolve(value);
            } else {
              toggleStateById('input_a', 0, 1);
            }
          } else {
            resolve(true);
          }
        }

        resolve(false);
        document.body.removeChild($apply);
      }
    });
  });
};

exports.apply = apply;
},{}],"util/util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Auth = Auth;
exports.ReloadName = ReloadName;
exports.validSession = exports.setPage = exports.openModal = exports.getTimeUnix = exports.getStateModal = exports.getPage = exports.getName = exports.getId = exports.createQueueText = exports.copyToClipboard = exports.closeModal = exports.applyInvite = void 0;

var _serverReq = require("../classes/serverReq");

var applyInvite = function applyInvite(href, id) {};

exports.applyInvite = applyInvite;

var closeModal = function closeModal() {
  document.getElementById("modal").classList.remove("visible");
};

exports.closeModal = closeModal;

var openModal = function openModal() {
  document.getElementById("modal").classList.add("visible");
};

exports.openModal = openModal;

var getStateModal = function getStateModal() {
  return document.getElementById("modal").classList.contains("visible");
};

exports.getStateModal = getStateModal;

var getTimeUnix = function getTimeUnix() {
  return Date.now() / 1000 | 0;
};

exports.getTimeUnix = getTimeUnix;

function ReloadName() {
  var name = JSON.parse(localStorage.getItem("vk_auth")).name;
  if (name) document.getElementById("name_holder").innerHTML = name;
}

var getName = function getName() {
  return JSON.parse(localStorage.getItem("vk_auth")).name;
};

exports.getName = getName;

var getId = function getId() {
  return JSON.parse(localStorage.getItem("vk_auth")).id;
};

exports.getId = getId;

var validSession = function validSession() {
  var data = JSON.parse(localStorage.getItem("vk_auth"));
  return data && data.expire > getTimeUnix();
};

exports.validSession = validSession;

var getPage = function getPage() {
  return localStorage.getItem("page");
};

exports.getPage = getPage;

var setPage = function setPage(value) {
  return localStorage.setItem("page", value);
};

exports.setPage = setPage;

function Auth(callback) {
  if (validSession()) {
    callback(false);
  } else {
    new Promise(function (resolve, reject) {
      var $btn_auth = document.createElement("div");
      $btn_auth.classList.add("modal", "center-items", "visible");
      $btn_auth.id = "modal";
      $btn_auth.innerHTML += "\n        <div class=\"btn auth\" id=\"btn_vk_auth\" data-action=\"login\">\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F \u0447\u0435\u0440\u0435\u0437 \u0412\u041A</div>\n      ";
      document.body.appendChild($btn_auth);
      $btn_auth.addEventListener("click", function (e) {
        var action = e.target.dataset.action;

        if (action === "login") {
          VK.Auth.login(function (data) {
            if (data.session) {
              console.log("auth | success");
              var _data$session = data.session,
                  expire = _data$session.expire,
                  user = _data$session.user;
              var id = user.id,
                  first_name = user.first_name,
                  last_name = user.last_name;
              localStorage.setItem("vk_auth", JSON.stringify({
                expire: expire,
                id: id,
                name: "".concat(first_name, " ").concat(last_name)
              }));
              document.body.removeChild($btn_auth);

              _serverReq.serverRequest.addStudent(id, "".concat(first_name, " ").concat(last_name));

              resolve(false);
            } else {
              resolve(true);
            }
          });
        }
      });
    }).then(callback);
  }
}

var createQueueText = function createQueueText(list) {
  return list.map(function (item, index) {
    return "".concat(index + 1, " ").concat(item.nameOfStudent);
  }).join('\n');
};

exports.createQueueText = createQueueText;

var copyToClipboard = function copyToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
    // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
    return window.clipboardData.setData("Text", text);
  } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
    var textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.

    document.body.appendChild(textarea);
    textarea.select();

    try {
      return document.execCommand("copy"); // Security exception may be thrown by some browsers.
    } catch (ex) {
      console.warn("Copy to clipboard failed.", ex);
      return prompt("Copy to clipboard: Ctrl+C, Enter", text);
    } finally {
      document.body.removeChild(textarea);
    }
  }
};

exports.copyToClipboard = copyToClipboard;
},{"../classes/serverReq":"classes/serverReq.js"}],"classes/notice.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notice = exports.InviteApply = exports.$notice = void 0;

var _serverReq = require("./serverReq");

var _ApplyNotice = require("../plugins/ApplyNotice");

var _util = require("../util/util");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Notice = /*#__PURE__*/function () {
  function Notice(id) {
    _classCallCheck(this, Notice);

    this.id = id;
    this.setup();
  }

  _createClass(Notice, [{
    key: "setup",
    value: function setup() {
      //this.noticeList = await getListNotice(this.id);
      this.noticeList = [{
        type: "invite",
        id: 0,
        Qname: "История",
        Qhash: "hAY90La"
      }, {
        type: "swap",
        id: 1,
        Q: {
          hash: "lAWDuo31",
          name: "Английский"
        },
        sender: {
          id: 25,
          name: "Андрей Новиков",
          position: 5
        },
        recipient: {
          id: 89,
          position: 9
        }
      }, {
        type: "update",
        update: {
          version: "0.4.13",
          codeName: "Круто все",
          vkLink: "vk.com"
        }
      }];
    }
  }, {
    key: "renderNotice",
    value: function renderNotice() {
      document.getElementById("modal-notice").innerHTML = "\n\t\t<div class=\"notice Ntitle padding-content center-items\">\u0412\u0430\u0448\u0438 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F<div class=\"btn back\" data-action=\"close\"></div></div>\n\t\t\t".concat(this.listToHtml(), "\n\t\t");
    }
  }, {
    key: "open",
    value: function open() {
      this.$notice = document.createElement("div");
      this.$notice.classList.add("modal", "visible", "center-items", "flex-column");
      this.$notice.id = "modal-notice";
      this.$notice.dataset.action = "close";
      document.body.appendChild(this.$notice);
      this.renderNotice();
      this.$notice.addEventListener("click", this.clickHandler.bind(this));
    }
  }, {
    key: "close",
    value: function close() {
      this.$notice.removeEventListener("click", this.clickHandler);
      document.body.removeChild(this.$notice);
    }
  }, {
    key: "clickHandler",
    value: function clickHandler(e) {
      var _this = this;

      var action = e.target.dataset.action;
      var content = e.target.dataset.content;

      if (action) {
        console.log("Clicked on notice {id:".concat(e.target.id, ", action:").concat(action, ", content:").concat(content, "}"));

        switch (action) {
          case "close":
            {
              this.close();
              break;
            }

          case "apply":
            {
              (0, _ApplyNotice.apply)("Введите номер задания", {
                id: 'apps_input',
                type: 'input',
                html: input()
              }).then(function (data) {
                if (data) {
                  _this.noticeList = _this.noticeList.filter(function (item) {
                    return item.id !== +content;
                  }); // !serverReq

                  _this.renderNotice();
                }
              });
              break;
            }

          case "swap":
            {
              this.noticeList = this.noticeList.filter(function (item) {
                return item.id !== +content;
              });
              this.renderNotice();
              console.log(content);
              break;
            }

          case "delete":
            {
              (0, _ApplyNotice.apply)("Вы точно хотите удалить это уведомление?").then(function (data) {
                if (data) {
                  _this.noticeList = _this.noticeList.filter(function (item) {
                    return item.id !== +content;
                  }); // !serverReq

                  _this.renderNotice();
                }
              });
              console.log("notice ".concat(content, " is deleted.")); // !serverReq

              break;
            }

          case "readMore":
            {
              console.log(content);
              break;
            }
        }
      }
    }
  }, {
    key: "listToHtml",
    value: function listToHtml() {
      return this.noticeList.length > 0 ? this.noticeList.map(function (item) {
        switch (item.type) {
          case "invite":
            {
              return "\n\t\t\t\t\t\t\t<div class=\"notice invite padding-content center-items flex-column\" id=".concat(item.id, ">\n\t\t\t\t\t\t\t\t\u041F\u0440\u0438\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0435 \u0432 \u043E\u0447\u0435\u0440\u0435\u0434\u044C ").concat(item.Qname, "\n\t\t\t\t\t\t\t\t<div class=\"btn-container flex-row\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"btn apply\" data-action=\"apply\" data-content=").concat(item.id, " data-src=").concat(item.Qhash, ">\u041F\u0440\u0438\u043D\u044F\u0442\u044C</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"btn close\" data-action=\"delete\" data-content=").concat(item.id, ">\u041E\u0442\u043A\u0430\u0437\u0430\u0442\u044C\u0441\u044F</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t");
            }

          case "swap":
            {
              return "\n\t\t\t\t\t\t\t<div class=\"notice swap padding-content center-items flex-column\" id=".concat(item.id, ">\n\t\t\t\t\t\t\t\t\u0421\u0442\u0443\u0434\u0435\u043D\u0442 ").concat(item.sender.name, " \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u0442 \u0432\u0430\u043C \u043F\u043E\u043C\u0435\u043D\u044F\u0442\u044C\u0441\u044F \u0441 \u043D\u0438\u043C \u043C\u0435\u0441\u0442\u0430\u043C\u0438\n\t\t\t\t\t\t\t\t<div class=\"swap-state\">\n\t\t\t\t\t\t\t\t\t\t").concat(item.Q.name, " :\n\t\t\t\t\t\t\t\t\t\t<span class=").concat(item.sender.position > item.recipient.position ? "red" : "green", ">").concat(item.recipient.position, "</span> \n\t\t\t\t\t\t\t\t\t\t-> \n\t\t\t\t\t\t\t\t\t\t<span class=").concat(item.sender.position > item.recipient.position ? "green" : "red", ">").concat(item.sender.position, "</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"btn-container flex-row\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"btn apply\" data-action=\"swap\" data-content=").concat(item.id, " data-src=\"").concat(item.sender.id, "|").concat(item.recipient.id, "|").concat(item.Q.hash, "\">\u041F\u0440\u0438\u043D\u044F\u0442\u044C</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"btn close\" data-action=\"delete\" data-content=").concat(item.id, ">\u041E\u0442\u043A\u0430\u0437\u0430\u0442\u044C\u0441\u044F</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t");
            }

          case "update":
            {
              return "\n\t\t\t\t\t\t\t<div class=\"notice update padding-content center-items flex-row\">\n\t\t\t\t\t\t\t\t\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 ".concat(item.update.version, " ").concat(item.update.codeName, "\n\t\t\t\t\t\t\t\t<div class=\"btn readMore\" data-action=\"readMore\" data-content=").concat(item.update.vkLink, ">\n\t\t\t\t\t\t\t\t\t<a href=").concat(item.update.vkLink, ">\u0423\u0437\u043D\u0430\u0442\u044C \u043E\u0431 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F\u0445</a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t");
            }
        }
      }).join("") : "<div class=\"notice padding-content center-items border-2px\">\u0422\u0443\u0442 \u043F\u0443\u0441\u0442\u043E :)</div>";
    }
  }]);

  return Notice;
}();

exports.Notice = Notice;

var InviteApply = function InviteApply(hash) {
  (0, _ApplyNotice.apply)("Введите номер задания", {
    id: 'apps_input',
    type: 'input',
    html: input()
  }).then(function (data) {
    if (data) {
      var id = (0, _util.getId)();

      _serverReq.serverRequest.appendQ(id, hash, data).then(function (response) {
        history.pushState('', document.title, window.location.pathname);
        window.location.reload();

        if (response !== -1) {
          console.log("student ".concat(id, " with app ").concat(data, " added to Q hash:").concat(hash));
        } else {
          $notice('Данная ссылка не работает!');
        }
      });
    }
  });
};

exports.InviteApply = InviteApply;

var input = function input() {
  return "\n    <div class=\"input_group\" id=\"input_a\">\n        <input id=\"apps_input\" type=\"number\" min=\"1\" max=\"99\" maxlength=\"2\" data-to=\"CountApps\" autocomplete=\"off\" required=\"\">\n        <label class=\"field_name\">\u0412\u0430\u0448\u0430 \u0437\u0430\u0434\u0430\u0447\u0430</label>\n        <i class=\"fi fi-rs-check\"></i>\n        <i class=\"fi fi-rs-exclamation\"></i>\n        <div class=\"error_message center-items\">\n            \u041F\u043E\u043B\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043E!\n        </div>\n        <div class=\"error_type center-items\">\n            \u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 \u0441\u0438\u043C\u0432\u043E\u043B \u0438\u043B\u0438 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435!\n        </div>\n    </div>\n";
};

var $notice = function $notice(text) {
  var cooldown = 5000;
  var $nt = document.createElement("div");
  $nt.classList.add("notification", "center-items");
  $nt.innerHTML = "\n        <div class=\"notification-content padding-content\">\n            ".concat(text, "\n            <div class=\"countdown\"></div>\n        </div>\n    ");
  document.body.appendChild($nt);
  new Promise(function (resolve, reject) {
    setTimeout(resolve, cooldown);
  }).then(function () {
    document.body.removeChild($nt);
  });
};

exports.$notice = $notice;
},{"./serverReq":"classes/serverReq.js","../plugins/ApplyNotice":"plugins/ApplyNotice.js","../util/util":"util/util.js"}],"classes/Qmaker.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$Qmaker = void 0;

var _notice = require("./notice");

var _ApplyNotice = require("../plugins/ApplyNotice");

var capitalize = function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1) || "";
};

var $Qmaker = function $Qmaker(callback) {
  function open() {
    var $f = document.createElement("div");
    $f.classList.add("modal", "visible", "center-items");
    $f.dataset.action = "close";
    $f.innerHTML = pattern();
    document.body.appendChild($f);
    return $f;
  }

  var options = false;

  var controlInput = function controlInput(e) {
    e.preventDefault();
    var number = e.target.valueAsNumber;

    if (number > 100 || number <= 0 || isNaN(parseInt(e.data)) && e.data) {
      e.target.value = '';
      toggleStateById(e.target.parentNode.id, 0, 2);
    } else {
      toggleStateById(e.target.parentNode.id, 1);
    }
  };

  var __popup__ = open();

  function _close() {
    document.body.removeChild(__popup__);
  } //? inputs


  var $name = document.getElementById('input_name');
  var $apps = document.getElementById('input_apps');
  var $date = document.getElementById('input_date'); //? buttons

  var $cmnB = document.getElementById('C_btn');
  var $smrB = document.getElementById('S_btn');

  var toggleStateById = function toggleStateById(id, flag, message) {
    var $elem = document.getElementById(id);

    if (flag) {
      $elem.classList.remove('error', message === 1 ? 'message' : message === 2 ? 'type_err' : null);
      $elem.classList.add('success');
    } else {
      $elem.classList.add('error', message === 1 ? 'message' : message === 2 ? 'type_err' : null);
      $elem.classList.remove('success');
    }
  };

  var parseValues = function parseValues() {
    return {
      name: $name.value.trim(),
      type: options,
      dependOnApps: options ? $apps.value ? 1 : 0 : 0,
      CountApps: options ? $apps.value || 0 : 0,
      dependOnDate: options ? $date.value ? 1 : 0 : 0,
      DateToPass: options ? $date.value || 0 : 0
    };
  };

  var checkInputs = function checkInputs() {
    if ($name.value) {
      toggleStateById('name_input', 1);
    } else {
      toggleStateById('name_input', 0, 1);
    }

    if (options) {
      if (!$apps.value && !$date.value) {
        toggleStateById('apps_input', 0, 1);
        toggleStateById('date_input', 0, 1);
      } else {
        if ($apps.value) toggleStateById('apps_input', 1);
        if ($date.value) toggleStateById('date_input', 1);
      }
    }

    return $name.value && (options ? $apps.value || $date.value : true);
  };

  function toggleState() {
    $cmnB.classList.toggle('active');
    $smrB.classList.toggle('active');
    options = $smrB.classList.contains('active');
  }

  var actions = {
    switch: function _switch(id) {
      var $btn = document.getElementById(id);

      if (!$btn.classList.contains('active')) {
        toggleState();
        if (id === 'C_btn') document.getElementById('smart_options').classList.remove('active');else document.getElementById('smart_options').classList.add('active');
      }
    },
    close: function close() {
      (0, _ApplyNotice.apply)('Вы точно хотите отменить создание очереди?').then(function (e) {
        if (e) _close();
      });
    },
    create: function create() {
      if (checkInputs()) {
        var _options = parseValues();

        (0, _ApplyNotice.apply)('Подтвердите создание очереди с параметрами', {
          type: 'div',
          html: "\n\t\t\t\t\t\t<div class=\"options center-items flex-column w100\">\n\t\t\t\t\t\t\t<div class=\"sp_btw\"><span>\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043E\u0447\u0435\u0440\u0435\u0434\u0438</span> <i>".concat(_options.name, "</i></div>\n\t\t\t\t\t\t\t<div class=\"sp_btw\"><span>\u0422\u0438\u043F \u043E\u0447\u0435\u0440\u0435\u0434\u0438</span> <i>").concat(!_options.type ? 'обычная' : 'умная', "</i></div>\n\t\t\t\t\t\t\t").concat(_options.dependOnApps ? "\n\t\t\t\t\t\t\t\t<div class=\"sp_btw\"><span>\u0417\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u044C \u043E\u0442 \u043A\u043E\u043B-\u0432\u0430 \u0437\u0430\u0434\u0430\u0447</span> <i>".concat(_options.dependOnApps ? '+' : '-', "</i></div>\n\t\t\t\t\t\t\t\t<div class=\"sp_btw\"><span>\u041A\u043E\u043B-\u0432\u043E \u0437\u0430\u0434\u0430\u0447</span> <i>").concat(_options.CountApps, "</i></div>\n\t\t\t\t\t\t\t\t") : '', "\n\t\t\t\t\t\t\t").concat(_options.dependOnDate ? "\n\t\t\t\t\t\t\t\t<div class=\"sp_btw\"><span>\u0417\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u044C \u043E\u0442 \u0434\u0430\u0442\u044B</span> <i>".concat(_options.dependOnDate ? '+' : '-', "</i></div>\n\t\t\t\t\t\t\t\t<div class=\"sp_btw\"><span>\u041A\u043E\u043B-\u0432\u043E \u0437\u0430\u043D\u044F\u0442\u0438\u0439 \u043D\u0430 \u0441\u0434\u0430\u0447\u0443</span> <i>").concat(_options.DateToPass, "</i></div>\n\t\t\t\t\t\t\t\t") : '', "\n\t\t\t\t\t\t</div>\n\t\t\t\t\t"),
          id: null
        }).then(function (e) {
          if (e) {
            callback(parseValues());
            (0, _notice.$notice)("\u041E\u0447\u0435\u0440\u0435\u0434\u044C ".concat($name.value, " \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D\u0430"));

            _close();
          }
        });
      } else {//! Добавить подсказки
      }
    }
  };

  __popup__.addEventListener("click", function (e) {
    e.preventDefault();
    var action = e.target.dataset.action;

    if (action) {
      actions[action](e.target.id);
    }
  });

  $name.oninput = function (e) {
    toggleStateById('name_input', e.target.value);

    if (e.data === ' ') {
      e.target.value = e.target.value.replace(' ', '');
    }
  };

  $apps.oninput = controlInput;
  $date.oninput = controlInput;
};

exports.$Qmaker = $Qmaker;

var pattern = function pattern() {
  return "\n<div class=\"form padding-content center-items-inline shadow\">\n\t<span class=\"Qtitle\">\u041A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440 \u043E\u0447\u0435\u0440\u0435\u0434\u0435\u0439</span>\n\n\t<div class=\"input_group\" id=\"name_input\">\n\t\t<input id=\"input_name\" type=\"text\" maxlength=\"32\" data-to=\"name\" autocomplete=\"off\" required/>\n\t\t<label class=\"field_name\">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043E\u0447\u0435\u0440\u0435\u0434\u0438</label>\n\t\t<i class=\"fi fi-rs-check\"></i>\n\t\t<i class=\"fi fi-rs-exclamation\"></i>\n\t\t<div class=\"error_message center-items\">\n\t\t\t\u041F\u043E\u043B\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043E!\n\t\t</div>\n\t</div>\n\n\t<div class=\"type_selector flex-row\">\n\t\t<div class=\"common padding-content center-items active\" data-action=\"switch\" id=\"C_btn\">\u041E\u0431\u044B\u0447\u043D\u0430\u044F</div>\n\t\t<div class=\"smart padding-content center-items\" data-action=\"switch\" id=\"S_btn\">\u0423\u043C\u043D\u0430\u044F</div>\n\t</div>\n\n\t<div class=\"smart_options flex-column\" id=\"smart_options\">\n\t\t<div class=\"qm_title flex-row center-items\">\n\t\t\t<span>\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0443\u043C\u043D\u043E\u0439 \u043E\u0447\u0435\u0440\u0435\u0434\u0438</span>\n\t\t\t<div class=\"info center-items\">i</div>\n\t\t</div>\n\t\t<div class=\"input_group\" id=\"apps_input\">\n\t\t\t<input id=\"input_apps\" type=\"number\" min=\"1\" max=\"99\" maxlength=\"2\" data-to=\"CountApps\" autocomplete=\"off\" required/>\n\t\t\t<label class=\"field_name\">\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0437\u0430\u0434\u0430\u0447</label>\n\t\t\t<i class=\"fi fi-rs-check\"></i>\n\t\t\t<i class=\"fi fi-rs-exclamation\"></i>\n\t\t\t<div class=\"error_message center-items\">\n\t\t\t\t\u0425\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u043D\u043E \u043F\u043E\u043B\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043E!\n\t\t\t</div>\n\t\t\t<div class=\"error_type center-items\">\n\t\t\t\t\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 \u0441\u0438\u043C\u0432\u043E\u043B \u0438\u043B\u0438 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435!\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"input_group\" id=\"date_input\">\n\t\t\t<input id=\"input_date\" type=\"number\" min=\"1\" max=\"99\" maxlength=\"2\" data-to=\"DateToPass\" autocomplete=\"off\" required/>\n\t\t\t<label class=\"field_name\">\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0437\u0430\u043D\u044F\u0442\u0438\u0439 \u0434\u043B\u044F \u0441\u0434\u0430\u0447\u0438</label>\n\t\t\t<i class=\"fi fi-rs-check\"></i>\n\t\t\t<i class=\"fi fi-rs-exclamation\"></i>\n\t\t\t<div class=\"error_message center-items\">\n\t\t\t\t\u0425\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u043D\u043E \u043F\u043E\u043B\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043E!\n\t\t\t</div>\n\t\t\t<div class=\"error_type center-items\">\n\t\t\t\t\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 \u0441\u0438\u043C\u0432\u043E\u043B \u0438\u043B\u0438 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435!\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"btn_container flex-row\">\n\t\t<div class=\"btn\" data-action=\"create\" id=\"create\">\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043E\u0447\u0435\u0440\u0435\u0434\u044C</div>\n\t\t<div class=\"btn\" data-action=\"close\" id=\"close\">\u041E\u0442\u043C\u0435\u043D\u0430</div>\n\t</div>\n</div>\n";
};
},{"./notice":"classes/notice.js","../plugins/ApplyNotice":"plugins/ApplyNotice.js"}],"classes/Qlist.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QList = void 0;

var _queue = require("./queue");

var _serverReq = require("./serverReq");

var _Qmaker = require("./Qmaker");

var _notice = require("../classes/notice");

var _util = require("../util/util");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _list = /*#__PURE__*/new WeakMap();

var QList = /*#__PURE__*/function () {
  function QList() {
    _classCallCheck(this, QList);

    _classPrivateFieldInitSpec(this, _list, {
      writable: true,
      value: []
    });

    this.selected = null;
    this.min = true;
    this.canAddQueue = false;
    this.eventListeners = false;
    this.previewSelected = -1;
    this.setup();
  }

  _createClass(QList, [{
    key: "parseListOfQueues",
    value: function () {
      var _parseListOfQueues = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _this = this;

        var values;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _serverReq.serverRequest.getQueuesById((0, _util.getId)());

              case 2:
                values = _context2.sent;

                _classPrivateFieldSet(this, _list, []);

                if (!(values != -1)) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 7;
                return Promise.all(values.map( /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(item) {
                    var name, idQueue, positionStudent;
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return _serverReq.serverRequest.getQueuePropertyById(item.idQueue);

                          case 2:
                            name = _context.sent.subjectName;
                            idQueue = item.idQueue, positionStudent = item.positionStudent;

                            _classPrivateFieldGet(_this, _list).push(new _queue.QueueBlock({
                              idQueue: idQueue,
                              name: name,
                              positionStudent: positionStudent
                            }, _this.canAddQueue));

                          case 5:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }()));

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function parseListOfQueues() {
        return _parseListOfQueues.apply(this, arguments);
      }

      return parseListOfQueues;
    }()
  }, {
    key: "clear",
    value: function clear() {
      _classPrivateFieldSet(this, _list, []);

      this.selected = null;
      this.min = true;
      this.allMin();
    }
  }, {
    key: "setup",
    value: function setup() {}
  }, {
    key: "toHtml",
    value: function () {
      var _toHtml = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var html;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.min) {
                  _context3.next = 4;
                  break;
                }

                _context3.t0 = _classPrivateFieldGet(this, _list).map(function (item) {
                  return item.toHtml();
                }).join("");
                _context3.next = 9;
                break;

              case 4:
                _context3.t1 = this.selected;
                _context3.next = 7;
                return _serverReq.serverRequest.getListOfStudentInQueueById(this.selected.ID);

              case 7:
                _context3.t2 = _context3.sent;
                _context3.t0 = _context3.t1.toListHtml.call(_context3.t1, _context3.t2);

              case 9:
                html = _context3.t0;

                if (this.min && this.canAddQueue) {
                  html += "\n                <div class=\"QmakerContainer center-items\" data-action=\"create\">\n                    <div class=\"Qmaker center-items\" id=\"Qmaker\" data-action=\"create\">\n                        \u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043E\u0447\u0435\u0440\u0435\u0434\u044C\n                    </div>\n                </div>\n            ";
                }

                return _context3.abrupt("return", html);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function toHtml() {
        return _toHtml.apply(this, arguments);
      }

      return toHtml;
    }()
  }, {
    key: "render",
    value: function () {
      var _render = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.toHtml();

              case 2:
                document.getElementById("content-main").innerHTML = _context4.sent;
                if (this.min) //this.addQuicklook();
                  if (!this.eventListeners) this.addEventListeners();

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function render() {
        return _render.apply(this, arguments);
      }

      return render;
    }()
    /**
     *
     * @param {MouseEvent} e
     */

  }, {
    key: "quicklook",
    value: function quicklook(e) {
      var _this2 = this;

      e.preventDefault();

      if (e.target.dataset.action === "open" && (e.ctrlKey || e.metaKey) && this.previewSelected === -1) {
        _serverReq.serverRequest.getListOfStudentInQueueById(e.target.id).then(function (data) {
          _this2.previewSelected = e.target.id;
          _this2.$__preview__ = document.createElement("div");

          _this2.$__preview__.classList.add("quicklook", "center-items", "flex-column");

          _this2.$__preview__.innerHTML = "<div class=\"quicklook__title\">QuickLook</div><span>".concat(e.target.dataset.name, ":</span>");
          _this2.$__preview__.innerHTML += data.responseAboutStudentList.map(function (item, index) {
            return "<div class=\"quicklook__item ".concat(item.idStudent === (0, _util.getId)() ? "u" : "", "\">").concat(index + 1, " ").concat(item.nameOfStudent, "</div>");
          }).join('');
          e.target.appendChild(_this2.$__preview__);
        });
      }
    }
    /**
     *
     * @param {MouseEvent} e
     */

  }, {
    key: "closeQuicklook",
    value: function closeQuicklook(e) {
      e.preventDefault();

      if (this.previewSelected === e.target.id) {
        e.currentTarget.removeChild(this.$__preview__);
        this.previewSelected = -1;
      }
    }
  }, {
    key: "addQuicklook",
    value: function addQuicklook() {
      var _this3 = this;

      document.querySelectorAll(".qItem").forEach(function (elem) {
        elem.addEventListener("mouseover", _this3.quicklook.bind(_this3));
        elem.addEventListener("mouseleave", _this3.closeQuicklook.bind(_this3));
      });
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var _this4 = this;

      if (_classPrivateFieldGet(this, _list).length > 0 || this.canAddQueue) {
        this.eventListeners = true;
        document.getElementById("content-main").addEventListener("click", function (e) {
          e.preventDefault();
          var action = e.target.dataset.action;

          if (action) {
            switch (action) {
              case "open":
                {
                  console.log("open");
                  _this4.selected = _classPrivateFieldGet(_this4, _list).find(function (item) {
                    return item.ID === +e.target.dataset.id;
                  });
                  _this4.selected.min = false;
                  _this4.min = false;

                  _this4.render();

                  break;
                }

              case "back":
                {
                  _this4.allMin();

                  _this4.selected = null;

                  _this4.render();

                  break;
                }

              case "copy":
                {
                  _serverReq.serverRequest.getListOfStudentInQueueById(+e.target.dataset.id).then(function (item) {
                    (0, _util.copyToClipboard)((0, _util.createQueueText)(item.responseAboutStudentList));
                    (0, _notice.$notice)("Очередь скопирована в буфер обмена");
                  });

                  break;
                }

              case "create":
                {
                  (0, _Qmaker.$Qmaker)( /*#__PURE__*/function () {
                    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(options) {
                      var name, type, dependOnApps, CountApps, DependOnDate, DateToPass, hash;
                      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              name = options.name, type = options.type, dependOnApps = options.dependOnApps, CountApps = options.CountApps, DependOnDate = options.DependOnDate, DateToPass = options.DateToPass;
                              _context5.next = 3;
                              return _serverReq.serverRequest.createQ(name, type, dependOnApps, CountApps, DependOnDate, DateToPass, (0, _util.getId)());

                            case 3:
                              hash = _context5.sent.response;
                              (0, _util.copyToClipboard)("http://25.85.15.23:1234/#".concat(hash));
                              _context5.next = 7;
                              return _this4.render();

                            case 7:
                            case "end":
                              return _context5.stop();
                          }
                        }
                      }, _callee5);
                    }));

                    return function (_x2) {
                      return _ref2.apply(this, arguments);
                    };
                  }());
                  break;
                }

              case "delete":
                {
                  break;
                }

              case "exit":
                {
                  _serverReq.serverRequest.leaveFromQueue(e.target.dataset.target, (0, _util.getId)()).then(function () {//window.location.reload();
                  });
                }
            }
          }
        }, true);
      }
    }
  }, {
    key: "deleteEventListeners",
    value: function deleteEventListeners() {}
  }, {
    key: "backButtonClick",
    value: function backButtonClick() {
      this.allMin();
      this.min = true;
      this.selected = null;
      this.deleteEventListeners();
      this.render();
    }
  }, {
    key: "allMin",
    value: function allMin() {
      this.min = true;

      _classPrivateFieldGet(this, _list).forEach(function (item) {
        return item.min = true;
      });
    }
  }]);

  return QList;
}();

exports.QList = QList;
},{"./queue":"classes/queue.js","./serverReq":"classes/serverReq.js","./Qmaker":"classes/Qmaker.js","../classes/notice":"classes/notice.js","../util/util":"util/util.js"}],"plugins/modal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$modalWindow = void 0;

var $modalWindow = function $modalWindow(content) {
  var open = function open() {
    var $modal = document.createElement('div');
    $modal.classList.add('modal', 'visible', 'center-items');
    $modal.dataset.action = 'close';
    $modal.innerHTML += "\n      <div class=\"content flex-column center-items padding-content\">\n        <div class=\"btn close center-items\" data-action='close'>X</div>\n        <div class=\"modal_title center-items\">".concat(content.title, "</div>\n        ").concat(parseContent(content), "\n      </div>\n    ");
    document.body.appendChild($modal);
    return $modal;
  };

  var __popup__ = open();

  __popup__.addEventListener('click', function (e) {
    e.preventDefault();
    var action = e.target.dataset.action;

    if (action) {
      document.body.removeChild(__popup__);
    }
  });
};

exports.$modalWindow = $modalWindow;

var parseContent = function parseContent(content) {
  return content.elements.map(function (el) {
    return "<".concat(el.type, " class=").concat(el.class || '', " id=").concat(el.id || '', ">").concat(el.innerHTML || '', "</").concat(el.type, ">");
  }).join('');
};
/*

{
  title : 'DOAPW',
  elements : [
    {
      type : 'div',
      innerHtml : "mdaw",
      class : '',
      id : ""
    },
    {

    }
  ],
  buttons : [
    'ok',
    'close'
  ]
}

*/
},{}],"classes/App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;

var _Qlist = require("./Qlist");

var _serverReq = require("./serverReq");

var _util = require("../util/util");

var _notice2 = require("./notice");

var _modal = require("../plugins/modal");

var _Qmaker = require("./Qmaker");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _qList = /*#__PURE__*/new WeakMap();

var _notice = /*#__PURE__*/new WeakMap();

var _header = /*#__PURE__*/new WeakSet();

var _main = /*#__PURE__*/new WeakSet();

var _footer = /*#__PURE__*/new WeakSet();

var _setup = /*#__PURE__*/new WeakSet();

var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);

    _classPrivateMethodInitSpec(this, _setup);

    _classPrivateMethodInitSpec(this, _footer);

    _classPrivateMethodInitSpec(this, _main);

    _classPrivateMethodInitSpec(this, _header);

    _classPrivateFieldInitSpec(this, _qList, {
      writable: true,
      value: new _Qlist.QList()
    });

    _classPrivateFieldInitSpec(this, _notice, {
      writable: true,
      value: new _notice2.Notice(45)
    });

    this.error = false;

    _classPrivateMethodGet(this, _setup, _setup2).call(this);
  }

  _createClass(App, [{
    key: "show_error",
    value: function show_error() {
      document.getElementById("content-main").innerHTML = '<div class="error">Сайт не работает. Звоните фиксикам или попробуйте обновить страницу :)</div>';
    }
  }, {
    key: "openHome",
    value: function openHome() {
      (0, _util.setPage)('home');
      window.location.reload();
    }
  }, {
    key: "openNotice",
    value: function openNotice() {
      _classPrivateFieldGet(this, _notice).open();

      console.log('notifications list open.');
    }
  }, {
    key: "render",
    value: function render() {
      (0, _util.ReloadName)();

      if (this.error) {
        this.show_error();
      } else {
        //const data = JSON.parse(localStorage.getItem("vk_auth")).name
        _classPrivateFieldGet(this, _qList).render();

        console.log("render...");
      }
    }
  }]);

  return App;
}();

exports.App = App;

function _header2() {
  var $header = document.createElement('header');
  $header.classList.add('center-items-inline');
  $header.innerHTML = "\n    <div class=\"container center-items-inline\">\n      <div class=\"logo border-2px\"></div>\n      <span class=\"title\">\u0423\u0434\u043E\u0431\u043D\u0430\u044F \u043E\u0447\u0435\u0440\u0435\u0434\u044C</span>\n    </div>\n    <div class=\"profile center-items-inline\">\n        <div class=\"name center-items\" id=\"name_holder\"></div>\n        <div class=\"p_btn notice_btn center-items padding-lr\" id=\"noticeList\"></div>\n        <div class=\"p_btn home center-items padding-lr\" id=\"home\"></div>\n        <div class=\"p_btn logout center-items padding-lr\" id=\"logout\"></div>\n    </div>";
  document.body.appendChild($header);
}

function _main2() {
  var $main = document.createElement('main');
  $main.classList.add('flex-space-center-wrap');
  $main.id = 'content-main';
  document.body.appendChild($main);
}

function _footer2() {
  var $footer = document.createElement('footer');
  $footer.classList.add('center-items-inline');
  $footer.innerHTML = "\n    <div class=\"dev flex-row\">\n      <span>\u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0438:</span>\n      <div class=\"link center-items padding-lr\" data-action=\"open_modal\" data-target=\"kriminal589\">@Kriminal589</div>\n      <div class=\"link center-items padding-lr\" data-action=\"open_modal\" data-target=\"viltskaa\">@Viltskaa</div>\n    </div>";
  document.body.appendChild($footer);
}

function _setup2() {
  return _setup3.apply(this, arguments);
}

function _setup3() {
  _setup3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var _JSON$parse, id, name, response;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            document.body.innerHTML = '';

            _classPrivateMethodGet(this, _header, _header2).call(this);

            _classPrivateMethodGet(this, _main, _main2).call(this);

            _classPrivateMethodGet(this, _footer, _footer2).call(this);

            (0, _util.setPage)('main');

            document.getElementById("logout").onclick = function () {
              (0, _util.setPage)('home');
              console.log('logout init');
              VK.Auth.getLoginStatus(function (response) {
                if (response) {
                  VK.Auth.logout(function (data) {
                    console.log(data);
                    localStorage.removeItem('vk_auth');
                    document.location.reload();
                  });
                }
              });
            };

            document.getElementById('noticeList').addEventListener('click', this.openNotice.bind(this));
            document.getElementById('home').addEventListener('click', this.openHome.bind(this));
            document.querySelectorAll('.link').forEach(function (item) {
              item.addEventListener('click', function (e) {
                e.preventDefault();
                (0, _modal.$modalWindow)({
                  title: item.dataset.target,
                  elements: [{
                    type: 'div',
                    innerHTML: 'vk',
                    class: 'dev-item center-items'
                  }, {
                    type: 'div',
                    innerHTML: 'github',
                    class: 'dev-item center-items'
                  }]
                });
              });
            });
            _JSON$parse = JSON.parse(localStorage.getItem("vk_auth")), id = _JSON$parse.id, name = _JSON$parse.name;
            _context.next = 12;
            return _serverReq.serverRequest.addStudent(id, name);

          case 12:
            response = _context.sent;
            _classPrivateFieldGet(this, _qList).canAddQueue = response.response || false;

            if (!(response === -1)) {
              _context.next = 18;
              break;
            }

            this.error = true;
            _context.next = 20;
            break;

          case 18:
            _context.next = 20;
            return _classPrivateFieldGet(this, _qList).parseListOfQueues(id);

          case 20:
            this.render();

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _setup3.apply(this, arguments);
}
},{"./Qlist":"classes/Qlist.js","./serverReq":"classes/serverReq.js","../util/util":"util/util.js","./notice":"classes/notice.js","../plugins/modal":"plugins/modal.js","./Qmaker":"classes/Qmaker.js"}],"plugins/homepage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homepage = void 0;

var _util = require("../util/util");

var homepage = function homepage(callback) {
  new Promise(function (resolve, reject) {
    var session = (0, _util.validSession)();
    if ((0, _util.getPage)() !== "home" && session) resolve(false);
    var $page = document.createElement("div");
    $page.classList.add("homepage");
    $page.innerHTML = "\n            <div class=\"circle\" id=\"a\"></div>\n            <div class=\"square\" id=\"b\"></div>\n            <div class=\"homepage_content flex-row\">\n                <div class=\"left flex-column\">\n                    <div class=\"nav flex-row\">\n                        <div class=\"h_btn about\" data-action=\"about\">\u0421\u0435\u0440\u0432\u0438\u0441</div>\n                        <div class=\"h_btn link\" data-action=\"link\">\u0421\u0432\u044F\u0437\u044C</div>\n                    </div>\n\n                    <div class=\"homepage_title flex-column\">\n                        <span>\u0423\u0434\u043E\u0431\u043D\u0430\u044F</span>\n                        <span>\u041E\u0447\u0435\u0440\u0435\u0434\u044C</span>\n                        <span>\u0434\u043B\u044F \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432</span>\n                        <span>\u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u0430\u044F \u0442\u0430\u043A\u0438\u043C\u0438 \u0436\u0435 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430\u043C\u0438</span>\n                    </div>\n                    ".concat(session ? '<div class="authbtn center-items" data-action="close">Перейти к очередям</div>' : '<div class="authbtn center-items" data-action="auth">Авторизация через Вконтакте</div>', "\n                </div>\n                <div class=\"right center-items\">\n                    <div class=\"news_page custom-scrollbar\">\n                        <div class=\"news_item center-items\">\n                            <div class=\"news_title\">\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 1.1</div>\n                            <div class=\"description\">lol</div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ");
    document.body.appendChild($page);
    $page.addEventListener("click", function (e) {
      var action = e.target.dataset.action;

      if (action) {
        switch (action) {
          case "auth":
            {
              VK.Auth.login(function (data) {
                if (data.session) {
                  console.log("auth | success");
                  var _data$session = data.session,
                      expire = _data$session.expire,
                      user = _data$session.user;
                  var id = user.id,
                      first_name = user.first_name,
                      last_name = user.last_name;
                  localStorage.setItem("vk_auth", JSON.stringify({
                    expire: expire,
                    id: id,
                    name: "".concat(first_name, " ").concat(last_name)
                  }));
                  document.body.removeChild($page);
                  resolve(false);
                } else {
                  resolve(true);
                }
              });
              break;
            }

          case "close":
            {
              document.body.removeChild($page);
              resolve(false);
            }
        }
      }
    });
  }).then(callback);
};

exports.homepage = homepage;
},{"../util/util":"util/util.js"}],"index.js":[function(require,module,exports) {
"use strict";

require("./styles/main.scss");

var _App = require("./classes/App");

var _util = require("./util/util");

var _notice = require("./classes/notice");

var _homepage = require("./plugins/homepage");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

window.onload = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

var main = function main(error) {
  var app = new _App.App();

  if (error) {
    app.error = true;
    app.render();
  }
};
},{"./styles/main.scss":"styles/main.scss","./classes/App":"classes/App.js","./util/util":"util/util.js","./classes/notice":"classes/notice.js","./plugins/homepage":"plugins/homepage.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "25.85.15.23" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52623" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map