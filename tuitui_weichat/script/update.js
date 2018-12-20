var ConfigModel = require('../model/Config');

async function delTag(code) {
    await ConfigModel.update({code:code},{status:1})
}

for (let i = 54; i <= 62; i++) {
    delTag(i)
}



