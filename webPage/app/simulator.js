// Dados médios baseados em fontes como o SEBRAE e Embrapa
// Fonte referência: SEBRAE (https://www.sebrae.com.br/), Embrapa (https://www.embrapa.br/)

function calcularReceitaLucro() {
    const canteiros = Number(document.getElementById("ipt_quant_canteiros").value);
    const mudasPorCanteiro = Number(document.getElementById("ipt_quant_mudas").value);
    const diasSafra = Number(document.getElementById("ipt_duracao_safra").value);
    const precoMorango = Number(document.getElementById("ipt_preco_morango").value);
  
    if (!canteiros || !mudasPorCanteiro || !diasSafra || !precoMorango) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }
  
    const totalMudas = canteiros * mudasPorCanteiro;
    const produtividadeMediaKg = 0.5; // cada muda produz cerca de 0.5kg por safra
    const producaoTotalKg = totalMudas * produtividadeMediaKg;
  
    const receitaIdeal = producaoTotalKg * precoMorango;
  
    const receitaEstresse = receitaIdeal * 0.7;
    const receitaEncharcamento = receitaIdeal * 0.75;
  
    const receitaComSensorEstresse = receitaIdeal * 0.85;
    const receitaComSensorEncharcamento = receitaIdeal * 0.9;
  
    const texto_tela = document.getElementById("texto_tela");
    texto_tela.innerHTML = `
      <h3>📊 Resultados da simulação:</h3>
      <p>⏰ Duração da safra: <b>${diasSafra} dias</b></p>
      <p>🌱 Canteiros: <b>${canteiros}</b> | 🌿 Mudas por canteiro: <b>${mudasPorCanteiro}</b> | Total de mudas: <b>${totalMudas}</b></p>
      <p>💰 Preço de venda por kg: <b>R$${precoMorango.toFixed(2)}</b></p>
      <p>📦 Produção estimada: <b>${producaoTotalKg.toFixed(2)} kg</b></p>
      <hr>
      <p><b>❌ Sem sensor:</b><br>
        Estresse hídrico: <b>R$${receitaEstresse.toFixed(2)}</b><br>
        Encharcamento: <b>R$${receitaEncharcamento.toFixed(2)}</b>
      </p>
      <p><b>✅ Com sensor:</b><br>
        Estresse hídrico: <b>R$${receitaComSensorEstresse.toFixed(2)}</b><br>
        Encharcamento: <b>R$${receitaComSensorEncharcamento.toFixed(2)}</b>
      </p>
      <canvas id="grafico" style="max-width: 100%; margin-top: 20px;"></canvas>
    `;
  
    gerarGrafico(
      receitaEstresse,
      receitaEncharcamento,
      receitaComSensorEstresse,
      receitaComSensorEncharcamento
    );
  }
  
  function gerarGrafico(estresse, encharcamento, sensorEstresse, sensorEncharcamento) {
    const ctx = document.getElementById("grafico").getContext("2d");
  
    if (window.myChart instanceof Chart) {
      window.myChart.destroy();
    }
  
    window.myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Estresse Hídrico (sem sensor)",
          "Encharcamento (sem sensor)",
          "Estresse Hídrico (com sensor)",
          "Encharcamento (com sensor)",
        ],
        datasets: [
          {
            label: "Receita (R$)",
            data: [
              estresse,
              encharcamento,
              sensorEstresse,
              sensorEncharcamento,
            ],
            backgroundColor: [
              "#ff5c5c",
              "#ff914d",
              "#4caf50",
              "#2196f3",
            ],
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `R$${context.raw.toFixed(2)}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return `R$${value}`;
              },
            },
          },
        },
      },
    });
  }  