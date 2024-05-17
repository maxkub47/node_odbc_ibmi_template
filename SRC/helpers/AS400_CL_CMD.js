require("dotenv").config();
const { Connection, CommandCall } = require("itoolkit");
const { parseString } = require("xml2js");
const connection = new Connection({
  transport: "odbc",
  transportOptions: {
    host: process.env.DB_HOST,
    username: process.env.DB_ID,
    password: process.env.DB_PASSWORD
  }
});

const CL_CMD = async (cmd) => {
  const command = new CommandCall({ type: "cl", command: `${cmd}` });
  console.log(command)
  connection.add(command);
  let promise = new Promise((resolve, reject) => {
    connection.run((error, xmlOutput) => {
      if (error) {
        throw error;
      }
      parseString(xmlOutput, (parseError, result) => {
        if (parseError) {
          throw parseError;
        }
        resolve(result);
      });
    });
  });

  return promise;
};

module.exports = { CL_CMD };