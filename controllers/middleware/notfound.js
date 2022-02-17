const notfound = (req,res) => {
  res.status(404).send("This route does not exists")
}

module.exports = notfound
