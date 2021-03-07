const uuid = require("uuid");
const fs = require("fs");
// this.response.status(201);
// return {
//     message: `File created`,
//     url: `${this.savePath}/${this.requestBody.user_name}-${reqUuid}.pdf`,
//     for_user: this.requestBody.user_name,
//     by_user: this.requestBody.creator
// };
class CreatePdfController {
    constructor(req, res) {
        /**
         request body {
             user_names: [users] for which the pdf is created
             creator: user by which the pdf is created
         }
         */
        this.requestBody = req.body;
        this.response = res;
        this.savePath = process.env.save_path;
        this.accessPath = process.env.access_path;
    } 
    async main() {
        try {
            let response = {
                pdfs: []
            };
            for (let user_name of this.requestBody.user_names) {
                let creator = this.requestBody.creator;
                let reqUuid = uuid.v4();
                // fs.appendFileSync(`${this.savePath}/${user_name}-${creator}-${reqUuid}.pdf`, 'Start editing here!');
                response.pdfs.push({
                    for_user: user_name,
                    by_user: creator,
                    url: `${this.accessPath}/${user_name}-${creator}-${reqUuid}.pdf`,
                    status: "draft"
                });
            }
            return response;
            
        } catch(error) {
            this.response.status(400);
            throw {message: error};
        }

    }
}

module.exports = CreatePdfController