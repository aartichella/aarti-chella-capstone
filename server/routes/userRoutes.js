const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

function readUsers(){
    const fileContent = fs.readFileSync("./data/users.json");
    return (JSON.parse(fileContent));
}
function readTasks() {
    const fileContent = fs.readFileSync("./data/tasks.json");
    return (JSON.parse(fileContent));
}

router.get('/:id',(req,res)=>{
    console.log(req);
    let userData= readUsers();
    let loggedUser = userData.filter(data=>data.id ==req.params.id);
    console.log(loggedUser);
    res.status(200).send("Found the user")
})

router.post('/login',(req, res) => {
    console.log(req.body);
    
    let userList = readUsers();
    const {name, password} = req.body;
    console.log("req.body =",name,password)
    
    let loggedUser = userList.filter(data=>data.username==name);
    
    console.log("loggedUser",loggedUser);
    
    if(loggedUser.length > 0 && loggedUser[0].password==password){
        res.status(200).send(loggedUser[0]);
    }
    else{
        res.status(401).send("Incorrect Password");
    }
})

router.post('/signup',(req, res) => {
    console.log(req);
    let userList = readUsers();
    const {name, address, city, email, password} = req.body;
    const newUser = {
        id: uuidv4(),
        password,
        name,
        address,
        city,
        email
    }
    userList.push(newUser);
    fs.writeFileSync("./data/users.json",JSON.stringify(userList));

    res.status(201).send(newUser);
});

router.get('/:userID/tasks', (req,res) => {
    console.log('getting tasks for',req.params);
    const taskList = readTasks();
    let userTasks = taskList.filter(data=>data.userid==req.params.userID);
    res.status(200).send(userTasks);
});

router.post('/:userID/addTask',(req,res) => {
    const {storeName, storeAddress, orderNumber,pickupDate} = req.body;
    const userList = readUsers();
    const user = userList.filter(data=>data.id==req.params.userID);

    const newTask = {
        taskId: uuidv4(),
        userid: req.params.userID,
        storeName,
        storeAddress,
        orderNumber,
        volunteerId:"",
        volunteerName:"",
        deliveryStatus:"Placed",
        deliveryDate:pickupDate,
        deliveryTime:"5:00 PM",
        userAddress: user[0].address
    }
    const taskList = readTasks();
    taskList.push(newTask);
    fs.writeFileSync("./data/tasks.json",JSON.stringify(taskList));
    res.status(200).send(newTask);

});
module.exports = router;