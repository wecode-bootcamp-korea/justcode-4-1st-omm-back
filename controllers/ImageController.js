const multer = require("multer");
const path = require("path");
const fs = require("fs");

const ImageService = require("../services/ImageService");

const uploadReviewImage = async (req, res, next) => {
  try {

    const masterId = req.params.masterId;
    const reviewId = req.params.reviewId;
    
    // upload 폴더 지정 (없으면 생성)
    try {
      fs.readdirSync(`./data/uploads/master${masterId}/review${reviewId}`)
    } catch (error) {
      console.log(`./data/uploads/master${masterId}/review${reviewId} 폴더를 생성합니다.`)
      fs.mkdirSync(`./data/uploads/master${masterId}/review${reviewId}`, {recursive: true}, err => {console.log(err)})
    }

    const upload = multer({
      storage: multer.diskStorage({
        // 업로드된 이미지 저장 경로 지정
        destination(req, file, cb) {
          cb(null, `./data/uploads/master${masterId}/review${reviewId}`);
        },
        // 업로드된 이미지 파일 이름 지정
        filename(req, file, cb) {
          const ext = path.extname(file.originalname);
          cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
      }),
      // 파일 크기 제한 10MB
      limits: { fileSize: 10 * 1024 * 1024 },
      // form태그 name은 "reviewImg"로 일치시켜야 파일을 받을 수 있습니다.
    }).array("reviewImg");

    upload(req, res, function (err) {
      if (err) {        
        return res.status(400).json({ message:"INVALID_FILE" }) 
      }
    })

    const reviewImageAddr = `data/uploads/${masterId}/${reviewId}`;

    await ImageService.uploadReviewImage(reviewId, reviewImageAddr);
    return res.status(200).json({ message: "SUCCESS" });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { uploadReviewImage }