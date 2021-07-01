# Coding Exercise

Below I will go over each topic of how I approached this coding exercise and explain my thought processes where relevant. Overall I probably spent about 3 hours total, with the last hour just adding some finishing touches because I really like CSS, and then writing this README 🙂

Site is deployed automatically via commits to the `develop` branch on Netlify and can be seen at https://tartanhub-tonymamo.netlify.app/.

[![Netlify Status](https://api.netlify.com/api/v1/badges/f2d21986-1a63-4541-b9c1-6b0b481a19ae/deploy-status)](https://app.netlify.com/sites/tartanhub-tonymamo/deploys)

## Scaffolded the Project

- To start things off, I first forked and cloned the project to my computer. Then I ran `npx create-react-app my-app --template typescript` to scaffold a CRA project with the Typescript template
- Added Eslint and Prettier for linting and code formatting. I copied over some files from another project with some basic settings for those as well.

## Added a Router

- I debated just using local state (with a `useState` hook) to toggle the two different views, but went for [Reach Router](https://reach.tech/router/) as a quick and lightweight router solution instead. The main reason was to update the URL pathname on route change instead of doing that manually and trying to keep the URL and view in sync, but it is also so quick to set up that I knew it would be quicker.

## Code Organization

- Next I started to create some directories in the `src/` folder so I could organize the new files I would be creating soon. I followed a pretty standard pattern (components, hooks, images, styles, utils, and views) for a React project.
- Did a little cleanup and removed some unused files from the CRA scaffolding, as well as grab a few assets from the TartanHUB website (favicon, logo, color values, etc).
- I debated setting up aliases for the folders as I normally do in my projects, so I can import from anywhere in the project _without_ the need for relative pathing. This helps prevent needing to do something like `../../../deeply/nested/file';` and instead can do `@components/file`, where `@components` is an alias set up in `tsconfig.json` and `eslintrc.js` so Webpack can find everything. I opted to not do this in the interest of time and project sizes however.

## Added CSS-in-JS Solution

- I haven't used plain ol' CSS, SASS (scss), or Less at all in recent years. CSS in React was annoying in the early time of React, writing it in camelCase and trying to figure out the best way to scope everything. I started using [styled-components](http://styled-components.com/) several years ago when CSS-in-JS solutions were just coming out, and have been a fan of it ever since. So naturally, I installed styled-components and started on a theme file that I would inject into the ThemeProvider, so I could pass down variables to any component without needing imports. I prefer using the ThemeProvider than say CSS Variables because I can strongly type my theme using Typescript and get autocomplete in my IDE.
- Also added a CSS Reset file that I use in most projects to set up cross-browser consistency and a base set of styling to build upon.

## Started Building UI

- From there, I started creating the Login page, just getting the text and inputs on the page. I had to make a few components along the way, namely `<Input>` and `<Button>`. I copied over some basic styling for the Input and Button from another project of mine. I am a big fan of [Formik](https://formik.org/docs/overview), so I added that to handle the form state instead of using `useState` for the two fields. A little overkill, but I knew I could tie some quick validation into it easily.
- Then I realized I needed a fetch library to hit the provided `users` endpoint, so I added [axios](https://axios-http.com/) for that. To handle the login logic, I `filter()`ed the response data Array and looked for a user that had a matching username and email to the inputted form values. If there was a match, then I would need to consider the user logged in. Not the most robust, but good enough for a quick demo.
- To store the logged in status, I set up a hook to use `sessionStorage`. I could have just stored it directly in the file, but I knew I would need to read that value later, so it made more sense to create a utility to set and retrieve the value that I could use in multiple files. I found a hook online for `localStorage` that I tweaked to use `sessionStorage`, and simply created a key to store it in.

## Built the Gallery Page

- Now that I could toggle a logged in state, I created a view for the Gallery, and threw a Log Out button on there so I could toggle the logged in state and make sure it would redirect to the Login page if not logged in.
- At this point I also created a `<Heading>` component, just to consistently style the `<h1>`s on the two pages.
- Next I set up a call to the `photos` endpoint, and decided to use the [SWR package](https://swr.vercel.app/) since I knew it could cache the response and make things aster on subsequent visits.
- From there, I `map()`ed over the data to show 10 thumbnails, and added some styling via `display: grid` for a quick and dirty layout. It is somewhat responsive as is, but normally I would use a proper Grid System with Rows and Columns that I could tweak using my theme's breakpoint values, and control things a little more manually per breakpoint, but that was overkill as well.
- One little easter egg I added was a loading Skeleton for the images and the sub heading, so that the page has the general layout and size set up while the data from the endpoint is fetching. Set your network speed to something really slow in your browser DevTools to see it in action.
- Lastly for the Gallery page, I added a `<Modal>` component and passed in the active `item` to display.

## UI Finishing Touches

- Added a Nav bar with the logo and a background color to make it look a little nicer
- Added a PageContainer component to set a max width and center everything
- Added some quick validation to the form fields, and created an Alert component to show an error message
- Updated the font and favicon to match TartanHUB's website

## Added Cypress Testing

- Cypress is my favorite testing tool, so I wrote two quick tests: one to verify that the Log In button works, and another that visiting the Gallery page while logged out redirects to the Log In screen
