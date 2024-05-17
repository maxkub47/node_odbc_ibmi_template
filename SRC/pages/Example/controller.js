const repository = require('./repository')

const rtvjoba = async (req, res) => {
  try {
    let results = await repository.rtvjoba()
    res.status(200).send({
      status: 'success',
      ...results,
    })
  } catch (error) {
    res.status(500).send({
      status: 'error',
      msg: 'function RTVJOBA Error',
      ODBCmsg: error,
    })
    console.log(error)
  }
}

const callproc = async (req, res) => {
  try {
    const { numa, numb } = req.body
    let results = await repository.callProc({ numa, numb })
    res.status(200).send({
      status: 'success',
      ...results,
    })
  } catch (error) {
    res.status(500).send({
      status: 'error',
      msg: 'function RTVJOBA Error',
      ODBCmsg: error,
    })
    console.log(error)
  }
}

const getVehicle = async (req, res) => {
  try {
    let results = await repository.getVehicle()
    res.status(200).send({
      status: 'success',
      ...results,
    })
  } catch (error) {
    res.status(500).send({
      status: 'error',
      msg: 'function getVehicle Error',
      ODBCmsg: error,
    })
  }
}

const chgLibl = async (req, res) => {
  try {
    let results = await repository.chgLibl()
    res.status(200).send({
      status: 'success',
      ...results,
    })
  } catch (error) {
    res.status(500).send({
      status: 'error',
      msg: 'function chgLibl Error',
      ODBCmsg: error,
    })
  }
}

module.exports = {
  rtvjoba,
  callproc,
  getVehicle,
  chgLibl
}
