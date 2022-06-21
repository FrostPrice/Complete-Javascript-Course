/*
////////////////////////////////////////////////////
// Simple Deployment With Netlify

// You need to run the Build command before sending the final project to the server

// In the build command, you need to speciy that you want the final build (output) of the project to be in a specifyc folder, and to do that you need to write, in the package.json, after the entry file, --dist-dir, and then the folder that needs to be created
// In Parcel 2, you need to change the name Property from 'main' to 'default', in the package.json

// dir = distribution directory

// Netlify is a free service that lets us deploy static (HTML, CSS, JavaScript) websites and web applications
// To add a Project to Netlify, simply drag the folder you want (usually the dist folder) to the Netlify interface
// You can change the site's name, to do that simply select the site settings option and then go to change site name

// Netlify will also automatically secure our site with a SSL certification

// A CDN is a Content Delivery Network, which means that our site will be on a lot of servers in the world

// You can automate the process of deploying the application, by using a Version Control System (VCS), basically Git and GitHub

////////////////////////////////////////////////////
// Setting Up Git and GitHub

// Git can be downloaded at git-scm.com

// Git is a Version Control System, and this is used to save some snapshots (saves) of your project over the time, and you can go back to those snapshots if you need

// git init will make the current directory a Git Repository (Repo)

// GitHub is used basically to store our local Repository in the cloud

// You need to connect Git with GitHub, and to do that you need to write: git config --global user.name (the needs to be the same as your github account), git config --global user.email (the email you use in GitHub)

////////////////////////////////////////////////////
// Git Fundamentals

// In each Repository you need to have the .gitignore file, and this file will contain all the files and folder that Git should not add to the Repository

// REMEMBER: You can get the node_modules from NPM

// You can choose whether you want to leaver the dist folder in the .gitignore file. And also about .parcel-cache

// git status show us the untracked and tracked files

// git add -A will start tracking all the files, or you can do that manually

// To commit a file means to save the files in the Repository, basically means to create a snapshots of your code
// git commit -m "(Where goes the message)" is the command to do tha commit, the -m means message, and the message goes inside a String
// You can only do a commit, if all the files are Tracked or Added
// The first commit is usually called "Initial commit"

// You can go back to the previous commit by using the command: git reset --hard HEAD

// git log will give you all information about all the commits that you did

// While in the log, you can get the ID of the commits, and you can use this ID on the git reset --hard (ID) command, to go back to that commit. But it is not advised to do this

// When you plan on doing a lot of changes, it is good to create a new Branch
// And to create a new branch you use the commmand: git branch (then the name of the new branch)

// git branch will show you all the Branches in the Repository. The * is the Branch you're currnetly in

// To switch branches use the command: git checkout (name of the branch)

// You can exit some commands with q

// You can merge braches with: git merge (the name of the branch that will merge the code with the current branch)

// You usually never work on the master branch, but instead add features in another branch and in the end merge these branches together

// You can see the documentation on Git or search the GitHub git cheat sheet

////////////////////////////////////////////////////
// Pushing to GitHub

// You can clear the command line with clear

// Before pushing the Repository into GitHub you need to add a remote server, and you can do this by using: git remote add (the name of the remote, the standart is "origin") (http link (URL) to the remote repository server)

// You can check the remote repository servers with the git remote command

// To push (send) your repository into GitHub, you will need this code: git push (name of the remote) (name of the branch you want to push)

// A README file is basically a file containing the description of the Project

// REMEMBER: You can add Files with the command touch (name of the file).(type of the file)

// .md is a text type format that allow us to write documentation. The # in the .md file means a title

// You usually create a remote Repository first

////////////////////////////////////////////////////
// Setting Up Continuous Integration With Netlify

// In the netlify website, you go into your website project, go into setting, and then to the build & deploy, and then link site to git

// Continous Deployment or Integration means to connect a site to a Git Repository, and this will trigger a new deployment of our site when a push happens

// You can tell Netlify to run a build command whenever you run a certain command. And also from which folder it should get the site from
*/
