const { CL_CMD } = require('../../helpers/AS400_CL_CMD')
const { callProcedure, query } = require('../../helpers/odbc')

const rtvjoba = async () => {
  const cmd = 'RTVJOBA USRLIBL(?) SYSLIBL(?)'
  //const cmd = 'RTVUSRPRF JOBD(?) JOBDLIB(?)'
  //const cmd = 'DSPJOBD JOBD(QGPL/QDFTJOBD) OUTPUT(*)'
  //const cmd = 'DSPLIBL output(*)'
  let result = await CL_CMD(cmd)
  console.log('result', JSON.stringify(result))
  return result
}

const callProc = async ({ numa, numb }) => {
  let result = await callProcedure(null, `MAXLIB`, `SUMPGM`, [numa, numb, 0])
  return result
}

const getVehicle = async () => {
  let result = await query('SELECT * FROM prd1dblib.fi010P')
  console.log(result)
  return result
}

const chgLibl = async () => {
  // let result = await query('SELECT * FROM file1')
  // console.log(result)
  // result = await query('SELECT * FROM file1')
  // console.log(result)
  // return result

  if (!req.session) {
    req.session = {};
  }

  // Set DB_DBQ on the session
  req.session.DB_DBQ = 'MAXLIB2, MAXLIB , MAXTOOL';

  // Now you can call Database.connect
  Database.connect(req).then(() => {
    // Do something after the database has connected
  });
}

module.exports = {
  rtvjoba,
  callProc,
  getVehicle,
  chgLibl,
}
