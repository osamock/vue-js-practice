webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(4);

var _vuex2 = _interopRequireDefault(_vuex);

var _BookAPI = __webpack_require__(9);

var BookAPI = _interopRequireWildcard(_BookAPI);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

var store = new _vuex2.default.Store({

  state: {
    books: null
  },

  mutations: {
    set: function set(state, books) {
      state.books = books;
    }
  },

  actions: {
    getAsync: function getAsync(context) {
      BookAPI.get().then(function (books) {
        return context.commit('set', books);
      });
    },
    postAsync: function postAsync(context, book) {
      BookAPI.post(book).then(function () {
        return context.dispatch('getAsync');
      });
    },
    putAsync: function putAsync(context, book) {
      BookAPI.put(book).then(function () {
        return context.dispatch('getAsync');
      });
    },
    removeAsync: function removeAsync(context, id) {
      BookAPI.remove(id).then(function () {
        return context.dispatch('getAsync');
      });
    }
  }
});

exports.default = store;

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(3);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _BookList = __webpack_require__(7);

var _BookList2 = _interopRequireDefault(_BookList);

var _Book = __webpack_require__(11);

var _Book2 = _interopRequireDefault(_Book);

var _BookAdd = __webpack_require__(14);

var _BookAdd2 = _interopRequireDefault(_BookAdd);

var _BookEdit = __webpack_require__(17);

var _BookEdit2 = _interopRequireDefault(_BookEdit);

var _BookRemove = __webpack_require__(20);

var _BookRemove2 = _interopRequireDefault(_BookRemove);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

var router = new _vueRouter2.default({
  routes: [{ path: '/', component: _BookList2.default }, { path: '/books/:book_id', component: _Book2.default, name: 'book' }, { path: '/add-books', component: _BookAdd2.default, name: 'add' }, { path: '/books/:book_id', component: _BookEdit2.default, name: 'edit' }, { path: '/books/:book_id', component: _BookRemove2.default, name: 'remove' }]
});
new _vue2.default({
  router: router,
  template: '<router-view></router-view>'
}).$mount('#app');

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BookList_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BookList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BookList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c8915ba0_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_BookList_vue__ = __webpack_require__(10);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BookList_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c8915ba0_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_BookList_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components/book/BookList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] BookList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c8915ba0", Component.options)
  } else {
    hotAPI.reload("data-v-c8915ba0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

var _store = __webpack_require__(2);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var BookList = _vue2.default.extend({
  created: function created() {
    _store2.default.dispatch('getAsync');
  },
  data: function data() {
    return {
      searchTitle: ''
    };
  },

  computed: {
    filterBooks: function filterBooks() {
      var _this = this;

      var books = _store2.default.state.books;

      if (books !== null) {
        return Object.values(books).filter(function (book) {
          return book.title.indexOf(_this.searchTitle) !== -1;
        });
      }
    }
  }
});

exports.default = BookList;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var get = exports.get = function get() {
  return fetch('http://localhost:3000/books').then(function (response) {
    return response.json();
  }).then(function (books) {
    return books.reduce(function (a, b) {
      return _extends({}, a, _defineProperty({}, b.id, b));
    }, {});
  });
};

var post = exports.post = function post(book) {
  return fetch('http://localhost:3000/books', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(book)
  });
};

var put = exports.put = function put(book) {
  return fetch('http://localhost:3000/books/' + book.id, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(book)
  });
};

var remove = exports.remove = function remove(id) {
  return fetch('http://localhost:3000/books/' + id, {
    method: 'DELETE'
  });
};

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', [_c('div', [_c('router-link', {
    attrs: {
      "to": {
        name: 'add'
      }
    }
  }, [_vm._v("Create New Book")])], 1), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.searchTitle),
      expression: "searchTitle"
    }],
    attrs: {
      "type": "search",
      "placeholder": "title"
    },
    domProps: {
      "value": (_vm.searchTitle)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.searchTitle = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.filterBooks) ? _c('ul', _vm._l((_vm.filterBooks), function(ref) {
    var id = ref.id;
    var title = ref.title;
    var price = ref.price;

    return _c('li', [_c('router-link', {
      attrs: {
        "to": {
          name: 'book',
          params: {
            book_id: id
          }
        }
      }
    }, [_vm._v(_vm._s(id) + ":" + _vm._s(title) + "@" + _vm._s(price))]), _vm._v(" "), _c('router-link', {
      attrs: {
        "to": {
          name: 'edit',
          params: {
            book_id: id
          }
        }
      }
    }, [_vm._v("Edit")]), _vm._v(" "), _c('router-link', {
      attrs: {
        "to": {
          name: 'remove',
          params: {
            book_id: id
          }
        }
      }
    }, [_vm._v("Remove")])], 1)
  })) : _vm._e()])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c8915ba0", esExports)
  }
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Book_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Book_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Book_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5d42b972_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Book_vue__ = __webpack_require__(13);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Book_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5d42b972_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Book_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components/book/Book.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Book.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d42b972", Component.options)
  } else {
    hotAPI.reload("data-v-5d42b972", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

var _store = __webpack_require__(2);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//

var Book = _vue2.default.extend({
  computed: {
    book: function book() {
      var books = _store2.default.state.books;

      if (books !== null) {
        return books[this.$route.params.book_id];
      }
      this.$router.push('/');
    }
  }
});

exports.default = Book;

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', [(_vm.book) ? _c('div', [_c('h2', [_vm._v(_vm._s(_vm.book.title))]), _vm._v(" "), _c('h4', [_vm._v("価格：" + _vm._s(_vm.book.price))]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": {
        name: '/'
      }
    }
  }, [_vm._v("Back to Book List")])], 1) : _vm._e()])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5d42b972", esExports)
  }
}

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BookAdd_vue__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BookAdd_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BookAdd_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b5ba4502_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_BookAdd_vue__ = __webpack_require__(16);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BookAdd_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b5ba4502_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_BookAdd_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components/book/BookAdd.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] BookAdd.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b5ba4502", Component.options)
  } else {
    hotAPI.reload("data-v-b5ba4502", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

var _store = __webpack_require__(2);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var BookAdd = _vue2.default.extend({
  data: function data() {
    return {
      book: { title: '', price: '' }
    };
  },

  methods: {
    create: function create() {
      _store2.default.dispatch('postAsync', this.book);
      this.$router.push('/');
    }
  }
});

exports.default = BookAdd;

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', [_c('h2', [_vm._v("Create New Book")]), _vm._v(" "), _c('form', {
    on: {
      "submit": _vm.create
    }
  }, [_c('p', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.book.title),
      expression: "book.title"
    }],
    attrs: {
      "placeholder": "title",
      "required": ""
    },
    domProps: {
      "value": (_vm.book.title)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.book.title = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('p', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.book.price),
      expression: "book.price"
    }],
    attrs: {
      "placeholder": "price",
      "required": "",
      "type": "number"
    },
    domProps: {
      "value": (_vm.book.price)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.book.price = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('button', [_vm._v("Create")]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": {
        name: '/'
      }
    }
  }, [_vm._v("Cancel")])], 1)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b5ba4502", esExports)
  }
}

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BookEdit_vue__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BookEdit_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BookEdit_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_aa010cc8_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_BookEdit_vue__ = __webpack_require__(19);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BookEdit_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_aa010cc8_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_BookEdit_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components/book/BookEdit.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] BookEdit.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-aa010cc8", Component.options)
  } else {
    hotAPI.reload("data-v-aa010cc8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

var _store = __webpack_require__(2);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var BookEdit = _vue2.default.extend({
  data: function data() {
    var books = _store2.default.state.books;

    if (books !== null) {
      return {
        book: books[this.$route.params.book_id]
      };
    }
    this.$router.push('/');
  },

  methods: {
    update: function update() {
      _store2.default.dispatch('putAsync', this.book);
      this.$router.push('/');
    }
  }
});

exports.default = BookEdit;

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', [_c('h2', [_vm._v("Edit New Book")]), _vm._v(" "), (_vm.book) ? _c('form', {
    on: {
      "submit": _vm.update
    }
  }, [_c('p', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.book.title),
      expression: "book.title"
    }],
    attrs: {
      "placeholder": "title",
      "required": ""
    },
    domProps: {
      "value": (_vm.book.title)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.book.title = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('p', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.book.price),
      expression: "book.price"
    }],
    attrs: {
      "placeholder": "price",
      "required": "",
      "type": "number"
    },
    domProps: {
      "value": (_vm.book.price)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.book.price = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('button', [_vm._v("Update")]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": {
        name: '/'
      }
    }
  }, [_vm._v("Cancel")])], 1) : _vm._e()])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-aa010cc8", esExports)
  }
}

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BookRemove_vue__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BookRemove_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BookRemove_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_144cbed4_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_BookRemove_vue__ = __webpack_require__(22);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BookRemove_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_144cbed4_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_BookRemove_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components/book/BookRemove.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] BookRemove.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-144cbed4", Component.options)
  } else {
    hotAPI.reload("data-v-144cbed4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

var _store = __webpack_require__(2);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//

var BookRemove = _vue2.default.extend({
  computed: {
    book: function book() {
      var books = _store2.default.state.books;

      if (books !== null) {
        return books[this.$route.params.book_id];
      }
      this.$router.push('/');
    }
  },
  methods: {
    remove: function remove() {
      _store2.default.dispatch('removeAsync', this.book.id);
      this.$router.push('/');
    }
  }
});

exports.default = BookRemove;

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', [(_vm.book) ? _c('form', {
    on: {
      "submit": _vm.remove
    }
  }, [_c('h2', [_vm._v("Delete " + _vm._s(_vm.book.title))]), _vm._v(" "), _c('button', [_vm._v("Remove")]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": {
        name: '/'
      }
    }
  }, [_vm._v("Cancel")])], 1) : _vm._e()])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-144cbed4", esExports)
  }
}

/***/ })
],[5]);