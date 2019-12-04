const util = require("util");
const execFile = util.promisify(require("child_process").execFile);

var {exec} = require("child_process");
const { spawn } = require('child_process');


var git = {

    /*---git clone---*/
    clone : async function (originPath, workPath){
        try{
            await execFile('git',['clone', originPath],{cwd : workPath});
        }catch(err) {
            console.log("clone 指令失败", err);
        }
    },

    /*---deal git push unsuccessful*/
    dealPushIssue : async function(path) {
        try{
            await execFile("git",['config','receive.denyCurrentBranch','ignore'],{cwd : path});
        }catch(err) {
            console.log("deal with push issue err!", err);
        }
    }


};


module.exports = git;





