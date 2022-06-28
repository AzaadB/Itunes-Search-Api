const express = require('express');//required express module
const app = express();
const bodyParser = require('body-parser')//required the body-parser module 

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//WebProjects array
const webproject = [{"id": 0, "title": "React Game!", "description": "Tic tac toe game created using Create React app.", "url": "http://heroku/myapp/game/"},

{
    "id": 1, "title":"Online store", "description": "Online store created with HTML, CSS and JavaScript.", "url": "https://git.com/myrepos/shop/index"
}
]


//Id is updated every time a post request is made//
let listItems = webproject.length

//Get the array//
app.get("/data", (req, res) =>{
    //console.log(webproject)
    res.json({'items' : webproject})
});



//Add new item to array//
app.post('/create', function (req, res){
    
    ++listItems
    
    const items = {
        "id": webproject.length,
        "title": req.body.title,
        "description": req.body.description,
        "url": req.body.url
    }
        webproject.push(items)

        res.json({'items': webproject})
})

//Delete item from array//
app.delete('/delete', function(request, res){
    const itemIndex = webproject.findIndex(items => items.id === parseInt(request.body.id));
    if(itemIndex >= 0) {
        webproject.splice(itemIndex, 1);
    }
    webproject.forEach((item, index)=>{//So if an item is deleted then the numbers stay in order//
        item.id = index
    }) 
    res.json({'items': webproject});
});

//Update an item within array//
app.put('/update', function(request,response){
    webproject.forEach(items => {
        if(items.id === parseInt(request.body.id)){
            console.log(request.body.title)
            items.title = request.body.title ? request.body.title : items.title ;
            items.description = request.body.description ? request.body.description: items.description ;
            items.url = request.body.url ? request.body.url: items.url;
            
        }
    })
    console.log(webproject)
    response.json({'items': webproject});//sending json to the front-end//
})

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'frontend/build')));
    app.get('*',(req,res)=> {res.sendFile(path.resolve(__dirname,
    'frontend', 'build','index.html'));
    });
    }

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

