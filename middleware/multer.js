import multer from 'multer';
import path from "path";

const getStorage =(folder)=>{

  return multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,`uploads/${folder}`)
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)
    }
})
} 

const fileFilter=(req,file,cb)=>{
    const allowedTypes=/jpeg|jpg|png|webp/

    const extType=allowedTypes.test(path.extname(file.originalname).toLowerCase());

    const mimeType=allowedTypes.test (file.mimetype);

    if(extType&&mimeType)
    {
        cb(null,true)
    }
    else
    {
        cb(new Error("Only images are allowed"))
    }
}

export const uploadFirmImage = multer({ storage:getStorage('firms'), fileFilter });
export const uploadProductImage= multer({storage:getStorage('products'),fileFilter});
