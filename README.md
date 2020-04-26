# 50.003 Element of Software Construction

## Objective
To develop a routing engine that routes incoming support requests (chat and audio calls) to the right agent based on agent availability, skills etc.

## Deliverables
A web page simulating customer's website where their users can request for support via chat or audio call.
A routing engine that routes incoming chat and audio call requests to the right agent based on agent availability, skills etc

## Usage

Frontend:
```
npm install
npm start
```
Backend:
```
node src/server/server.js
```

## Technologies used

###  <img src="./Logos/Rainbow.png" width="50px" /> Rainbow

Our website makes use of the Rainbow SDK for its communication services between the user and agent. Our agents are hosted on the rainbow Sandbox platform. 

### <img src="./Logos/React.gif" width="50px" /> React 

The React.js javascript library is used for the building and rendering of our front-end components. .

###  <img src="./Logos/ExpressJS.png" width="50px" /> ExpressJs

Our back-end server is built on the ExpressJS framework. 

### <img src="./Logos/mongodb.png" width="50px" /> MongoDB

We utilise MongoDB to store relevant information about our users and agents. It is often referenced during the routing and queuing processes.

### <img src="./Logos/elastic-logo.png" width="50px" /> Elastic
The FAQ search bar utilises Elastic as its search engine. 

### <img src="./Logos/AWS.gif" width="50px" /> Amazon Web Services cloud

Our database(MongoDB) and search engine(Elastic) are hosted on the Amazon Web Srvice cloud platform.  

### <img src="./Logos/jest-logo.png" width="50px" /> Jest

Our unit testing, which testes for CRUD operations, is built upon the Jest framework.

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
### Jest Test Case
1. Inserting of Document into Database
2. Searching for Document in Database
3. pdating of Document in Database
4. Finding Documents matching query in Database
5. Deleting Document in Database
