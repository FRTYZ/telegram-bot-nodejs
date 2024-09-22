const fs = require('fs');
const path = require('path');

async function uploadFile(file, who, deleteIfExist = '') {
    try {
        // Delete the specified file if it already exists
        if (deleteIfExist && fs.existsSync(deleteIfExist)) {
            fs.unlinkSync(deleteIfExist);
        }

        let buffer = file.buffer;
        let mimeType = file.mimetype;

        // Create folder path
        const folderPath = path.join(__dirname, '../../public', 'files', who);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        const filePath = path.join(folderPath, `${file.originalname}`);

        // Save file
        fs.writeFileSync(filePath, buffer);

        const url = '/static/files/' + who + file.originalname;
        const pathName = 'public/files/' + who + file.originalname;

        // Return uploaded file information
        return { url, name: file.originalname, pathName, mimeType };
    } catch (error) {
        throw error;
    }
}

module.exports = { uploadFile };
