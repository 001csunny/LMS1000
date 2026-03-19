import axios from "axios";

// URL ของ API
const apiUrl = "https://texttospeech.googleapis.com/v1/text:synthesize";

// ดึง gcToken จาก sessionStorage
const gcToken = sessionStorage.getItem("gcToken");

// ตรวจสอบว่ามี gcToken หรือไม่
if (!gcToken) {
    console.error(
        "API Key (gcToken) is missing. Please set it in sessionStorage."
    );
}

// สร้าง Axios instance
const ax2sp = axios.create({
    baseURL: apiUrl, // ตั้งค่า baseURL ให้ถูกต้อง
    params: {
        key: gcToken, // ใส่ gcToken (API Key) ในพารามิเตอร์ของ URL
    },
});



// ฟังก์ชันในการแปลงข้อความเป็นเสียง
export default ax2sp;

