import "dotenv/config";
import colors from "colors";
import server from "./server";

const port = process.env.PORT || 3000;
// Start the server
server.listen(port, () => {
  console.log(colors.cyan.bold(`Express application is running on port ${port}`));
});
