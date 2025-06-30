# odin_template

The template repository to initialize practices in The Odin Project

## Install Webpack Process:

1. Create a new directory for our new project, then create a package.json file in it.

```
$ npm init -y
```

2. Open package.json. If you see `"type": "commonjs"` or `"type": "module"` inside, remove it. Add three scripts inside our package.json. Then download new npm packages.

```
$ npm install --save-dev webpack webpack-cli
$ npm install --save-dev webpack-merge
$ npm install --save-dev html-webpack-plugin
$ npm install --save-dev mini-css-extract-plugin
$ npm install --save-dev style-loader css-loader
$ npm install --save-dev html-loader
$ npm install --save-dev webpack-dev-server
```

3. Create a folder called 'src'. Then create some basic HTML, CSS and JavaScript files in the folder.

```
$ mkdir src && cd src && touch index.js greeting.js styles.css template.html
```

4. Add new contents inside our two JavaScript files, one CSS file and one HTML file in 'src' folder. Then back in the project root.
   Create some basic webpack configuration files in the project root.

```
$ cd .. && touch webpack.common.js webpack.dev.js webpack.prod.js
```

5. Add new contents inside our three webpack configuration files. Then run 'dev' script to test Webpack dev server.

```
$ npm run dev
```

6. Open the browser (Webpack dev server is on http://localhost:8080/) and check your devtool in the browser. If you see the sentence "Hello, Odinite!" is printed in the console, Webpack dev server is working well. Press Ctrl+C to terminate Webpack dev server. Then run 'build' script to test the bundle function.

```
$ npm run build
```

7. If the bundle is finished, you will see a new folder called 'dist' is created in the project root. Run Live Server (Live Server is on http://localhost:5500/). Then open the browser and check your devtool in the browser. If you see the sentence "Hello, Odinite!" is printed in the console, the bundle function is working well.

8. Terminate Live Server. Then ceate a .gitignore file in the root of your project. Add new contents inside the .gitignore file.

```
$ touch .gitignore
```

9. All Webpack commands are tested. Then we can install some tools to maintain consistent code-style throughout the projects.

## Install ESLint & Prettier Process:

1. Download new npm packages.

```
$ npm install --save-dev eslint@latest @eslint/js@latest
$ npm install --save-dev --save-exact prettier
$ npm install --save-dev eslint-config-prettier
```

2. Create the basic ESLint configuration file in the project root.

```
$ touch eslint.config.js
```

3. Add new contents inside our ESLint configuration file. Then lint code of project files to test the ESLint function.

```
$ npx eslint .
```

4. If linting is finished, create somw Prettier configuration files in the project root. One is an empty config file and another is .prettierignore file. Add new contents inside the .prettierrc file if you need.

```
$ node --eval "fs.writeFileSync('.prettierrc','{}\n')"
$ node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"
```

5. Run the following command to check that files are already formatted.

```
$ npx prettier . --check
```

6. Run the following command to overwrite and format all files.

```
$ npx prettier . --write
```

7. All ESLint and Prettier commands are tested. Enjoy building your new project!

## Use Template Process:

1. Choose "odin_template" in "Repository template" field, when creating new repository in Github.

2. Open the folder of repository. If package.json is already in the folder, download all npm packages in package.json directly. You should navigate to the path of folder containing package.json before the downloading.

```
$ npm install
```

3. After the downloading is finished, you can direcly use the following commands in your project.

```
$ npm run dev
$ npm run build
$ npx eslint .
$ npx prettier . --check
$ npx prettier . --write
```

## Commit Process:

1. Make a new branch called 'gh-pages'. You only need to do this the first time you deploy. The rest of the steps should be done every time you deploy or redeploy your project.

```
$ git branch gh-pages
```

2. Make sure you have all your work committed

```
$ git status
```

3. Change branch and sync your changes from main so that you’re ready to deploy.

```
$ git checkout gh-pages && git merge main --no-edit
```

4. Bundle our application into dist with your build command.

```
$ npm run build
```

5. Deploy files inside 'dist' folder to Github. The Github page will be built based on contents inside the 'dist' folder. Remember to add your own commit messages (Don't directly use "Deployment commit message") in each commit.

```
$ git add dist -f && git commit -m "<Deployment commit message>"
$ npm run deploy
$ git checkout main
```

6. Go to the Github repository of your project, and check the result of the commit.
