const customLanguageDetector = {
  type: "languageDetector",
  async: true,
  detect: (callback) => {
    const path = window.location.pathname.split("/");
    const language = path[1] || "en"; // Default to 'en' if no language segment is found
    callback(language);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

export default customLanguageDetector;
