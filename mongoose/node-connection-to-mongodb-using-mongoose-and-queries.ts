import express from 'express';
import mongoose from 'mongoose';

//establish a server
var app = express();
app.listen(3000, () => {
    console.log("Express server started at 3000");
});

//set up mongoose connection
mongoose.connect('mongodb://localhost:27017/Tenants', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) { console.log("MongoDB Connection Succeeded.") }
    else { console.log("Error in DB Connection: " + err) }
});

//Define a schema for collection
const employeeSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String },
    mobile: { type: String },
});

//compile a model for the schema - with collection name as 'nothings'
var Emp = mongoose.model('Some', employeeSchema);
//<----------------------------------------------------------------------------------------------------->

//<--------------INSERT------------------------->
//create an instance of the model
var newEmp = new Emp({ name: "Ankesh", mobile: 9191 });

//insert or update the data to mongodb
newEmp.save(function (err) {
    if (err) return console.log(err);
    else { console.log("Saved Data") }
});

//<-----------------OR----------------------->
Emp.create({ name: 'also_awesome', mobile: "9191" }, function (err, newEmp) {
    if (err) return console.log(err);
    else { console.log("Saved Data: " + newEmp) }
});
//<----------------------------------------------------------------------------------------------------->

//<-----------------FIND----------------------->
// find all athletes that play tennis
var query = Emp.find({ 'name': 'Ankesh' });

// selecting the 'name' and 'age' fields
query.select('name mobile');

// limit our results to 5 items
query.limit(5);

// sort by age
query.sort({ mobile: -1 });

// execute the query at a later time
query.exec(function (err, emps) {
    if (err) return console.log(err);
    else { console.log("Data: " + emps) }
})

//<-----------------OR----------------------->
Emp.
    find().
    where('name').equals('Ankesh').
    //where('age').gt(17).lt(50).  //Additional where query
    limit(5).
    sort({ mobile: -1 }).
    select('name mobile').
    exec(function (err, emps) {
        if (err) return console.log(err);
        else { console.log("Data: " + emps) }
    });
//<------------------------------------------------------------------------------------------------------>