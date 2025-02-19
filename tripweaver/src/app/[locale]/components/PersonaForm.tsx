"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

interface Preference {
    key: string;
    name: string;
    score: number;
    question: string;
}

const defaultPreferences: Preference[] = [
    {
        key: "natureAndOutdoors",
        name: "Nature & Outdoors",
        score: 0,
        question:
            "On a scale of 0-5, how much do you enjoy spending time in nature, such as mountains, beaches, national parks, waterfalls, forests, or riversides?",
    },
    {
        key: "culturalAndHistorical",
        name: "Cultural & Historical",
        score: 0,
        question:
            "On a scale of 0-5, how much do you enjoy exploring cultural and historical attractions like temples, museums, landmarks, or monuments?",
    },
    {
        key: "urbanAndCityLife",
        name: "Urban & City Life",
        score: 0,
        question:
            "On a scale of 0-5, how much do you enjoy urban experiences like shopping, walking streets, cityscapes, markets, or nightlife?",
    },
    {
        key: "relaxationAndMeditation",
        name: "Relaxation & Meditation",
        score: 0,
        question:
            "On a scale of 0-5, how much do you enjoy relaxing activities like meditation, cozy snuggles, or peaceful foggy settings?",
    },
    {
        key: "adventureAndActivities",
        name: "Adventure & Activities",
        score: 0,
        question:
            "On a scale of 0-5, how much do you enjoy adventure activities like hiking, cycling, camping, or diving?",
    },
    {
        key: "wildlifeAndFamilyFriendly",
        name: "Wildlife & Family-Friendly",
        score: 0,
        question:
            "On a scale of 0-5, how much do you enjoy visiting family-friendly places like zoos or waterparks with activities suitable for kids?",
    },
    {
        key: "artsAndArchitecture",
        name: "Arts & Architecture",
        score: 0,
        question:
            "On a scale of 0-5, how much do you enjoy exploring art and architecture during your travels?",
    },
    {
        key: "smallVillagesAndRuralLife",
        name: "Small Villages & Rural Life",
        score: 0,
        question:
            "On a scale of 0-5, how much do you enjoy visiting small villages and experiencing rural life?",
    },
    {
        key: "islandsAndBeaches",
        name: "Islands & Beaches",
        score: 0,
        question:
            "On a scale of 0-5, how much do you enjoy visiting islands and spending time on beaches?",
    },
];

interface PersonaFormProps {
    onClose: () => void;
}

export default function PersonaForm({ onClose }: PersonaFormProps) {
    const t = useTranslations();
    const { data: session } = useSession();
    const [preferences, setPreferences] = useState<Preference[]>(defaultPreferences);
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (newScore: number) => {
        const newPreferences = [...preferences];
        newPreferences[currentStep].score = newScore;
        setPreferences(newPreferences);
    };

    const handleNext = () => {
        if (currentStep < preferences.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            const body = { preference_prompt: preferences };

            const res = await fetch(`${process.env.NEXT_PUBLIC_REC_API_URL}/generate-user-tagScore`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                throw new Error("Failed to generate user tag score");
            }

            const tagScore = await res.json();
            const updateScore = {
                attractionTagScore: {
                    attractionTagFields: tagScore
                }
            };

            if (!session?.user?.id) {
                throw new Error("User not authenticated");
            }

            const updateRes = await fetch(`/api/user/update/${session.user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateScore),
            });

            if (!updateRes.ok) {
                throw new Error("Failed to update user tag score");
            }

            onClose();
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const currentPreference = preferences[currentStep];
    const imageBaseName = currentPreference.key;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
                <h2 className="kanit text-2xl font-bold mb-4 text-center">
                    {t("updatePreferences.title", { defaultValue: "Update Your Preferences" })}
                </h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* Question Card */}
                <div className="border p-4 rounded-lg flex flex-col items-center">
                    {/* Display three images side-by-side */}
                    <div className="flex justify-center space-x-2 mb-4">
                        <img
                            src={`/images/${imageBaseName}-1.jpg`}
                            alt={currentPreference.name}
                            className="w-32 h-32 object-cover rounded"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/images/no-img.png";
                            }}
                        />
                        <img
                            src={`/images/${imageBaseName}-2.jpg`}
                            alt={currentPreference.name}
                            className="w-32 h-32 object-cover rounded"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/images/no-img.png";
                            }}
                        />
                        <img
                            src={`/images/${imageBaseName}-3.jpg`}
                            alt={currentPreference.name}
                            className="w-32 h-32 object-cover rounded"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/images/no-img.png";
                            }}
                        />
                    </div>
                    {/* Display translated name and question */}
                    <h3 className="kanit font-semibold mb-1">
                        {t(`preferences.${currentPreference.key}.name`, { defaultValue: currentPreference.name })}
                    </h3>
                    <p className="kanit text-sm text-center mb-4">
                        {t(`preferences.${currentPreference.key}.question`, {
                            defaultValue: currentPreference.question,
                        })}
                    </p>
                    <div className="flex items-center space-x-2 w-full">
                        <input
                            type="range"
                            min="0"
                            max="5"
                            step="1"
                            value={currentPreference.score}
                            onChange={(e) => handleChange(Number(e.target.value))}
                            className="w-full"
                        />
                        <span className="kanit">{currentPreference.score}</span>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        className="kanit bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
                    >
                        {t("updatePreferences.previous", { defaultValue: "Previous" })}
                    </button>
                    <button
                        type="button"
                        onClick={currentStep < preferences.length - 1 ? handleNext : handleSubmit}
                        disabled={loading}
                        className="kanit bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {currentStep < preferences.length - 1
                            ? t("updatePreferences.next", { defaultValue: "Next" })
                            : loading
                                ? t("updatePreferences.submitting", { defaultValue: "Submitting..." })
                                : t("updatePreferences.submit", { defaultValue: "Submit" })}
                    </button>
                </div>
            </div>
        </div>
    );
}
