import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'

export default function Chatbot() {
    const [showQuery, setShowQuery] = useState(true);
    const [showResult, setShowResult] = useState(false);

    // State variables for each input field
    const [prompt, setPrompt] = useState("");
    const [percentage, setPercentage] = useState("");
    const [sizeOfLand, setSizeOfLand] = useState("");
    const [industries, setIndustries] = useState("");
    const navigate = useNavigate();
    const toast = useToast()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (prompt === "") {
            toast({
                title: 'Error',
                description: 'Please fill the prompt',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
            return
        } else if (percentage === "") {
            toast({
                title: 'Error',
                description: 'Please fill the percentage',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
            return
        } else if (sizeOfLand === "") {
            toast({
                title: 'Error',
                description: 'Please fill the size of land',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
            return
        }

        setShowQuery(false);
        setShowResult(true);
        console.log(`${prompt}. The population growth rate is ${percentage} percent, size of land is ${sizeOfLand} square meters and the industries to be included are ${industries}`);
    };

    const handleNewPrompt = () => {
        setPrompt("");
        setPercentage("");
        setSizeOfLand("");
        setIndustries("");
        setShowQuery(true);
        setShowResult(false);
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        setPrompt("");
        setPercentage("");
        setSizeOfLand("");
        setIndustries("");
        navigate("/onbording");
    };

    const handleClickRegenerate = (e) => {
        e.preventDefault();
        console.log("regenerate click");
    };

    const handleClickCopy = (e) => {
        e.preventDefault();
        const textToCopy = document.getElementById("result-text").innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            toast({
                title: "Text saved to clipboard",
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
        }).catch(err => {
            toast({
                title: "Failed to copy text to clipboard",
                status: 'error',
                duration: 2000,
                isClosable: true,
              })
        });
    };

    return (
        <div className={`chatbot min-h-screen`}>
            <Navbar />
            <section className={`${showQuery ? "block" : "hidden"} chatbot-container-form m-auto mt-4 w-1/2 h-5/6 rounded-[20px]`}>
                <form onSubmit={handleSubmit} className="w-5/6 m-auto p-4">
                    <article className="flex justify-between my-4 items-center">
                        <h2 className="text-xl font-semibold">Let's get started...</h2>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </article>
                    <article className="flex flex-col">
                        <label className="mb-3" htmlFor="prompt">Prompt <span className="text-[#dc4242]">*</span></label>
                        <input
                            id="prompt"
                            type="text"
                            className="px-6 py-4 mb-4 rounded-md"
                            placeholder="Enter your prompt here"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                    </article>
                    <h2 className="text-xl my-4 font-semibold">Details</h2>
                    <article className="flex flex-col mb-6">
                        <label className="mb-3" htmlFor="percentage">Population growth rate (in percentage)  <span className="text-[#E494A2]">*</span></label>
                        <input
                            id="percentage"
                            className="px-6 py-4 mb-4 rounded-md"
                            type="text"
                            placeholder="4.2"
                            value={percentage}
                            onChange={(e) => setPercentage(e.target.value)}
                        />
                    </article>
                    <article className="flex flex-col mb-6">
                        <label className="mb-3" htmlFor="size-of-land">Size of the land (square meters)  <span className="text-[#E494A2]">*</span></label>
                        <input
                            id="size-of-land"
                            className="px-6 py-4 mb-4 rounded-md"
                            type="text"
                            placeholder="20000"
                            value={sizeOfLand}
                            onChange={(e) => setSizeOfLand(e.target.value)}
                        />
                    </article>
                    <article className="flex flex-col mb-6">
                        <label className="mb-3" htmlFor="industries">Type of industries (separate with comma)</label>
                        <input
                            id="industries"
                            className="px-6 py-4 mb-4 rounded-md"
                            type="text"
                            placeholder="2 cement manufacturing industries, 3 food processing industries"
                            value={industries}
                            onChange={(e) => setIndustries(e.target.value)}
                        />
                    </article>
                    <article className="flex justify-end gap-4">
                        <button className="border w-20 bg-[#AA7683] text-[#FEF9F7] p-2 rounded-xl font-semibold border-[#FEF9F7]" type="submit">Send</button>
                        <button className="border w-20 p-2 rounded-xl font-semibold border-[#333]" onClick={handleCancelClick} type="reset">Cancel</button>
                    </article>
                </form>
            </section>
            <section className={`${showResult ? "block" : "hidden"} chatbot-container-form m-auto mt-4 w-4/5 h-5/6 rounded-[20px]`}>
                <article className="w-5/6 m-auto py-8">
                    <h1 className="font-semibold text-3xl mb-6">Results</h1>
                    <p id="result-text" className="bg-white p-4">Ai Content</p>
                    <div className="flex gap-5 items-center justify-end mt-6">
                        <button onClick={handleClickCopy} className="border w-20 p-2 rounded-xl font-semibold border-[#333]" type="reset">Copy</button>
                        <button onClick={handleClickRegenerate} className="border w-32 p-2 rounded-xl font-semibold border-[#333]" type="reset">Regenerate</button>
                        <button onClick={handleNewPrompt} className="border w-20 p-2 rounded-xl font-semibold border-[#333]" type="reset">New</button>
                    </div>
                </article>
            </section>
        </div>
    );
}
