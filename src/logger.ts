export type Level = "debug" | "info" | "warn" | "error";

const levelOrder = ["debug", "info", "warn", "error"] as const;

interface LogFn {
  (obj: unknown, msg?: string): void;
  (msg: string): void;
}

export type SerializedLog = {
  level: Level;
  obj: Record<string, unknown> | null;
  msg: string | null;
};

export class Logger {
  constructor(public level: Level, public transport: LogTransport) {}

  debug: LogFn = (a1, a2?): void => {
    this.log("debug", a1, a2);
  };

  info: LogFn = (a1, a2?): void => {
    this.log("info", a1, a2);
  };

  warn: LogFn = (a1, a2?): void => {
    this.log("warn", a1, a2);
  };

  error: LogFn = (a1, a2?): void => {
    this.log("error", a1, a2);
  };

  log(level: Level, a1: unknown, a2?: unknown): void {
    if (levelOrder.indexOf(level) < levelOrder.indexOf(this.level)) {
      return;
    }

    let hasObj: boolean;
    let toObj: unknown;
    let hasMsg: boolean;
    let toMsg: unknown;

    if (typeof a2 === "undefined") {
      if (typeof a1 === "string") {
        hasMsg = true;
        toMsg = a1;
        hasObj = false;
      } else {
        hasMsg = false;
        toObj = a1;
        hasObj = true;
      }
    } else {
      hasObj = true;
      toObj = a1;
      hasMsg = true;
      toMsg = a2;
    }

    let msg: string | null;
    if (hasMsg) {
      if (typeof toMsg === "string") {
        msg = toMsg;
      } else if (typeof toMsg === "object" && toMsg !== null) {
        try {
          msg = JSON.stringify(toMsg);
        } catch {
          msg = "[Circular object]";
        }
      } else {
        msg = String(toMsg);
      }
    } else {
      msg = null;
    }

    let obj: Record<string, unknown> | null;
    if (hasObj) {
      if (typeof toObj === "object" && toObj !== null) {
        try {
          obj = JSON.parse(JSON.stringify(toObj));
        } catch {
          obj = { error: "[Circular object]" };
        }
      } else {
        obj = { value: toObj };
      }
    } else {
      obj = null;
    }

    this.transport.log(level, obj, msg);
  }
}

export function formatObj(obj: Record<string, unknown>): string {
  const inner = Object.entries(obj)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join(", ");
  return "[" + inner + "]";
}

export interface LogTransport {
  log(
    level: Level,
    obj: Record<string, unknown> | null,
    msg: string | null
  ): void;
}
