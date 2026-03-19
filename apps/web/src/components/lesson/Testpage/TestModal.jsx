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
    const [highlightedIndex, setHighlightedIndex] = useState(null);
    const [wrongAttempts, setWrongAttempts] = useState(0);
    const [results, setResults] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [isTestStarted, setIsTestStarted] = useState(false);
    const [countdown, setCountdown] = useState(null);
    const [noSpeechDetected, setNoSpeechDetected] = useState(false);
    const [audioChunks, setAudioChunks] = useState([]);

    const apiKey = "AIzaSyA40JOnPoZTEHhswblGLHWJVQ8_ekKfai0";

    const fetchTestData = async (testId) => {
        try {
            setLoadingState(true);
            const testData = await fetchOneTest(testId);
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

    useEffect(() => {
        let timer;
        if (countdown !== null && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (countdown === 0) {
            stopRecording();
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const startTest = () => {
        if (testData && testData.words.length > 0) {
            setIsTestStarted(true);
            setHighlightedIndex(0);
            setWrongAttempts(0);
            setResults([]);
            setCompleted(false);
            setNoSpeechDetected(false);
            setIsCorrect(null);
            setUserSpeech("");
        }
    };

    const handleNextWord = () => {
        if (testData && highlightedIndex !== null) {
            if (highlightedIndex < testData.words.length - 1) {
                if (mediaRecorder && mediaRecorder.state === "recording") {
                    stopRecording();
                }
                setHighlightedIndex(highlightedIndex + 1);
                setIsCorrect(null);
                setUserSpeech("");
                setWrongAttempts(0);
                setNoSpeechDetected(false);
                setAudioChunks([]); // Reset audio chunks for next word
            } else {
                setCompleted(true);
            }
        }
    };

    const checkCorrectness = (transcript) => {
        if (highlightedIndex !== null && testData) {
            if (!transcript) {
                setNoSpeechDetected(true);
                setWrongAttempts((prev) => prev + 1);
                return;
            }

            const targetWord = testData.words[highlightedIndex]?.word || "";
            const isCorrect =
                transcript.trim().toLowerCase() ===
                targetWord.trim().toLowerCase();
            setIsCorrect(isCorrect);
            setNoSpeechDetected(false);

            if (isCorrect) {
                setResults((prev) => [
                    ...prev,
                    { word: targetWord, correct: true },
                ]);
                setTimeout(handleNextWord, 1000);
            } else {
                setResults((prev) => [
                    ...prev,
                    { word: targetWord, correct: false },
                ]);
                setWrongAttempts((prev) => prev + 1);
            }
        }
    };

    const startRecording = async () => {
        try {
            if (mediaRecorder) {
                if (mediaRecorder.state === "recording") {
                    mediaRecorder.stop();
                }
                mediaRecorder.stream
                    .getTracks()
                    .forEach((track) => track.stop());
            }

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            const recorder = new MediaRecorder(stream);
            setAudioChunks([]); // Reset audio chunks

            recorder.addEventListener("dataavailable", (event) => {
                setAudioChunks((currentChunks) => [
                    ...currentChunks,
                    event.data,
                ]);
            });

            // Handle recording completion
            recorder.addEventListener("stop", async () => {
                const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
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
                        setUserSpeech("");
                        checkCorrectness(null);
                    }
                } catch (err) {
                    console.error("Error with Speech-to-Text API:", err);
                    setError("เกิดข้อผิดพลาดในการประมวลผลเสียง");
                    checkCorrectness(null);
                }
            });

            recorder.start();
            setMediaRecorder(recorder);
            setIsRecording(true);
            setCountdown(3);

            // Stop recording after exactly 3 seconds
            setTimeout(() => {
                if (recorder.state === "recording") {
                    recorder.stop();
                    setIsRecording(false);
                }
            }, 3000);
        } catch (err) {
            console.error("Error accessing user media:", err);
            setError("ไม่สามารถเข้าถึงไมโครโฟนได้");
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop();
            mediaRecorder.stream.getTracks().forEach((track) => track.stop());
            setIsRecording(false);
            setCountdown(null);
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

    // ... Rest of the JSX remains the same ...

    return (
        <div className="relative w-full p-4 bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                    {selectedTest?.test || "Test Challenge"}
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
                                เริ่มการฝึก
                            </button>
                        )}

                        {isTestStarted && !completed && (
                            <div>
                                {countdown !== null && (
                                    <div className="text-2xl font-bold mb-4">
                                        กำลังอัดเสียง: {countdown} วินาที
                                    </div>
                                )}

                                {!isRecording &&
                                    (wrongAttempts > 0 || noSpeechDetected) && (
                                        <div className="space-x-4">
                                            <button
                                                onClick={startRecording}
                                                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                            >
                                                เริ่มอัดเสียง
                                            </button>

                                            {wrongAttempts >= 3 && (
                                                <button
                                                    onClick={handleNextWord}
                                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                                >
                                                    ข้ามคำนี้
                                                </button>
                                            )}
                                        </div>
                                    )}

                                {!isRecording &&
                                    wrongAttempts === 0 &&
                                    !noSpeechDetected && (
                                        <button
                                            onClick={startRecording}
                                            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                        >
                                            เริ่มอัดเสียง
                                        </button>
                                    )}
                            </div>
                        )}
                    </div>

                    {(userSpeech || noSpeechDetected) && (
                        <div className="mt-4 text-center">
                            {isCorrect === true && (
                                <p className="text-green-500 text-xl font-bold">
                                    ถูกต้อง!
                                </p>
                            )}
                            {isCorrect === false && (
                                <p className="text-red-500 text-xl font-bold">
                                    ไม่ถูกต้อง
                                </p>
                            )}
                            {noSpeechDetected && (
                                <p className="text-red-500 text-xl font-bold">
                                    ไม่พบคำพูด
                                </p>
                            )}
                        </div>
                    )}

                    {completed && (
                        <div className="mt-4 text-center">
                            <h3 className="text-lg font-bold">ผลการฝึกซ้อม</h3>
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
                                    onClick={startTest}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                >
                                    ฝึกซ้ำ
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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

export default TestModal;
