//Logic

const data = require('./data')

class Controller {

    //get all the todos
    async getTodos() {
        return new Promise((resolve, reject) => resolve(data));
    }

    //get a single todo using its id
    async getTodo(id) {
        return new Promise((resolve, reject) => {
            let todo = data.find((todo) => todo.id === Number(id))
            if(todo){
                resolve(todo)
            }else{
                reject(`Todo with id ${id} not found`);
            }
        })
    }

    //Create a todo
    async createTodo(todo) {
        //create todo with random id
        return new Promise((resolve, reject) => {
            const newTodo = {
                id: Math.floor(4 + Math.random() * 10),
                ...todo            
            }

            resolve(newTodo);
        })
    }

    async updateTodo(id) {
        
        return new Promise((resolve, reject) => {
            //get the particular todo
            let todo = data.find((todo) => todo.id === Number(id));

            //if no todo, return an error
            if(!todo){
                reject(`No todo with the id ${id} was found`)
            }
           else{
               todo["completed"] = true
               resolve(todo);
           }
        })
    }

    async deleteTodo(id) {
        return new Promise((resolve, reject) => {
            let todo = data.find((todo) => todo.id === Number(id))
            if(!todo){
                reject(`No todo was found with the id ${id}`)
            }else{
                todo = null;
                resolve(todo)
            }
         })
    }
}

module.exports = Controller;