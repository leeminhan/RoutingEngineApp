# 50.003 Element of Software Construction

## Objective
To develop a routing engine that routes incoming support requests (chat and audio calls) to the right agent based on agent availability, skills etc.

## Deliverables
A web page simulating customer's website where their users can request for support via chat or audio call.
A routing engine that routes incoming chat and audio call requests to the right agent based on agent availability, skills etc

## Usage

```
Frontend:
npm install
npm start
```
```
Backend:
node server.js
```
Running on localhost:3000

## Technologies used

###  <img src="./Logos/Rainbow.png" width="50px" /> Rainbow

Rainbow is a CPaaS (Communications Platform as a Service) that provides the communication services between our users and agents. Our website is largely integrated with the Rainbow SDK and our agents are hosted on the Rainbow sandbox environment. 

### <img src="./Logos/React.gif" width="50px" /> React 

React.js is a  javascript library used for the building and rendering of components for our web page. It is used in line with JSX to design our User Interface.

###  <img src="./Logos/nodejs.svg" width="50px" /> Node

Node.js is an open-source, cross-platform, JavaScript runtime environment that we implement to run our back-end code. 

### <img src="./Logos/mongodb.png" width="50px" /> MongoDB

MongoDB is an open source, NoSQL database that provides storage for JSON-structured data. We utilise this database to store our user and agent data. The database is referenced as during our routing and queuing processes.

### <img src="./Logos/AWS.gif" width="50px" /> Amazon Web Services cloud

The AWS cloud is a flexible and scalable environment where we host our database. Deploying our database on a cloud ensures that our user and agent information, along with our queuing system, are centralised and updated in real time. 

## Components

### Navbar.js
This is the navigation bar component which sticks at the top of the page. 
To add- links to the sections of the webpage.

### CPFBoard.js
This is a small section describing what the CPF board is about. 
To-do: add a link to the cpf board web page.

### Languageradiobutton.js, Chatradiobutton.js, Enquiryradiobutton.js
These 3 components contain radio buttons for their respective categories. Each button uses an icon as a display. When button is clicked, a green border would appear around the icon and the selected value would be reflected in the state.

### PrefForm.js 
The user preference form is consolidated in this component. It includes the textfields for name inputs, all the radio buttons, and a submit button. When on click, the submit button would make the respective rainbow api calls and upload user input into database,

### Search.js
Contains a search bar that can be used to search for frequently asked questions that are being stored on a cloud

### FAQ.js
This section contains the search component.





## Rainbow: Web API

### connection.signin(strLogin, strPassword)
Allows for signing  in to the Rainbow sandboxed environment from a Rainbow sandboxed user account that already exists. The Rainbow sandboxed environment will be used to access the Rainbow Cloud Services. This method takes in a string login and string password which are the login credentials created for our user. It  returns a promise. This method is used to sign in our users.

### contacts.searchById(agentid)
Searches for a contact by his Id on the server.  It takes in a string ID which will be our agent ID  obtain from our routing algorithm, and returns a promise, which will be our agent object. This method is used  to retrieve our selected agent.

### conversations.openConversationForContact(agentObject)
Opens a conversation to a contact. It creates a new one if the conversation doesn't exist or reopen a closed conversation. It takes in a contact which would be our agent contact and returns a promise, which would be our conversation object. We store this conversation object in as a state which will be referenced when sending messages. This method is used to open a conversation between our user and agent.

### im.sendMessageToConversation(conversationObject, message) 
Sends messages to a one-to-one conversation. It takes in a conversation object which would be the conversation object we have obtained with the agent. It also takes in a string message which is the messaged typed by the user. This method is used to send messages from the user to the agent.

### im.RAINBOW_ONNEWIMMESSAGERECEIVED
This event is fired when a new message is received in a conversation. Message can be retireved via  event.detail.message. This method is used to retireve messages sent by the agent from the Rainbow sandbox environment.

### conversations.closeConversation(conversationObject)
Closes a conversation. It takes in a conversation object which will be the conversation object between our user and agent. This method is used to retireve messages sent by the agent from the Rainbow sandbox environment.

## Rainbow: Node API

### admin.createAnonymousGuestUser()
Creates a new anonymous guest user in the same company as the requester admin. Anonymous guest user is user without name and firstname. We use this method to create a temporary account for our users.

This returns a promise that is either resolved or rejected. If resolved, it returns a set of login credentials. loginCredentials.data.loginEmail and loginCredentials.data.password will be used. 

## Agent Schema
id:
firstName:
lastName: 
top:
availability: 

## User Schema
id: 
firstName:
lastName: 
language:
chatMode:
top:
timestamp:
ticketNo:

## Rainbow CLI Agent Accounts
| Name          | Login Email           | Company          | Account  | Roles                 | Active | ID                       |
| ------------- |:---------------------:| ----------------:| --------:| ---------------------:| ------:| ------------------------:|
| agent_1 top_1 | agent1_top1@gmail.com | RoutingEngineApp | free     | user                  | true   | 5e9bebbed16d013e6a668384 |
| agent_2 top_2 | agent2_top2@gmail.com | RoutingEngineApp | free     | user                  | true   | 5e9bebf5d16d013e6a66839f |
| agent_3 top_3 | agent3_top3@gmail.com | RoutingEngineApp | free     | user                  | true   | 5e9bece4d16d013e6a668498 |
| agent_4 top_4 | agent4_top4@gmail.com | RoutingEngineApp | free     | user                  | true   | 5e9bebbed16d013e6a668384 |
| agent_5 top_5 | agent5_top5@gmail.com | RoutingEngineApp | free     | user                  | true   | 5e9bebf5d16d013e6a66839f |
| agent_6 top_6 | agent6_top6@gmail.com | RoutingEngineApp | free     | user                  | true   | 5e9bece4d16d013e6a668498 |
| Min Han Lee   | minhan.lmh@gmail.com  | RoutingEngineApp | free     | user,admin,app_admin  | true   | 5e9bece4d16d013e6a668498 |

## Jest Testing

Prerequisite for jest testing would be to install mongobd:

```
npm install mongodb
```

Install Jest using:

```
npm install --save-dev jest 
```

To run the test code run the following:

```
npm test
press p key (to filter by filename regex pattern)
navigate to the file src/server/user.test.js 
press enter key

```