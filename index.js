#!/usr/bin/env node

const header = require('./utils/header');
const login = require('./utils/login');
const user = require('./utils/user');
const footer = require('./utils/footer');
const animelist = require('./utils/animelist');
const readtoken = require('./utils/readtoken');

(() => {
    header();
    if(process.argv[2] == 'auth') {
        login();
    } else if(process.argv[2] == 'help') {
        console.log(`
            Usage: template [options] [command]
            
            Options:
                get                            get request from api
                update                         patch request from api
                delete                         delete request from api
                name                           official name from myanimelist, seperate spaces with hyphens
                status                         options [watching completed on_hold dropped plan_to_watch,
                                                        set to -1 if don't want to change / set]
                score                           score of anime from 0 to 10
                episodes                        number of episodes watched

            Commands:
                user [get]                     get user information
                animelist [get]                get animelist of user
                animelist [delete name]        delete animelist of user
                animelist [update name         update animelist of user
                           status score 
                           episodes] 
                help                           display help for command
        `)
    } else {
        readtoken((token) => {
            switch(process.argv[2]) {
                case 'user':
                    user(token);
                    break;
                case 'animelist':
                    animelist(process.argv, token);
                    break;
                default:
                    console.log(`${process.argv[2]} is invalid command`);
                    break
            }
        })
    }

    footer();
    return;
})()