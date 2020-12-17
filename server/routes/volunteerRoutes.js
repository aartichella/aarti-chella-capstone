const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

function readVolunteers(){
    const fileContent = fs.readFileSync("./data/volunteer.json");
    return (JSON.parse(fileContent));
}
function readTasks() {
    const fileContent = fs.readFileSync("./data/tasks.json");
    return (JSON.parse(fileContent));
}

router.get('/:id',(req,res)=>{
    console.log(req);
    let userData= readVolunteers();
    let loggedUser = userData.filter(data=>data.id ==req.params.id);
    console.log(loggedUser);
    res.status(200).send("Found the Volunteer")
})
router.post('/login',(req, res) => {
    console.log(req.body);
    
    let volList = readVolunteers();
    const {name, password} = req.body;
    console.log("req.body =",name,password)
    
    let loggedvol = volList.filter(data=>data.username==name);
    
    console.log("loggedvol",loggedvol);
    
    if(loggedvol.length > 0 && loggedvol[0].password==password){
        res.status(200).send(loggedvol[0]);
    }
    else{
        res.status(401).send("Incorrect Password");
    }
})

router.post('/signup',(req, res) => {
    console.log(req);
    let userList = readVolunteers();
    const {username,name, address, city, email, password} = req.body;
    const newUser = {
        id: uuidv4(),
        password,
        name,
        username,
        address,
        city,
        email
    }
    userList.push(newUser);
    fs.writeFileSync("./data/volunteer.json",JSON.stringify(userList));

    res.status(201).send(newUser);
});

//show tasks for a given volunteer
router.get('/:volId/tasks', (req,res) => {
    console.log('getting tasks for',req.params);
    const taskList = readTasks();
    let volTasks = taskList.filter(data=>(data.volunteerId==req.params.volId)||(data.volunteerId==""));
    res.status(200).send(volTasks);
});

router.put('/:taskId/accept',(req,res)=>{
    console.log('accept params',req.params);
    console.log('accept vol id',req.body);
    const newVolId=req.body.volId;
    const taskId=req.params.taskId;
    
    const volList=readVolunteers();
    let newVol=volList.filter(data=>(data.id==newVolId));

    const taskList = readTasks();
    let volTask = taskList.filter(data=>(data.taskId==taskId));
    
    volTask[0].volunteerId=newVolId;
    volTask[0].volunteerName=newVol[0].name;
    
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id==taskId){
            taskList[i]=volTask[0];
        }
    }
    fs.writeFileSync("./data/tasks.json",JSON.stringify(taskList));
    res.status(200).send(volTask[0]);
})
module.exports = router;