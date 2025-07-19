import "../window/window.ce6465d1.js";


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

      var $parcel$global =
        typeof globalThis !== 'undefined'
          ? globalThis
          : typeof self !== 'undefined'
          ? self
          : typeof window !== 'undefined'
          ? window
          : typeof global !== 'undefined'
          ? global
          : {};
  
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequireeece"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequireeece"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;

var $4UJei = parcelRequire("4UJei");

parcelRequire("babqj");

var $dOJX0 = parcelRequire("dOJX0");

var $4UJei = parcelRequire("4UJei");
parcelRequire("babqj");
const $9d18d1daaec7a9f8$var$App = ()=>/*#__PURE__*/ (0, $4UJei.jsx)("div", {
        children: /*#__PURE__*/ (0, $4UJei.jsx)("p", {
            children: "This is a sidebar view."
        })
    });
var $9d18d1daaec7a9f8$export$2e2bcd8739ae039 = $9d18d1daaec7a9f8$var$App;


document.addEventListener("DOMContentLoaded", ()=>{
    (0, (/*@__PURE__*/$parcel$interopDefault($dOJX0))).render(/*#__PURE__*/ (0, $4UJei.jsx)((0, $9d18d1daaec7a9f8$export$2e2bcd8739ae039), {
        children: "Hello, world!"
    }), document.getElementById("root"));
});


//# sourceMappingURL=sidebar.a4ffa290.js.map
