// options.js
const LANGUAGE_CODES_TO_MESSAGES = {
  'en': 'lang_en_name',
  'es': 'lang_es_name',
  'fr': 'lang_fr_name',
  'de': 'lang_de_name',
  'it': 'lang_it_name',
  'pt': 'lang_pt_name',
  'ru': 'lang_ru_name',
  'zh-CN': 'lang_zh_CN_name',
  'ja': 'lang_ja_name',
  'ko': 'lang_ko_name',
  // ... добавьте другие языки по необходимости
};

document.addEventListener('DOMContentLoaded', initializeUI);

function initializeUI() {
  localizePage();
  populateLanguageDropdown();
  restoreOptions();
}

function localizePage() {
  // Устанавливаем локализованные тексты для элементов
  document.getElementById('pageTitle').textContent = chrome.i18n.getMessage('optionsTitle');
  document.getElementById('mainHeading').textContent = chrome.i18n.getMessage('optionsTitle');
  document.getElementById('languageLabelText').textContent = chrome.i18n.getMessage('languageLabel');
  document.getElementById('autoReloadText').textContent = chrome.i18n.getMessage('autoReloadLabel');
  document.getElementById('saveButton').textContent = chrome.i18n.getMessage('saveButton');
}

function populateLanguageDropdown() {
  const selectElement = document.getElementById('languageSelect');
  Object.entries(LANGUAGE_CODES_TO_MESSAGES).forEach(([code, messageKey]) => {
    const option = document.createElement('option');
    option.value = code;
    // Используем локализованное имя языка
    option.textContent = chrome.i18n.getMessage(messageKey) + ` (${code})`;
    selectElement.appendChild(option);
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    selectedLanguage: 'ru', // Значение по умолчанию
    autoReloadEnabled: true
  }, (items) => {
    document.getElementById('languageSelect').value = items.selectedLanguage;
    document.getElementById('autoReload').checked = items.autoReloadEnabled;
  });
}

function saveOptions() {
  const selectedLang = document.getElementById('languageSelect').value;
  const autoReload = document.getElementById('autoReload').checked;

  chrome.storage.sync.set(
    {
      selectedLanguage: selectedLang,
      autoReloadEnabled: autoReload
    },
    () => {
      const status = document.getElementById('status');
      status.textContent = chrome.i18n.getMessage('statusSaved');
      setTimeout(() => {
        status.textContent = '';
      }, 1500);
    }
  );
}