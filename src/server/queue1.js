class Queue 
{ 
  // Array is used to implement a Queue 
  constructor() { 
      this.queue = []; 
  } 
                
  // Adds elemenet to the back of the queue
  enqueue(user) {     
    // adding element to the queue 
    this.queue.push(user); 
  }

  dequeue() { 
    // removing element from the queue 
    // returns underflow when called  
    // on empty queue 
    if(this.isEmpty()) 
        return "Underflow"; 
    return this.queue.shift(); 
  } 
  front() { 
    // returns the Front element of  
    // the queue without removing it. 
    if(this.isEmpty()) 
        return "No elements in Queue"; 
    return this.queue[0]; 
  } 
  isEmpty() { 
    // return true if the queue is empty. 
    return this.queue.length == 0; 
  } 
  printQueue() { 
    var str = ""; 
    for(var i = 0; i < this.queue.length; i++) 
        str += this.queue[i] +" "; 
    return str; 
  } 
} 


var queue0 = new Queue;
var queue1 = new Queue;
var queue2 = new Queue;
var queue3 = new Queue;
var queue4 = new Queue;
var queueList = [queue0, queue1, queue2, queue3, queue4];




//User Information
var user = {
    messageList: [],
    firstName: "Alice",
    lastName: "Tan",
    language: 0,
    chatMode: 0,
    top: 0,
    user: "",
    password: "",
    status: ""
};

var agent = {
  firstName: "Alice",
  lastName: "Tan",
  language: 0,
  chatMode: 0,
  top: 0,
  user: "",
  password: "",
  status: "available"
};

//Sort agents to their respective queues
var i;
for (i = 0; i < 5; i++) {
    if(user.top==i){
        queueList[i].enqueue(user);
        console.log(queue0);
   }
}

queueList[0].enqueue(user);
queueList[0].enqueue(user);
queueList[0].enqueue(user);

queueList[1].enqueue(user);
queueList[1].enqueue(user);
queueList[1].enqueue(user);
queueList[1].enqueue(user);

var j;
function checkavailability()
{
    //insert mah code
    for(j=0; j<5; j++){
        if (queueList[j].isEmpty() == false) {
          if (agent["status"] == "available"){
            queueList[j].dequeue()
            //code to link user to agent
            console.log("First user connected in queue:",j);
          }
        }
      }
}

checkavailability();
setInterval(checkavailability, 1000);



  
