const odbc = require('odbc')
const { setEnvValue } = require('../utils/setdotenv')

class Database {
  static pool

  static async connect(connectionString) {
 
    console.log(connectionString)
    this.pool = await odbc.pool(connectionString)
  }
  static async close() {
    await this.pool.close()
  }
}

const query = async (statement, parameters = []) => {
  console.log(connectionString)
  const connection = await odbc.pool(connectionString)
  try {
    return await connection.query(statement, parameters)
  } finally {
    connection.close()
  }
}

const callProcedure = async (
  catalog,
  library,
  procedure,
  bindingsValues = []
) => {
  const connection = await Database.pool.connect()
  try {
    return connection.callProcedure(catalog, library, procedure, bindingsValues)
  } finally {
    connection.close()
  }
}

const insertWithCommitAndRollback = async (statement, parameters = []) => {
  const connection = await Database.pool.connect()
  try {
    await connection.beginTransaction()
    const result = await connection.query(statement, parameters)
    await connection.commit()
    return result
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    connection.close()
  }
}
// const checkLiblValue = async (USER) => {
//   const newLibl = await getlibl({ USER })
//   return newLibl === undefined || newLibl === null
//     ? process.env.DB_DBQ
//     : newLibl
// }

// setEnvValue("DB_DBQ", "MAXLIB1 ,MAXLIB, MAXTOOL");

let connectionString = [
  `DRIVER=IBM i Access ODBC Driver`,
  `SYSTEM=${process.env.DB_HOST}`,
  `UID=${process.env.DB_ID}`,
  `Password=${process.env.DB_PASSWORD}`,
  `Naming=1`,
  `DBQ=${process.env.DB_DBQ}`,
].join(';')

const setDBQ = (dbqValue) => {
  connectionString = [
    `DRIVER=IBM i Access ODBC Driver`,
    `SYSTEM=${process.env.DB_HOST}`,
    `UID=${process.env.DB_ID}`,
    `Password=${process.env.DB_PASSWORD}`,
    `Naming=1`,
    `DBQ=${dbqValue}`,
  ].join(';')
}

//Database.connect(connectionString)

module.exports = {
  Database,
  query,
  callProcedure,
  insertWithCommitAndRollback,
  connectionString,
  setDBQ
}
