/****lib/document-register-element.js****/
/*! (C) WebReflection Mit Style License */
(function(e,t,n,r){"use strict";function rt(e,t){for(var n=0,r=e.length;n<r;n++)dt(e[n],t)}function it(e){for(var t=0,n=e.length,r;t<n;t++)r=e[t],nt(r,b[ot(r)])}function st(e){return function(t){j(t)&&(dt(t,e),rt(t.querySelectorAll(w),e))}}function ot(e){var t=e.getAttribute("is"),n=e.nodeName.toUpperCase(),r=S.call(y,t?v+t.toUpperCase():d+n);return t&&-1<r&&!ut(n,t)?-1:r}function ut(e,t){return-1<w.indexOf(e+'[is="'+t+'"]')}function at(e){var t=e.currentTarget,n=e.attrChange,r=e.prevValue,i=e.newValue;Q&&t.attributeChangedCallback&&e.attrName!=="style"&&t.attributeChangedCallback(e.attrName,n===e[a]?null:r,n===e[l]?null:i)}function ft(e){var t=st(e);return function(e){X.push(t,e.target)}}function lt(e){K&&(K=!1,e.currentTarget.removeEventListener(h,lt)),rt((e.target||t).querySelectorAll(w),e.detail===o?o:s),B&&pt()}function ct(e,t){var n=this;q.call(n,e,t),G.call(n,{target:n})}function ht(e,t){D(e,t),et?et.observe(e,z):(J&&(e.setAttribute=ct,e[i]=Z(e),e.addEventListener(p,G)),e.addEventListener(c,at)),e.createdCallback&&Q&&(e.created=!0,e.createdCallback(),e.created=!1)}function pt(){for(var e,t=0,n=F.length;t<n;t++)e=F[t],E.contains(e)||(F.splice(t,1),dt(e,o))}function dt(e,t){var n,r=ot(e);-1<r&&(tt(e,b[r]),r=0,t===s&&!e[s]?(e[o]=!1,e[s]=!0,r=1,B&&S.call(F,e)<0&&F.push(e)):t===o&&!e[o]&&(e[s]=!1,e[o]=!0,r=1),r&&(n=e[t+"Callback"])&&n.call(e))}if(r in t)return;var i="__"+r+(Math.random()*1e5>>0),s="attached",o="detached",u="extends",a="ADDITION",f="MODIFICATION",l="REMOVAL",c="DOMAttrModified",h="DOMContentLoaded",p="DOMSubtreeModified",d="<",v="=",m=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,g=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],y=[],b=[],w="",E=t.documentElement,S=y.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},x=n.prototype,T=x.hasOwnProperty,N=x.isPrototypeOf,C=n.defineProperty,k=n.getOwnPropertyDescriptor,L=n.getOwnPropertyNames,A=n.getPrototypeOf,O=n.setPrototypeOf,M=!!n.__proto__,_=n.create||function vt(e){return e?(vt.prototype=e,new vt):this},D=O||(M?function(e,t){return e.__proto__=t,e}:L&&k?function(){function e(e,t){for(var n,r=L(t),i=0,s=r.length;i<s;i++)n=r[i],T.call(e,n)||C(e,n,k(t,n))}return function(t,n){do e(t,n);while((n=A(n))&&!N.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),P=e.MutationObserver||e.WebKitMutationObserver,H=(e.HTMLElement||e.Element||e.Node).prototype,B=!N.call(H,E),j=B?function(e){return e.nodeType===1}:function(e){return N.call(H,e)},F=B&&[],I=H.cloneNode,q=H.setAttribute,R=H.removeAttribute,U=t.createElement,z=P&&{attributes:!0,characterData:!0,attributeOldValue:!0},W=P||function(e){J=!1,E.removeEventListener(c,W)},X,V=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,10)},$=!1,J=!0,K=!0,Q=!0,G,Y,Z,et,tt,nt;O||M?(tt=function(e,t){N.call(t,e)||ht(e,t)},nt=ht):(tt=function(e,t){e[i]||(e[i]=n(!0),ht(e,t))},nt=tt),B?(J=!1,function(){var e=k(H,"addEventListener"),t=e.value,n=function(e){var t=new CustomEvent(c,{bubbles:!0});t.attrName=e,t.prevValue=this.getAttribute(e),t.newValue=null,t[l]=t.attrChange=2,R.call(this,e),this.dispatchEvent(t)},r=function(e,t){var n=this.hasAttribute(e),r=n&&this.getAttribute(e),i=new CustomEvent(c,{bubbles:!0});q.call(this,e,t),i.attrName=e,i.prevValue=n?r:null,i.newValue=t,n?i[f]=i.attrChange=1:i[a]=i.attrChange=0,this.dispatchEvent(i)},s=function(e){var t=e.currentTarget,n=t[i],r=e.propertyName,s;n.hasOwnProperty(r)&&(n=n[r],s=new CustomEvent(c,{bubbles:!0}),s.attrName=n.name,s.prevValue=n.value||null,s.newValue=n.value=t[r]||null,s.prevValue==null?s[a]=s.attrChange=0:s[f]=s.attrChange=1,t.dispatchEvent(s))};e.value=function(e,o,u){e===c&&this.attributeChangedCallback&&this.setAttribute!==r&&(this[i]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",s)),t.call(this,e,o,u)},C(H,"addEventListener",e)}()):P||(E.addEventListener(c,W),E.setAttribute(i,1),E.removeAttribute(i),J&&(G=function(e){var t=this,n,r,s;if(t===e.target){n=t[i],t[i]=r=Z(t);for(s in r){if(!(s in n))return Y(0,t,s,n[s],r[s],a);if(r[s]!==n[s])return Y(1,t,s,n[s],r[s],f)}for(s in n)if(!(s in r))return Y(2,t,s,n[s],r[s],l)}},Y=function(e,t,n,r,i,s){var o={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};o[s]=e,at(o)},Z=function(e){for(var t,n,r={},i=e.attributes,s=0,o=i.length;s<o;s++)t=i[s],n=t.name,n!=="setAttribute"&&(r[n]=t.value);return r})),t[r]=function(n,r){p=n.toUpperCase(),$||($=!0,P?(et=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new P(function(r){for(var i,s,o=0,u=r.length;o<u;o++)i=r[o],i.type==="childList"?(n(i.addedNodes,e),n(i.removedNodes,t)):(s=i.target,Q&&s.attributeChangedCallback&&i.attributeName!=="style"&&s.attributeChangedCallback(i.attributeName,i.oldValue,s.getAttribute(i.attributeName)))})}(st(s),st(o)),et.observe(t,{childList:!0,subtree:!0})):(X=[],V(function E(){while(X.length)X.shift().call(null,X.shift());V(E)}),t.addEventListener("DOMNodeInserted",ft(s)),t.addEventListener("DOMNodeRemoved",ft(o))),t.addEventListener(h,lt),t.addEventListener("readystatechange",lt),t.createElement=function(e,n){var r=U.apply(t,arguments),i=""+e,s=S.call(y,(n?v:d)+(n||i).toUpperCase()),o=-1<s;return n&&(r.setAttribute("is",n=n.toLowerCase()),o&&(o=ut(i.toUpperCase(),n))),Q=!t.createElement.innerHTMLHelper,o&&nt(r,b[s]),r},H.cloneNode=function(e){var t=I.call(this,!!e),n=ot(t);return-1<n&&nt(t,b[n]),e&&it(t.querySelectorAll(w)),t});if(-2<S.call(y,v+p)+S.call(y,d+p))throw new Error("A "+n+" type is already registered");if(!m.test(p)||-1<S.call(g,p))throw new Error("The type "+n+" is invalid");var i=function(){return f?t.createElement(l,p):t.createElement(l)},a=r||x,f=T.call(a,u),l=f?r[u].toUpperCase():p,c=y.push((f?v:d)+p)-1,p;return w=w.concat(w.length?",":"",f?l+'[is="'+n.toLowerCase()+'"]':l),i.prototype=b[c]=T.call(a,"prototype")?a.prototype:_(H),rt(t.querySelectorAll(w),s),i}})(window,document,Object,"registerElement");;/****lib/handlebars.runtime-v3.0.3.js****/
/*!

 handlebars v3.0.3

Copyright (C) 2011-2014 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["Handlebars"] = factory();
	else
		root["Handlebars"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = __webpack_require__(7)['default'];

	var _interopRequireDefault = __webpack_require__(8)['default'];

	exports.__esModule = true;

	var _import = __webpack_require__(1);

	var base = _interopRequireWildcard(_import);

	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)

	var _SafeString = __webpack_require__(2);

	var _SafeString2 = _interopRequireDefault(_SafeString);

	var _Exception = __webpack_require__(3);

	var _Exception2 = _interopRequireDefault(_Exception);

	var _import2 = __webpack_require__(4);

	var Utils = _interopRequireWildcard(_import2);

	var _import3 = __webpack_require__(5);

	var runtime = _interopRequireWildcard(_import3);

	var _noConflict = __webpack_require__(6);

	var _noConflict2 = _interopRequireDefault(_noConflict);

	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	function create() {
	  var hb = new base.HandlebarsEnvironment();

	  Utils.extend(hb, base);
	  hb.SafeString = _SafeString2['default'];
	  hb.Exception = _Exception2['default'];
	  hb.Utils = Utils;
	  hb.escapeExpression = Utils.escapeExpression;

	  hb.VM = runtime;
	  hb.template = function (spec) {
	    return runtime.template(spec, hb);
	  };

	  return hb;
	}

	var inst = create();
	inst.create = create;

	_noConflict2['default'](inst);

	inst['default'] = inst;

	exports['default'] = inst;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = __webpack_require__(7)['default'];

	var _interopRequireDefault = __webpack_require__(8)['default'];

	exports.__esModule = true;
	exports.HandlebarsEnvironment = HandlebarsEnvironment;
	exports.createFrame = createFrame;

	var _import = __webpack_require__(4);

	var Utils = _interopRequireWildcard(_import);

	var _Exception = __webpack_require__(3);

	var _Exception2 = _interopRequireDefault(_Exception);

	var VERSION = '3.0.1';
	exports.VERSION = VERSION;
	var COMPILER_REVISION = 6;

	exports.COMPILER_REVISION = COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '== 1.x.x',
	  5: '== 2.0.0-alpha.x',
	  6: '>= 2.0.0-beta.1'
	};

	exports.REVISION_CHANGES = REVISION_CHANGES;
	var isArray = Utils.isArray,
	    isFunction = Utils.isFunction,
	    toString = Utils.toString,
	    objectType = '[object Object]';

	function HandlebarsEnvironment(helpers, partials) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};

	  registerDefaultHelpers(this);
	}

	HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,

	  logger: logger,
	  log: log,

	  registerHelper: function registerHelper(name, fn) {
	    if (toString.call(name) === objectType) {
	      if (fn) {
	        throw new _Exception2['default']('Arg not supported with multiple helpers');
	      }
	      Utils.extend(this.helpers, name);
	    } else {
	      this.helpers[name] = fn;
	    }
	  },
	  unregisterHelper: function unregisterHelper(name) {
	    delete this.helpers[name];
	  },

	  registerPartial: function registerPartial(name, partial) {
	    if (toString.call(name) === objectType) {
	      Utils.extend(this.partials, name);
	    } else {
	      if (typeof partial === 'undefined') {
	        throw new _Exception2['default']('Attempting to register a partial as undefined');
	      }
	      this.partials[name] = partial;
	    }
	  },
	  unregisterPartial: function unregisterPartial(name) {
	    delete this.partials[name];
	  }
	};

	function registerDefaultHelpers(instance) {
	  instance.registerHelper('helperMissing', function () {
	    if (arguments.length === 1) {
	      // A missing field in a {{foo}} constuct.
	      return undefined;
	    } else {
	      // Someone is actually trying to call something, blow up.
	      throw new _Exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
	    }
	  });

	  instance.registerHelper('blockHelperMissing', function (context, options) {
	    var inverse = options.inverse,
	        fn = options.fn;

	    if (context === true) {
	      return fn(this);
	    } else if (context === false || context == null) {
	      return inverse(this);
	    } else if (isArray(context)) {
	      if (context.length > 0) {
	        if (options.ids) {
	          options.ids = [options.name];
	        }

	        return instance.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      if (options.data && options.ids) {
	        var data = createFrame(options.data);
	        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
	        options = { data: data };
	      }

	      return fn(context, options);
	    }
	  });

	  instance.registerHelper('each', function (context, options) {
	    if (!options) {
	      throw new _Exception2['default']('Must pass iterator to #each');
	    }

	    var fn = options.fn,
	        inverse = options.inverse,
	        i = 0,
	        ret = '',
	        data = undefined,
	        contextPath = undefined;

	    if (options.data && options.ids) {
	      contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
	    }

	    if (isFunction(context)) {
	      context = context.call(this);
	    }

	    if (options.data) {
	      data = createFrame(options.data);
	    }

	    function execIteration(field, index, last) {
	      if (data) {
	        data.key = field;
	        data.index = index;
	        data.first = index === 0;
	        data.last = !!last;

	        if (contextPath) {
	          data.contextPath = contextPath + field;
	        }
	      }

	      ret = ret + fn(context[field], {
	        data: data,
	        blockParams: Utils.blockParams([context[field], field], [contextPath + field, null])
	      });
	    }

	    if (context && typeof context === 'object') {
	      if (isArray(context)) {
	        for (var j = context.length; i < j; i++) {
	          execIteration(i, i, i === context.length - 1);
	        }
	      } else {
	        var priorKey = undefined;

	        for (var key in context) {
	          if (context.hasOwnProperty(key)) {
	            // We're running the iterations one step out of sync so we can detect
	            // the last iteration without have to scan the object twice and create
	            // an itermediate keys array.
	            if (priorKey) {
	              execIteration(priorKey, i - 1);
	            }
	            priorKey = key;
	            i++;
	          }
	        }
	        if (priorKey) {
	          execIteration(priorKey, i - 1, true);
	        }
	      }
	    }

	    if (i === 0) {
	      ret = inverse(this);
	    }

	    return ret;
	  });

	  instance.registerHelper('if', function (conditional, options) {
	    if (isFunction(conditional)) {
	      conditional = conditional.call(this);
	    }

	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if (!options.hash.includeZero && !conditional || Utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });

	  instance.registerHelper('unless', function (conditional, options) {
	    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
	  });

	  instance.registerHelper('with', function (context, options) {
	    if (isFunction(context)) {
	      context = context.call(this);
	    }

	    var fn = options.fn;

	    if (!Utils.isEmpty(context)) {
	      if (options.data && options.ids) {
	        var data = createFrame(options.data);
	        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
	        options = { data: data };
	      }

	      return fn(context, options);
	    } else {
	      return options.inverse(this);
	    }
	  });

	  instance.registerHelper('log', function (message, options) {
	    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
	    instance.log(level, message);
	  });

	  instance.registerHelper('lookup', function (obj, field) {
	    return obj && obj[field];
	  });
	}

	var logger = {
	  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

	  // State enum
	  DEBUG: 0,
	  INFO: 1,
	  WARN: 2,
	  ERROR: 3,
	  level: 1,

	  // Can be overridden in the host environment
	  log: function log(level, message) {
	    if (typeof console !== 'undefined' && logger.level <= level) {
	      var method = logger.methodMap[level];
	      (console[method] || console.log).call(console, message); // eslint-disable-line no-console
	    }
	  }
	};

	exports.logger = logger;
	var log = logger.log;

	exports.log = log;

	function createFrame(object) {
	  var frame = Utils.extend({}, object);
	  frame._parent = object;
	  return frame;
	}

	/* [args, ]options */

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	// Build out our basic SafeString type
	function SafeString(string) {
	  this.string = string;
	}

	SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
	  return '' + this.string;
	};

	exports['default'] = SafeString;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

	function Exception(message, node) {
	  var loc = node && node.loc,
	      line = undefined,
	      column = undefined;
	  if (loc) {
	    line = loc.start.line;
	    column = loc.start.column;

	    message += ' - ' + line + ':' + column;
	  }

	  var tmp = Error.prototype.constructor.call(this, message);

	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }

	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, Exception);
	  }

	  if (loc) {
	    this.lineNumber = line;
	    this.column = column;
	  }
	}

	Exception.prototype = new Error();

	exports['default'] = Exception;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.extend = extend;

	// Older IE versions do not directly support indexOf so we must implement our own, sadly.
	exports.indexOf = indexOf;
	exports.escapeExpression = escapeExpression;
	exports.isEmpty = isEmpty;
	exports.blockParams = blockParams;
	exports.appendContextPath = appendContextPath;
	var escape = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  '\'': '&#x27;',
	  '`': '&#x60;'
	};

	var badChars = /[&<>"'`]/g,
	    possible = /[&<>"'`]/;

	function escapeChar(chr) {
	  return escape[chr];
	}

	function extend(obj /* , ...source */) {
	  for (var i = 1; i < arguments.length; i++) {
	    for (var key in arguments[i]) {
	      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
	        obj[key] = arguments[i][key];
	      }
	    }
	  }

	  return obj;
	}

	var toString = Object.prototype.toString;

	exports.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	/*eslint-disable func-style, no-var */
	var isFunction = function isFunction(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	/* istanbul ignore next */
	if (isFunction(/x/)) {
	  exports.isFunction = isFunction = function (value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	var isFunction;
	exports.isFunction = isFunction;
	/*eslint-enable func-style, no-var */

	/* istanbul ignore next */
	var isArray = Array.isArray || function (value) {
	  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
	};exports.isArray = isArray;

	function indexOf(array, value) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    if (array[i] === value) {
	      return i;
	    }
	  }
	  return -1;
	}

	function escapeExpression(string) {
	  if (typeof string !== 'string') {
	    // don't escape SafeStrings, since they're already safe
	    if (string && string.toHTML) {
	      return string.toHTML();
	    } else if (string == null) {
	      return '';
	    } else if (!string) {
	      return string + '';
	    }

	    // Force a string conversion as this will be done by the append regardless and
	    // the regex test will do this transparently behind the scenes, causing issues if
	    // an object's to string has escaped characters in it.
	    string = '' + string;
	  }

	  if (!possible.test(string)) {
	    return string;
	  }
	  return string.replace(badChars, escapeChar);
	}

	function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}

	function blockParams(params, ids) {
	  params.path = ids;
	  return params;
	}

	function appendContextPath(contextPath, id) {
	  return (contextPath ? contextPath + '.' : '') + id;
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = __webpack_require__(7)['default'];

	var _interopRequireDefault = __webpack_require__(8)['default'];

	exports.__esModule = true;
	exports.checkRevision = checkRevision;

	// #TODO:30 Remove this line and break up compilePartial

	exports.template = template;
	exports.wrapProgram = wrapProgram;
	exports.resolvePartial = resolvePartial;
	exports.invokePartial = invokePartial;
	exports.noop = noop;

	var _import = __webpack_require__(4);

	var Utils = _interopRequireWildcard(_import);

	var _Exception = __webpack_require__(3);

	var _Exception2 = _interopRequireDefault(_Exception);

	var _COMPILER_REVISION$REVISION_CHANGES$createFrame = __webpack_require__(1);

	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = _COMPILER_REVISION$REVISION_CHANGES$createFrame.COMPILER_REVISION;

	  if (compilerRevision !== currentRevision) {
	    if (compilerRevision < currentRevision) {
	      var runtimeVersions = _COMPILER_REVISION$REVISION_CHANGES$createFrame.REVISION_CHANGES[currentRevision],
	          compilerVersions = _COMPILER_REVISION$REVISION_CHANGES$createFrame.REVISION_CHANGES[compilerRevision];
	      throw new _Exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
	    } else {
	      // Use the embedded version info since the runtime doesn't know about this revision yet
	      throw new _Exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
	    }
	  }
	}

	function template(templateSpec, env) {
	  /* istanbul ignore next */
	  if (!env) {
	    throw new _Exception2['default']('No environment passed to template');
	  }
	  if (!templateSpec || !templateSpec.main) {
	    throw new _Exception2['default']('Unknown template object: ' + typeof templateSpec);
	  }

	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as psuedo-supported APIs.
	  env.VM.checkRevision(templateSpec.compiler);

	  function invokePartialWrapper(partial, context, options) {
	    if (options.hash) {
	      context = Utils.extend({}, context, options.hash);
	    }

	    partial = env.VM.resolvePartial.call(this, partial, context, options);
	    var result = env.VM.invokePartial.call(this, partial, context, options);

	    if (result == null && env.compile) {
	      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
	      result = options.partials[options.name](context, options);
	    }
	    if (result != null) {
	      if (options.indent) {
	        var lines = result.split('\n');
	        for (var i = 0, l = lines.length; i < l; i++) {
	          if (!lines[i] && i + 1 === l) {
	            break;
	          }

	          lines[i] = options.indent + lines[i];
	        }
	        result = lines.join('\n');
	      }
	      return result;
	    } else {
	      throw new _Exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
	    }
	  }

	  // Just add water
	  var container = {
	    strict: function strict(obj, name) {
	      if (!(name in obj)) {
	        throw new _Exception2['default']('"' + name + '" not defined in ' + obj);
	      }
	      return obj[name];
	    },
	    lookup: function lookup(depths, name) {
	      var len = depths.length;
	      for (var i = 0; i < len; i++) {
	        if (depths[i] && depths[i][name] != null) {
	          return depths[i][name];
	        }
	      }
	    },
	    lambda: function lambda(current, context) {
	      return typeof current === 'function' ? current.call(context) : current;
	    },

	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,

	    fn: function fn(i) {
	      return templateSpec[i];
	    },

	    programs: [],
	    program: function program(i, data, declaredBlockParams, blockParams, depths) {
	      var programWrapper = this.programs[i],
	          fn = this.fn(i);
	      if (data || depths || blockParams || declaredBlockParams) {
	        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
	      }
	      return programWrapper;
	    },

	    data: function data(value, depth) {
	      while (value && depth--) {
	        value = value._parent;
	      }
	      return value;
	    },
	    merge: function merge(param, common) {
	      var obj = param || common;

	      if (param && common && param !== common) {
	        obj = Utils.extend({}, common, param);
	      }

	      return obj;
	    },

	    noop: env.VM.noop,
	    compilerInfo: templateSpec.compiler
	  };

	  function ret(context) {
	    var options = arguments[1] === undefined ? {} : arguments[1];

	    var data = options.data;

	    ret._setup(options);
	    if (!options.partial && templateSpec.useData) {
	      data = initData(context, data);
	    }
	    var depths = undefined,
	        blockParams = templateSpec.useBlockParams ? [] : undefined;
	    if (templateSpec.useDepths) {
	      depths = options.depths ? [context].concat(options.depths) : [context];
	    }

	    return templateSpec.main.call(container, context, container.helpers, container.partials, data, blockParams, depths);
	  }
	  ret.isTop = true;

	  ret._setup = function (options) {
	    if (!options.partial) {
	      container.helpers = container.merge(options.helpers, env.helpers);

	      if (templateSpec.usePartial) {
	        container.partials = container.merge(options.partials, env.partials);
	      }
	    } else {
	      container.helpers = options.helpers;
	      container.partials = options.partials;
	    }
	  };

	  ret._child = function (i, data, blockParams, depths) {
	    if (templateSpec.useBlockParams && !blockParams) {
	      throw new _Exception2['default']('must pass block params');
	    }
	    if (templateSpec.useDepths && !depths) {
	      throw new _Exception2['default']('must pass parent depths');
	    }

	    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
	  };
	  return ret;
	}

	function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
	  function prog(context) {
	    var options = arguments[1] === undefined ? {} : arguments[1];

	    return fn.call(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), depths && [context].concat(depths));
	  }
	  prog.program = i;
	  prog.depth = depths ? depths.length : 0;
	  prog.blockParams = declaredBlockParams || 0;
	  return prog;
	}

	function resolvePartial(partial, context, options) {
	  if (!partial) {
	    partial = options.partials[options.name];
	  } else if (!partial.call && !options.name) {
	    // This is a dynamic partial that returned a string
	    options.name = partial;
	    partial = options.partials[partial];
	  }
	  return partial;
	}

	function invokePartial(partial, context, options) {
	  options.partial = true;

	  if (partial === undefined) {
	    throw new _Exception2['default']('The partial ' + options.name + ' could not be found');
	  } else if (partial instanceof Function) {
	    return partial(context, options);
	  }
	}

	function noop() {
	  return '';
	}

	function initData(context, data) {
	  if (!data || !('root' in data)) {
	    data = data ? _COMPILER_REVISION$REVISION_CHANGES$createFrame.createFrame(data) : {};
	    data.root = context;
	  }
	  return data;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	exports.__esModule = true;
	/*global window */

	exports['default'] = function (Handlebars) {
	  /* istanbul ignore next */
	  var root = typeof global !== 'undefined' ? global : window,
	      $Handlebars = root.Handlebars;
	  /* istanbul ignore next */
	  Handlebars.noConflict = function () {
	    if (root.Handlebars === Handlebars) {
	      root.Handlebars = $Handlebars;
	    }
	  };
	};

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports["default"] = function (obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};

	    if (typeof obj === "object" && obj !== null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }

	    newObj["default"] = obj;
	    return newObj;
	  }
	};

	exports.__esModule = true;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ }
/******/ ])
});
;;/****lib/helper.js****/
/*helper comparison*/
/**
 * Handlebars Comparison Helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
 
// The module to be exported
var helpers = {

  contains: function (str, pattern, options) {
    if (str.indexOf(pattern) !== -1) {
      return options.fn(this);
    }
    return options.inverse(this);
  },

  and: function (a, b, options) {
    if (a && b) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  gt: function (value, test, options) {
    if (value > test) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  gte: function (value, test, options) {
    if (value >= test) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  is: function (value, test, options) {
    if (value === test) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  isnt: function (value, test, options) {
    if (value !== test) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  lt: function (value, test, options) {
    if (value < test) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  lte: function (value, test, options) {
    if (value <= test) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  /**
   * Or
   * Conditionally render a block if one of the values is truthy.
   */
  or: function (a, b, options) {
    if (a || b) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  /**
   * ifNth
   * Conditionally render a block if mod(nr, v) is 0
   */
  ifNth: function (nr, v, options) {
    v = v+1;
    if (v % nr === 0) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  /**
   * {{#compare}}...{{/compare}}
   *
   * @credit: OOCSS
   * @param left value
   * @param operator The operator, must be between quotes ">", "=", "<=", etc...
   * @param right value
   * @param options option object sent by handlebars
   * @return {String} formatted html
   *
   * @example:
   *   {{#compare unicorns "<" ponies}}
   *     I knew it, unicorns are just low-quality ponies!
   *   {{/compare}}
   *
   *   {{#compare value ">=" 10}}
   *     The value is greater or equal than 10
   *     {{else}}
   *     The value is lower than 10
   *   {{/compare}}
   */
  compare: function(left, operator, right, options) {
    /*jshint eqeqeq: false*/

    if (arguments.length < 3) {
      throw new Error('Handlerbars Helper "compare" needs 2 parameters');
    }

    if (options === undefined) {
      options = right;
      right = operator;
      operator = '===';
    }

    var operators = {
      '==':     function(l, r) {return l == r; },
      '===':    function(l, r) {return l === r; },
      '!=':     function(l, r) {return l != r; },
      '!==':    function(l, r) {return l !== r; },
      '<':      function(l, r) {return l < r; },
      '>':      function(l, r) {return l > r; },
      '<=':     function(l, r) {return l <= r; },
      '>=':     function(l, r) {return l >= r; },
      'typeof': function(l, r) {return typeof l == r; }
    };

    if (!operators[operator]) {
      throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
    }

    var result = operators[operator](left, right);

    if (result) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },


  /**
   * {{if_eq}}
   *
   * @author: Dan Harper <http://github.com/danharper>
   *
   * @param  {[type]} context [description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   *
   * @example: {{if_eq this compare=that}}
   */
  if_eq: function (context, options) {
    if (context === options.hash.compare) {
      return options.fn(this);
    }
    return options.inverse(this);
  },

  /**
   * {{unless_eq}}
   * @author: Dan Harper <http://github.com/danharper>
   *
   * @param  {[type]} context [description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   *
   * @example: {{unless_eq this compare=that}}
   */
  unless_eq: function (context, options) {
    if (context === options.hash.compare) {
      return options.inverse(this);
    }
    return options.fn(this);
  },

  /**
   * {{if_gt}}
   * @author: Dan Harper <http://github.com/danharper>
   *
   * @param  {[type]} context [description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   *
   * @example: {{if_gt this compare=that}}
   */
  if_gt: function (context, options) {
    if (context > options.hash.compare) {
      return options.fn(this);
    }
    return options.inverse(this);
  },

  /**
   * {{unless_gt}}
   * @author: Dan Harper <http://github.com/danharper>
   *
   * @param  {[type]} context [description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   *
   * @example: {{unless_gt this compare=that}}
   */
  unless_gt: function (context, options) {
    if (context > options.hash.compare) {
      return options.inverse(this);
    }
    return options.fn(this);
  },

  /**
   * {{if_lt}}
   * @author: Dan Harper <http://github.com/danharper>
   *
   * @param  {[type]} context [description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   *
   * @example: {{if_lt this compare=that}}
   */
  if_lt: function (context, options) {
    if (context < options.hash.compare) {
      return options.fn(this);
    }
    return options.inverse(this);
  },

  /**
   * {{unless_lt}}
   * @author: Dan Harper <http://github.com/danharper>
   *
   * @param  {[type]} context [description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   *
   * @example: {{unless_lt this compare=that}}
   */
  unless_lt: function (context, options) {
    if (context < options.hash.compare) {
      return options.inverse(this);
    }
    return options.fn(this);
  },

  /**
   * {{if_gteq}}
   * @author: Dan Harper <http://github.com/danharper>
   *
   * @param  {[type]} context [description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   *
   * @example: {{if_gteq this compare=that}}
   */
  if_gteq: function (context, options) {
    if (context >= options.hash.compare) {
      return options.fn(this);
    }
    return options.inverse(this);
  },

  /**
   * {{unless_gteq}}
   * @author: Dan Harper <http://github.com/danharper>
   *
   * @param  {[type]} context [description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   *
   * @example: {{unless_gteq this compare=that}}
   */
  unless_gteq: function (context, options) {
    if (context >= options.hash.compare) {
      return options.inverse(this);
    }
    return options.fn(this);
  },

  /**
   * {{if_lteq}}
   * @author: Dan Harper <http://github.com/danharper>
   *
   * @param  {[type]} context [description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   *
   * @example: {{if_lteq this compare=that}}
   */
  if_lteq: function (context, options) {
    if (context <= options.hash.compare) {
      return options.fn(this);
    }
    return options.inverse(this);
  },

  /**
   * {{unless_lteq}}
   * @author: Dan Harper <http://github.com/danharper>
   *
   * @param  {[type]} context [description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   *
   * @example: {{unless_lteq this compare=that}}
   */
  unless_lteq: function (context, options) {
    if (context <= options.hash.compare) {
      return options.inverse(this);
    }
    return options.fn(this);
  },

  /**
   * {{ifAny}}
   * Similar to {{#if}} block helper but accepts multiple arguments.
   * @author: Dan Harper <http://github.com/danharper>
   *
   * @param  {[type]} context [description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   *
   * @example: {{ifAny this compare=that}}
   */
  ifAny: function () {
    var argLength = arguments.length - 2;
    var content = arguments[argLength + 1];
    var success = true;
    var i = 0;
    while (i < argLength) {
      if (!arguments[i]) {
        success = false;
        break;
      }
      i += 1;
    }
    if (success) {
      return content(this);
    } else {
      return content.inverse(this);
    }
  }
};

// Aliases
helpers.ifeq       = helpers.if_eq;
helpers.unlessEq   = helpers.unless_eq;
helpers.ifgt       = helpers.if_gt;
helpers.unlessGt   = helpers.unless_gt;
helpers.iflt       = helpers.if_lt;
helpers.unlessLt   = helpers.unless_lt;
helpers.ifgteq     = helpers.if_gteq;
helpers.unlessGtEq = helpers.unless_gteq;
helpers.ifLtEq     = helpers.if_lteq;
helpers.unlessLtEq = helpers.unless_lteq;

for (var helper in helpers) {
	if (helpers.hasOwnProperty(helper)) {
		Handlebars.registerHelper(helper, helpers[helper]);
	}
};/****lib/expr-eval.min.js****/
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.exprEval=e()}(this,function(){"use strict";function t(t,e){for(var s=0;s<t.length;s++)if(t[s]===e)return s;return-1}function e(t,e){this.type=t,this.value=void 0!==e&&null!==e?e:0}function s(t,e){this.tokens=t,this.parser=e,this.unaryOps=e.unaryOps,this.binaryOps=e.binaryOps,this.ternaryOps=e.ternaryOps,this.functions=e.functions}function n(t){return"string"==typeof t?JSON.stringify(t).replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029"):t}function r(t,s,n,i,o){for(var h,p,a,u,c=[],l=[],f=0,v=t.length;f<v;f++){var x=t[f],y=x.type;if(y===z)c.push(x);else if(y===Q&&o.hasOwnProperty(x.value))x=new e(z,o[x.value]),c.push(x);else if(y===H&&c.length>1)p=c.pop(),h=c.pop(),u=n[x.value],x=new e(z,u(h.value,p.value)),c.push(x);else if(y===K&&c.length>2)a=c.pop(),p=c.pop(),h=c.pop(),"?"===x.value?c.push(h.value?p.value:a.value):(u=i[x.value],x=new e(z,u(h.value,p.value,a.value)),c.push(x));else if(y===D&&c.length>0)h=c.pop(),u=s[x.value],x=new e(z,u(h.value)),c.push(x);else if(y===Z){for(;c.length>0;)l.push(c.shift());l.push(new e(Z,r(x.value,s,n,i,o)))}else if(y===tt&&c.length>0)h=c.pop(),c.push(new e(z,h.value[x.value]));else{for(;c.length>0;)l.push(c.shift());l.push(x)}}for(;c.length>0;)l.push(c.shift());return l}function i(t,s,n){for(var r=[],o=0,h=t.length;o<h;o++){var p=t[o],a=p.type;if(a===Q&&p.value===s)for(var u=0;u<n.tokens.length;u++){var c,l=n.tokens[u];c=l.type===D?J(l.value):l.type===H?W(l.value):l.type===K?V(l.value):new e(l.type,l.value),r.push(c)}else a===Z?r.push(new e(Z,i(p.value,s,n))):r.push(p)}return r}function o(t,e,s){for(var n,r,i,h,p=[],a=0,u=t.length;a<u;a++){var c=t[a],l=c.type;if(l===z)p.push(c.value);else if(l===H)r=p.pop(),n=p.pop(),h=e.binaryOps[c.value],p.push(h(n,r));else if(l===K)i=p.pop(),r=p.pop(),n=p.pop(),"?"===c.value?p.push(o(n?r:i,e,s)):(h=e.ternaryOps[c.value],p.push(h(n,r,i)));else if(l===Q)if(c.value in e.functions)p.push(e.functions[c.value]);else{var f=s[c.value];if(void 0===f)throw new Error("undefined variable: "+c.value);p.push(f)}else if(l===D)n=p.pop(),h=e.unaryOps[c.value],p.push(h(n));else if(l===Y){for(var v=c.value,x=[];v-- >0;)x.unshift(p.pop());if(!(h=p.pop()).apply||!h.call)throw new Error(h+" is not a function");p.push(h.apply(void 0,x))}else if(l===Z)p.push(c.value);else{if(l!==tt)throw new Error("invalid Expression");n=p.pop(),p.push(n[c.value])}}if(p.length>1)throw new Error("invalid Expression (parity)");return p[0]}function h(t,e){for(var s,r,i,o,p=[],a=0,u=t.length;a<u;a++){var c=t[a],l=c.type;if(l===z)"number"==typeof c.value&&c.value<0?p.push("("+c.value+")"):p.push(n(c.value));else if(l===H)r=p.pop(),s=p.pop(),o=c.value,e?"^"===o?p.push("Math.pow("+s+", "+r+")"):"and"===o?p.push("(!!"+s+" && !!"+r+")"):"or"===o?p.push("(!!"+s+" || !!"+r+")"):"||"===o?p.push("(String("+s+") + String("+r+"))"):"=="===o?p.push("("+s+" === "+r+")"):"!="===o?p.push("("+s+" !== "+r+")"):p.push("("+s+" "+o+" "+r+")"):p.push("("+s+" "+o+" "+r+")");else if(l===K){if(i=p.pop(),r=p.pop(),s=p.pop(),"?"!==(o=c.value))throw new Error("invalid Expression");p.push("("+s+" ? "+r+" : "+i+")")}else if(l===Q)p.push(c.value);else if(l===D)s=p.pop(),"-"===(o=c.value)||"+"===o?p.push("("+o+s+")"):e?"not"===o?p.push("(!"+s+")"):"!"===o?p.push("fac("+s+")"):p.push(o+"("+s+")"):"!"===o?p.push("("+s+"!)"):p.push("("+o+" "+s+")");else if(l===Y){for(var f=c.value,v=[];f-- >0;)v.unshift(p.pop());o=p.pop(),p.push(o+"("+v.join(", ")+")")}else if(l===tt)s=p.pop(),p.push(s+"."+c.value);else{if(l!==Z)throw new Error("invalid Expression");p.push("("+h(c.value,e)+")")}}if(p.length>1)throw new Error("invalid Expression (parity)");return p[0]}function p(e,s){for(var n=0,r=e.length;n<r;n++){var i=e[n];i.type===Q&&-1===t(s,i.value)?s.push(i.value):i.type===Z&&p(i.value,s)}}function a(t,e){return Number(t)+Number(e)}function u(t,e){return t-e}function c(t,e){return t*e}function l(t,e){return t/e}function f(t,e){return t%e}function v(t,e){return""+t+e}function x(t,e){return t===e}function y(t,e){return t!==e}function w(t,e){return t>e}function M(t,e){return t<e}function d(t,e){return t>=e}function g(t,e){return t<=e}function m(t,e){return Boolean(t&&e)}function E(t,e){return Boolean(t||e)}function k(t){return(Math.exp(t)-Math.exp(-t))/2}function O(t){return(Math.exp(t)+Math.exp(-t))/2}function T(t){return t===1/0?1:t===-1/0?-1:(Math.exp(t)-Math.exp(-t))/(Math.exp(t)+Math.exp(-t))}function b(t){return t===-1/0?t:Math.log(t+Math.sqrt(t*t+1))}function A(t){return Math.log(t+Math.sqrt(t*t-1))}function C(t){return Math.log((1+t)/(1-t))/2}function N(t){return Math.log(t)*Math.LOG10E}function P(t){return-t}function I(t){return!t}function F(t){return t<0?Math.ceil(t):Math.floor(t)}function S(t){return Math.random()*(t||1)}function R(t){return G(t+1)}function L(t){return String(t).length}function q(){for(var t=0,e=0,s=0,n=arguments.length;s<n;s++){var r,i=Math.abs(arguments[s]);e<i?(t=t*(r=e/i)*r+1,e=i):t+=i>0?(r=i/e)*r:i}return e===1/0?1/0:e*Math.sqrt(t)}function U(t,e,s){return t?e:s}function B(t){return isFinite(t)&&t===Math.round(t)}function G(t){var e,s;if(B(t)){if(t<=0)return isFinite(t)?1/0:NaN;if(t>171)return 1/0;for(var n=t-2,r=t-1;n>1;)r*=n,n--;return 0===r&&(r=1),r}if(t<.5)return Math.PI/(Math.sin(Math.PI*t)*G(1-t));if(t>=171.35)return 1/0;if(t>85){var i=t*t,o=i*t,h=o*t,p=h*t;return Math.sqrt(2*Math.PI/t)*Math.pow(t/Math.E,t)*(1+1/(12*t)+1/(288*i)-139/(51840*o)-571/(2488320*h)+163879/(209018880*p)+5246819/(75246796800*p*t))}--t,s=st[0];for(var a=1;a<st.length;++a)s+=st[a]/(t+a);return e=t+et+.5,Math.sqrt(2*Math.PI)*Math.pow(e,t+.5)*Math.exp(-e)*s}function _(t,e,s,n){this.type=t,this.value=e,this.line=s,this.column=n}function j(t,e,s,n,r){this.pos=0,this.line=0,this.column=0,this.current=null,this.unaryOps=e,this.binaryOps=s,this.ternaryOps=n,this.consts=r,this.expression=t,this.savedPosition=0,this.savedCurrent=null,this.savedLine=0,this.savedColumn=0}function J(t){return new e(D,t)}function W(t){return new e(H,t)}function V(t){return new e(K,t)}function X(t,e){this.parser=t,this.tokens=e,this.current=null,this.nextToken=null,this.next(),this.savedCurrent=null,this.savedNextToken=null}function $(){this.unaryOps={sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,sinh:Math.sinh||k,cosh:Math.cosh||O,tanh:Math.tanh||T,asinh:Math.asinh||b,acosh:Math.acosh||A,atanh:Math.atanh||C,sqrt:Math.sqrt,log:Math.log,ln:Math.log,lg:Math.log10||N,log10:Math.log10||N,abs:Math.abs,ceil:Math.ceil,floor:Math.floor,round:Math.round,trunc:Math.trunc||F,"-":P,"+":Number,exp:Math.exp,not:I,length:L,"!":R},this.binaryOps={"+":a,"-":u,"*":c,"/":l,"%":f,"^":Math.pow,"||":v,"==":x,"!=":y,">":w,"<":M,">=":d,"<=":g,and:m,or:E},this.ternaryOps={"?":U},this.functions={random:S,fac:R,min:Math.min,max:Math.max,hypot:Math.hypot||q,pyt:Math.hypot||q,pow:Math.pow,atan2:Math.atan2,if:U,gamma:G},this.consts={E:Math.E,PI:Math.PI,true:!0,false:!1}}var z="INUMBER",D="IOP1",H="IOP2",K="IOP3",Q="IVAR",Y="IFUNCALL",Z="IEXPR",tt="IMEMBER";e.prototype.toString=function(){switch(this.type){case z:case D:case H:case K:case Q:return this.value;case Y:return"CALL "+this.value;case tt:return"."+this.value;default:return"Invalid Instruction"}},s.prototype.simplify=function(t){return t=t||{},new s(r(this.tokens,this.unaryOps,this.binaryOps,this.ternaryOps,t),this.parser)},s.prototype.substitute=function(t,e){return e instanceof s||(e=this.parser.parse(String(e))),new s(i(this.tokens,t,e),this.parser)},s.prototype.evaluate=function(t){return t=t||{},o(this.tokens,this,t)},s.prototype.toString=function(){return h(this.tokens,!1)},s.prototype.symbols=function(){var t=[];return p(this.tokens,t),t},s.prototype.variables=function(){var t=[];p(this.tokens,t);var e=this.functions;return t.filter(function(t){return!(t in e)})},s.prototype.toJSFunction=function(t,e){var s=this,n=new Function(t,"with(this.functions) with (this.ternaryOps) with (this.binaryOps) with (this.unaryOps) { return "+h(this.simplify(e).tokens,!0)+"; }");return function(){return n.apply(s,arguments)}};var et=4.7421875,st=[.9999999999999971,57.15623566586292,-59.59796035547549,14.136097974741746,-.4919138160976202,3399464998481189e-20,4652362892704858e-20,-9837447530487956e-20,.0001580887032249125,-.00021026444172410488,.00021743961811521265,-.0001643181065367639,8441822398385275e-20,-26190838401581408e-21,36899182659531625e-22],nt="TOP";_.prototype.toString=function(){return this.type+": "+this.value},j.prototype.newToken=function(t,e,s,n){return new _(t,e,null!=s?s:this.line,null!=n?n:this.column)},j.prototype.save=function(){this.savedPosition=this.pos,this.savedCurrent=this.current,this.savedLine=this.line,this.savedColumn=this.column},j.prototype.restore=function(){this.pos=this.savedPosition,this.current=this.savedCurrent,this.line=this.savedLine,this.column=this.savedColumn},j.prototype.next=function(){return this.pos>=this.expression.length?this.newToken("TEOF","EOF"):this.isWhitespace()||this.isComment()?this.next():this.isNumber()||this.isOperator()||this.isString()||this.isParen()||this.isComma()||this.isNamedOp()||this.isConst()||this.isName()?this.current:void this.parseError('Unknown character "'+this.expression.charAt(this.pos)+'"')},j.prototype.isString=function(){var t=!1,e=this.line,s=this.column,n=this.pos,r=this.expression.charAt(n);if("'"===r||'"'===r){this.pos++,this.column++;for(var i=this.expression.indexOf(r,n+1);i>=0&&this.pos<this.expression.length;){if(this.pos=i+1,"\\"!==this.expression.charAt(i-1)){var o=this.expression.substring(n+1,i);this.current=this.newToken("TSTRING",this.unescape(o),e,s);for(var h=o.indexOf("\n"),p=-1;h>=0;)this.line++,this.column=0,p=h,h=o.indexOf("\n",h+1);this.column+=o.length-p,t=!0;break}i=this.expression.indexOf(r,i+1)}}return t},j.prototype.isParen=function(){var t=this.expression.charAt(this.pos);return("("===t||")"===t)&&(this.current=this.newToken("TPAREN",t),this.pos++,this.column++,!0)},j.prototype.isComma=function(){return","===this.expression.charAt(this.pos)&&(this.current=this.newToken("TCOMMA",","),this.pos++,this.column++,!0)},j.prototype.isConst=function(){for(var t=this.pos,e=t;e<this.expression.length;e++){var s=this.expression.charAt(e);if(s.toUpperCase()===s.toLowerCase()&&(e===this.pos||"_"!==s&&"."!==s&&(s<"0"||s>"9")))break}if(e>t){var n=this.expression.substring(t,e);if(n in this.consts)return this.current=this.newToken("TNUMBER",this.consts[n]),this.pos+=n.length,this.column+=n.length,!0}return!1},j.prototype.isNamedOp=function(){for(var t=this.pos,e=t;e<this.expression.length;e++){var s=this.expression.charAt(e);if(s.toUpperCase()===s.toLowerCase()&&(e===this.pos||"_"!==s&&(s<"0"||s>"9")))break}if(e>t){var n=this.expression.substring(t,e);if(n in this.binaryOps||n in this.unaryOps||n in this.ternaryOps)return this.current=this.newToken(nt,n),this.pos+=n.length,this.column+=n.length,!0}return!1},j.prototype.isName=function(){for(var t=this.pos,e=t;e<this.expression.length;e++){var s=this.expression.charAt(e);if(s.toUpperCase()===s.toLowerCase()&&(e===this.pos||"_"!==s&&(s<"0"||s>"9")))break}if(e>t){var n=this.expression.substring(t,e);return this.current=this.newToken("TNAME",n),this.pos+=n.length,this.column+=n.length,!0}return!1},j.prototype.isWhitespace=function(){for(var t=!1,e=this.expression.charAt(this.pos);!(" "!==e&&"\t"!==e&&"\n"!==e&&"\r"!==e||(t=!0,this.pos++,this.column++,"\n"===e&&(this.line++,this.column=0),this.pos>=this.expression.length));)e=this.expression.charAt(this.pos);return t};var rt=/^[0-9a-f]{4}$/i;return j.prototype.unescape=function(t){var e=t.indexOf("\\");if(e<0)return t;for(var s=t.substring(0,e);e>=0;){var n=t.charAt(++e);switch(n){case"'":s+="'";break;case'"':s+='"';break;case"\\":s+="\\";break;case"/":s+="/";break;case"b":s+="\b";break;case"f":s+="\f";break;case"n":s+="\n";break;case"r":s+="\r";break;case"t":s+="\t";break;case"u":var r=t.substring(e+1,e+5);rt.test(r)||this.parseError("Illegal escape sequence: \\u"+r),s+=String.fromCharCode(parseInt(r,16)),e+=4;break;default:throw this.parseError('Illegal escape sequence: "\\'+n+'"')}++e;var i=t.indexOf("\\",e);s+=t.substring(e,i<0?t.length:i),e=i}return s},j.prototype.isComment=function(){if("/"===this.expression.charAt(this.pos)&&"*"===this.expression.charAt(this.pos+1)){var t=this.pos;this.pos=this.expression.indexOf("*/",this.pos)+2,1===this.pos&&(this.pos=this.expression.length);for(var e=this.expression.substring(t,this.pos),s=e.indexOf("\n");s>=0;)this.line++,this.column=e.length-s,s=e.indexOf("\n",s+1);return!0}return!1},j.prototype.isNumber=function(){for(var t,e=!1,s=this.pos,n=s,r=s,i=this.column,o=i,h=!1,p=!1;s<this.expression.length&&((t=this.expression.charAt(s))>="0"&&t<="9"||!h&&"."===t);)"."===t?h=!0:p=!0,s++,i++,e=p;if(e&&(r=s,o=i),"e"===t||"E"===t){s++,i++;for(var a=!0,u=!1;s<this.expression.length;){if(t=this.expression.charAt(s),!a||"+"!==t&&"-"!==t){if(!(t>="0"&&t<="9"))break;u=!0,a=!1}else a=!1;s++,i++}u||(s=r,i=o)}return e?(this.current=this.newToken("TNUMBER",parseFloat(this.expression.substring(n,s))),this.pos=s,this.column=i):(this.pos=r,this.column=o),e},j.prototype.isOperator=function(){var t=this.expression.charAt(this.pos);if("+"===t||"-"===t||"*"===t||"/"===t||"%"===t||"^"===t||"?"===t||":"===t||"."===t)this.current=this.newToken(nt,t);else if("∙"===t||"•"===t)this.current=this.newToken(nt,"*");else if(">"===t)"="===this.expression.charAt(this.pos+1)?(this.current=this.newToken(nt,">="),this.pos++,this.column++):this.current=this.newToken(nt,">");else if("<"===t)"="===this.expression.charAt(this.pos+1)?(this.current=this.newToken(nt,"<="),this.pos++,this.column++):this.current=this.newToken(nt,"<");else if("|"===t){if("|"!==this.expression.charAt(this.pos+1))return!1;this.current=this.newToken(nt,"||"),this.pos++,this.column++}else if("="===t){if("="!==this.expression.charAt(this.pos+1))return!1;this.current=this.newToken(nt,"=="),this.pos++,this.column++}else{if("!"!==t)return!1;"="===this.expression.charAt(this.pos+1)?(this.current=this.newToken(nt,"!="),this.pos++,this.column++):this.current=this.newToken(nt,t)}return this.pos++,this.column++,!0},j.prototype.parseError=function(t){throw new Error("parse error ["+(this.line+1)+":"+(this.column+1)+"]: "+t)},X.prototype.next=function(){return this.current=this.nextToken,this.nextToken=this.tokens.next()},X.prototype.tokenMatches=function(e,s){return void 0===s||(Array.isArray(s)?t(s,e.value)>=0:"function"==typeof s?s(e):e.value===s)},X.prototype.save=function(){this.savedCurrent=this.current,this.savedNextToken=this.nextToken,this.tokens.save()},X.prototype.restore=function(){this.tokens.restore(),this.current=this.savedCurrent,this.nextToken=this.savedNextToken},X.prototype.accept=function(t,e){return!(this.nextToken.type!==t||!this.tokenMatches(this.nextToken,e))&&(this.next(),!0)},X.prototype.expect=function(t,e){if(!this.accept(t,e))throw new Error("parse error ["+this.tokens.line+":"+this.tokens.column+"]: Expected "+(e||t))},X.prototype.parseAtom=function(t){if(this.accept("TNAME"))t.push(new e(Q,this.current.value));else if(this.accept("TNUMBER"))t.push(new e(z,this.current.value));else if(this.accept("TSTRING"))t.push(new e(z,this.current.value));else{if(!this.accept("TPAREN","("))throw new Error("unexpected "+this.nextToken);this.parseExpression(t),this.expect("TPAREN",")")}},X.prototype.parseExpression=function(t){this.parseConditionalExpression(t)},X.prototype.parseConditionalExpression=function(t){for(this.parseOrExpression(t);this.accept(nt,"?");){var s=[],n=[];this.parseConditionalExpression(s),this.expect(nt,":"),this.parseConditionalExpression(n),t.push(new e(Z,s)),t.push(new e(Z,n)),t.push(V("?"))}},X.prototype.parseOrExpression=function(t){for(this.parseAndExpression(t);this.accept(nt,"or");)this.parseAndExpression(t),t.push(W("or"))},X.prototype.parseAndExpression=function(t){for(this.parseComparison(t);this.accept(nt,"and");)this.parseComparison(t),t.push(W("and"))},X.prototype.parseComparison=function(t){for(this.parseAddSub(t);this.accept(nt,["==","!=","<","<=",">=",">"]);){var e=this.current;this.parseAddSub(t),t.push(W(e.value))}},X.prototype.parseAddSub=function(t){for(this.parseTerm(t);this.accept(nt,["+","-","||"]);){var e=this.current;this.parseTerm(t),t.push(W(e.value))}},X.prototype.parseTerm=function(t){for(this.parseFactor(t);this.accept(nt,["*","/","%"]);){var e=this.current;this.parseFactor(t),t.push(W(e.value))}},X.prototype.parseFactor=function(t){function e(t){return t.value in s}var s=this.tokens.unaryOps;if(this.save(),this.accept(nt,e))if("-"!==this.current.value&&"+"!==this.current.value&&"TPAREN"===this.nextToken.type&&"("===this.nextToken.value)this.restore(),this.parseExponential(t);else{var n=this.current;this.parseFactor(t),t.push(J(n.value))}else this.parseExponential(t)},X.prototype.parseExponential=function(t){for(this.parsePostfixExpression(t);this.accept(nt,"^");)this.parseFactor(t),t.push(W("^"))},X.prototype.parsePostfixExpression=function(t){for(this.parseFunctionCall(t);this.accept(nt,"!");)t.push(J("!"))},X.prototype.parseFunctionCall=function(t){function s(t){return t.value in n}var n=this.tokens.unaryOps;if(this.accept(nt,s)){var r=this.current;this.parseAtom(t),t.push(J(r.value))}else for(this.parseMemberExpression(t);this.accept("TPAREN","(");)if(this.accept("TPAREN",")"))t.push(new e(Y,0));else{var i=this.parseArgumentList(t);t.push(new e(Y,i))}},X.prototype.parseArgumentList=function(t){for(var e=0;!this.accept("TPAREN",")");)for(this.parseExpression(t),++e;this.accept("TCOMMA");)this.parseExpression(t),++e;return e},X.prototype.parseMemberExpression=function(t){for(this.parseAtom(t);this.accept(nt,".");)this.expect("TNAME"),t.push(new e(tt,this.current.value))},$.parse=function(t){return(new $).parse(t)},$.evaluate=function(t,e){return $.parse(t).evaluate(e)},$.prototype={parse:function(t){var e=[],n=new X(this,new j(t,this.unaryOps,this.binaryOps,this.ternaryOps,this.consts));return n.parseExpression(e),n.expect("TEOF","EOF"),new s(e,this)},evaluate:function(t,e){return this.parse(t).evaluate(e)}},{Parser:$,Expression:s}});
