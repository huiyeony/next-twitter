import { io, Socket } from "socket.io-client";
//전역 변수 관리
class SocketManager {
  static instance: SocketManager;
  static socket: Socket;

  private static getInstance() {
    if (!this.instance) {
      this.instance = new SocketManager();
      this.socket = io(`https://sheep.up.railway.app`, {
        transports: ["websocket"],
      });
    }
    return this.instance;
  }

  static getSocket() {
    console.log(window.location.protocol);
    if (!this.socket) {
      this.getInstance();
    }
    return this.socket;
  }
}

export default SocketManager;
