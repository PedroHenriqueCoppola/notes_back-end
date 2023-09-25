const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");

class diskStorage {
    async saveFile(file) {
        await fs.promises.rename( //rename troca o arquivo de lugar
            path.resolve(uploadConfig.TMP_FOLDER, file), /* a imagem vai chegar aqui na temporária pro backend decidir o que ele vai fazer com a imagem. quando ela salvar, leva ela pra "UPLOADS_FOLDER" */
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        );

        return file;
    }

    async deleteFile(file) {
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

        //tratamento de exceções
        try {
            await fs.promises.stat(filePath);
        } catch {
            return; // caso alguma coisa der errado
        }

        await fs.promises.unlink(filePath);
    }
};
module.exports = diskStorage;