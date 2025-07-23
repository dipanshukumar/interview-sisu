import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import FormComponent from "../components/formComponent.jsx";

const Home = () => {
  const { t, i18n } = useTranslation();
  const [questions, setQuestions] = useState(null);
  useEffect(() => {
    fetch("survey.json")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.survey.questions);
      });
  }, []);
  return (
    <>
      <h3 aria-live="polite" aria-atomic="true">
        {t("Home page")}
      </h3>
      <h1 aria-live="polite" aria-atomic="true">
        {t("Welcome to React")}
      </h1>
      <div className="button-wrapper">
        <button onClick={() => i18n.changeLanguage("en")}>English</button>
        <button onClick={() => i18n.changeLanguage("hi")}>Hindi</button>
      </div>
      <FormComponent questions={questions} />
    </>
  );
};

export default Home;
