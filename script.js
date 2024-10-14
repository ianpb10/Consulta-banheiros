// Pré-cadastro das linhas de ônibus (assuming busLines.json exists)
let busLines = {};

// Carrega o arquivo JSON
fetch('busLines.json')
  .then(response => response.json())
  .then(data => busLines = data);

function searchLine() {
  const line = document.getElementById('busLine').value.trim(); // Remove espaços em branco
  const result = busLines[line]; // Busca a linha no objeto

  if (line === "") {
    document.getElementById('result').innerHTML = 'Por favor, digite o número da linha.';
  } else if (!result) {
    document.getElementById('result').innerHTML = 'Linha não cadastrada no sistema.';
  } else {
    document.getElementById('result').innerHTML = `Endereço: ${result.address}<br>Estabelecimento: ${result.establishment}`;
  }
}