# THF CLI

The THF CLI is a command-line interface tool that you use to initialize and develop Angular applications.
You can use the tool directly in a command shell.

## Installation

Make sure latest Node 6 LTS and NPM 3+ are installed.

Then, install the CLI globally:

```
$ npm install -g thf-cli
```

## Getting Started

Start new project using the CLI and add components dynamically in your project.

![Getting Started](https://media.giphy.com/media/1wXbltoK0iesrc3MHO/giphy.gif)

## Commands

The CLI has two commands:

```
thf add <newComponentName>
```

```
thf new <projectName>
```

## add command

the *add* command adds in your project a module that has a dynamic component of your choice, with internal routes configured, simply adding in your main application path or another module to run.

> Need to be root project folder.

```
thf add <newComponentName>
```

![Add Command](https://media.giphy.com/media/1xkN1afc88VoTlH3rN/giphy.gif)

## new command

The *new* command initialize a project to you start your development more quickly with the THF already set up ready to run!

```
thf name <projectName> --template <template>
```

All templates have the configured THF, the templates that you can start are:

Template | Description
--- | ---
*blank* | Creates a simple project.
*sidemenu* | Creates a project containing the menu and modules using lazy loading to start development.
*sample* | Creates a project that uses several THF components, and can be used to start the development of your project or to retrieve examples.

If you don't inform the template the default is `sidemenu`.

![New Command](https://media.giphy.com/media/dYChbsZMcsRsRo2vHa/giphy.gif)


### Example

to run an application from this command, follow the steps below:

```
thf new SampleProject
cd SampleProject
ng serve
```

To add a remote repository to your new project, run in folder project the command:

```
git remote add origin <path>
```


## License

TODO
