document.addEventListener('DOMContentLoaded', ()=>{
  const grid = document.getElementById('calendarGrid');
  const monthLabel = document.getElementById('monthLabel');
  const detalhe = document.getElementById('diaDetalhe');

  let current = new Date();
  function renderCalendar(date){
    grid.innerHTML = '';
    const year = date.getFullYear();
    const month = date.getMonth();
    monthLabel.textContent = date.toLocaleString('pt-BR',{month:'long', year:'numeric'});

    const first = new Date(year, month, 1);
    const last = new Date(year, month+1, 0);
    const startDay = first.getDay(); // 0..6
    const total = last.getDate();

    // Preenche dias vazios
    for(let i=0;i<startDay;i++){
      const empty = document.createElement('div');
      empty.className = 'dia';
      grid.appendChild(empty);
    }
    for(let d=1; d<=total; d++){
      const cell = document.createElement('button');
      cell.className = 'dia';
      cell.setAttribute('role','gridcell');
      cell.textContent = d;
      const today = new Date();
      if(d === today.getDate() && month === today.getMonth() && year === today.getFullYear()){
        cell.classList.add('hoje');
      }
      cell.addEventListener('click', ()=> showDayDetail(year, month, d));
      grid.appendChild(cell);
    }
  }

  function showDayDetail(y,m,d){
    // Simula leitura de desempenho (poderia vir do backend)
    detalhe.innerHTML = `<h4>Dia ${d}</h4>
      <p>Horas estudadas: <strong>${Math.floor(Math.random()*3)}</strong></p>
      <p>Status: <strong>Concluído</strong></p>`;
  }

  document.getElementById('prevMonth').addEventListener('click', ()=>{
    current.setMonth(current.getMonth()-1);
    renderCalendar(current);
  });
  document.getElementById('nextMonth').addEventListener('click', ()=>{
    current.setMonth(current.getMonth()+1);
    renderCalendar(current);
  });

  renderCalendar(current);
});
