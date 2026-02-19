document.addEventListener('DOMContentLoaded', ()=>{
  const filtro = document.getElementById('filtroMateria');
  const dicas = Array.from(document.querySelectorAll('.dica'));
  filtro.addEventListener('change', ()=>{
    const val = filtro.value;
    dicas.forEach(d=>{
      if(!val || d.dataset.materia === val) d.style.display = '';
      else d.style.display = 'none';
    });
  });
});
