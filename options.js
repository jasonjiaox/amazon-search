function localize() {
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        elem.textContent = chrome.i18n.getMessage(elem.getAttribute('data-i18n'));
    });
}

function save_options() {
    const setting = document.getElementById('setting').value;
    const status = document.getElementById('status');

    chrome.storage.sync.set({ countrySetting: setting }, () => {
        status.textContent = chrome.i18n.getMessage('settingsSaved');
        status.style.color = 'green';
        status.style.fontWeight = 'bold';
        setTimeout(() => {
            status.textContent = '';
        }, 3000);
    });
}

function restore_options() {
    chrome.storage.sync.get({ countrySetting: 'com' }, (items) => {
        document.getElementById('setting').value = items.countrySetting;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    localize();
    restore_options();
});
document.getElementById('save').addEventListener('click', save_options);
