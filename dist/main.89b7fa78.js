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
})({"types/todomodel.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Todo =
/** @class */
function () {
  function Todo(id, name, description, state) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.state = state;
  }

  return Todo;
}();

exports.Todo = Todo;
},{}],"types/enums.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var State;

(function (State) {
  State[State["Active"] = 1] = "Active";
  State[State["Complete"] = 2] = "Complete";
})(State = exports.State || (exports.State = {}));
},{}],"types/todoservice.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var todomodel_1 = require("./todomodel");

var enums_1 = require("./enums");

var TodoService =
/** @class */
function () {
  function TodoService(todos) {
    var _this = this;

    this.allTodo = [];
    var data = JSON.parse(localStorage.getItem('tasks'));

    if (!data) {
      data = todos;
    }

    data.map(function (item) {
      _this.allTodo.push(new todomodel_1.Todo(item.id, item.name, item.description, item.state));
    }); // save storage

    localStorage.setItem('tasks', JSON.stringify(this.allTodo));
  }

  TodoService.prototype.addTodo = function (id, name, desc) {
    var newTodo = new todomodel_1.Todo(id, name, desc, enums_1.State.Active);
    this.allTodo.push(newTodo);
    localStorage.setItem('tasks', JSON.stringify(this.allTodo));
    return newTodo;
  };

  TodoService.prototype.removeTodo = function (id) {
    this.allTodo = this.allTodo.filter(function (item) {
      return item.id !== id;
    }); // save storage

    localStorage.setItem('tasks', JSON.stringify(this.allTodo));
    return true;
  };

  TodoService.prototype.completeTodo = function (id) {
    var todoItem = this.allTodo.find(function (item) {
      return item.id === id;
    });
    todoItem.state = todoItem.state === enums_1.State.Active ? enums_1.State.Complete : enums_1.State.Active; // save storage

    localStorage.setItem('tasks', JSON.stringify(this.allTodo));
  };

  TodoService.prototype.getAll = function () {
    return this.allTodo;
  };

  TodoService.prototype.generateId = function () {
    return this.allTodo[this.allTodo.length - 1].id + 1;
  };

  return TodoService;
}();

exports.default = TodoService;
},{"./todomodel":"types/todomodel.ts","./enums":"types/enums.ts"}],"types/todoapp.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var todoservice_1 = __importDefault(require("./todoservice"));

var TodoApp =
/** @class */
function () {
  function TodoApp(todos) {
    this.todoService = new todoservice_1.default(todos);
    this.loadTodos();
  }

  TodoApp.prototype.initialize = function () {
    var _this = this;

    var list = document.getElementById('todos');
    var nameInput = document.getElementById('name');
    var descInput = document.getElementById('desc');
    var form = document.getElementById('todo-form');
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (nameInput.value && descInput.value) {
        var newTodo = _this.todoService.addTodo(_this.todoService.generateId(), nameInput.value, descInput.value);

        list.innerHTML += _this.renderItem(newTodo.id, newTodo.name, newTodo.description, newTodo.state);
        form.reset();
        nameInput.focus();
        console.log(_this.todoService.getAll());
      }
    });
    list.addEventListener('change', function (e) {
      var input = event.target;

      if (input.type === 'checkbox') {
        var todoItem = input.parentElement;
        var id = input.getAttribute('data-id');

        _this.todoService.completeTodo(parseInt(id));

        todoItem.classList.toggle('complete');
      }
    });
    list.addEventListener('click', function (e) {
      var removeBtn = event.target;

      if (removeBtn.id === 'remove') {
        var todoItem = removeBtn.parentElement;
        var id = removeBtn.getAttribute('data-id');

        _this.todoService.removeTodo(parseInt(id));

        todoItem.parentNode.removeChild(todoItem);
      }
    });
  };

  TodoApp.prototype.loadTodos = function () {
    var _this = this;

    var list = document.getElementById('todos');
    var todos = this.todoService.getAll();
    todos.map(function (item) {
      list.innerHTML += _this.renderItem(item.id, item.name, item.description, item.state);
    });
  };

  TodoApp.prototype.renderItem = function (id, name, desc, state) {
    var checked = state === 1 ? '' : 'checked';
    var completeClass = state === 1 ? '' : 'complete';
    var item = "<li><p id=\"todo-item\" class=\"" + completeClass + "\">\n      <input data-id=\"" + id + "\" type=\"checkbox\" id=\"state\" " + checked + "><b>" + name + ": </b>" + desc + "</p> <span data-id=\"" + id + "\" id=\"remove\">&#4030;</span>\n      </li>";
    return item;
  };

  return TodoApp;
}();

exports.TodoApp = TodoApp;
},{"./todoservice":"types/todoservice.ts"}],"types/main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var todoapp_1 = require("./todoapp");

var todos = [{
  id: 1,
  name: 'Basic Design',
  description: 'design analysis',
  state: 2
}, {
  id: 2,
  name: 'Function Design',
  description: 'design analysis',
  state: 1
}, {
  id: 3,
  name: 'Make Code',
  description: 'implement code for features',
  state: 1
}];
var app = new todoapp_1.TodoApp(todos);
app.initialize();
},{"./todoapp":"types/todoapp.ts"}],"../../../../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "37131" + '/');

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
},{}]},{},["../../../../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js","types/main.ts"], null)