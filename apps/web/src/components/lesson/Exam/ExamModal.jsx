import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchOneExam } from "../../../conf/api";
import WordCard from "../../speach/WordCard";

const ExamModal = ({ closeModal, selectedExam }) => {
    console.log("🚀 ~ ExamModal ~ selectedExam:", selectedExam)
    const [testData, setTestData] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [userSpeech, setUserSpeech] = useState("");
    const [isCorrect, setIsCorrect] = useState(null);
    const [error, setError] = useState(null);
    const [loadingState, setLoadingState] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(null);
    const [wrongAttempts, setWrongAttempts] = useState(0);
    const [results, setResults] = useState([]);
    const [completed, setCompleted] = useState(false); // เช็คสถานะการทำข้อสอบเสร็จ
    const [isTestStarted, setIsTestStarted] = useState(false);

    const apiKey = "AIzaSyA40JOnPoZTEHhswblGLHWJVQ8_ekKfai0";

    const fetchTestData = async (testId) => {
        try {
            setLoadingState(true);
            const testData = await fetchOneExam(testId);
            console.log("🚀 ~ fetchTestData ~ testData:", testData)
            setTestData(testData.data);
        } catch (error) {
            console.error("Error fetching test data:", error);
            setError("ไม่สามารถดึงข้อมูลการทดสอบได้");
        } finally {
            setLoadingState(false);
        }
    };

    useEffect(() => {
        if (selectedExam && selectedExam.documentId) {
            fetchTestData(selectedExam.documentId);
        }
    }, [selectedExam]);

    const startTest = () => {
        if (testData && testData.words.length > 0) {
            setIsTestStarted(true);
            setHighlightedIndex(0);
            setWrongAttempts(0);
            setResults([]);
            setCompleted(false);
        }
    };

    const handleNextWord = () => {
        if (testData && highlightedIndex !== null) {
            if (highlightedIndex < testData.words.length - 1) {
                setHighlightedIndex(highlightedIndex + 1);
                setIsCorrect(null);
                setUserSpeech("");
                setWrongAttempts(0);
            } else {
                setCompleted(true);
            }
        }
    };

    const checkCorrectness = (transcript) => {
        if (highlightedIndex !== null && testData) {
            const targetWord = testData.words[highlightedIndex]?.word || "";
            const isCorrect = transcript.trim() === targetWord.trim();
            setIsCorrect(isCorrect);

            if (isCorrect) {
                setResults((prevResults) => [
                    ...prevResults,
                    { word: targetWord, correct: true },
                ]);
            } else {
                setResults((prevResults) => [
                    ...prevResults,
                    { word: targetWord, correct: false },
                ]);
                setWrongAttempts((prevAttempts) => prevAttempts + 1);
            }
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
                    console.error("Error with Speech-to-Text API:", err);
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

    return (
        <div className="relative w-full p-4 bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                    {selectedExam?.exam || "Exam Challenge"}
                </h2>
            </div>

            {loadingState ? (
                <div className="mt-4 text-gray-500">Loading...</div>
            ) : testData ? (
                <div className="flex-col mt-4 text-center items-center justify-center w-full h-full">
                    <div className="flex justify-center items-center w-full h-full mt-4">
                        {highlightedIndex !== null && (
                            <div className="mb-4">
                                <WordCard
                                    word={
                                        testData.words[highlightedIndex]?.word
                                    }
                                />
                            </div>
                        )}
                    </div>

                    <div className="mt-4">
                        {!isTestStarted && (
                            <button
                                onClick={startTest}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                เริ่มการทดสอบ
                            </button>
                        )}

                        {isTestStarted && (
                            <>
                                {isCorrect && !completed && (
                                    <button
                                        onClick={handleNextWord}
                                        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        คำถัดไป
                                    </button>
                                )}

                                <button
                                    onClick={
                                        isRecording
                                            ? stopRecording
                                            : startRecording
                                    }
                                    className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                >
                                    {isRecording ? "หยุดบันทึก" : "เริ่มบันทึก"}
                                </button>
                            </>
                        )}
                    </div>

                    {userSpeech && (
                        <div className="mt-4 text-center">
                            {isCorrect === true && (
                                <p className="text-green-500">ถูกต้อง!</p>
                            )}
                            {isCorrect === false && (
                                <p className="text-red-500">
                                    ไม่ตรง ลองอีกครั้ง!
                                </p>
                            )}
                        </div>
                    )}

                    {wrongAttempts >= 3 && !completed && (
                        <div className="mt-4 text-center">
                            <button
                                onClick={handleNextWord}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            >
                                ข้ามคำนี้
                            </button>
                        </div>
                    )}

                    {completed && (
                        <div className="mt-4 text-center">
                            <h3 className="text-lg font-bold">ผลการทดสอบ</h3>
                            <div className="mt-2">
                                {results.map((result, index) => (
                                    <p
                                        key={index}
                                        className={`text-lg ${
                                            result.correct
                                                ? "text-green-500"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {result.word}:{" "}
                                        {result.correct ? "ถูกต้อง" : "ผิด"}
                                    </p>
                                ))}
                            </div>
                            <div className="mt-4">
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    เสร็จสิ้น
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="mt-4 text-red-500">
                    Failed to load challenge
                </div>
            )}

            {error && (
                <div className="mt-4 text-center text-red-500">{error}</div>
            )}
        </div>
    );
};

export default ExamModal;
