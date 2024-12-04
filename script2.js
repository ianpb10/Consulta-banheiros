let busSchedules = [];

fetch('https://script.google.com/macros/s/AKfycbxIl2wwZ0jHEbpWi04fjiIrRJNil-Tb7m1fk_PHsrdmCnLKVe2IAPdhj3SRyRIxFgYs/exec') 
  .then(response => response.json())
  .then(data => {
    // Verifica os dados recebidos
    console.log('Dados recebidos:', data);

    // Atualiza o array de horários
    busSchedules = data;

    // Popula a tabela
    populateTable();
  })
  .catch(error => {
    console.error('Erro ao carregar os dados:', error);
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<span class="text-danger">Erro ao carregar os dados. Tente novamente mais tarde.</span>';
  });

function populateTable() {
  const tableBody = document.getElementById('scheduleTableBody');

  // Limpa a tabela antes de preenchê-la
  tableBody.innerHTML = '';

  // Adiciona as linhas à tabela
  busSchedules.forEach(schedule => {
    const row = document.createElement('tr');

    // Cria as células
    const lineCell = document.createElement('td');
    lineCell.textContent = schedule.linha;

    const dateCell = document.createElement('td');
    dateCell.textContent = schedule.dataAlteracao;

    const dayTypeCell = document.createElement('td');
    dayTypeCell.textContent = schedule.tipoDia;

    // Adiciona as células à linha
    row.appendChild(lineCell);
    row.appendChild(dateCell);
    row.appendChild(dayTypeCell);

    // Adiciona a linha ao corpo da tabela
    tableBody.appendChild(row);
  });
}