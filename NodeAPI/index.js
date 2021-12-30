const http = require('http');
const Todo = require('./controller')
const { getRequestData } = require('./utils');

    const PORT = process.env.PORT || 3000    
    
    //Create the server
    const server = http.createServer(async (req, res) => {
        //check for correct route
        if(req.url === '/api/todos' && req.method === 'GET') {
            //GET THE TODOS
            let todos = await new Todo().getTodos()

            //set the response header
            res.writeHead(200, {'Content-Type': 'application/json'})

            //send the data to the client
            res.end(JSON.stringify(todos))
        }

        //get todo with id
        else if(req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === 'GET') {
            try {
                //get id from the url
                const id = req.url.split("/")[3];

                //get the particular todo
                const todo = await new Todo().getTodo(id)

                //set header
                res.writeHead(200, {'Content-Type': 'application/json'})

                //send the data
                res.end(JSON.stringify(todo))
            }catch(error) {
                res.writeHead(404, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({message: error}));
            }
        }

        //update
        else if(req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === 'GET'){
            try {
                const id = req.url.split("/")[3];

                //update the todo
                const todo = await new Todo().updateTodo(id);

                //set the header
                res.writeHead(200, {'Content-Type': 'application/json'})

                //send the data
                res.end(JSON.stringify(todo))
            }catch(error) {
                res.writeHead(404, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({message: error}))
            }
        }

        //delete
        else if(req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === 'DELETE') {
            try {
                //delete the todo
                const todo = await new Todo().deleteTodo(id)

                //set the headers
                res.writeHead(200, {'Content-Type': 'application/json'})

                 //send the data
                 res.end(JSON.stringify(todo))


            }catch(error) {
                res.writeHead(404, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({message: error}))
            }
        }

        //create
        else if (req.url === "/api/todos" && req.method === "POST") {

            // get the data sent along
            let todo_data = await getReqData(req);
            // create the todo
            let todo = await new Todo().createTodo(JSON.parse(todo_data));
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            //send the todo
            res.end(JSON.stringify(todo));
        }

        //no routes present
        else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Route not found" }));
        }
    })

    server.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`); 
    })