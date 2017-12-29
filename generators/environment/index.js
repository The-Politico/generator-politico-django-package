const Generator = require('yeoman-generator');
const shell = require('shelljs');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('app', {
      type: String,
      required: true,
      desc: 'App name',
    });
  }

  writing() {
    const app = this.options.app;
    const allcaps = app.toUpperCase();

    this.fs.copy(
      this.templatePath('example/env'),
      this.destinationPath('example/.env'));
    this.fs.copy(
      this.templatePath('example/manage.py'),
      this.destinationPath('example/manage.py'));
    this.fs.copyTpl(
      this.templatePath('example/Pipfile'),
      this.destinationPath('example/Pipfile'), { app });

    this.fs.copy(
      this.templatePath('example/exampleapp/__init__.py'),
      this.destinationPath('example/exampleapp/__init__.py'));
    this.fs.copyTpl(
      this.templatePath('example/exampleapp/settings.py'),
      this.destinationPath('example/exampleapp/settings.py'), { app, allcaps });
    this.fs.copyTpl(
      this.templatePath('example/exampleapp/urls.py'),
      this.destinationPath('example/exampleapp/urls.py'), { app });
    this.fs.copy(
      this.templatePath('example/exampleapp/wsgi.py'),
      this.destinationPath('example/exampleapp/wsgi.py'));
  }

  install() {
    shell.exec('pipenv install', {
      cwd: 'example/',
      silent: true,
    });
  }
};
