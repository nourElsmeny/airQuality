import App from "./app";

import airRoute from "./routes/air.route";
const app = new App([new airRoute()]);

app.listen();
