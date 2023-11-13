const express = require("express");
const app = express();

app.use(express.json());
app.unsubscribe(express.urlencoded({ extended: true }));
app.listen(3000, () => console.log("listening on port 3000"))