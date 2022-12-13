## How to run

I couldn't get a docker compose file to work, due to using serverless. There is no plugin for GO which would allow me to run serverless offline. Here are some suggestions how to test:

### Backend
Like mentioned serverless can be hard to run locally. When developing using Node i have used a plugin for serverless offline. However i did not get this to work with GO. I have deployed the endpoints, so i would recommend just calling the endspoint:

https://966stdpxd1.execute-api.us-east-1.amazonaws.com

If you want to deploy it yourself run:

aws config

make

sls deploy

### Frontend

Run following: 

cd frontend
yarn run start

## Some decisions i made

### Backend

#### Serverless 
I choose to use serverless as the backend framework. The reason for this is that i am familiar with using the framework with Node.js. In general serverless is easy to bootstrap projects with and cost efficent. Looking back at it this was most likely a bad decisions. I should have used AWS SAM instead since it has better support for GO or just some locally host none lamdba service. Serverless is more of a Node.js framework and lacks some plugins for GO. This is made quite obvious when the console warns you that support for monitoring is limited to Node.js. 


#### Architecture
Serverless. Gateway, lamdbas and a DB. Each lambda is it's own Go module with it's own main file. 

- pkg
  - functions
    - some-function
      - main.go
      - helpers.go
    - domain
      - domain.go
      - helpers.go
    - utils
      - some-util.go

As for folder structure we have functions, which is the lambdas. They handle the incoming calls, perform low memory operations and re route to other services. Within the handlers We bring in read and write operations from various entities such as Todo in this case. I believe this is a fairly standard approach, which i don't need to expand on too much. Services/Repository that transform and bring in other entites or operations to perform more complex logic. 

#### Challenge: Lacking Experience

I don't have production experience with GO, which makes everything slower. This project is large for a take home and i really struggled to fill all the requirments with the time i had. Small bugs take a long time when you are not as familiar with a language/framework. I completely neglected testing, as i had several issues when trying to write them. In the end there was just not enough time for me to both test everything and have it working.

### Frontend

#### Architecture

The main architecture is based of a hobby project i have. Domain Driven with a top level for pages. Everything that contains state or make remote calls has it's own package inside the package repository. This way it makes it easier to manage dependencies and locate parts of the logic. Structure:

- components
- pages
- packages
  - Domain
    - Client.ts
    - Entities.ts
    - Store.ts
    - Repository/Hooks.ts
    - .test.ts
    - utils
      - some-util.ts

#### State managment (Zustand)

Zustand is a more minimalistic approach to Redux. Less boilerplate, write more yourself.There is no reason for using a store over hooks/context in this case, it's a personal preference. Since the architecture is DDD i like to have one store per domain. This would be similar to a Redux DDD approach of having slices for each domain with an API.  

##### Roll-backs

I handle some local caching in the frontend. Most of it is optimistic. If a delete fails we do a roll-back. I liked implementing this part, even if useless.

 
