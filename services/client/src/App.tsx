// import React, { useState } from "react";
// import { LineChart, Line, PieChart, Pie, Label } from "recharts";
// import "./App.css";
// import { Portfolio } from "./Portfolio";

// interface StockDto {
//   ticker: string;
// }

// interface StockFormModel {
//   ticker: string;
// }

// const initialStockFormData: StockFormModel = {
//   ticker: "",
// };

// function App() {
//   const [myStocks, setMyStocks] = useState<StockDto[]>([]);
//   const [stockForm, setStockForm] = useState<StockFormModel>(
//     initialStockFormData
//   );

//   const handleSubmit = (event: React.SyntheticEvent) => {
//     event.preventDefault();
//     myStocks.push({ ticker: stockForm.ticker });
//     setStockForm(initialStockFormData);
//   };

//   const handleStockDelete = (stockToDelete: StockDto) => {
//     const newStocks = myStocks.filter((stock) => {
//       return stock.ticker !== stockToDelete.ticker;
//     });

//     setMyStocks(newStocks);
//   };

//   const handleTickerChange = (newValue: string) => {
//     if (!/^(?:[A-Za-z]+|\d+)$/.test(newValue)) {
//       return;
//     }

//     setStockForm({
//       ...stockForm,
//       ticker: newValue.toUpperCase(),
//     });
//   };

//   const data01 = [
//     {
//       name: "Group A",
//       value: 400,
//     },
//     {
//       name: "Group B",
//       value: 300,
//     },
//     {
//       name: "Group C",
//       value: 300,
//     },
//     {
//       name: "Group D",
//       value: 200,
//     },
//     {
//       name: "Group E",
//       value: 278,
//     },
//     {
//       name: "Group F",
//       value: 189,
//     },
//   ];

//   return (
//     <div className="app">
//       <br />
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="stockName">Ticker</label>
//           <input
//             type="text"
//             id="stockName"
//             value={stockForm.ticker.toUpperCase()}
//             onChange={(e) => handleTickerChange(e.target.value)}
//             maxLength={4}
//           />
//         </div>
//       </form>
//       <hr />
//       {myStocks.length > 0 && (
//         <div>
//           My Stocks
//           <br />
//           <div>
//             {myStocks.map((stock) => {
//               return (
//                 <div key={stock.ticker} className="stock">
//                   <div>Ticker: {stock.ticker}</div>
//                   <button
//                     type="button"
//                     className="delete-button"
//                     onClick={() => handleStockDelete(stock)}
//                   >
//                     X
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//           <hr />
//           My Portfolio
//           <br />
//           {/* <PieChart width={730} height={250}>
//             <Label
//               value="Pages of my website"
//               offset={0}
//               position="insideBottom"
//             />
//             <Pie
//               data={data01}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               innerRadius={30}
//               fill="#8884d8"
//             />
//           </PieChart> */}
//           <Portfolio />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <PieChart width={400} height={400}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  );
}
