// Pré-cadastro das linhas de ônibus (assumindo que o arquivo busLines.json existe)
let busLines = {};

// Desativa o botão até o carregamento do JSON
document.querySelector('button').disabled = true;

// Carrega o arquivo JSON
fetch('busLines.json')
  .then(response => response.json())
  .then(data => {
    busLines = data;
    document.querySelector('button').disabled = false;
  });

function searchLine() {
  const line = document.getElementById('busLine').value.trim();
  const resultDiv = document.getElementById('result');

  if (line === "") {
    resultDiv.innerHTML = '<span class="text-danger">Por favor, digite o número da linha.</span>';
    return;
  }

  const results = busLines[line]; // Recebe o array de resultados

  if (!results) {
    resultDiv.innerHTML = '<span class="text-warning">Linha não cadastrada no sistema.</span>';
  } else {
    let output = `<strong>Resultados para a linha ${line}:</strong><br>`;
    results.forEach((result, index) => {
      output += `<strong>Local ${index + 1}:</strong> Endereço: ${result.address}, Estabelecimento: ${result.establishment}<br>`;
    });
    resultDiv.innerHTML = output;
  }
}
