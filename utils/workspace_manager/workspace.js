const fsPromises = require('fs').promises;
const path = require("path");

const git = require("./../git_function/git_tools");


/*--store builder--*/
/*
*
* 操作成功返回工作路径;
*
* */

var workspaces = {
    createWorkSpace : async function (origin, name) {
        var headPath = path.resolve('./public/workspaces');
        var createPath = path.join(headPath,name);
        console.log("createPath",createPath);

        await fsPromises.mkdir(createPath);
        await git.clone(origin,createPath);
        await git.dealPushIssue(createPath);
    }
};


module.exports = workspaces;





// function createWorkSpace(origin, name, callback){
//     if(callback){
//         callback = callback;
//     }
//
//     var headPath = path.resolve('./public/workspaces');
//     var createPath = path.join(headPath,name);
//
//     try{
//         fs.mkdir(createPath,function(err){
//             if(err) {
//                 throw err;
//                 return console.log("创建用户工作区功能失败!",err);
//             }
//             console.log("用户目录创建成功！名称为",createPath);
//
//             git.clone(origin,createPath,function (err) {
//                 if(err){
//                     throw err;
//                     return console.log("Git clone 用户工作区功能失败!",err);
//                 }
//
//                 git.dealPushIssue();
//
//                 git.add("*",createPath ,function (err) {
//                     if(err){
//                         throw err;
//                         return;
//                     }
//
//                     git.commit(createPath,"用户工作空间git初始化成功!",function (err) {
//                         if(err){
//                             throw err;
//                             return;
//                         }
//                     });
//
//                 });
//             });
//
//         });
//
//         callback(null, createPath);
//
//     }catch (err) {
//         destroyWorkSpace(createPath);
//         callback(err);
//     }
//
// }