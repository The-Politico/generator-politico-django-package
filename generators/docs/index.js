const Generator = require('yeoman-generator');


module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('name', {
      type: String,
      required: true,
      desc: 'Package name',
    });
  }
  writing() {
    const name = this.options.name;

    this.fs.copyTpl(
      this.templatePath('docs/Makefile'),
      this.destinationPath('docs/Makefile'),
      { name });

    this.fs.copyTpl(
      this.templatePath('docs/source/conf.py'),
      this.destinationPath('docs/source/conf.py'),
      { name });

    this.fs.copyTpl(
      this.templatePath('docs/source/index.rst'),
      this.destinationPath('docs/source/index.rst'),
      { name });

    this.fs.copy(
      this.templatePath('docs/source/why.rst'),
      this.destinationPath('docs/source/why.rst'));

    this.fs.copy(
      this.templatePath('docs/source/quickstart.rst'),
      this.destinationPath('docs/source/quickstart.rst'));
  }
};
