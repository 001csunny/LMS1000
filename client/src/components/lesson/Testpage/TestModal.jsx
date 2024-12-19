import React, { useState, useEffect } from "react";
import axios from "axios";
import WordCard from "../../speach/WordCard";
import { fetchOneTest } from "../../../conf/api";

const TestModal = ({ closeModal, selectedTest }) => {
    const [testData, setTestData] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [userSpeech, setUserSpeech] = useState("");
    const [isCorrect, setIsCorrect] = useState(null);
    const [error, setError] = useState(null);
    const [loadingState, setLoadingState] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(null); // เก็บ index ของคำที่ไฮไลต์

    const apiKey = "AIzaSyA40JOnPoZTEHhswblGLHWJVQ8_ekKfai0";

    const fetchTestData = async (testId) => {
        try {
            setLoadingState(true);
            const testData = await fetchOneTest(testId);
            console.log("Fetched Test Data:", testData);
            setTestData(testData.data);
        } catch (error) {
            console.error("Error fetching test data:", error);
            setError("ไม่สามารถดึงข้อมูลการทดสอบได้");
        } finally {
            setLoadingState(false);
        }
    };

    useEffect(() => {
        if (selectedTest && selectedTest.documentId) {
            fetchTestData(selectedTest.documentId);
        }
    }, [selectedTest]);

    const startTest = () => {
        // เริ่มการทดสอบโดยตั้งค่า index ของคำแรกเป็น 0
        if (testData && testData.words.length > 0) {
            setHighlightedIndex(0);
        }
    };

    const handleNextWord = () => {
        // ไปยังคำถัดไป
        if (testData && highlightedIndex !== null) {
            if (highlightedIndex < testData.words.length - 1) {
                setHighlightedIndex(highlightedIndex + 1);
                setIsCorrect(null); // รีเซ็ตสถานะการตรวจสอบ
                setUserSpeech(""); // ล้างคำพูดของผู้ใช้
            } else {
                alert("คำทั้งหมดถูกทดสอบเรียบร้อยแล้ว!");
                setHighlightedIndex(null); // รีเซ็ตการไฮไลต์
            }
        }
    };

    const checkCorrectness = (transcript) => {
        if (highlightedIndex !== null && testData) {
            const targetWord = testData.words[highlightedIndex]?.word || "";
            setIsCorrect(transcript.trim() === targetWord.trim());
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            const recorder = new MediaRecorder(stream);

            recorder.addEventListener("dataavailable", async (event) => {
                const audioBlob = event.data;
                const base64Audio = await audioBlobToBase64(audioBlob);

                try {
                    const response = await axios.post(
                        `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`,
                        {
                            config: {
                                encoding: "WEBM_OPUS",
                                sampleRateHertz: 48000,
                                languageCode: "th-TH",
                            },
                            audio: {
                                content: base64Audio,
                            },
                        }
                    );

                    if (
                        response.data.results &&
                        response.data.results.length > 0
                    ) {
                        const transcript =
                            response.data.results[0].alternatives[0].transcript;
                        setUserSpeech(transcript);
                        checkCorrectness(transcript);
                    } else {
                        setUserSpeech("ไม่สามารถแปลงเสียงได้");
                    }
                } catch (err) {
                    console.error(
                        "Error with Speech-to-Text API:",
                        err.response?.data || err.message
                    );
                    setError("เกิดข้อผิดพลาดในการประมวลผลเสียง");
                }
            });

            recorder.start();
            setMediaRecorder(recorder);
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing user media:", err);
            setError("ไม่สามารถเข้าถึงไมโครโฟนได้");
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    return (
        <div className="relative w-full p-4 bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                    {selectedTest?.test || "Test Challenge"}
                </h2>
                <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-black"
                >
                    ✕
                </button>
            </div>
            {loadingState ? (
                <div className="mt-4 text-gray-500">Loading...</div>
            ) : testData ? (
                <div className="mt-4 grid grid-cols-4 gap-4">
                    {testData.words.map((wordItem, index) => (
                        <div
                            key={wordItem.id}
                            className={`flex items-center justify-between p-2 border-b transition-all duration-500 ${
                                index === highlightedIndex
                                    ? "bg-yellow-300 text-red-500 animate-pulse"
                                    : ""
                            }`}
                        >
                            <WordCard word={wordItem.word} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="mt-4 text-red-500">
                    Failed to load challenge
                </div>
            )}
            <div className="mt-4 text-center">
                <button
                    onClick={startTest}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    เริ่มการทดสอบ
                </button>
                <button
                    onClick={handleNextWord}
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    disabled={highlightedIndex === null}
                >
                    พูดคำถัดไป
                </button>
                <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                    {isRecording ? "หยุดบันทึก" : "เริ่มบันทึก"}
                </button>
            </div>
            {userSpeech && (
                <div className="mt-4 text-center">
                    <p className="text-lg">
                        คุณพูด:{" "}
                        <span
                            className={`font-bold ${
                                isCorrect ? "text-green-500" : "text-red-500"
                            }`}
                        >
                            {userSpeech}
                        </span>
                    </p>
                    {isCorrect === true && (
                        <p className="text-green-500">ถูกต้อง!</p>
                    )}
                    {isCorrect === false && (
                        <p className="text-red-500">ไม่ตรง ลองอีกครั้ง!</p>
                    )}
                </div>
            )}
            {error && (
                <div className="mt-4 text-center text-red-500">{error}</div>
            )}
        </div>
    );
};

export default TestModal;

const audioBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const arrayBuffer = reader.result;
            const base64Audio = btoa(
                new Uint8Array(arrayBuffer).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                )
            );
            resolve(base64Audio);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(blob);
    });
};
