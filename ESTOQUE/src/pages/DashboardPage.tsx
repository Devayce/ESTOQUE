import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getStockMovements } from '../services/stockService';
import { StockMovement } from '../types/StockMovement';

interface ChartData {
  month: string;
  entradas: number;
  saidas: number;
  totalVendas: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-recharts-tooltip">
        <p className="recharts-label">{`${label}`}</p>
        {payload.map((pld: any) => (
          <div key={pld.dataKey} className={`custom-tooltip-item ${pld.dataKey === 'saidas' ? 'tooltip-saidas' : 'tooltip-entradas'}`}>
            {pld.dataKey === 'saidas' ?
              (
                <>
                  <span>{`Quantidade de Saídas: ${pld.value}`}</span><br/>
                  <span>{`Total de Vendas: R$ ${data.totalVendas.toFixed(2)}`}</span>
                </>
              ) :
              <span>{`Quantidade de Entradas: ${pld.value}`}</span>
            }
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const DashboardPage = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    (async () => {
      const movements = await getStockMovements();
      const dataByMonth: { [key: string]: Omit<ChartData, 'month'> } = {};

      movements.forEach((movement: StockMovement) => {
      const month = new Date(movement.date).toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
      if (!dataByMonth[month]) {
        dataByMonth[month] = { entradas: 0, saidas: 0, totalVendas: 0 };
      }

      if (movement.type === 'entry') {
        dataByMonth[month].entradas += movement.quantity;
      } else {
        dataByMonth[month].saidas += movement.quantity;
        dataByMonth[month].totalVendas += movement.quantity * movement.unitPrice;
      }
    });

    const monthOrder = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

    const formattedData: ChartData[] = Object.keys(dataByMonth).map((month) => ({
      month,
      ...dataByMonth[month],
    })).sort((a, b) => {
      const [monthA, yearA] = a.month.split(' de ');
      const [monthB, yearB] = b.month.split(' de ');
      if (yearA !== yearB) return Number(yearA) - Number(yearB);
      return monthOrder.indexOf(monthA.toLowerCase()) - monthOrder.indexOf(monthB.toLowerCase());
    });

    setChartData(formattedData);
    })();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" orientation="left" stroke="#808080" />
          <YAxis yAxisId="right" orientation="right" stroke="#1E5631" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar yAxisId="left" dataKey="entradas" fill="#808080" name="Entradas (Qtd)" />
          <Bar yAxisId="right" dataKey="saidas" fill="#1E5631" name="Saídas (Qtd)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardPage;