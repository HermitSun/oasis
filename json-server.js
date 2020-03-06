const path = require("path");

function resolve(filename) {
  return path.join(__dirname, filename);
}

/*----------------json-server---------*/
const jsonServer = require("json-server");
const apiServer = jsonServer.create();
const apiRouter = jsonServer.router(
  resolve("./src/api/json-server/ResponseJson.json")
);
const middleWares = jsonServer.defaults();
apiServer.use(middleWares);
apiServer.use(apiRouter);

apiServer.listen(3180, () => {
  console.log("JSON Server is running");
});
