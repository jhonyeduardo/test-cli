# THF CLI

The THF CLI is a command-line interface tool that you use to initialize and develop Angular applications.
You can use the tool directly in a command shell.

## Installation

Make sure Node, NPM and GIT are installed.

Then, install the CLI globally:

```
$ npm install -g thf-cli
```

## Getting Started

Start new project using the CLI and add components dynamically in your project.

to run an application, follow the steps below:

```
thf new SampleProject
cd SampleProject
ng serve
```

![Getting Started](https://media.giphy.com/media/3FbGebspps6pxlIUFr/giphy.gif)

to check the list of commands of CLI, invoke --help:

```
thf --help
```

## Commands

Command | Alias | Description
--- | --- | ---
*[add](#add)* | a | Add a module that has a dynamic component of your choice.
*[new](#new)* | n | Creates new a project based in a template.

```
thf add <newComponentName>
```

```
thf new <projectName>
```

### add

the *add* command adds in your project a module that has a dynamic component of your choice, with internal routes configured, simply adding in your main application path or another module to run.

> Need to be root project folder.

```
thf add <newComponentName>
```

![Add Command](https://media.giphy.com/media/ksb6TvzeH4dcDSRMi8/giphy.gif)

If the project was built through the "sidemenu" template, you need to configure the new module by adding it in the route and in the menu list of the project.

> app.component.ts
```
readonly menus: Array<ThfMenuItem> = [
  { label: 'Home', link: '/home' },
  { label: 'Users', link: '/users' },
  // add here
  { label: 'newComponent', link: '/newComponent' },
];
```

> app-routing.component.ts
```
const routes: Routes = [
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'users', loadChildren: './users/users.module#UsersModule' },
  // add here
  { path: 'newComponent', loadChildren: './newComponent/newComponent.module#NewComponentModule' },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];
```

> If is a common Angular project, it's necessary import the new module in app module or adding it in lazy load route.

### new

The *new* command initialize a project to you start your development more quickly with the THF already set up ready to run!

```
thf new <projectName> --template <template>
```

All templates have the THF configured, the templates that you can start are:

Template | Description
--- | ---
*blank* | Creates a simple project with THFModule and THF css configured.
*sidemenu* | Creates a project containing the menu and modules using lazy loading to start development.

If you don't inform the template the default is `sidemenu`.

![New Command](https://media.giphy.com/media/2A3FtMzAVfGQArw5i5/giphy.gif)


### Add Git remote repository

To add a remote repository to your new project, run in folder project the command:

```
git remote add origin <path>
```
