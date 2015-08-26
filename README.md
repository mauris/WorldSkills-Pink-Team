# WorldSkills-Pink-Team
## WSDC2015
A hackathon-style event (12-15 August, 2015) where WorldSkills Champions and local technologists team up to solve real-world problems faced by Brazilian NGOs

## About Pink team
Participants:
* Karen Mikaela  as Software Developer from Brazil,
* Sam Yong as Full Stack Developer from Singapore,
* Leonardo Avesani as Designer from Brazil and
* Felipe Marcos Front-end Developer from Brazil

## About NGO
We provide emotional support to cancer patients by connecting them with families who have overcome cancer with volunteer supervision. For more details visit [portalsuperacao](ww.portalsuperacao.org)
 
### Challenge
How to use technology for connecting individuals and families who have beaten cancer with others who are still fighting against it for exchange of experiences and advice.

## Solution
We have created an intelligent matchmaking algorithm that analyzes raw data from different sources and creates matches based on absolute data (such as age, gender, type of cancer, type of treatment and location) as well as relative data from social graphs like personal preferences, interests, hobbies, behaviors, places they have visited, events they have attended, campaigns they have supported.

## Objective
To apply that intelligence to the real world, we created a mobile application. Instead of creating a boring, long profile, we focused on keeping the mood fresh by giving personality to the app, kind of like a conversation. As our users go through the flow, they give us the data we need to create accurate matches. And if they don’t feel comfortable sharing something, like their location or even their social connections, they don’t have to. Our algorithm can work with as little as one or two pieces of data. The more we get, the more accurate our matching will be.

##Technical requirements to run the application
* Nodejs
* Npm
* Git
 
## Skills requirements
* ionic-angular
* html5
* css
* javascript
* git
  
## How install and run App
- Clone the repository
```sh
$ git clone https://github.com/FelipeMarcos/WorldSkills-Pink-Team.git
```
- Install Cordova and Ionic globally.
```sh
$ npm install -g cordova ionic
```
- Install every dependencies, try to install as sudo user if you don't have privileges
```sh
$ npm install
```
- Use Bower to manage your front-end dependencies 
```sh
$ bower install
```
-  To run the app
```sh
$ ionic serve 
```
-  Go to your browser to see the App
 
## To see the demo
[demo](_assets/demo_video/demo.mp4)

## Presentation
[PinkTeamPresentation](_assets/presentation/PinkTeamPresentation.pdf)

## Conclusion
By creating better, more compatible matches, we expect patients to have an easier time dealing with their Cancer and by the time they reach the end of their treatments, look back at their experience and maybe start the program again, this time helping someone else go through the same issues they had just overcome.
 
## References
- [wsdc2015](http://wsdc2015.worldskills.org/pt-br)
- [portalsuperacao](http://portalsuperacao.org/)
- [node-nearest-neighbor](https://github.com/aschuch/node-nearest-neighbor)
- [ionicframework](http://ionicframework.com/ )
 
## License

Copyright 2015 Felipe Marcos, Karen Mikaela, Leonardo Avesani, Sam Yong

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
