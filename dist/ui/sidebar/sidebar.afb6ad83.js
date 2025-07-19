(function () {

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

var $fhTto = parcelRequire("fhTto");

parcelRequire("3eF6g");

var $8qRFl = parcelRequire("8qRFl");

var $fhTto = parcelRequire("fhTto");
parcelRequire("3eF6g");
var $6305d9b8e00eb8f8$var$App = function() {
    return /*#__PURE__*/ (0, $fhTto.jsx)("div", {
        children: /*#__PURE__*/ (0, $fhTto.jsx)("p", {
            children: "This is a sidebar view."
        })
    });
};
var $6305d9b8e00eb8f8$export$2e2bcd8739ae039 = $6305d9b8e00eb8f8$var$App;


document.addEventListener("DOMContentLoaded", function() {
    (0, (/*@__PURE__*/$parcel$interopDefault($8qRFl))).render(/*#__PURE__*/ (0, $fhTto.jsx)((0, $6305d9b8e00eb8f8$export$2e2bcd8739ae039), {
        children: "Hello, world!"
    }), document.getElementById("root"));
});

})();
//# sourceMappingURL=sidebar.afb6ad83.js.map
