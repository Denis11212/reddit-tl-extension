// content.js
(async function() {
  try {
    const settings = await new Promise((resolve) => {
      chrome.storage.sync.get({
        selectedLanguage: 'ru',
        autoReloadEnabled: true
      }, resolve);
    });

    const { selectedLanguage, autoReloadEnabled } = settings;

    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('tl') || urlParams.get('tl') !== selectedLanguage) {
      const urlObj = new URL(window.location.href);
      urlObj.searchParams.set('tl', selectedLanguage);

      if (autoReloadEnabled) {
        window.location.assign(urlObj.toString());
      } else {
        // Используем локализованное сообщение с placeholder'ом
        const confirmMessage = chrome.i18n.getMessage('confirmAddTl', selectedLanguage);
        if (confirm(confirmMessage)) {
          window.location.assign(urlObj.toString());
        }
      }
    } else {
      // Логирование также локализуется
      console.log(chrome.i18n.getMessage('consoleLogTlPresent', selectedLanguage));
    }
  } catch (e) {
    console.warn("Не удалось получить настройки из storage:", e);
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('tl') || urlParams.get('tl') !== 'ru') {
      const urlObj = new URL(window.location.href);
      urlObj.searchParams.set('tl', 'ru');
      if (confirm(chrome.i18n.getMessage('confirmErrorDefault'))) {
         window.location.assign(urlObj.toString());
      }
    }
  }
})();