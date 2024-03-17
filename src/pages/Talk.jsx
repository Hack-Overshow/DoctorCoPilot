import React from "react";
import { assets } from "../assets/assets/assets";
import "./main.css";

const Talk = () => {
    const [input, setInput] = React.useState("");
    const [showResults, setShowResults] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [resultData, setResultData] = React.useState("");
    const [recentPrompt, setRecentPrompt] = React.useState("");

    const handleCardClick = (promptText) => {
        setInput(promptText);
    };

    const onSent = () => {
        // Your logic for sending the input and receiving the result
        // This function would typically update `loading`, `resultData`, and `recentPrompt` state
    };

    return (
        <div className="main">
            <div className="nav">
                <p>Copilot</p>
                <img src={assets.user} alt="" />
            </div>
            <div className="main-container">
                {!showResults ? (
                    <>
                        <div className="greet">
                            <p>
                                <span>Hello , Doctor </span>
                            </p>
                            <p>How Can i Help You Today?</p>
                        </div>
                        <div className="cards">
                            <div
                                className="card"
                                onClick={() =>
                                    handleCardClick("What are the recent updates ")
                                }
                            >
                                <p>What are the recent updates ? </p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div
                                className="card"
                                onClick={() =>
                                    handleCardClick(
                                        "Generic Medicines for aids"
                                    )
                                }
                            >
                                <p>Generic Medicines for aids </p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div
                                className="card"
                                onClick={() =>
                                    handleCardClick("How to learn about new   technologies?")
                                }
                            >
                                <p>How to learn about new   technologies?</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div
                                className="card"
                                onClick={() => {
                                    handleCardClick(
                                        "Who created you ? "
                                    );
                                }}
                            >
                                <p>Who created you ? </p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ? (
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            )}
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => {
                                setInput(e.target.value);
                            }}
                            value={input}
                            type="text"
                            placeholder="Enter the Prompt Here"
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img
                                src={assets.send_icon}
                                alt=""
                                onClick={() => {
                                    onSent();
                                }}
                            />
                        </div>
                    </div>
                    <div className="bottom-info">
                        <p>
                            Doctors Copilot may display inaccurate info, including about people, so
                            double-check its responses. Your privacy & Doctors Copilot Apps
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Talk;
