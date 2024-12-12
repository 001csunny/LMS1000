import React from "react";
import { textReader } from "../../conf/api";

function WordCard(wordItem) {
    // Click handler to trigger text-to-speech
    const handleClick = async (word) => {
        console.log("🚀 ~ handleClick ~ word:", word);
        const speechData = await textReader(word);
        if (speechData) {
            const audioContent = speechData.audioContent;
            const audio = new Audio("data:audio/wav;base64," + audioContent); // Converting base64 audio to an audio element
            audio.play();
        }
    };

    return (
        <div className="flex rounded-xl m-4 ml-10 bg-slate-300 w-72 p-4 justify-between items-center">
            <div onClick={() => handleClick(wordItem.word)}>
                {wordItem.word}
            </div>{" "}
            
            {/* Example word */}
        </div>
    );
}

export default WordCard;
