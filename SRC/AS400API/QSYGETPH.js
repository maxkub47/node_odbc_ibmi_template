const { Connection, ProgramCall, } = require("itoolkit");
const { XMLParser }  = require('fast-xml-parser');
const _ = require('lodash')

const conn = new Connection({
    transport: "ssh",
    transportOptions: {
      host: process.env.DB_HOST,
      username: process.env.DB_ID,
      password: process.env.DB_PASSWORD
    }
  });
const QSYGETPH = async (user, pass) => {


  const errno = {
    name: "error_code",
    type: "ds",
    io: "both",
    len: "rec2",
    fields: [
      {
        name: "bytes_provided",
        type: "10i0",
        value: 0,
        setlen: "rec2",
      },
      { name: "bytes_available", type: "10i0", value: 0 },
      { name: "msgid", type: "7A", value: "" },
      { type: "1A", value: "" },
    ],
  };

  const len_of_pass = pass.length
  console.log(len_of_pass)

  const program = new ProgramCall("QSYGETPH", { lib: "QSYS" });
    program.addParam({ name: "user_id" , io:"in" , type: "10A", value: _.toUpper(user) });
    program.addParam({ name: "password", io:"in" , type: "10A", value: _.toUpper(pass) });
    program.addParam({ name: "profile_handle", io:"in" , type: "12A", value: " " });
    program.addParam(errno);
    program.addParam({ name: "len_of_pass", io:"in" , type: "10i0", value: len_of_pass });
    program.addParam({ name: "ccsid_of_pass", io:"in" , type: "10i0", value: 37 });

    conn.add(program);
  return new Promise((resolve, reject) => {
    conn.run((error, xmlOutput) => {
      if (error) {
        reject(error);
      }
      const Parser = new XMLParser();
      const result = Parser.parse(xmlOutput);
      const msgid = result.myscript.pgm.parm.ds.data[2];
      resolve(msgid);
    });
  });
}

module.exports =  { QSYGETPH };