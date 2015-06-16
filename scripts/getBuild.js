// Description:
//   Check status for coreassembly 
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   pegabot build? - returns the status of coreassembly head

module.exports = function(robot) {
    robot.respond(/build?/i, function(msg){
        var Client = require('node-rest-client').Client;

        //Read auth details from file 
        var fs = require("fs");
        //var auth = JSON.parse(fs.readFileSync('auth.json','utf8'));
        //console.log(auth);
        var options_auth={user:"user",password:"pass"};
        var client = new Client(options_auth);
        var striptags = require('striptags');

        var url = 'https://meshbuild.pega.com/bamboo/rest/api/latest/result/PRPCHEADCV-COREASSEMBLY/latest';
        client.get(url, function(data, response){
            msg.reply("Status: "+data.result.buildState[0]+"  "+data.result.planName[0]);
            msg.reply("More info: "+"https://meshbuild.pega.com/bamboo/browse/"+data.result.$.key);
            msg.reply("Build reason: "+striptags(data.result.buildReason[0]));
        });
    });
}