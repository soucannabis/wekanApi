const express = require('express');
const cors = require("cors")
const bodyParser = require("body-parser")
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: '*',
  credentials: true
}));

app.post('/create-card', async (req, res) => {
    res.send("OK")
    res.status(200)
})


app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.REACT_APP_SERVER_PORT}`);
});
