// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"src/assets/js/emojiPicker.min.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (f) {
  if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = f();else if ("function" == typeof define && define.amd) define([], f);else {
    var g;
    g = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, g.EmojiPicker = f();
  }
}(function () {
  var define, module, exports;
  return function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = "function" == typeof require && require;
          if (!u && a) return a(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f;
        }

        var l = n[o] = {
          exports: {}
        };
        t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];
          return s(n || e);
        }, l, l.exports, e, t, n, r);
      }

      return n[o].exports;
    }

    for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) {
      s(r[o]);
    }

    return s;
  }({
    1: [function (require, module, exports) {
      !function (global, factory) {
        if ("function" == typeof define && define.amd) define(["module"], factory);else if (void 0 !== exports) factory(module);else {
          var mod = {
            exports: {}
          };
          factory(mod), global.emojiPicker = mod.exports;
        }
      }(this, function (module) {
        "use strict";

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor;
          };
        }(),
            EmojiPicker = function () {
          function EmojiPicker() {
            _classCallCheck(this, EmojiPicker), this.initiate();
          }

          return _createClass(EmojiPicker, [{
            key: "initiate",
            value: function initiate() {
              var _this = this;

              document.querySelectorAll('[data-emoji-picker="true"]').forEach(function (element) {
                _this.generateElements(element);
              });
            }
          }, {
            key: "generateElements",
            value: function generateElements(emojiInput) {
              var clickLink = function clickLink(event) {
                event.preventDefault();
                var caretPos = emojiInput.selectionStart;
                emojiInput.value = emojiInput.value.substring(0, caretPos) + " " + event.target.innerHTML + emojiInput.value.substring(caretPos), emojiPicker.style.display = "none", emojiInput.focus(), "undefined" != typeof angular && angular.element(emojiInput).triggerHandler("change");
              };

              emojiInput.style.width = "100%";
              var emojiContainer = document.createElement("div");
              emojiContainer.style.position = "relative", emojiInput.parentNode.replaceChild(emojiContainer, emojiInput), emojiContainer.appendChild(emojiInput);
              var emojiPicker = document.createElement("div");
              emojiPicker.tabIndex = 0, emojiPicker.addEventListener("blur", function (event) {
                emojiPicker.style.display = "none";
              }, !1), emojiPicker.style.position = "absolute", emojiPicker.style.right = "2px", emojiPicker.style.outline = "none", emojiPicker.style.top = "20px", emojiPicker.style.zIndex = "999", emojiPicker.style.display = "none", emojiPicker.style.width = "264px", emojiPicker.style.padding = "7px 7px 7px 7px", emojiPicker.style.marginTop = "5px", emojiPicker.style.overflow = "hidden", emojiPicker.style.background = "#fff", emojiPicker.style.height = "200px", emojiPicker.style.overflowY = "auto", emojiPicker.style.boxShadow = "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)", emojiPicker.style.borderRadius = "2px;";
              var emojiTrigger = document.createElement("a");
              emojiTrigger.style.position = "absolute", emojiTrigger.style.top = "2px", emojiTrigger.style.right = "2px", emojiTrigger.style.textDecoration = "none", emojiTrigger.setAttribute("href", "javascript:void(0)"), emojiTrigger.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 12 14"><path d="M8.9 8.4q-0.3 0.9-1.1 1.5t-1.8 0.6-1.8-0.6-1.1-1.5q-0.1-0.2 0-0.4t0.3-0.2q0.2-0.1 0.4 0t0.2 0.3q0.2 0.6 0.7 1t1.2 0.4 1.2-0.4 0.7-1q0.1-0.2 0.3-0.3t0.4 0 0.3 0.2 0 0.4zM5 5q0 0.4-0.3 0.7t-0.7 0.3-0.7-0.3-0.3-0.7 0.3-0.7 0.7-0.3 0.7 0.3 0.3 0.7zM9 5q0 0.4-0.3 0.7t-0.7 0.3-0.7-0.3-0.3-0.7 0.3-0.7 0.7-0.3 0.7 0.3 0.3 0.7zM11 7q0-1-0.4-1.9t-1.1-1.6-1.6-1.1-1.9-0.4-1.9 0.4-1.6 1.1-1.1 1.6-0.4 1.9 0.4 1.9 1.1 1.6 1.6 1.1 1.9 0.4 1.9-0.4 1.6-1.1 1.1-1.6 0.4-1.9zM12 7q0 1.6-0.8 3t-2.2 2.2-3 0.8-3-0.8-2.2-2.2-0.8-3 0.8-3 2.2-2.2 3-0.8 3 0.8 2.2 2.2 0.8 3z"/></svg>', emojiTrigger.onclick = function () {
                "none" === emojiPicker.style.display && (emojiPicker.style.display = "block"), emojiPicker.focus();
              }, emojiContainer.appendChild(emojiTrigger);
              var emojiList = document.createElement("ul");
              emojiList.style.padding = "0", emojiList.style.margin = "0", emojiList.style.listStyle = "none", [128512, 128513, 128514, 129315, 128515, 128516, 128517, 128518, 128521, 128522, 128523, 128526, 128525, 128536, 128535, 128537, 128538, 128578, 129303, 129321, 129300, 129320, 128528, 128529, 128566, 128580, 128527, 128547, 128549, 128558, 129296, 128559, 128554, 128555, 128564, 128524, 128539, 128540, 128541, 129316, 128530, 128531, 128532, 128533, 128579, 129297, 128562, 9785, 128577, 128534, 128542, 128543, 128548, 128546, 128557, 128550, 128551, 128552, 128553, 129327, 128556, 128560, 128561, 128563, 129322, 128565, 128545, 128544, 129324, 128567, 129298, 129301, 129314, 129326, 129319, 128519, 129312, 129317, 129323, 129325, 129488, 129299, 128520, 128127, 129313, 128121, 128122, 128128, 9760, 128123, 128125, 128126, 129302, 128169, 128570, 128568, 128569, 128571, 128572, 128573, 128576, 128575, 128574, 128584, 128585, 128586, 128118, 129490, 128102, 128103, 129489, 128104, 128105, 129491, 128116, 128117, 128110, 128373, 128130, 128119, 129332, 128120, 128115, 128114, 129493, 129492, 128113, 129333, 128112, 129328, 129329, 128124, 127877, 129334, 129497, 129498, 129499, 129500, 129501, 129502, 129503, 128589, 128590, 128581, 128582, 128129, 128587, 128583, 129318, 129335, 128134, 128135, 128694, 127939, 128131, 128378, 128111, 129494, 129495, 129496, 128704, 128716, 128372, 128483, 128100, 128101, 129338, 127943, 9975, 127938, 127948, 127940, 128675, 127946, 9977, 127947, 128692, 128693, 127950, 127949, 129336, 129340, 129341, 129342, 129337, 128107, 128108, 128109, 128143, 128145, 128106, 129331, 128170, 128072, 128073, 9757, 128070, 128405, 128071, 9996, 129310, 128406, 129304, 129305, 128400, 9995, 128076, 128077, 128078, 9994, 128074, 129307, 129308, 129306, 128075, 129311, 9997, 128079, 128080, 128588, 129330, 128591, 129309, 128133, 128066, 128067, 128099, 128064, 128065, 129504, 128069, 128068, 128139, 128152, 10084, 128147, 128148, 128149, 128150, 128151, 128153, 128154, 128155, 129505, 128156, 128420, 128157, 128158, 128159, 10083, 128140, 128164, 128162, 128163, 128165, 128166, 128168, 128171, 128172, 128488, 128495, 128173, 128371, 128083, 128374, 128084, 128085, 128086, 129507, 129508, 129509, 129510, 128087, 128088, 128089, 128090, 128091, 128092, 128093, 128717, 127890, 128094, 128095, 128096, 128097, 128098, 128081, 128082, 127913, 127891, 129506, 9937, 128255, 128132, 128141, 128142, 128053, 128018, 129421, 128054, 128021, 128041, 128058, 129418, 128049, 128008, 129409, 128047, 128005, 128006, 128052, 128014, 129412, 129427, 129420, 128046, 128002, 128003, 128004, 128055, 128022, 128023, 128061, 128015, 128017, 128016, 128042, 128043, 129426, 128024, 129423, 128045, 128001, 128e3, 128057, 128048, 128007, 128063, 129428, 129415, 128059, 128040, 128060, 128062, 129411, 128020, 128019, 128035, 128036, 128037, 128038, 128039, 128330, 129413, 129414, 129417, 128056, 128010, 128034, 129422, 128013, 128050, 128009, 129429, 129430, 128051, 128011, 128044, 128031, 128032, 128033, 129416, 128025, 128026, 129408, 129424, 129425, 128012, 129419, 128027, 128028, 128029, 128030, 129431, 128375, 128376, 129410, 128144, 127800, 128174, 127989, 127801, 129344, 127802, 127803, 127804, 127799, 127793, 127794, 127795, 127796, 127797, 127806, 127807, 9752, 127808, 127809, 127810, 127811, 127815, 127816, 127817, 127818, 127819, 127820, 127821, 127822, 127823, 127824, 127825, 127826, 127827, 129373, 127813, 129381, 129361, 127814, 129364, 129365, 127805, 127798, 129362, 129382, 127812, 129372, 127792, 127838, 129360, 129366, 129384, 129374, 129472, 127830, 127831, 129385, 129363, 127828, 127839, 127829, 127789, 129386, 127790, 127791, 129369, 129370, 127859, 129368, 127858, 129379, 129367, 127871, 129387, 127857, 127832, 127833, 127834, 127835, 127836, 127837, 127840, 127842, 127843, 127844, 127845, 127841, 129375, 129376, 129377, 127846, 127847, 127848, 127849, 127850, 127874, 127856, 129383, 127851, 127852, 127853, 127854, 127855, 127868, 129371, 9749, 127861, 127862, 127870, 127863, 127864, 127865, 127866, 127867, 129346, 129347, 129380, 129378, 127869, 127860, 129348, 128298, 127994, 127757, 127758, 127759, 127760, 128506, 128510, 127956, 9968, 127755, 128507, 127957, 127958, 127964, 127965, 127966, 127967, 127963, 127959, 127960, 127962, 127968, 127969, 127970, 127971, 127972, 127973, 127974, 127976, 127977, 127978, 127979, 127980, 127981, 127983, 127984, 128146, 128508, 128509, 9962, 128332, 128333, 9961, 128331, 9970, 9978, 127745, 127747, 127961, 127748, 127749, 127750, 127751, 127753, 9832, 127756, 127904, 127905, 127906, 128136, 127914, 128642, 128643, 128644, 128645, 128646, 128647, 128648, 128649, 128650, 128669, 128670, 128651, 128652, 128653, 128654, 128656, 128657, 128658, 128659, 128660, 128661, 128662, 128663, 128664, 128665, 128666, 128667, 128668, 128690, 128756, 128757, 128655, 128739, 128740, 128738, 9981, 128680, 128677, 128678, 128721, 128679, 9875, 9973, 128758, 128676, 128755, 9972, 128741, 128674, 9992, 128745, 128747, 128748, 128186, 128641, 128671, 128672, 128673, 128752, 128640, 128760, 128718, 8987, 9203, 8986, 9200, 9201, 9202, 128368, 128347, 128359, 128336, 128348, 128337, 128349, 128338, 128350, 128339, 128351, 128340, 128352, 128341, 128353, 128342, 128354, 128343, 128355, 128344, 128356, 128345, 128357, 128346, 128358, 127761, 127762, 127763, 127764, 127765, 127766, 127767, 127768, 127769, 127770, 127771, 127772, 127777, 9728, 127773, 127774, 11088, 127775, 127776, 9729, 9925, 9928, 127780, 127781, 127782, 127783, 127784, 127785, 127786, 127787, 127788, 127744, 127752, 127746, 9730, 9748, 9969, 9889, 10052, 9731, 9924, 9732, 128293, 128167, 127754, 127875, 127876, 127878, 127879, 10024, 127880, 127881, 127882, 127883, 127885, 127886, 127887, 127888, 127889, 127872, 127873, 127895, 127903, 127915, 127894, 127942, 127941, 129351, 129352, 129353, 9917, 9918, 129358, 127936, 127952, 127944, 127945, 127934, 127923, 127951, 127953, 127954, 127955, 127992, 129354, 129349, 9971, 9976, 127907, 127933, 127935, 128759, 129356, 127919, 127921, 128302, 127918, 128377, 127920, 127922, 9824, 9829, 9830, 9827, 9823, 127183, 126980, 127924, 127917, 128444, 127912, 128263, 128264, 128265, 128266, 128226, 128227, 128239, 128276, 128277, 127932, 127925, 127926, 127897, 127898, 127899, 127908, 127911, 128251, 127927, 127928, 127929, 127930, 127931, 129345, 128241, 128242, 9742, 128222, 128223, 128224, 128267, 128268, 128187, 128421, 128424, 9e3, 128433, 128434, 128189, 128190, 128191, 128192, 127909, 127902, 128253, 127916, 128250, 128247, 128248, 128249, 128252, 128269, 128270, 128367, 128161, 128294, 127982, 128212, 128213, 128214, 128215, 128216, 128217, 128218, 128211, 128210, 128195, 128220, 128196, 128240, 128478, 128209, 128278, 127991, 128176, 128180, 128181, 128182, 128183, 128184, 128179, 128185, 128177, 128178, 9993, 128231, 128232, 128233, 128228, 128229, 128230, 128235, 128234, 128236, 128237, 128238, 128499, 9999, 10002, 128395, 128394, 128396, 128397, 128221, 128188, 128193, 128194, 128450, 128197, 128198, 128466, 128467, 128199, 128200, 128201, 128202, 128203, 128204, 128205, 128206, 128391, 128207, 128208, 9986, 128451, 128452, 128465, 128274, 128275, 128271, 128272, 128273, 128477, 128296, 9935, 9874, 128736, 128481, 9876, 128299, 127993, 128737, 128295, 128297, 9881, 128476, 9878, 128279, 9939, 9879, 128300, 128301, 128225, 128137, 128138, 128682, 128719, 128715, 128701, 128703, 128705, 128722, 128684, 9904, 9905, 128511, 127975, 128686, 128688, 9855, 128697, 128698, 128699, 128700, 128702, 128706, 128707, 128708, 128709, 9888, 128696, 9940, 128683, 128691, 128685, 128687, 128689, 128695, 128245, 128286, 9762, 9763, 11014, 8599, 10145, 8600, 11015, 8601, 11013, 8598, 8597, 8596, 8617, 8618, 10548, 10549, 128259, 128260, 128281, 128282, 128283, 128284, 128285].map(function (item) {
                var emojiLi = document.createElement("li");
                emojiLi.style.display = "inline-block", emojiLi.style.margin = "5px";
                var emojiLink = document.createElement("a");
                emojiLink.style.textDecoration = "none", emojiLink.style.margin = "5px", emojiLink.style.position = "initial", emojiLink.style.fontSize = "24px", emojiLink.setAttribute("href", "javascript:void(0)"), emojiLink.innerHTML = String.fromCodePoint(item), emojiLink.onmousedown = clickLink, emojiList.appendChild(emojiLink);
              }), emojiPicker.appendChild(emojiList), emojiContainer.appendChild(emojiPicker);
            }
          }]), EmojiPicker;
        }();

        module.exports = EmojiPicker;
      });
    }, {}]
  }, {}, [1])(1);
});
},{}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55693" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","src/assets/js/emojiPicker.min.js"], null)
//# sourceMappingURL=/emojiPicker.min.a60046eb.map