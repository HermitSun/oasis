/*----------------json-server---------*/
const jsonServer = require("json-server");
/*搭建一个server*/
const apiServer = jsonServer.create();
/*将db.json关联到server*/
const apiRouter = jsonServer.router("src/api/json-server/ResponseJson.json");
const middleWares = jsonServer.defaults();
apiServer.use(middleWares);
apiServer.use(apiRouter);
/*监听端口*/
apiServer.listen(3180, () => {
  console.log("JSON Server is running");
});
