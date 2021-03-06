<img src="https://lh3.googleusercontent.com/leCiYQX-bheA2_0h00QsLE6wV7cIzjiUc8Dc8_PoAZoeEvMLa0pqsTBaCP8_OmS1Sma7yBEbx2fujqMVTBKvz3B-E_vFCwx5hlo9N5Bb-DhNhIAHw3AXd_JbBWRlO30FOSZAjw0M5Q=w2400" align=center alt=LifeBoxLogo/>

# Welcome to [LifeBox](https://life-box.herokuapp.com/)

## Table of Contents:
- [LifeBox Overview](#lifebox-overview)
- [Application Architecture & Technologies Used](#application-architecture)
- [Frontend Overview](#frontend-overview)
- [Backend Overview](#backend-overview)
- [Deployment](#deployment)
- [Moving Forward](#moving-forward)

## LifeBox Overview
LifeBox is a social media website meant for exploring and sharing ideas about Conway's Game of Life. The Game of Life is a set of rules applied to a grid of cells, populated or unpopulated. Although the rules are simple and deterministic, the grids behavior over iterations of the rules is fundementally unpredictable. For this reason Conway's Game of Life is a classic visual representation of a complex system. 

Complexity and Chaos Theory are concepts I wasn't exposed to until college, but, the philosophical implications of complexity and emergence in systems, would have been inspirational to me in my adolesence. LifeBox was inspired as a way to give k-12 educators a way to get kids talking about the weirdness of mathematics with a simple and playful tool. 

Users of LifeBox may create a profile and begin creating and saving to LifeBox initial conditions of a grid. Users can then comment on grids and search the app for grids other users have created. A minimal set of instructions is provided, and in the future more features to gamify the app may be added.

![LifeBox Explore](client/public/LifeBoxExplore.gif)

## Application Architecture
LifeBox was built using react components with hooks and the Canvas API. The application relies on a postgreSQL database served with flask, and manipulated through an SQLAlchemy ORM. User authentication is handled with flask_jwt_extended and bcrypt. This application makes exptensive use of React Portals and the npm package react-draggable.

# Frontend Overview
LifeBox has three main react components, DrawLife, Controls, and RandomLifeBox. 

## RandomLifeBox
RandomLifeBox was the first component built. It acted as a proof of concept for an implementation of Conway's Game Of Life. The entire game is built and run within a useEffect hook. The game uses a randomly generated initial condition and a grid of fixed dimensions. RandomLifeBox is now primarily used as a background screen for the Login page.

## DrawLife
DrawLife runs the user interface. It renders initially as a grid with a hud for controling properties of the instance of GOL. Users may control the grid dimensions, the rate of board generation, and have the option to randomly populate the grid, or reload an initial grid condition when a saved grid is currently loaded.

The Game of life relies on a nested loops to iterate over each cell in the current grid (stored in DrawLifes state) and create a new grid according to the rules of GOL. The new grid is then saved to state and rendered as a new instance via the canvas API. This process is started and stopped by a system of useEffect hooks which are chained together by dependencies built into DrawLife and Controls state, this is mainly to overcome the trouble of having an initial instance of a canvas and grid in state. The canvas has built in event listeners on each cell, allowing users to create their own iterations of the grid.

## Controls
The Controls component acts a a navbar. It incorperates the main functions a search function which queries the database by grid name searching for saved grids. When selected the grid is rendered and the DrawLife component enables a load button rather than the randomization button. Users also have access to the ability to save their current grid to the database. When a grid has been loaded users also have access to a comments modal associated with each grid, where they can submit new comments to the database. 

# Backend Overview
<img src="https://lh3.googleusercontent.com/wLlM94y46sPYcq_XanGk9SuKade4X-MNL9liiDwXWXNMs3m0nOswqE_wW6NTKuT5_ppukPKF_q00j1GOTrTcVbW3fXIBUjNafPRfLjN4KWdqHJMq78rarWuG71IUnLCvE0NNORns2Q=w2400" align=center width=800px height=500px alt=LifeBoxDB/>

The database for LifeBox is very simple and is well illustrated by the diagram above. However the grids table is notable for its grid_json attribute. The database stores grids and grid information in a json object set in state and then commited to the database. The json objects properties are not strictly maintained. 

```
const [loadGrid, setLoadGrid] = useState({ "name": undefined, "grid": null, "saved": false })

setLoadGrid(
            {
                "name": grid.name,
                "owner": grid.user_id,
                "grid_id": grid.id,
                "grid": grid.grid_json.grid,
                "saved": true
            }
        )
```

The above code serves to illustrate the way json is used to to store the nested array representing a grid initial condition, and other information pertinent to displaying a grid. The loadGrid state variable is used to represent a saved grid thats been selected for editing.

# Deployment
This application has been deployed to Heroku using a docker file. Further the application's database can be seeded with some initial users, comments, and grids, via running a file called database.py. To run the application locally one must create an instance of the database in postgreSQL with the name lifebox_db and owner postgreSQL user lifebox. The docker file takes care of initializing a database for you upon deployment.

To start the application locally, create the database in postgreSQL as described above. Open the backend and run the command pipenv shell, then flask run. Then enter the client directory and run react with npm start.

# Moving Forward
LifeBox become ineffeciant when the user selects large grids. This is because the algorithm to generate a grid has a polynomial time complexity due to a bunch of nested for loops. Recently I've been exploring changing the algorithm to use an array storing only grid coordinates of live cells. This method would vastly improve the generation algorithms efficiancy, but will require significant rewriting of the applications component states. 

Finally the intention of the Application is education, so, in the future I may implement a walkthrough on introduction. Moderator privileges for educators (to monitor chats on grids), and maybe a gamified system of badges for discovery or creation of knows conway configurations like gliders and various spaceships.
