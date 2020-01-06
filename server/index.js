const Client = require("node-regon");
const express = require("express");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const cors = require("cors");
const pdfTemplate = require("./documents");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let gus = Client.createClient({
    key: "abcde12345abcde12345",
    sandbox: true,
    disableAsync: true, // if it is true, you will get returned result, and it will waid for end of call
    captcha: {
        autofill: true,
        apiKey: "8219889aaea6a3f9964aae345c67ee5b"
    }
});

app.post("/create-pdf", (req, res) => {
    const nip = req.body.nip;
    const findCompanyByNip = gus.findByNip(nip);
    console.log(findCompanyByNip);
    const  data = {
       name: req.body.name,
       priceFirst : req.body.price1,
       priceSecond : req.body.price2,
        invoiceID : req.body.invoiceID,
       itemName : req.body.itemName,
        nazwa: findCompanyByNip.response.Nazwa,
        wojewodztwo: findCompanyByNip.response.Wojewodztwo,
        powiat: findCompanyByNip.response.Powiat,
        gmina: findCompanyByNip.response.Gmina,
        miejscowosc: findCompanyByNip.response.Miejscowosc,
        kodPocztowy: findCompanyByNip.response.KodPocztowy,
        ulica: findCompanyByNip.response.Ulica,

            };

    pdf.create(pdfTemplate(data), {}).toFile("result.pdf", err => {
        if (err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});
app.get("/fetch-pdf", (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`);
});
app.listen(port, () => console.log(`Listening on port ${port}`));