const affiliateIds = {
  'com': '',
  'ca': '',
  'nl': '',
  'sg': '',
  'cn': '',
  'se': '',
  'co.jp': '',
  'co.uk': '',
  'com.br': '',
  'com.mx': '',
  'com.au': '',
  'com.be': '',
  'de': '',
  'es': '',
  'fr': '',
  'in': '',
  'it': '',
  'pl': '',
  'eg': '',
  'ae': '',
  'sa': '',
  'com.tr': '',
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "selection",
    title: chrome.i18n.getMessage("contextMenuTitle"),
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.storage.sync.get({
    countrySetting: 'com'
  }, function (items) {
    const selectedCountryCode = items.countrySetting;
    const affiliateId = affiliateIds[selectedCountryCode];
    const newTab = `https://www.amazon.` + selectedCountryCode + `/s?k=` + encodeURIComponent(info.selectionText) + '&tag=' + affiliateId + ``;
    if (info.menuItemId === "selection") {
      chrome.tabs.create({ url: newTab });
    }
  });
});

chrome.omnibox.onInputEntered.addListener(
  function (text) {
    chrome.storage.sync.get({
      countrySetting: 'com'
    }, function (items) {
      const selectedCountryCode = items.countrySetting;
      const affiliateId = affiliateIds[selectedCountryCode];
      let newTab = `https://www.amazon.${selectedCountryCode}/s?k=${encodeURIComponent(text)}&tag=${affiliateId}&ref=omnibox`;
      chrome.tabs.create({ url: newTab });
    });
  }
);
