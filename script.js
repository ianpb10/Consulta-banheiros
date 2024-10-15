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
  } else if (!busLines[line]) {
    resultDiv.innerHTML = '<span class="text-warning">Linha não cadastrada no sistema.</span>';
  } else {
    const result = busLines[line];
    resultDiv.innerHTML = `<strong>Endereço:</strong> ${result.address}<br><strong>Estabelecimento:</strong> ${result.establishment}`;
  }
}
