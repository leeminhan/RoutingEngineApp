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

## Components

### Navbar.js
This is the navigation bar component which sticks at the top of the page. 
To add- links to the sections of the webpage.

###CPFBoard.js
This is a small section describing what the CPF board is about. 
To-do: add a link to the cpf board web page.

### Languageradiobutton.js Chatradiobutton.js Enquiryradiobutton.js
These 3 components contain radio buttons for their respective categories. Each button uses an icon as a display. When button is clicked, a green border would appear around the icon and the selected value would be reflected in the state.

### PrefForm.js 
The user preference form is consolidated in this component. It includes the textfields for name inputs, all the radio buttons, and a submit button. When on click, the submit button would make the respective rainbow api calls and upload user input into database,

### Aboutus.js
A section describing our services and who are we
To-do: Modifiy it according to our theme 

### Agents.js
A section for rating our agents. Part of our innovative features.
To-do: Modify it to fit our theme and create a rating system

### FAQ.js
This section documents the frequently asked questions.
To-do: improve it as it will be part of our innovative features.

## Backend: API
const contact = agentid from retrieved rbw CLI
1. Search Agent ID -> object
2. openConversationForContact(object)
3. IM service: sendMessage to 


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