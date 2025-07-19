import { logger, registerWebviewLogForwarder } from "./logger";

const { standaloneWindow, overlay, sidebar, event, menu } = iina;

logger.info("Watchlet plugin is running - index.ts");

standaloneWindow.loadFile("dist/window.html");
registerWebviewLogForwarder("window", standaloneWindow);

menu.addItem(
  menu.item("Show Window", () => {
    standaloneWindow.open();
  })
);

event.on("iina.window-loaded", () => {
  logger.info("IINA window loaded, initializing webviews...");

  overlay.loadFile("dist/overlay.html");
  registerWebviewLogForwarder("overlay", overlay);

  menu.addItem(
    menu.item("Show Video Overlay", () => {
      overlay.show();
    })
  );
  menu.addItem(
    menu.item("Hide Video Overlay", () => {
      overlay.hide();
    })
  );

  sidebar.loadFile("dist/sidebar.html");
  registerWebviewLogForwarder("sidebar", sidebar);
});
