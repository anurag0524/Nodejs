import express from 'express';
import logger from "./logger.js";
import morgan from "morgan";

const app = express()
const port = 3000

const morganFormat = ":method :url :status :response-time ms";

app.use(morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    }));

// app.get("/",(req, res) =>{
//     res.send("Hello from Anurag")
// })

// app.get("/tea",(req, res) =>{
//     res.send("Which tea would you prefer sir/mam?")
// })

// app.get("/twitter",(req, res) =>{
//     res.send("SamdariyaAnurag")
// })

app.use(express.json())

let teaData = []
let nextId = 1

// add a new tea
app.post('/teas',(req, res) =>{
    logger.info("A post request was made to add a new tea")
    const {name, price} = req.body
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

// get all tea
app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
})

// get a tea with id
app.get('/teas/:id', (req, res) =>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.send(404).send("Tea not found 😥")
    }
    res.status(200).send(tea)
})

// update tea
app.put('/teas/:id',(req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.send(404).send("Tea not found 😥")
    }
    const {name, price} = req.body
    tea.name = name
    tea.price = price
    res.send(200).send(tea)
})

// delete tea

app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send("Tea not found")
    }
    teaData.splice(index,1)
    return res.status(204).send("Deleted the tea")
})

app.listen(port,()=>{
    console.log(`Server is running at port : ${port}...`)
})