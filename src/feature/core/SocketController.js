import React from "react";
import { connect } from "react-redux";
import SocketIO from "socket.io-client";

export class SocketController extends React.Component {
  static singletonInstance: SocketController;

  socket = null;
  echo = null;
  socketPrefix = "";

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.server !== this.props.server;
  }

  chatEvent = (data) => {
    updateMessagesFromSocket({ data: data });
  };

  setupChatService() {
    this.echo?.leaveChannel();
    this.echo?.disconnect();

    const { server = "https://vietwavegroup.net:1991" } = this.props;

    this.socket?.close();

    if (!server) {
      return;
    }

    this.socket = new SocketIO(server, {
      forceNew: true,
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 5000,
      reconnectionDelayMax: 10000,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      debug: true,
      transports: ["websocket"],
      open: () => {
        console.warn("open connection");
      },
    });

    this.socket.open();

    console.log("try to connect web socket", {
      server,
    });

    this.socket.on("connect", this.onConnect);

    this.socket.on("error", (error) => {
      console.error(`SocketController->error "${error}"`);
    });
    this.socket.on("connect_error", (error) => {
      console.log("SocketController->connect_error", error);
    });
    this.socket.on("connect_timeout", (error) => {
      console.error(`SocketController->connect_timeout "${error}"`);
    });
    this.socket.on("reconnect", (attemptNumber) => {
      console.error(`SocketController->reconnect: ${attemptNumber}`);
    });

    this.socket.on("ping", () => {
      console.log("SocketController->ping");
    });

    this.socket.on("message", this.onMessage);

    this.socket.on("pong", () => {
      console.log("SocketController->pong");
    });
    this.socket.on("disconnect", (reason) => {
      console.log("SocketController->disconnect", reason);
    });
  }

  componentWillUnmount() {
    this.socket?.close();
    this.socket = null;
  }

  onMessage = (data) => {
    console.log("SocketController::onMessage()", onMessage);
  };

  onConnect = () => {
    console.log("SocketController::onConnect()");
  };

  _emit(...params) {
    if (!this.socket) {
      return false;
    }

    this.socket.emit(...params);
    return true;
  }

  static emit(...params) {
    if (SocketController.singletonInstance) {
      SocketController.singletonInstance._emit(...params);
    }
  }

  static setRef(ref) {
    SocketController.singletonInstance = ref;
  }

  render() {
    this.setupChatService();
    return null;
  }

  static displayName = "SocketController";
}

class EnhanceSocketController extends React.PureComponent {
  render() {
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <SocketController
        ref={(c) => SocketController.setRef(c)}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
  };
};

export default connect(mapStateToProps)(EnhanceSocketController);
