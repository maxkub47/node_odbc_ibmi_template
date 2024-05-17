const { CL_CMD } = require('../../helpers/AS400_CL_CMD')
const { callProcedure, query, setConnectionString, setDBQ } = require('../../helpers/odbc')

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
  let result = await query('SELECT * FROM fi010P limit 1')
  console.log(result)
  return result
}

const chgLibl = async () => {
  setDBQ('MAXLIB1')
  let result = await query('SELECT * FROM file1')
  console.log(result)
  setDBQ('MAXLIB2')
  result = await query('SELECT * FROM file1')
  //setDBQ(process.env.DB_DBQ)
  return result
}

module.exports = {
  rtvjoba,
  callProc,
  getVehicle,
  chgLibl,
}
