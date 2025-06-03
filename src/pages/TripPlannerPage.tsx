import { useState, useEffect } from "react";
import { getQuestions, generateItinerary } from "../services/api";
import { QuestionGroup, TripAnswers } from "../types/index";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/date-input.css";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar";

export default function TripPlannerPage() {
  const [questionGroups, setQuestionGroups] = useState<QuestionGroup[]>([]);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<TripAnswers>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isItineraryReady, setIsItineraryReady] = useState(false);
  const [error, setError] = useState<string>("");
  const [tagInputs, setTagInputs] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await getQuestions();

      const groups: QuestionGroup[] = Object.entries(response).map(
        ([key, group]) => {
          if (typeof group === "object" && group !== null) {
            return {
              ...(group as Omit<QuestionGroup, "id">),
              id: key,
            };
          }
          throw new Error("Invalid group data structure from API");
        }
      );

      setQuestionGroups(groups);
    } catch (error) {
      setError(
        "Failed to load questions. Please check if the backend is running."
      );
    }
  };

  const handleAnswer = (fieldId: string, answer: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [fieldId]: answer,
    }));
  };

  const handleMultiSelectAnswer = (
    fieldId: string,
    option: string,
    max: number
  ) => {
    setAnswers((prev) => {
      const currentAnswers = prev[fieldId as keyof TripAnswers] as
        | string[]
        | undefined;
      const selectedOptions = currentAnswers ? [...currentAnswers] : [];

      if (selectedOptions.includes(option)) {
        return {
          ...prev,
          [fieldId]: selectedOptions.filter((item) => item !== option),
        };
      } else if (selectedOptions.length < max) {
        return {
          ...prev,
          [fieldId]: [...selectedOptions, option],
        };
      }
      return prev;
    });
  };

  const handleTagsAnswer = (fieldId: string, value: string) => {
    setTagInputs((prev) => ({ ...prev, [fieldId]: value }));

    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    if (tags.length <= 5) {
      handleAnswer(fieldId, tags);
    }
  };

  const isGroupComplete = (group: QuestionGroup) => {
    return group.fields.every((field) => {
      if (!field.required) return true;
      const answer = answers[field.id as keyof TripAnswers];
      if (field.type === "multi-select" || field.id === "destinations") {
        return Array.isArray(answer) && answer.length > 0;
      }
      return !!answer;
    });
  };

  const nextGroup = () => {
    if (currentGroupIndex < questionGroups.length - 1) {
      if (isGroupComplete(questionGroups[currentGroupIndex])) {
        setCurrentGroupIndex((prev) => prev + 1);
        setError("");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError("Please complete all required fields in this section.");
      }
    } else {
      handleSubmit();
    }
  };

  const prevGroup = () => {
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex((prev) => prev - 1);
      setError("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    if (!isGroupComplete(questionGroups[currentGroupIndex])) {
      setError("Please complete all required fields.");
      return;
    }

    setIsLoading(true);
    setIsItineraryReady(false);
    setError("");

    try {
      const formattedAnswers: TripAnswers = {
        start_location: (answers.start_location as string) || "",
        destinations: (answers.destinations as string[]) || [],
        budget: (answers.budget as string) || "",
        travel_style: (answers.travel_style as string[]) || [],
        accommodation: (answers.accommodation as string[]) || [],
        interests: (answers.interests as string[]) || [],
        group_size: (answers.group_size as string) || "",
        transportation: (answers.transportation as string) || "",
        dietary_restrictions:
          (answers.dietary_restrictions as string[]) || undefined,
        special_requirements:
          (answers.special_requirements as string[]) || undefined,
        travel_season: (answers.travel_season as string) || undefined,
        pace: (answers.pace as string) || "Moderate",
        start_date: answers.start_date as string,
        end_date: (answers.end_date as string) || "",
      };

      const response = await generateItinerary(formattedAnswers);

      if (!response || typeof response !== "object") {
        throw new Error("Invalid response format from server");
      }
      if (!response.success || !response.trip_itinerary) {
        throw new Error("Failed to generate itinerary");
      }

      const itinerary = response.trip_itinerary.itinerary;
      if (!itinerary.summary || !Array.isArray(itinerary.days)) {
        throw new Error("Invalid itinerary structure");
      }

      setIsItineraryReady(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/itinerary", { state: { itinerary } });
    } catch (error: any) {
      setError(
        error.response?.data?.detail ||
          error.message ||
          "Failed to generate itinerary. Please try again."
      );
      setIsItineraryReady(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Add helper function for date handling
  const handleDateChange = (date: Date | null, fieldId: string) => {
    if (date) {
      // Use local date string to avoid timezone issues
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;
      handleAnswer(fieldId, dateStr);

      // Clear end_date if start_date is changed
      if (fieldId === "start_date") {
        handleAnswer("end_date", "");
      }
    }
  };

  if (isLoading) {
    return <LoadingScreen isReady={isItineraryReady} />;
  }

  if (questionGroups.length === 0 && !error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading questions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && questionGroups.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-red-100">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchQuestions}
              className="bg-gradient-to-br from-blue-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentGroup = questionGroups[currentGroupIndex];
  const progress = ((currentGroupIndex + 1) / questionGroups.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Design Your Perfect
              <span className="block bg-gradient-to-br from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Travel Experience
              </span>
            </h1>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-white/50 backdrop-blur-sm rounded-full h-3 shadow-inner">
              <div
                className="bg-gradient-to-br from-blue-600 to-teal-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-blue-100/50 mb-8">
            <div className="mb-8 bg-gradient-to-br from-blue-50 to-teal-50 p-6 rounded-xl border border-blue-100/50">
              <h2 className="text-2xl font-semibold bg-gradient-to-br from-blue-600 to-teal-600 bg-clip-text text-transparent mb-3">
                {currentGroup.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {currentGroup.description}
              </p>
            </div>

            {currentGroup.fields.map((field) => (
              <div key={field.id} className="mb-8 last:mb-0">
                <label className="block text-lg font-medium text-gray-800 mb-2">
                  {field.question}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
                {field.description && (
                  <p className="text-gray-600 text-sm mb-3">
                    {field.description}
                  </p>
                )}

                {field.id === "start_location" ? (
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={answers[field.id as keyof TripAnswers] || ""}
                    onChange={(e) => handleAnswer(field.id, e.target.value)}
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : field.id === "destinations" ? (
                  <input
                    type="text"
                    placeholder={
                      field.placeholder ||
                      "Enter destinations separated by commas"
                    }
                    value={tagInputs[field.id] || ""}
                    onChange={(e) => handleTagsAnswer(field.id, e.target.value)}
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : field.type === "tags" ? (
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={tagInputs[field.id] ?? ""}
                    onChange={(e) => handleTagsAnswer(field.id, e.target.value)}
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : field.type === "text" ? (
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={answers[field.id as keyof TripAnswers] || ""}
                    onChange={(e) => handleAnswer(field.id, e.target.value)}
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : field.type === "date" ? (
                  <div className="relative flex flex-col">
                    <div className="relative">
                      <DatePicker
                        selected={
                          answers[field.id as keyof TripAnswers]
                            ? new Date(
                                answers[
                                  field.id as keyof TripAnswers
                                ] as string
                              )
                            : null
                        }
                        onChange={(date) => handleDateChange(date, field.id)}
                        minDate={
                          field.id === "start_date"
                            ? new Date()
                            : field.id === "end_date" && answers.start_date
                            ? new Date(answers.start_date as string)
                            : new Date()
                        }
                        maxDate={
                          field.id === "end_date" && answers.start_date
                            ? new Date(new Date(answers.start_date).setDate(new Date(answers.start_date).getDate() + 10))
                            : new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                        }
                        placeholderText={field.placeholder || "Select date"}
                        dateFormat="MMMM d, yyyy"
                        className="w-full p-4 pl-4 pr-12 bg-white border border-gray-500 rounded-xl transition-all duration-200 hover:border-gray-300"
                        calendarClassName="border-0 shadow-xl rounded-xl overflow-hidden"
                        wrapperClassName="w-full"
                        showPopperArrow={false}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        yearDropdownItemNumber={10}
                        // popperModifiers removed to fix type error
                        popperPlacement="bottom-start"
                        popperClassName="!z-50"
                        // Prevent keyboard input
                        onKeyDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onChangeRaw={(e) => {
                          if (e) {
                            e.preventDefault();
                            if (e.type === "click") {
                              (e.target as HTMLInputElement).focus();
                            }
                          }
                        }}
                        renderCustomHeader={({
                          date,
                          changeYear,
                          changeMonth,
                          decreaseMonth,
                          increaseMonth,
                          prevMonthButtonDisabled,
                          nextMonthButtonDisabled,
                        }) => (
                          <div className="flex items-center justify-between px-4 py-2 bg-white">
                            <button
                              onClick={decreaseMonth}
                              disabled={prevMonthButtonDisabled}
                              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30"
                            >
                              <ArrowLeft className="w-4 h-4 text-gray-600" />
                            </button>

                            <div className="flex gap-2">
                              <select
                                value={date.getMonth()}
                                onChange={({ target: { value } }) =>
                                  changeMonth(parseInt(value))
                                }
                                className="text-sm font-medium text-gray-700 bg-transparent border-0 focus:ring-1 focus:ring-teal-500 rounded px-2 py-1"
                              >
                                {Array.from({ length: 12 }, (_, i) => (
                                  <option key={i} value={i}>
                                    {new Date(0, i).toLocaleString("default", {
                                      month: "long",
                                    })}
                                  </option>
                                ))}
                              </select>

                              <select
                                value={date.getFullYear()}
                                onChange={({ target: { value } }) =>
                                  changeYear(parseInt(value))
                                }
                                className="text-sm font-medium text-gray-700 bg-transparent border-0 focus:ring-1 focus:ring-teal-500 rounded px-2 py-1"
                              >
                                {Array.from({ length: 11 }, (_, i) => {
                                  const year = new Date().getFullYear() - 5 + i;
                                  return (
                                    <option key={year} value={year}>
                                      {year}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>

                            <button
                              onClick={increaseMonth}
                              disabled={nextMonthButtonDisabled}
                              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30"
                            >
                              <ArrowRight className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        )}
                      />
                      <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
                    </div>
                    {field.id === "end_date" && answers.start_date && (
                      <p className="mt-2 text-sm text-gray-500">
                        Can generate itinerary for up to 10 days after the start date.
                      </p>
                    )}
                  </div>
                ) : field.type === "multi-select" ? (
                  <div className="space-y-3">
                    {field.options?.map((option) => {
                      const currentAnswers = answers[
                        field.id as keyof TripAnswers
                      ] as string[] | undefined;
                      const isSelected =
                        currentAnswers?.includes(option.value) || false;

                      return (
                        <label
                          key={option.value}
                          className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? "border-blue-500 bg-blue-50/50 shadow-sm"
                              : "border-gray-200 hover:border-blue-200 hover:bg-blue-50/30"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() =>
                              handleMultiSelectAnswer(
                                field.id,
                                option.value,
                                field.max || 5
                              )
                            }
                            className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition-colors duration-200"
                          />
                          <div className="ml-3">
                            <span
                              className={`${
                                isSelected
                                  ? "text-blue-700 font-medium"
                                  : "text-gray-700"
                              }`}
                            >
                              {option.label}
                            </span>
                            {option.description && (
                              <p className="text-sm text-gray-500 mt-1">
                                {option.description}
                              </p>
                            )}
                          </div>
                        </label>
                      );
                    })}
                    <div className="mt-2 text-sm text-gray-500">
                      Selected:{" "}
                      {answers[field.id as keyof TripAnswers]
                        ? (answers[field.id as keyof TripAnswers] as string[])
                            .length
                        : 0}
                      {field.max && ` / ${field.max}`} item(s)
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {field.options?.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                          answers[field.id as keyof TripAnswers] ===
                          option.value
                            ? "border-blue-500 bg-blue-50/50 shadow-sm"
                            : "border-gray-200 hover:border-blue-200 hover:bg-blue-50/30"
                        }`}
                      >
                        <input
                          type="radio"
                          name={field.id}
                          value={option.value}
                          checked={
                            answers[field.id as keyof TripAnswers] ===
                            option.value
                          }
                          onChange={(e) =>
                            handleAnswer(field.id, e.target.value)
                          }
                          className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <div className="ml-3">
                          <span className="text-gray-700">{option.label}</span>
                          {option.description && (
                            <p className="text-sm text-gray-500 mt-1">
                              {option.description}
                            </p>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevGroup}
              disabled={currentGroupIndex === 0}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                currentGroupIndex === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md"
              }`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            <button
              onClick={nextGroup}
              disabled={isLoading}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                isLoading
                  ? "bg-blue-400 text-white cursor-not-allowed"
                  : "bg-gradient-to-br from-blue-600 to-teal-600 text-white hover:shadow-lg hover:scale-105"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Generating...
                </div>
              ) : (
                <>
                  {currentGroupIndex === questionGroups.length - 1
                    ? "Generate Itinerary"
                    : "Next"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-lg animate-fade-in">
              <p className="text-red-600">{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
