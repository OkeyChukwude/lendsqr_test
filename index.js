const app = require("./server");

const { PORT } = require('./config')

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`))