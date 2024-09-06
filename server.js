const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// 업로드된 이미지를 저장할 디렉토리
const uploadDir = path.join(__dirname, 'uploads');

// 업로드된 이미지 목록 저장
const imageListFile = path.join(uploadDir, 'images.json');

// 미들웨어
app.use(express.static('public'));  // 클라이언트 측 파일 제공
app.use(express.json());

// 이미지 목록 읽기
function readImageList() {
    if (fs.existsSync(imageListFile)) {
        return JSON.parse(fs.readFileSync(imageListFile, 'utf8'));
    }
    return [];
}

// 이미지 목록 저장
function writeImageList(images) {
    fs.writeFileSync(imageListFile, JSON.stringify(images, null, 2));
}

// 이미지 업로드 핸들러
app.post('/upload', (req, res) => {
    const files = req.files; // `req.files`는 multer나 다른 파일 업로드 미들웨어를 사용해야 합니다.
    // 파일 저장 및 목록 업데이트
    // 이 부분은 실제 파일 업로드 로직에 맞게 수정해야 합니다.
    // 예를 들어 multer를 사용하여 파일 업로드를 처리할 수 있습니다.
    res.send('업로드 완료');
});

// 이미지 삭제 핸들러
app.post('/delete-image', (req, res) => {
    const { imageUrl } = req.body;
    const imageList = readImageList();
    const index = imageList.indexOf(imageUrl);
    if (index > -1) {
        imageList.splice(index, 1);
        fs.unlinkSync(path.join(uploadDir, path.basename(imageUrl)));
        writeImageList(imageList);
        res.send('이미지 삭제 완료');
    } else {
        res.status(404).send('이미지 없음');
    }
});

// 클라이언트가 새로 고침할 때 이미지를 제공
app.get('/images', (req, res) => {
    res.json(readImageList());
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
