const Generator = require('yeoman-generator');
const S = require('string');
const mkdirp = require('mkdirp');
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
    const capital = S(app).capitalize().s;
    const allcaps = app.toUpperCase();

    this.fs.copy(
      this.templatePath('app/management/__init__.py'),
      this.destinationPath(`${app}/management/__init__.py`));
    this.fs.copy(
      this.templatePath('app/management/commands/__init__.py'),
      this.destinationPath(`${app}/management/commands/__init__.py`));
    this.fs.copy(
      this.templatePath('app/migrations/__init__.py'),
      this.destinationPath(`${app}/migrations/__init__.py`));
    this.fs.copy(
      this.templatePath('app/models/__init__.py'),
      this.destinationPath(`${app}/models/__init__.py`));
    this.fs.copy(
      this.templatePath('app/serializers/__init__.py'),
      this.destinationPath(`${app}/serializers/__init__.py`));
    this.fs.copyTpl(
      this.templatePath('app/staticapp/gulp/server/server.js'),
      this.destinationPath(`${app}/staticapp/gulp/server/server.js`), { app });
    this.fs.copyTpl(
      this.templatePath('app/staticapp/gulp/tasks/build.js'),
      this.destinationPath(`${app}/staticapp/gulp/tasks/build.js`), { app });
    this.fs.copy(
      this.templatePath('app/staticapp/gulp/tasks/dev.js'),
      this.destinationPath(`${app}/staticapp/gulp/tasks/dev.js`));
    this.fs.copy(
      this.templatePath('app/staticapp/gulp/index.js'),
      this.destinationPath(`${app}/staticapp/gulp/index.js`));
    this.fs.copy(
      this.templatePath('app/staticapp/src/js/main-app.js'),
      this.destinationPath(`${app}/staticapp/src/js/main-app.js`));
    this.fs.copy(
      this.templatePath('app/staticapp/src/scss/main.scss'),
      this.destinationPath(`${app}/staticapp/src/scss/main.scss`));
    this.fs.copy(
      this.templatePath('app/staticapp/gitignore'),
      this.destinationPath(`${app}/staticapp/.gitignore`));
    this.fs.copy(
      this.templatePath('app/staticapp/gulpfile.js'),
      this.destinationPath(`${app}/staticapp/gulpfile.js`));
    this.fs.copyTpl(
      this.templatePath('app/staticapp/package.json'),
      this.destinationPath(`${app}/staticapp/package.json`), { app });
    this.fs.copy(
      this.templatePath('app/staticapp/postcss.config.js'),
      this.destinationPath(`${app}/staticapp/postcss.config.js`));
    this.fs.copy(
      this.templatePath('app/staticapp/webpack-dev.config.js'),
      this.destinationPath(`${app}/staticapp/webpack-dev.config.js`));
    this.fs.copyTpl(
      this.templatePath('app/staticapp/webpack-prod.config.js'),
      this.destinationPath(`${app}/staticapp/webpack-prod.config.js`), { app });
    this.fs.copy(
      this.templatePath('app/tasks/__init__.py'),
      this.destinationPath(`${app}/tasks/__init__.py`));
    this.fs.copyTpl(
      this.templatePath('app/tasks/aws.py'),
      this.destinationPath(`${app}/tasks/aws.py`), { app });
    this.fs.copy(
      this.templatePath('app/templates/app/home.html'),
      this.destinationPath(`${app}/templates/${app}/home.html`));
    this.fs.copy(
      this.templatePath('app/templatetags/__init__.py'),
      this.destinationPath(`${app}/templatetags/__init__.py`));
    this.fs.copy(
      this.templatePath('app/utils/__init__.py'),
      this.destinationPath(`${app}/utils/__init__.py`));
    this.fs.copyTpl(
      this.templatePath('app/utils/api_auth.py'),
      this.destinationPath(`${app}/utils/api_auth.py`), { app });
    this.fs.copyTpl(
      this.templatePath('app/utils/auth.py'),
      this.destinationPath(`${app}/utils/auth.py`), { app });
    this.fs.copyTpl(
      this.templatePath('app/utils/aws.py'),
      this.destinationPath(`${app}/utils/aws.py`), { app });
    this.fs.copy(
      this.templatePath('app/utils/importers.py'),
      this.destinationPath(`${app}/utils/importers.py`));
    this.fs.copy(
      this.templatePath('app/views/__init__.py'),
      this.destinationPath(`${app}/views/__init__.py`));
    this.fs.copyTpl(
      this.templatePath('app/views/home.py'),
      this.destinationPath(`${app}/views/home.py`), { app });
    this.fs.copy(
      this.templatePath('app/viewsets/__init__.py'),
      this.destinationPath(`${app}/viewsets/__init__.py`));
    this.fs.copyTpl(
      this.templatePath('app/__init__.py'),
      this.destinationPath(`${app}/__init__.py`), { app, capital });
    this.fs.copy(
      this.templatePath('app/admin.py'),
      this.destinationPath(`${app}/admin.py`));
    this.fs.copyTpl(
      this.templatePath('app/apps.py'),
      this.destinationPath(`${app}/apps.py`), { app, capital });
    this.fs.copy(
      this.templatePath('app/celery.py'),
      this.destinationPath(`${app}/celery.py`));
    this.fs.copyTpl(
      this.templatePath('app/conf.py'),
      this.destinationPath(`${app}/conf.py`), { app, capital, allcaps });
    this.fs.copyTpl(
      this.templatePath('app/exceptions.py'),
      this.destinationPath(`${app}/exceptions.py`), { capital });
    this.fs.copy(
      this.templatePath('app/signals.py'),
      this.destinationPath(`${app}/signals.py`));
    this.fs.copyTpl(
      this.templatePath('app/urls.py'),
      this.destinationPath(`${app}/urls.py`), { app });
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'), { app, allcaps });

    mkdirp(`${app}/static/${app}/js`);
    mkdirp(`${app}/static/${app}/css`);
  }
  install() {
    shell.exec('yarn', {
      cwd: `${this.options.app}/staticapp/`,
      silent: true,
    });
  }
};
