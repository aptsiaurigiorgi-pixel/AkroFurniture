import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function I18nTestComponent() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  console.log("Current i18n instance:", i18n);
  console.log("Current language:", i18n.language);
  console.log("Available resources:", i18n.options.resources);

  const handleButtonClick = (e, langCode) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Button clicked!", langCode);
    console.log("Event details:", e);
    changeLanguage(langCode);
  };

  const changeLanguage = (langCode) => {
    console.log("=== CHANGE LANGUAGE CALLED ===");
    console.log("Current language before:", i18n.language);
    console.log("Attempting to change to:", langCode);

    i18n
      .changeLanguage(langCode)
      .then(() => {
        console.log("Language changed successfully!");
        console.log("New language:", i18n.language);
        setLanguage(i18n.language);
      })
      .catch((error) => {
        console.error("Error changing language:", error);
      });
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        margin: "20px auto",
        maxWidth: "600px",
        textAlign: "center",
      }}
    >
      <h2>I18n Library Test Component</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        This component tests if the i18n library is working correctly
      </p>

      <div style={{ marginBottom: "20px" }}>
        <h3>
          Current Language:{" "}
          <span style={{ color: "#667eea" }}>{language.toUpperCase()}</span>
        </h3>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4>Test Translations:</h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <p>
            <strong>Navbar:</strong> {t("navbar.home")} |{" "}
            {t("navbar.collection")} | {t("navbar.products")}
          </p>
          <p>
            <strong>Hero:</strong> {t("hero.title")}
          </p>
          <p>
            <strong>Cart:</strong> {t("cart.title")}
          </p>
          <p>
            <strong>Login:</strong> {t("login.title")}
          </p>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4>Change Language:</h4>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <button
            onClick={(e) => handleButtonClick(e, "en")}
            style={{
              padding: "8px 16px",
              backgroundColor: language === "en" ? "#667eea" : "#f0f0f0",
              color: language === "en" ? "white" : "black",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            English
          </button>
          <button
            onClick={(e) => handleButtonClick(e, "ru")}
            style={{
              padding: "8px 16px",
              backgroundColor: language === "ru" ? "#667eea" : "#f0f0f0",
              color: language === "ru" ? "white" : "black",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Русский
          </button>
          <button
            onClick={(e) => handleButtonClick(e, "ka")}
            style={{
              padding: "8px 16px",
              backgroundColor: language === "ka" ? "#667eea" : "#f0f0f0",
              color: language === "ka" ? "white" : "black",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ქართული
          </button>
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f8f8f8",
          borderRadius: "4px",
        }}
      >
        <h4>Debug Information:</h4>
        <pre style={{ textAlign: "left", fontSize: "12px", overflowX: "auto" }}>
          {`i18n.language: ${i18n.language}
i18n.options.lng: ${i18n.options.lng}
i18n.options.fallbackLng: ${i18n.options.fallbackLng}
Available languages: ${Object.keys(i18n.options.resources).join(", ")}
`}
        </pre>
      </div>
    </div>
  );
}

export default I18nTestComponent;
