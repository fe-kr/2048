export class EventEmitter<T> {
  private events: Record<string, Set<(...args: unknown[]) => void>>;

  constructor() {
    this.events = {};
  }

  on<T>(eventName: string, callback: (...args: T[]) => void) {
    this.events[eventName] ??= new Set();

    this.events[eventName].add(callback);

    return this;
  }

  emit<T>(eventName: string, ...args: T[]) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((fn) => fn(...args));
    }

    return this;
  }

  off<T>(eventName: string, callback: Listener<T>) {
    this.events[eventName]?.delete(callback);

    if (!this.events[eventName]?.size) {
      delete this.events[eventName];
    }

    return this;
  }

  clear() {
    this.events = {};

    return this;
  }
}
