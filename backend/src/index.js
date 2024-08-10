import app from "./app.js";

app.listen(process.env.PORT || 8000, () => {
  console.log("app is listening at port 8000");
});
