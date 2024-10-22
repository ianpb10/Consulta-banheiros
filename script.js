let busLines = {}; 

const searchButton = document.querySelector('button');
searchButton.disabled = true;

fetch('https://script.google.com/macros/s/AKfycbyKnb-cnU1iJv-RUXuxbQARn4tdbiE3j7uC-E5ssHvgqWYc5PbHrMa6uBmhhQ6R773U/exec')
  .then(response => response.json())
  .then(data => {
    // Log data to ensure it's being fetched correctly
    console.log('Fetched data:', data);

    // Populate the busLines object
    data.forEach(item => {
      if (!busLines[item.linha]) {
        busLines[item.linha] = [];
      }
      busLines[item.linha].push({
        address: item.endereco,
        establishment: item.estabelecimento
      });
    });

    // Enable the search button after loading data
    searchButton.disabled = false;
  })
  .catch(error => {
    console.error('Erro ao carregar as linhas:', error);
  });

function searchLine() {
  const line = document.getElementById('busLine').value.trim();
  const resultDiv = document.getElementById('result');

  // Clear previous results
  resultDiv.innerHTML = '';

  if (line === "") {
    resultDiv.innerHTML = '<span class="text-danger">Por favor, digite o número da linha.</span>';
    return;
  }

  const results = busLines[line];

  if (!results || results.length === 0) {
    resultDiv.innerHTML = '<span class="text-warning">Linha não cadastrada no sistema.</span>';
  } else {
    let output = `<strong>Resultados para a linha ${line}:</strong><br>`;
    results.forEach((result, index) => {
      output += `<strong>Local ${index + 1}:</strong> Endereço: ${result.address}, Estabelecimento: ${result.establishment}<br>`;
    });
    resultDiv.innerHTML = output;
  }
}

// Unregister any service workers to avoid caching issues (optional)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}
