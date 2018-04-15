const Generator = require('yeoman-generator');


module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('name', {
      type: String,
      required: true,
      desc: 'Package name',
    });
    this.option('app', {
      type: String,
      required: true,
      desc: 'App name',
    });
  }
  writing() {
    const name = this.options.name;
    const app = this.options.app;

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('./.gitignore'));

    this.fs.copy(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE'));

    this.fs.copyTpl(
      this.templatePath('Makefile'),
      this.destinationPath('Makefile'), { app });

    this.fs.copyTpl(
      this.templatePath('MANIFEST.in'),
      this.destinationPath('MANIFEST.in'), { app });

    this.fs.copyTpl(
      this.templatePath('setup.py'),
      this.destinationPath('setup.py'),
      { name });
  }
};
