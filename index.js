import app from "./app.js";

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
  console.log(`http://localhost:${process.env.PORT}`);
});
