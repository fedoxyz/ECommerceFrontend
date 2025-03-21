class WebSocketService {
  constructor() {
    this.socket = null;
    this.url = 'ws://your-websocket-url';
  }

  connect(onMessage) {
    if (this.socket) return;
    
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
    };

    this.socket.onmessage = (event) => {
      if (onMessage) onMessage(JSON.parse(event.data));
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket Disconnected');
      setTimeout(() => this.connect(onMessage), 3000); // Auto-reconnect
    };
  }

  sendMessage(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

export default new WebSocketService();

