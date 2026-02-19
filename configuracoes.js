document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.tema-options .btn').forEach(b=>{
    b.addEventListener('click', ()=> {
      const tema = b.dataset.tema;
      App.setTheme(tema);
    });
  });

  document.getElementById('idiomaSelect').value = localStorage.getItem('meu_estudo_lang') || 'pt';
  document.getElementById('idiomaSelect').addEventListener('change', (e)=>{
    App.setLang(e.target.value);
    location.reload();
  });

  document.getElementById('ativarNotificacoes').addEventListener('click', ()=>{
    App.notify('Lembretes ativados', 'Você receberá notificações de estudo.');
  });
});
