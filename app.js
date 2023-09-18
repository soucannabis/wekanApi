const express = require('express');
const cors = require("cors")
const axios = require("axios")
const bodyParser = require("body-parser")
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: 'https://agendamento.ecosistemasoucannabis.ong.br',
  credentials: true
}));


async function wekanRequest(query, data, method) {
  const config = {
    method: method,
    maxBodyLength: Infinity,
    url: process.env.WEKAN_API_URL + query,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.WEKAN_API_KEY
    },
    data: data
  }

  const response = await axios.request(config);

  return response.data;

}

app.get('/create-card', async (req, res) => {
  res.send("OK")
})

app.post('/create-card', async (req, res) => {
  const board = req.body.kanbanInfo.board
  const list = req.body.kanbanInfo.list 

 
  const userData = await wekanRequest("/boards/"+board+"/lists/"+list+"/cards", JSON.stringify(req.body.userData) , "POST")
  res.header('Access-Control-Allow-Origin', 'https://agendamento.ecosistemasoucannabis.ong.br')
  .send(userData).status(200)
})

app.post('/update-card', async (req, res) => {
  const board = req.body.kanbanInfo.board
  const list = req.body.kanbanInfo.list 
  const userCode = req.body.kanbanInfo.userCode 

  console.log(req.body)

//  const userData = await wekanRequest("/boards/"+board+"/lists/"+list+"/cards"+userCode, JSON.stringify(req.body.userData) , "PUT")
  console.log(userData)
  res.send(userData).status(200)
})



app.listen(8087, () => {
  console.log(`Servidor rodando na porta 8087`);
});
