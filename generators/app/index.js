const Generator = require('yeoman-generator');
const S = require('string');
const chalk = require('chalk');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    const questions = [{
      type: 'input',
      name: 'package',
      default: () => {
        const dir = path.basename(process.cwd());
        return dir.includes('django-') ? dir : `django-${dir}`;
      },
      filter: answer => S(answer).slugify().s,
      message: 'What\'s the name of your package on pypi?',
    }, {
      type: 'input',
      name: 'app',
      default: answers => answers.package.replace('django-', '').replace('-', ''),
      message: 'What\'s the name of the app users install in Django?',
    }];

    this.log(chalk.cyan('Welcome to your new Django package!'));

    return this.prompt(questions).then((answers) => {
      this.package = answers.package;
      this.app = answers.app;
    });
  }

  compose() {
    const name = this.package;
    const app = this.app;
    this.composeWith('politico-python-package:docs', { name });
    this.composeWith('politico-python-package:packaging', { name });
    this.composeWith(require.resolve('../environment'), { app });
    this.composeWith(require.resolve('../package'), { app });
  }
};
