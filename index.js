#!/usr/bin/env node
const ora = require('ora')
const { program } = require('commander');
const download = require('download-git-repo')
// const download = require('download-github-repo')
const chalk = require('chalk')
const logSymbols = require('log-symbols');

// 暂时不用
// var inquirer = require('inquirer');
// inquirer.prompt([
//     {
//         name: 'description',
//         message: '请输入项目描述'
//     },
//     {
//         name: 'author',
//         message: '请输入项目作者',
//         default: 'robot'
//     }
// ])
// .then((res) => {})


// 注册命令
program.command('init <name>')
    .description('init a project')
    .option('-t,--type <type>', 'type of the project to init')
    .action((name, opts) => {

        
        let url = 'rftughniwwe/template-project#main'
        let tipTxt = '前台模板下载中,请稍后......'
        if (opts.type === 'backstage') {
            url = 'rftughniwwe/template-project#backstage'
            tipTxt = '后台模板下载中,请稍后......'
        }
        const spinner = ora(tipTxt).start();
        // 下载
        // 国内gitee地址 https://gitee.com/bzkf/template-project.git
        // github地址 https://github.com/rftughniwwe/template-project.git
        // gitlab地址 http://192.168.0.105:8089/elang-projects/front_template_project.git#master
        download(url, name || 'your-project', (err) => {
            if (!err) {
                spinner.succeed();
                console.log(logSymbols.success, chalk.green(`项目${name}创建成功！`));
                console.log(
                    chalk.greenBright(logSymbols.info, `cd ${name}`) + '\n' +
                    chalk.greenBright(logSymbols.info, 'npm install') + '\n' +
                    chalk.greenBright(logSymbols.info, 'npm run dev') + '\n' +
                    chalk.greenBright(logSymbols.info, '初始化成功!')
                )
            } else {
                spinner.stop()
                console.log(logSymbols.error, chalk.red('错误! 拉取模板失败', err));
            }
        })
    })

program.parse(process.argv)