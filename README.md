# 1.Team/project names
  Gramular/grammark

# 2.Repo location URL
  https://github.com/kiyros/grammark

# 3.Progress tracking tool and URL
  Jira
  https://jira.ggc.edu/projects/GCC/summary
  
# 4.Communication tool
- Discord
- Microsoft Teams
- Trello

# 5.Team Members
<ol>
  <li> <b>Chris Hernandez</b> </li>
    <ul type="square">
    <li> Primary role: Data modeler </li>
    <li> Secondary role: Documentation</li>
    </ul>
  <li> <b>Jawwad Qureshi </b> </li>
    <ul type="square">
    <li> Primary role: Team Manager/ Client Liaison </li>
    <li>Secondary role: UI/UX</li>
    </ul>
 <li>  <b>Joseph Ongchangco</b></li>
  <ul type="square">
    <li>Primary role: Testing Lead </li>
    <li>Secondary role: Code Architecture </li>
  </ul>
  <li> <b>Sydney Harrell</b></li>
  <ul type="square">
    <li>Primary role: UI/UX </li>
    <li>Secondary role: Documentation </li>
    </ul>
  <li> <b>Wilmer Batista</b></li>
  <ul type="square">
    <li>Primary role: Lead Programmer </li>
    <li>Secondary role: Data modeler </li>
    </ul>
</ol>

Grammark
========
> A complete web application for identifying writing problems and offering suggestions.


Requirements
============
To run Grammark, you need to have a browser with Javascript enabled (almost all do by default).

Build Architecture
============
- [AngularJS version 1.x](https://angularjs.org/)
- [Foundation](http://foundation.zurb.com/) CSS/JS library
- [underscore.js](http://underscorejs.org/)

Out-of-Box Installation
=======================
If you just want your own version of Grammark on your server, head on over to https://github.com/markfullmer/grammark/tree/angular-distribution.
Clone the files, or download the zip into a directory on your server.

You should now have a fully-functional grammar checker!

Developer Installation
======================
1. Clone the master branch of this repository:
```
git clone git@github.com:kiyros/grammark.git .
```
2. Grammark is built on the [yeoman angular scaffolding](https://github.com/yeoman/generator-angular)
To facilitate easy development, install `yo`, `grunt-cli`, `bower`, `generator-angular` and `generator-karma`:
```
npm install -g grunt-cli bower yo generator-karma generator-angular
```
You can then use the following for local development:
open the terminal to the `Grammark2.0` -> `Grammark` to run `ng serve`
Serve the project locally
```
ng serve
```
Build the distribution
```
ng build
```

License
=======
This software is protected under the [GNU General Public License](http://www.gnu.org/licenses/gpl.html)
You may use it, provided that any modifications you make to it are available for
others to use and modify in a similar manner.

Versions
========
Release       | Short Description
------------- | -------------
[Grammark Angular (developers)](https://github.com/markfullmer/grammark)  | yeoman-Angular build for developers
[Grammark Distribution (non-developers)](https://github.com/markfullmer/grammark/tree/angular-distribution)  | CDN-ified AngularJS out-of-the-box app
[Grammark No-SQL](https://github.com/markfullmer/grammark/tree/No-SQL)  | Does not require SQL database to run; data stored in filesystem
[Grammark 3.0](https://github.com/markfullmer/grammark/tree/Version-3)  | [Twig](http://twig.sensiolabs.org/) templating and class-based PHP
[Grammark 2.0](https://github.com/markfullmer/grammark/tree/Version-2)  | [Foundation](http://foundation.zurb.com/)-based CSS with better directory structure and settings files
[Grammark 1.0](https://github.com/markfullmer/grammark/tree/Version-1)  | Custom CSS with flat file structure
