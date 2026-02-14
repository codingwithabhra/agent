const express = require("express");
const app = express();

app.use(express.json());

const cors = require("cors");
const corsOption = {
    initials: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOption));

const { initialisedatabase } = require ("./db/db.connect");
const saleAgentData = require("./models/saleagents.models");

initialisedatabase();

async function createSaleAgentData(newData){
    try {
        const saleAgent = await saleAgentData(newData);
        const saveData = saleAgent.save();
        return saveData;
    } catch (error) {
        throw error;
    }
}

app.get("/", (req, res) => {
    res.send("Hello from sales agent server");
});

//for sending new data to DB ----------------------------------
app.post("/agent", async(req, res) => {
    try {
        const newAgentData = await createSaleAgentData(req.body);
        res.status(201).json({message: "Data added successfully", newAgentData: newAgentData});
    } catch (error) {
        res.status(500).json({message:"Failed to add data in database"});
    }
})


//for fetching all data from DB ----------------------------------
async function getAllAgentData(){
    try {
        const getAllData = await saleAgentData.find();
        return getAllData;
    } catch (error) {
        throw error;
    }
}
app.get("/agent", async(req, res) => {
    try {
        const allAgentData = await getAllAgentData();
        if(allAgentData.length != 0){
            res.json(allAgentData);
        }
    } catch (error) {
        res.status(500).json({message: "Failed to get data"})
    }
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})