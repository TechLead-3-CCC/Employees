
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(3000, console.log("Ecoute sur le port 3000"));

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "employees"
});

pool.getConnection((err, connection)=>{
    if (err) throw err;
    console.log("Base de données connectée avec succès");
});

app.get("/lister/employe", (req, res)=>{
    let rq = "SELECT * FROM employe";
        pool.query(rq, (error, results) =>{
        if (error) throw error;
            res.json(results)
            console.log(results);
        });
})

app.post("/enregistre/employe", (req, res)=>{
    let rq = "INSERT INTO employe(nom,prenom,sexe,poste,salaire) VALUES(?,?,?,?,?)";
    let data = req.body;
    pool.query(rq,[data.nom,data.prenom,data.sexe,data.poste,data.salaire], (error, results) =>{
        if (error) throw error;
        res.json("Données enregistrées")
        console.log("Données enregistrées");
      }); 
})

app.post('/liste/employe/poste',(req, res) =>{
    let rq = "select * from employe where poste = ?";
    let data = req.body;
    pool.query(rq,[data.poste], (error, results) =>{
        if (error) throw error;
        res.json(results)
        console.log(results)
      });
  })

  app.post('/suppression/employe',(req, res) =>{
    let rq = "DELETE FROM employe  WHERE ID = ?";
    let data = req.body;
    pool.query(rq,[data.ID], (error, results) =>{
        if (error) throw error;
        res.json("Données supprimées")
        console.log("Données supprimées")
      });
  })


app.post('/rechercher/employe',(req, res) =>{
    let rq = "select * from employe where nom = ?";
    let data = req.body;
    pool.query(rq,[data.nom], (error, results) =>{
        if (error) throw error;
        res.json(results)
        console.log(results)
      });
  })

