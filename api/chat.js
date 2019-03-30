const express = require("express");
const router = express.Router();
const Chatkit = require("@pusher/chatkit-server");
const chatkit = new Chatkit.default({
  instanceLocator: "v1:us1:bb7c51cf-f5cf-4761-a4ce-622a50e099cb",
  key:
    "6f561cdb-8829-4814-9c53-c96391ba2398:BS1L6idaDQzUGCnex9xfHXS4P8P6G32ELd2f5dy6umY="
});
router.get("/", (req, res) => {
  res.send("test");
});
router.post("/user", (req, res) => {
  const { accname, username } = req.body;
  chatkit
    .createUser({
      id: accname,
      name: username
    })
    .then(() => {
      res.status(201).send({ user: "Created successfully" });
    })
    .catch(err => {
      if (err.error === "services/chatkit/user_already_exists") {
        res.status(200).send({ user: `User already exists: ${accname}` });
      } else {
        res.status(err.status).json(err);
      }
    });
});

router.post("/authenticate", (req, res) => {
  const authData = chatkit.authenticate({
    userId: req.query.user_id
  });
  res.status(authData.status).send(authData.body);
});

module.exports = router;
