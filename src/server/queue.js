const queue = require('queue')

var q = queue({ results: []})

// var p = new Queue();
// p.enqueue("two");
// p.enqueue("four");
// console.log(p.printQueue());
// add jobs using the familiar Array API
q.push(function (cb) {
  const result = 'two'
  cb(null, result)
})

q.push(
  function (cb) {
    const result = 'four'
    cb(null, result)
  },
  function (cb) {
    const result = 'five'
    cb(null, result)
  }
)

q.pop({
  function(cb){
    console.log("TEST")
  }
})



// begin processing, get notified on end / failure
q.start(function (err) {
  if (err) throw err
  console.log('Stuff in stack:', q.results)
})


// class Queue 
// { 
//     // Array is used to implement a Queue 
//     constructor() 
//     { 
//         this.items = []; 
//     } 
                  
//     // enqeue(user) adds the element user into the back of a queue
//     enqueue(user) {
//         this.items.push(user)
//     }
//     //dequeue() returns the 0th index element in the queue, removes it and shift all other elements up by 1
//     dequeue() {
//         if(this.isEmpty()) 
//             return "Underflow"; 
//         return this.items.shift(); 
//     }
//     //front() returns 0th index element in the queue WITHOUT removing it
//     front() {
//         if(this.isEmpty()) 
//             return "No elements in Queue"; 
//         return this.items[0];}
//     // isEmpty() checks if the queue is empty
//     isEmpty() { 
    
//     return this.items.length == 0; 
// } 
//     // printQueue() concatenates all elements in the queue and return it as a string
//     printQueue() 
// { 
//     var str = ""; 
//     for(var i = 0; i < this.items.length; i++) 
//         str += this.items[i] +" "; 
//     return str; 
// } 
// };