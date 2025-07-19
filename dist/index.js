(function () {
var $a963e927b12f4a32$var$standaloneWindow = iina.standaloneWindow, $a963e927b12f4a32$var$overlay = iina.overlay, $a963e927b12f4a32$var$sidebar = iina.sidebar, $a963e927b12f4a32$var$event = iina.event, $a963e927b12f4a32$var$console = iina.console, $a963e927b12f4a32$var$menu = iina.menu;
$a963e927b12f4a32$var$console.log("Watchlet plugin is running - index.js");
$a963e927b12f4a32$var$standaloneWindow.loadFile("dist/ui/window/index.html");
$a963e927b12f4a32$var$menu.addItem($a963e927b12f4a32$var$menu.item("Show Window", function() {
    $a963e927b12f4a32$var$standaloneWindow.open();
}));
$a963e927b12f4a32$var$event.on("iina.window-loaded", function() {
    $a963e927b12f4a32$var$overlay.loadFile("dist/ui/overlay/index.html");
    $a963e927b12f4a32$var$menu.addItem($a963e927b12f4a32$var$menu.item("Show Video Overlay", function() {
        $a963e927b12f4a32$var$overlay.show();
    }));
    $a963e927b12f4a32$var$menu.addItem($a963e927b12f4a32$var$menu.item("Hide Video Overlay", function() {
        $a963e927b12f4a32$var$overlay.hide();
    }));
});
$a963e927b12f4a32$var$event.on("iina.window-loaded", function() {
    $a963e927b12f4a32$var$sidebar.loadFile("dist/ui/sidebar/index.html");
});

})();
//# sourceMappingURL=index.js.map
