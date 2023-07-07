import express from "express";
import multer from "multer";
import fs from "fs"
const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

      cb(null, 'uploads')    // destination path like uploads/files/profiles/

    },
    filename: function (req, file, cb) {

      cb(null,file.originalname)
    //   cb(null, Date.now() + '-' + file.originalname)

    }
  })
  
const upload = multer({ storage: storage })
  

app.post("/upload", upload.single("text-file"), (req,res)=>{
    
    let fileName = req.file?.filename;

    fs.readFile(`uploads/${fileName}`,'utf-8' ,function(err, data) {
        console.log(data,"dataContentOfFIle");  // viewing the content of uploaded file

        // making a new directory backup and then exporting the data into the new file

        fs.writeFile(`backup/backup${fileName}`, data, ()=>{
            res.status(200).send("DATA has been uploaded and backed up in the directory backup/")
        })
                
    });

})

app.post("/merge", (req,res)=>{
    
    let {file1,file2}  = req.body;

    if(!file1 && !file2) res.status(400).send("SEND BOTH FILE NAMES")

    fs.readFile(`uploads/${file1}`,'utf-8' ,function(err, data1) {

        fs.readFile(`uploads/${file2}`,'utf-8' ,function(err, data2) {
            
            let mergedFileName = `${file1.substring(0,file1.length - 4)}_${file2.substring(0,file1.length - 4)}${Date.now()}.txt` 
            
            fs.writeFile(`merge/${mergedFileName}`, `${data1}  ${data2}`, function (err) {
                if (err) throw err;
                console.log('File is created successfully.');
                res.send(`${mergedFileName} has been created at merge/${mergedFileName}`)
              });

        });   

    });
})

app.post("/read", (req,res)=>{
    let {file_name} = req.body;
    console.log(file_name,"FILEANME");
    
    fs.readFile(`uploads/${file_name}`,'utf-8' ,function(err, data) {

        res.status(200).send(data);

    })
})




app.listen(4000, ()=>{
    
    console.log("LISTENING ON 3500");

}) 