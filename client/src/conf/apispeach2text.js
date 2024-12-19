import axios from "axios";

// URL ของ API
const apiSpeechUrl = "https://speech.googleapis.com/v1p1beta1/speech:recognize";

// ดึง gcToken จาก sessionStorage
const gcToken = "AIzaSyA40JOnPoZTEHhswblGLHWJVQ8_ekKfai0"


// ตรวจสอบว่ามี gcToken หรือไม่
if (!gcToken) {
    console.error(
        "API Key (gcToken) is missing. Please set it in sessionStorage."
    );
}

// สร้าง Axios instance


const axSpeech = axios.create({
    baseURL: apiSpeechUrl,
    params: {
        key: gcToken, // ใส่ API Key (gcToken) ใน query string
    },
});

// ฟังก์ชันในการแปลงข้อความเป็นเสียง
export default axSpeech;

