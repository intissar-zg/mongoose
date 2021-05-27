const { Router } = require('express');
const express=require('express');
const Person=require('../Model/personSchema')
const router=express.Router();
router.post('/newPerson',(req,res)=>{
    let newPerson=new Person(req.body)
    newPerson.save( (err,data)=> {
        err ? console.log(err) : res.send("person added")

    })
})

router.get( '/', (req,res)=> {
    Person.find({}, (err,data)=> {
        err ? console.log(err) : res.json(data)
    } )
})

router.get( '/favorit', (req,res)=> {
    Person.findOne({favoriteFoods:'sandwitch'}, (err,data)=> {
        err ? console.log(err) : res.json(data)
    } )
})


router.get('/:id', (req,res)=> {
    Person.find( {_id:req.params.id}, (err,data)=> {
        err ? console.log(err) : res.json(data)  
    })
})


router.put( '/:id', (req,res)=> {
    Person.findByIdAndUpdate( {_id:req.params.id},{...req.body},(err,data)=> {
        err ? console.log(err) : res.json({msg:"person was updated"})
    })
})



router.put( '/age/:name', (req,res)=> {
    Person.findOneAndUpdate( {name:req.params.name},{age:20},(err,data)=> {
        err ? console.log(err) : res.json({msg:"age was updated"})
    })
        
})


 var arrayOfPeople = [
    {name: "wiem", age: 14,   favoriteFoods: ["pizza"]},
    {name: "sarra", age: 22,    favoriteFoods: ["roast chicken"]},
    {name: "rayhana", age: 18, favoriteFoods: ["hamburger"]}
   ];
  
 router.post( '/many', (req,res)=> {
   Person.create (arrayOfPeople,(err,data)=>{
    err ? console.log(err) : res.json(
        data)

   }
   )  
 })
 function addHamb(food){
    let test=false;
    food.map((el)=>{
        if(el.toLowerCase()=== "hamburger"){
            test=true;
            return food;
        }
    });
    if (!test) food.push("Hamburger");
    return food;
}
router.put("/updateFood/:id", (req, res) => {
    Person.findById({ _id: req.params.id }, (err, result) => {
        if (err) res.send("Error");
        else {
            addHamb(result.favoriteFoods);
            result.save(function (err) {
                if (err) console.error("ERROR!");
            });
            res.send(result);
        }
    });
});

   router.delete('/:id', (req,res)=> {
    Person.findByIdAndDelete({_id:req.params.id},(err,msg)=> {      
        err ? console.log(err) : res.json({msg:"person was deleted"})
    })
})



router.delete("/deleteMarys/:name",async(req,res)=>{
    Person.remove({name:req.params.name},(err,msg)=>{
        try{
            res.send(err);
        }
        catch{ res.send(msg);}

    });
});

 
router.get('/querySearch/:food',(req,res)=>{
        Person.find({favoriteFoods:req.params.food },{age:0}).sort({name:1}).limit(2).exec((err,data)=>{
            err? console.log(err) :  res.json(data) 
    
        })
    })

module.exports= router
