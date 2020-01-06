const Client = require('node-regon');
let gus = Client.createClient({
    key:'abcde12345abcde12345',
    sandbox:true,
    disableAsync:true, // if it is true, you will get returned result, and it will waid for end of call
    captcha: {
        autofill: true,
        apiKey: "8219889aaea6a3f9964aae345c67ee5b"
    }
});

console.log("Sandbox: ", gus.sandbox);
console.log("login GUS sessionID: ", gus.getSessionId());

var findCompanyByNip = gus.findByNip("9720902729");
console.log(findCompanyByNip);