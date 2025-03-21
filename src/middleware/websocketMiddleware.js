import WebSocketService from '../services/websocketService';
import { websocketConnected, websocketDisconnected, websocketMessageReceived } from '../store/websocketSlice';

const websocketMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'websocket/connect':
      WebSocketService.connect((message) => {
        store.dispatch(websocketMessageReceived(message));
      });
      store.dispatch(websocketConnected());
      break;

    case 'websocket/disconnect':
      WebSocketService.disconnect();
      store.dispatch(websocketDisconnected());
      break;

    case 'websocket/sendMessage':
      WebSocketService.sendMessage(action.payload);
      break;

    default:
      break;
  }

  return next(action);
};

export default websocketMiddleware;

