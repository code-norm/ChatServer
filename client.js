const Chatkit = require("@pusher/chatkit-client");

const tokenProvider = new Chatkit.TokenProvider({
  url: "localhost:5000/chat/authenticate"
});

const chatManager = new Chatkit.ChatManager({
  instanceLocator: "v1:us1:bb7c51cf-f5cf-4761-a4ce-622a50e099cb",
  userId: "duy",
  tokenProvider
});

chatManager
  .connect()
  .then(currentUser => {
    console.log("Successful connection", currentUser);
  })
  .catch(err => {
    console.log("Error on connection", err);
  });
