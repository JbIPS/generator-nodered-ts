const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const _ = require("lodash");
const path = require("path");
const mkdirp = require("mkdirp");

const defaultFolder = _.kebabCase(path.basename(process.cwd()));

module.exports = class extends Generator {
  installDependencies(dependencies) {
    super.installDependencies({ ...dependencies, bower: false });
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the super-excellent ${chalk.red(
          "generator-nodered-ts"
        )} generator!`
      )
    );

    const validate = n => Boolean(n.match(/^[A-Z][\w_-]+$/i));

    const prompts = [
      {
        type: "input",
        name: "name",
        message:
          "Project Name - Will prepend node-red-contrib- if needed (a project can contain many nodes)",
        validate,
        default: defaultFolder
      },
      {
        type: "input",
        name: "nodename",
        message: "Node Name",
        validate,
        default: "uppercase"
      },
      {
        type: "input",
        name: "category",
        message: "Node palette category",
        default: "function",
        validate
      },
      {
        type: "input",
        name: "description",
        message: "Description",
        default: "Converts the input payload to upper case"
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  defaultfolder() {
    if (this.props.name !== defaultFolder) {
      this.log(
        `Your generator must be inside a folder named ${this.props.name}\nI'll automatically create this folder.`
      );
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  writing() {
    this.props.projectname = this.props.name.match(/^node-red-contrib-/)
      ? this.props.name
      : `node-red-contrib-${this.props.name}`;
    const templates = [
      "dot_eslintrc.js",
      "dot_gitignore",
      "dot_npmignore",
      "package.json.tmpl",
      "tsconfig.json",
      "src/__nodename___integration.spec.ts",
      "src/__nodename__.ts",
      "src/__nodename__.spec.ts",
      "src/__nodename___node.html",
      "src/__nodename___node.ts"
    ];
    // eslint-disable-next-line no-restricted-syntax
    for (const t of templates) {
      this.fs.copyTpl(
        this.templatePath(t),
        this.destinationPath(
          t
            .replace(/__nodename__/, this.props.nodename)
            .replace(/^dot_/, ".")
            .replace(/.tmpl/, "")
        ),
        this.props
      );
    }
  }

  install() {
    this.installDependencies();
  }
};
