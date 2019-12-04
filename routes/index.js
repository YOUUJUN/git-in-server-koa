const router = require('koa-router')();
const git = require("./../utils/git_function/git_tools");
const workspaces = require("./../utils/workspace_manager/workspace");


const fsPromises = require('fs').promises;

const util = require("util");
const execFile = util.promisify(require("child_process").execFile);


router.get('/:href', async (ctx, next) => {
  console.log("hello");

  // git.clone("F:\\learn_git_koa\\public\\source","F:\\learn_git_koa\\public\\workspaces").then(
  //         value => console.log("value",value),
  //         err => console.log("err",err)
  // );

  // workspaces.createWorkSpace("F:\\learn_git_koa\\public\\source","branch2").then(
  //     value => {},
  //     err =>{console.log("err",err)}
  // );

  // fsPromises.mkdir("F:\\learn_git_koa\\public\\workspaces\\branch3");

  await next();
});

router.post("/getFile",async (ctx,next) =>{
  console.log("ctx",ctx);
  ctx.body = {msg:"msg"};
});




module.exports = router;
