const CreatePdfController = require("./createPdfController");
const createPdfHandler = async(req, res, next) => {
    const result = await new CreatePdfController(req, res).main();
    console.log("In Pdf handler ----body", req);
    res.send(result);
};

module.exports = createPdfHandler;
