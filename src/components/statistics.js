import AbstractSmartComponent from "./abstract-smart-component.js";
import Chart from "chart.js";
import chartjsPluginDatalabes from "chartjs-plugin-datalabels";
import moment from "moment";

const LegendName = {
  MONEY: `MONEY`,
  TRANSPORT: `TRANSPORT`,
  TIME: `TIME`
};

const LabelPrefix = {
  EURO: `€`,
  TIMES: `x`,
  HOURS: `h`
};

const generateChartsData = (cards) => {
  const moneyStatistics = {};
  const transportStatistics = {
    taxi: 0,
    bus: 0,
    train: 0,
    ship: 0,
    transport: 0,
    drive: 0
  };
  const timeStatictics = {};

  cards.forEach((card) => {
    if (card.type in moneyStatistics) {
      moneyStatistics[card.type] += Number(card.price);
    } else {
      moneyStatistics[card.type] = Number(card.price);
    }

    if (card.type in transportStatistics) {
      transportStatistics[card.type] += 1;
    }

    if (card.type in timeStatictics) {
      timeStatictics[card.type] += card.endDate - card.startDate;
    } else {
      timeStatictics[card.type] = card.endDate - card.startDate;
    }
  });

  const moneyData = Object.entries(moneyStatistics).sort((a, b) => b[1] - a[1]);

  const transportData = Object.entries(transportStatistics)
  .sort((a, b) => b[1] - a[1])
  .filter((item) => item[1] !== 0);

  const timeData = Object.entries(timeStatictics)
  .sort((a, b) => b[1] - a[1])
  .map((item) => {
    return [
      item[0],
      Math.round(moment.duration(item[1], `milliseconds`).asHours())
    ];
  })
  .filter((item) => item[1] !== 0);

  return {
    moneyData,
    transportData,
    timeData
  };
};

const renderChart = (ctx, data, label, legend, isLabelPositonLeft = false) => {
  return new Chart(ctx, {
    type: `horizontalBar`,
    plugins: [chartjsPluginDatalabes],
    data: {
      labels: data.map((item) => item[0].toUpperCase()),
      datasets: [
        {
          label: legend.toUpperCase(),
          data: data.map((item) => item[1]),
          backgroundColor: `lightgray`,
          borderColor: `gray`,
          borderWidth: 1,
          barThickness: 30,
          barPercentage: 1.0
        }
      ]
    },
    options: {
      responsive: false,
      aspectRatio: 2.2,
      legend: {
        position: `left`,
        labels: {
          fontSize: 18,
          fontStyle: `bold`
        }
      },
      tooltips: {
        mode: `nearest`,
        titleAlign: `left`
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false
            },
            ticks: {
              beginAtZero: true
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: false
            }
          }
        ]
      },
      plugins: {
        datalabels: {
          labels: {
            title: {
              font: {
                weight: `bold`,
                size: 16
              }
            }
          },
          anchor: `end`,
          align: `left`,
          formatter(value) {
            return isLabelPositonLeft ? `${label}${value}` : `${value}${label}`;
          }
        }
      }
    }
  });
};

export default class Statistics extends AbstractSmartComponent {
  constructor(cardsModel) {
    super();

    this._cardsModel = cardsModel;
    this._moneyChart = null;
    this._transportChart = null;
    this._timeChart = null;

    this._renderCharts();
  }

  getTemplate() {
    return `<section class="statistics">
              <h2 class="visually-hidden">Trip statistics</h2>

              <div class="statistics__item statistics__item--money">
                <canvas
                  class="statistics__chart  statistics__chart--money"
                  width="900"
                ></canvas>
              </div>

              <div class="statistics__item statistics__item--transport">
                <canvas
                  class="statistics__chart  statistics__chart--transport"
                  width="900"
                ></canvas>
              </div>

              <div class="statistics__item statistics__item--time-spend">
                <canvas
                  class="statistics__chart  statistics__chart--time"
                  width="900"
                ></canvas>
              </div>
          </section>
    `;
  }

  _renderCharts() {
    const element = this.getElement();

    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    const timeCtx = element.querySelector(`.statistics__chart--time`);

    this._resetCharts();

    const {moneyData, transportData, timeData} = generateChartsData(
        this._cardsModel.getCards()
    );

    this._moneyChart = renderChart(
        moneyCtx,
        moneyData,
        LabelPrefix.EURO,
        LegendName.MONEY,
        true
    );
    this._transportChart = renderChart(
        transportCtx,
        transportData,
        LabelPrefix.TIMES,
        LegendName.TRANSPORT
    );
    this._timeChart = renderChart(
        timeCtx,
        timeData,
        LabelPrefix.HOURS,
        LegendName.TIME
    );
  }

  rerender() {
    super.rerender();
    this._renderCharts();
  }

  _resetCharts() {
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = null;
    }

    if (this._transportChart) {
      this._transportChart.destroy();
      this._transportChart = null;
    }

    if (this._colorsChart) {
      this._colorsChart.destroy();
      this._colorsChart = null;
    }
  }

  show() {
    super.show();

    this.rerender();
  }

  recoveryListeners() {
  }
}
