document.addEventListener('DOMContentLoaded', ()=>{
  const gerarBtn = document.getElementById('gerarPlanoBtn');
  const resultado = document.getElementById('planoResultado');
  const resumoTarefas = document.getElementById('resumo-tarefas');
  const resumoDesempenho = document.getElementById('resumo-desempenho');

  // Carrega contagem de tarefas do storage
  const tasks = App.loadTasks();
  resumoTarefas.querySelector('strong').textContent = tasks.length;

  gerarBtn.addEventListener('click', async ()=>{
    gerarBtn.disabled = true;
    gerarBtn.textContent = 'Gerando plano…';
    // Simula coleta de respostas iniciais (RF01)
    const respostas = {materia: 'Matemática', prefPausa: 'curta'};
    const plano = await App.gerarPlanoIA(respostas);
    resultado.innerHTML = `
      <p><strong>Horário:</strong> ${plano.horario}</p>
      <p><strong>Matéria:</strong> ${plano.materia}</p>
      <p><strong>Método:</strong> ${plano.metodo}</p>
      <p><strong>Atividades:</strong></p>
      <ol>${plano.atividades.map(a=>`<li>${a}</li>`).join('')}</ol>
    `;
    gerarBtn.disabled = false;
    gerarBtn.textContent = 'Gerar plano personalizado';
    App.notify('Plano gerado', `Plano para ${plano.materia} pronto.`);
    resumoDesempenho.querySelector('strong').textContent = 'Nenhuma sessão registrada';
  });
});
