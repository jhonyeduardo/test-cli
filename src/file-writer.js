const fs = require('fs'),
  getDirName = require('path').dirname,
  mkdirp = require('mkdirp'),
  chalk = require('chalk'),
  handlebars = require('handlebars');

const fileWriter = {

  writeFile: function (path, content, cb) {
    try {
      mkdirp(getDirName(path), function (err) {
        if (err) return cb(err);

        fs.writeFile(path, content, result => {
          if (result) {
            console.error(`error: `);
            return;
          }
    
          console.log(chalk.green.bold('CREATE'), path);
        });
      });

    } catch (e) {
      console.log(chalk.green.bold('ERROU'), fullpath);
    }

  },
  generateDocumentationRoutingModule: function (destination, fileName, moduleName, component) {

    const routingModuleSource = `import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { {{moduleName}}Component } from './{{fileName}}.component';

export const {{routesName}}: Routes = [
  { path: '', component: {{moduleName}}Component }
];

@NgModule({
  imports: [
    RouterModule.forChild({{routesName}})
  ],
  exports: [
    RouterModule
  ]
})
export class {{moduleName}}RoutingModule { }
`;

    const routingModuleTemplate = handlebars.compile(routingModuleSource);
    let routingModuleContent = routingModuleTemplate({
      routesName: `${moduleName.toLowerCase()}Routes`,
      component,
      moduleName,
      fileName
    });

    const fullpath = `${destination}/${fileName}-routing.module.ts`;

    this.writeFile(fullpath, routingModuleContent)
  },
  generateTemplateFile: function (destination, fileName, moduleName, component) {
    const componentTag = generateComponentTag(component);
    const htmlSource = `<{{componentTag}} t-title="{{title}}" [t-service-api]="service">
</{{componentTag}}>
`;

    const htmlTemplate = handlebars.compile(htmlSource);

    let htmlContent = htmlTemplate({
      title: moduleName,
      componentTag
    });

    const fullpath = `${destination}/${fileName}.component.html`;

    this.writeFile(fullpath, htmlContent);
  },
  generateComponentFile: function (destination, fileName, moduleName, service) {
    const componentSource = `import { Component } from '@angular/core';

@Component({
  selector: 'app-{{name}}',
  templateUrl: './{{name}}.component.html'
})
export class {{component}}Component {

  service = '{{service}}';

}
`;
    const componentTemplate = handlebars.compile(componentSource);
    let componentContent = componentTemplate({
      name: fileName,
      component: moduleName,
      service
    });

    const fullpath = `${destination}/${fileName}.component.ts`;

    this.writeFile(fullpath, componentContent);
  },
  generateModuleFile: function (destination, fileName, moduleName, component) {
    const moduleSource = `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { {{component}}Module } from '@totvs/thf-templates';

import { {{moduleName}}RoutingModule } from './{{fileName}}-routing.module';
import { {{moduleName}}Component } from './{{fileName}}.component';

@NgModule({
  imports: [
    CommonModule,

    {{moduleName}}RoutingModule,
    {{component}}Module
  ],
  declarations: [
    {{moduleName}}Component
  ],
  providers: []
})
export class {{moduleName}}Module { }
`;

    const moduleTemplate = handlebars.compile(moduleSource);
    let moduleContent = moduleTemplate({ moduleName, component, fileName });

    const fullpath = `${destination}/${fileName}.module.ts`;

    this.writeFile(fullpath, moduleContent);
  },

};

function generateComponentTag(component) {
  return component.split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/).map(v => v.toLowerCase()).join('-');
}


module.exports = fileWriter;