import { Level, Logger, LogTransport, SerializedLog } from "@src/logger";

class WebviewForwardingTransport implements LogTransport {
  log(
    level: Level,
    obj: Record<string, unknown> | null,
    msg: string | null
  ): void {
    const entry: SerializedLog = { level, obj, msg };
    // @ts-expect-error Global types in webviews aren't configured properly
    iina.postMessage("forwardLog", entry);
  }
}

export const logger = new Logger("info", new WebviewForwardingTransport());
