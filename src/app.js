import express from 'express';
import axios from 'axios';


const app = express();
const port = 3000

// middleware
app.use(express.json());

// Punto uno
app.get('/api', (req, res) => {
  res.status(200).json({message: 'hello world!'})
})

// punto 2
app.get('/api/suma', (req, res) => {
  const num1 = Number(req.query.num1);
  const num2 = Number(req.query.num2);
  const suma = num1 + num2;
  res.status(200).json({resultado: suma})
})

// punto 3
app.get('/api/usuario/:nombre', (req, res) => {
  const { nombre } = req.params;
  res.status(200).json({nombre});
})

// punto 4
app.get('/api/swapi/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://swapi.dev/api/people/${id}`);
    const personaje = response.data;
    res.status(200).json(personaje);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

// Punto 5
app.put('/api/body', (req, res) =>  res.status(200).json(req.body));

// Punto 6
app.post('/api/suma', (req, res) => {
  const { num1, num2 } = req.body;
  res.status(200).json({result: num1 + num2})
})

// punto 7
app.delete('/api/:id', (req, res) => {
  const { id } = req.params;
  if(id !== '3') 
    return res.status(404).json({message: `No se encontró el objeto con el ID ${id}`});
  else
    return res.status(200).json({message: `Se ha eliminado el objeto con ID ${id}`})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
