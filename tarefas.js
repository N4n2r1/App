document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('formTarefa');
  const lista = document.getElementById('listaTarefas');
  const limparBtn = document.getElementById('limparBtn');

  let tasks = App.loadTasks(); // array de objetos {id, descricao, materia, data, concluido}

  function render(){
    lista.innerHTML = '';
    tasks.sort((a,b)=> new Date(a.data) - new Date(b.data));
    tasks.forEach(t=>{
      const li = document.createElement('li');
      li.innerHTML = `
        <div>
          <input type="checkbox" ${t.concluido ? 'checked' : ''} aria-label="Marcar tarefa">
          <strong>${t.descricao}</strong>
          <div class="muted">${t.materia} • ${t.data}</div>
        </div>
        <div>
          <button class="btn small edit">Editar</button>
          <button class="btn small danger delete">Excluir</button>
        </div>
      `;
      // eventos
      li.querySelector('input[type=checkbox]').addEventListener('change', (e)=>{
        t.concluido = e.target.checked;
        App.saveTasks(tasks);
      });
      li.querySelector('.delete').addEventListener('click', ()=>{
        tasks = tasks.filter(x=>x.id !== t.id);
        App.saveTasks(tasks);
        render();
      });
      li.querySelector('.edit').addEventListener('click', ()=>{
        document.getElementById('tDescricao').value = t.descricao;
        document.getElementById('tMateria').value = t.materia;
        document.getElementById('tData').value = t.data;
        // remove item antigo
        tasks = tasks.filter(x=>x.id !== t.id);
        App.saveTasks(tasks);
        render();
      });
      lista.appendChild(li);
    });
  }

  form.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    const desc = document.getElementById('tDescricao').value.trim();
    const mat = document.getElementById('tMateria').value.trim() || 'Geral';
    const data = document.getElementById('tData').value;
    if(!desc || !data) return;
    const novo = {id: Date.now(), descricao: desc, materia: mat, data, concluido:false};
    tasks.push(novo);
    App.saveTasks(tasks);
    render();
    form.reset();
    App.notify('Tarefa adicionada', `${desc} em ${data}`);
  });

  limparBtn.addEventListener('click', ()=> form.reset());

  render();
});
