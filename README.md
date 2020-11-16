<img src="https://lh3.googleusercontent.com/leCiYQX-bheA2_0h00QsLE6wV7cIzjiUc8Dc8_PoAZoeEvMLa0pqsTBaCP8_OmS1Sma7yBEbx2fujqMVTBKvz3B-E_vFCwx5hlo9N5Bb-DhNhIAHw3AXd_JbBWRlO30FOSZAjw0M5Q=w2400" align=center alt=LifeBoxLogo/>

# Welcome to [LifeBox](https://life-box.herokuapp.com/)

## Table of Contents:
- [LifeBox Overview](#lifebox-overview)
- [Application Architecture & Technologies Used](#application-architecture)
- [Front-end Overview](#front-end-overview)
- [Back-end Overview](#back-end-overview)
- [Moving Forward](#moving-forward)

## LifeBox Overview
LifeBox is a platform meant for exploring and sharing ideas about Conways Game of Life. The Game of Life is a set of rules applied to a grid on cells, populated or unpopulated. Although the rules are simple and deterministic, the grids behavior over iterations of the rules is fundementally unpredictable. For this reason Conways Game of Life is a classic visual representation of a complex system. 

Complexity and Chaos Theory are concepts I wasn't exposed to until college, but, the philosophical implications of complexity and emergence in systems, would have been inspirational to me in my adolesence. LifeBox was inspired as a way to give k-12 educators a way to get kids talking about the weirdness of mathematics with a simple and playful tool. 

Users of LifeBox may create a profile and begin creating and saving to LifeBox initial conditions of a grid. Users can then comment on grids and search the app for grids other users have created. A minimal set of instructions is provided, and in the future more features to gamify the app may be added.

![LifeBox Explore](client/public/LifeBoxExplore.gif)

## Application Architecture & Technologies Used
LifeBox was built using react components with hooks and the Canvas API. The application relies on a postgreSQL database served with flask. User authentication is handled with the flask_jwt_extended and bcrypt. This application makes exptensive use of React Portals and the npm package react-draggable.

# Front-end Overview
LifeBox has three main react components, DrawLife, Controls, and RandomLifeBox. 

## RandomLifeBox
RandomLifeBox was the first component constructed and acted as a proof of concept for an implementation of Conway's Game Of Life. The entire game is built and run within a useEffect hook. The game uses a randomly generated initial condition and a grid of fixed dimensions. RandomLifeBox is now primarily used as a background screen for the Login page.

## DrawLife
DrawLife runs the user interface. It renders initially as a grid with a hud for controling properties of the instance of GOL. Users may control the grid dimensions, the rate of board generation, and have the option to randomly populate the grid, or reload an initial grid condition when a saved grid is currently loaded.

The Game of life relies on a nested loops to iterate over each cell in the current grid (stored in DrawLifes state) and create a new grid according to the rules of GOL. The new grid is then saved to state and rendered as a new instance via the canvas API. This process is started and stopped by a system of useEffect hooks which are chained together by dependencies built into DrawLife and Controls state. 


