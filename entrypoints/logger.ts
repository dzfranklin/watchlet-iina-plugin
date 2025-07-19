import {
  Logger,
  LogTransport,
  Level,
  formatObj,
  SerializedLog,
} from "@src/logger";

class IINALogTransport implements LogTransport {
  log(
    level: Level,
    obj: Record<string, unknown> | null,
    msg: string | null
  ): void {
    let formatted = "";
    if (obj !== null) {
      formatted += formatObj(obj);
    }
    if (msg !== null) {
      if (formatted.length > 0) {
        formatted += " ";
      }
      formatted += msg;
    }

    switch (level) {
      case "debug":
      case "info":
        iina.console.log(formatted);
        break;
      case "warn":
        iina.console.warn(formatted);
        break;
      case "error":
        iina.console.error(formatted);
        break;
    }
  }
}

export const logger = new Logger("info", new IINALogTransport());

export function registerWebviewLogForwarder(
  name: string,
  webview: IINA.API.Overlay | IINA.API.SidebarView | IINA.API.StandaloneWindow
): void {
  webview.onMessage("forwardLog", (entry: SerializedLog) => {
    const { level, msg } = entry;
    const obj = entry.obj ?? {};

    obj["source"] = name;

    logger.log(level, obj, msg);
  });
  logger.info(`Registered ${name} log forwarder`);
}
