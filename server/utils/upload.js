import multer from 'multer'
import dotenv from 'dotenv';
import {GridFsStorage} from 'multer-gridfs-storage';

//multer-gridfs-storage package is used to store uploaded file directly to mongodb
dotenv.config();
const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;
const storage =new GridFsStorage({
    url:`mongodb+srv://${username}:${password}@cluster0.clkxbrq.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({storage}); 