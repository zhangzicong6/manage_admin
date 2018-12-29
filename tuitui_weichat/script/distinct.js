var UserconfModel = require('../model/Userconf');

function distinct() {
    UserconfModel.find({code:89}).distinct('openid').exec((err, data)=>{

    })
}
distinct()