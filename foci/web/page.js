(() => {
  const search = document.querySelector('#player-search');
  const team = document.querySelector('#team-filter');
  const rows = [...document.querySelectorAll('.scorers tbody tr')];
  const status = document.querySelector('#filter-status');
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const teams = [...new Set(rows.map(row => row.cells[2].textContent))].sort((a, b) => a.localeCompare(b));
  for (const name of teams) team.add(new Option(name, name));
  const filter = () => {
    const query = normalize(search.value);
    let visible = 0;
    for (const row of rows) {
      row.hidden = !(normalize(row.cells[1].textContent).includes(query) && (!team.value || row.cells[2].textContent === team.value));
      if (!row.hidden) visible++;
    }
    status.textContent = `${rows.length} játékosból ${visible} látható`;
    document.querySelector('#empty').hidden = visible !== 0;
  };
  search.addEventListener('input', filter);
  team.addEventListener('change', filter);
  document.querySelector('#reset').addEventListener('click', () => {
    search.value = '';
    team.value = '';
    filter();
    search.focus();
  });
  document.querySelector('.filters').hidden = false;
  status.hidden = false;
  filter();
})();
