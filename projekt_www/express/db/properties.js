var contIp = '192.168.99.100'

properties = {
  containerIp: contIp,
  mongoConnectionString: `mongodb://${contIp}:27017`,
  userName: "user",
  password: "password",
  dbName: "applicationDb",
  operationsCollectionName: "operations",
  recipesCollectionName: "recipes"
}

module.exports = properties