var mem = require('../util/mem.js');

async function a() {
    let a = await mem.get('component_access_token')
    console.log(a)
}
a()
