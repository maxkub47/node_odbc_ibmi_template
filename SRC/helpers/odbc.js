const odbc = require('odbc')
const { getlibl } = require('../utils/chklibl')

class Database {
    static pool
    static async connect(connectionString) {
      this.pool = await odbc.pool(connectionString)
      this.pool.close()
    }
}

async function executeQuery(statement, parameters = []) {
    try {
        const connection = await odbc.connect(connectionString)
        const result = await connection.query(statement, parameters)
        await connection.close()
        return result
    } catch (error) {
        console.error('Error executing query:', error)
        throw error
    }
}

async function callProcedure(catalog, library, procedure, bindingsValues = []) {
    try {
        const connection = await odbc.connect(connectionString)
        const procedureCall = `{CALL ${catalog}.${library}.${procedure}(?)}`
        const result = await connection.callProcedure(procedureCall, bindingsValues)
        await connection.close()
        return result
    } catch (error) {
        console.error('Error calling procedure:', error)
        throw error
    }
}

async function insertWithCommitAndRollback(statement, parameters = []) {
    let connection
    try {
        connection = await odbc.connect(connectionString)
        await connection.beginTransaction()

        const result = await connection.query(statement, parameters)

        await connection.commit()
        await connection.close()

        return result
    } catch (error) {
        console.error('Error executing insert with commit and rollback:', error)
        if (connection) {
            await connection.rollback()
            await connection.close()
        }
        throw error
    }
}

function checkLiblValue(libl) {
    libl = getlibl({ USER:'MAX' })
    if (libl === undefined || libl === null) {
        return process.env.DB_DBQ
    }
    return libl
}

const connectionString = [
    `DRIVER=IBM i Access ODBC Driver`,
    `SYSTEM=${process.env.DB_HOST}`,
    `UID=${process.env.DB_ID}`,
    `Password=${process.env.DB_PASSWORD}`,
    `Naming=1`,
    //`DBQ=,${process.env.DB_DBQ ? process.env.DB_DBQ : '*USRLIBL'}`,
    `DBQ=, ${checkLiblValue()}`,
].join(';')

module.exports = {
    Database,
    executeQuery,
    callProcedure,
    insertWithCommitAndRollback,
    checkLiblValue,
    connectionString,
}