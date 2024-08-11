import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react';
import axios from "axios";
import Select from 'react-select';

export default function Chatbot() {
    const [showQuery, setShowQuery] = useState(true);
    const [showResult, setShowResult] = useState(false);

    // State variables for each input field
    const [landArea, setLandArea] = useState("");
    const [currentPopulation, setCurrentPopulation] = useState("");
    const [zoning, setZoning] = useState("");
    const [existingInfrastructure, setExistingInfrastructure] = useState("");
    const [sustainabilityGoals, setSustainabilityGoals] = useState([]);
    const [budget, setBudget] = useState("");
    const [aiResponse, setAiResponse] = useState("");

    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!landArea || !currentPopulation || !zoning || !existingInfrastructure || !sustainabilityGoals.length || !budget) {
            toast({
                title: 'Error',
                description: 'Please fill all the required fields',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
            return;
        }
    
        setShowQuery(false);
        setShowResult(true);
    
        try {
            const sustainabilityGoalsValues = sustainabilityGoals.map(goal => goal.value);
    
            const response = await axios.post("http://127.0.0.1:5001/generate_plan", {
                land_area: landArea,
                current_population: currentPopulation,
                zoning: zoning,
                existing_infrastructure: existingInfrastructure.split(',').map(item => item.trim()),
                sustainability_goals: sustainabilityGoalsValues,
                budget: budget
            });
    
            setAiResponse(response.data.plan);
            console.log(response.data);
        } catch (error) {
            console.error("Error generating plan:", error);
            toast({
                title: 'Error',
                description: 'Failed to generate plan',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    };
    

    const handleNewPrompt = () => {
        setLandArea("");
        setCurrentPopulation("");
        setZoning("");
        setExistingInfrastructure("");
        setSustainabilityGoals([]);
        setBudget("");
        setShowQuery(true);
        setShowResult(false);
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        navigate("/onboarding");
    };

    const handleClickRegenerate = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://192.168.100.46:5001/generate_plan", {
                land_area: landArea,
                current_population: currentPopulation,
                zoning: zoning,
                existing_infrastructure: existingInfrastructure.split(',').map(item => item.trim()),
                sustainability_goals: sustainabilityGoals,
                budget: budget
            });

            setAiResponse(response.data.plan);
        } catch (error) {
            console.error("Error regenerating plan:", error);
        }
    };

    const handleClickCopy = async (e) => {
        e.preventDefault();
        try {
            await navigator.clipboard.writeText(aiResponse);
            toast({
                title: "Text copied to clipboard",
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } catch (err) {
            toast({
                title: "Failed to copy text to clipboard",
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    };

    const options = [
        { value: 'Reduce carbon emissions', label: 'Reduce carbon emissions' },
        { value: 'Increase renewable energy', label: 'Increase renewable energy' },
        { value: 'Enhance public transportation', label: 'Enhance public transportation' },
        { value: 'Promote green spaces', label: 'Promote green spaces' },
        { value: 'Waste management improvement', label: 'Waste management improvement' }
    ];

    return (
        <div className="chatbot min-h-screen">
            <Navbar />
            <section className={`${showQuery ? "block" : "hidden"} chatbot-container-form m-auto mt-4 w-1/2 h-5/6 rounded-[20px]`}>
                <form onSubmit={handleSubmit} className="w-5/6 m-auto p-4">
                    <article className="flex justify-between my-4 items-center">
                        <h2 className="text-xl font-semibold">Urban Planning Details</h2>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </article>

                    <article className="flex flex-col mb-7">
                        <label className="mb-3" htmlFor="landArea">Land Area (sq km) <span className="text-[#C53030]">*</span></label>
                        <input
                            id="landArea"
                            type="text"
                            className="px-6 py-4 mb-4 rounded-md"
                            placeholder="Enter land area"
                            value={landArea}
                            onChange={(e) => setLandArea(e.target.value)}
                        />
                    </article>

                    <article className="flex flex-col mb-7">
                        <label className="mb-3" htmlFor="currentPopulation">Current Population <span className="text-[#C53030]">*</span></label>
                        <input
                            id="currentPopulation"
                            type="text"
                            className="px-6 py-4 mb-4 rounded-md"
                            placeholder="Enter current population"
                            value={currentPopulation}
                            onChange={(e) => setCurrentPopulation(e.target.value)}
                        />
                    </article>

                    <article className="flex flex-col mb-7">
                        <label className="mb-3" htmlFor="zoning">Zoning <span className="text-[#C53030]">*</span></label>
                        <input
                            id="zoning"
                            type="text"
                            className="px-6 py-4 mb-4 rounded-md"
                            placeholder="Enter zoning details"
                            value={zoning}
                            onChange={(e) => setZoning(e.target.value)}
                        />
                    </article>

                    <article className="flex flex-col mb-7">
                        <label className="mb-3" htmlFor="existingInfrastructure">Existing Infrastructure (comma-separated) <span className="text-[#C53030]">*</span></label>
                        <input
                            id="existingInfrastructure"
                            type="text"
                            className="px-6 py-4 mb-4 rounded-md"
                            placeholder="Enter existing infrastructure"
                            value={existingInfrastructure}
                            onChange={(e) => setExistingInfrastructure(e.target.value)}
                        />
                    </article>

                    <article className="flex flex-col mb-7">
                        <label className="mb-3" htmlFor="sustainabilityGoals">Sustainability Goals <span className="text-[#C53030]">*</span></label>
                        <Select
                            id="sustainabilityGoals"
                            isMulti
                            options={options}
                            value={sustainabilityGoals}
                            onChange={setSustainabilityGoals}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Select goals..."
                        />
                    </article>

                    <article className="flex flex-col mb-7">
                        <label className="mb-3" htmlFor="budget">Development Budget (in million $) <span className="text-[#C53030]">*</span></label>
                        <input
                            id="budget"
                            type="text"
                            className="px-6 py-4 mb-4 rounded-md"
                            placeholder="Enter budget"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
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
                    <p id="result-text" className="bg-white p-4">{aiResponse}</p>
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
