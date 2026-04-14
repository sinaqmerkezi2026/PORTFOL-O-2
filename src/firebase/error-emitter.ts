
type Listener = (data: any) => void;

class ErrorEmitter {
  private listeners: { [key: string]: Listener[] } = {};

  on(event: string, listener: Listener) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(listener);
  }

  emit(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((l) => l(data));
    }
  }

  off(event: string, listener: Listener) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((l) => l !== listener);
    }
  }
}

export const errorEmitter = new ErrorEmitter();
