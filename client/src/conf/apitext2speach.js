import axios from "axios";

// URL ของ API และ API Key (ต้องรักษาความปลอดภัย)
const apiUrl = "https://texttospeech.googleapis.com/v1/text:synthesize";
const apiKey = "AIzaSyD8QI-Tudt-aTo7izLEszbRxOAMUoS2m0c"; // ใส่ API Key

// สร้าง Axios instance
const ax2sp = axios.create({
    baseURL: apiUrl, // ตั้งค่า baseURL ให้ถูกต้อง
    params: {
        key: apiKey, // ใส่ API Key ในพารามิเตอร์ของ URL
    },
});

// ฟังก์ชันในการแปลงข้อความเป็นเสียง
export default ax2sp;