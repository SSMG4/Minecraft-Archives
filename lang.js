<script>
const defaultLang = 'en';

function loadLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[key]) el.textContent = data[key];
      });

      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (data[key]) el.setAttribute('placeholder', data[key]);
      });
    });
}

// Language Selector
document.getElementById('languageSelector').addEventListener('change', function () {
  const selectedLang = this.value;
  localStorage.setItem('lang', selectedLang);
  loadLanguage(selectedLang);
});

// Detect language or fallback to saved/default
window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang');
  const browserLang = navigator.language.slice(0, 2);
  const chosenLang = savedLang || (['en', 'fr', 'es', 'ja', 'ru'].includes(browserLang) ? browserLang : defaultLang);
  document.getElementById('languageSelector').value = chosenLang;
  loadLanguage(chosenLang);
});
</script>
