/* app.js - utilitários comuns: tema, i18n, notificações, storage */
const App = (function(){
  const LS_KEYS = {THEME:'meu_estudo_tema', LANG:'meu_estudo_lang', TASKS:'meu_estudo_tasks'};
  function setTheme(name){
    if(name === 'claro') document.body.classList.add('tema-claro');
    else document.body.classList.remove('tema-claro');
    localStorage.setItem(LS_KEYS.THEME, name);
  }
  function loadTheme(){
    const t = localStorage.getItem(LS_KEYS.THEME) || 'escuro';
    setTheme(t);
  }

  function setLang(lang){
    localStorage.setItem(LS_KEYS.LANG, lang);
    // simples i18n: atualiza atributos data-i18n se houver
    document.documentElement.lang = (lang === 'en') ? 'en' : 'pt-BR';
  }
  function loadLang(){
    const l = localStorage.getItem(LS_KEYS.LANG) || 'pt';
    setLang(l);
  }

  function notify(title, body){
    if(!("Notification" in window)) return;
    if(Notification.permission === "granted"){
      new Notification(title, {body});
    } else if(Notification.permission !== "denied"){
      Notification.requestPermission().then(p => { if(p === "granted") new Notification(title,{body}); });
    }
  }

  function saveTasks(tasks){
    localStorage.setItem(LS_KEYS.TASKS, JSON.stringify(tasks));
  }
  function loadTasks(){
    try { return JSON.parse(localStorage.getItem(LS_KEYS.TASKS) || "[]"); }
    catch(e){ return []; }
  }

  // Simula chamada para backend com limite de 3s (RNF02)
  function gerarPlanoIA(respostas){
    return new Promise((resolve) => {
      const delay = Math.min(2500, 500 + Math.random()*1500);
      setTimeout(()=>{
        // resposta simulada baseada em respostas
        resolve({
          horario: "18:00 – 20:00",
          materia: respostas.materia || "Matemática",
          metodo: (respostas.prefPausa === 'curta') ? "Pomodoro" : "Sessões longas",
          atividades: [
            "Revisão rápida 15min",
            "Exercícios práticos 60min",
            "Resumo e flashcards 30min"
          ]
        });
      }, delay);
    });
  }

  return {setTheme, loadTheme, setLang, loadLang, notify, saveTasks, loadTasks, gerarPlanoIA};
})();

/* Inicializa tema e idioma ao carregar qualquer página */
document.addEventListener('DOMContentLoaded', ()=>{
  App.loadTheme();
  App.loadLang();
});
