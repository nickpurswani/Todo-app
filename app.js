var express = require("express");
var app = express();
var mongoose = require("mongoose");
var methodOverride = require("method-override");
// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));mongoose.set("useCreateIndex", true);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
})
var todoSchema = new mongoose.Schema({
    todo:String
});
var Todo = mongoose.model("Todo",todoSchema);


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.get("/",(req,res)=>{
    Todo.find({},function(err,todo){
        if(err){
            res.status(404).json({err:"srry something wrong happened" })
        }else{
            res.render("index",{todos:todo});
        }
    });

});
app.post("/",(req,res)=>{
var todo=req.body.todo;
Todo.create({todo:todo},function(err,newTodo){
    res.redirect("/");
})
});
app.delete("/delete/:id",(req,res)=>{
    Todo.findByIdAndRemove({_id:req.params.id,routes:'todo'},(err)=>{
    if(err){
        res.status(404).json({
            err:'not found campground'
        });
    }
    else{
        res.redirect('/');
    }
    });
    });

app.listen(3000,function(){
    console.log("server has started at 3000");
})
