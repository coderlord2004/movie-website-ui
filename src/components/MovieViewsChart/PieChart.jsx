import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
    { name: "Completed", value: 40 }, // Phần đã hoàn thành (50%)
    { name: "Remaining", value: 60 }, // Phần chưa hoàn thành (50%)
];

const COLORS = ["#FF0000", "white"]; // Đỏ cho phần đã hoàn thành, Xám cho phần còn lại

const PieChartComponent = () => {
    return (
        <PieChart width={200} height={200}>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50} // Kích thước vòng tròn trắng bên trong
                outerRadius={80} // Kích thước vòng tròn đỏ bên ngoài
                fill="#fff"
                dataKey="value"
                stroke="none"
                startAngle={90}
                endAngle={-270}
                scale={-1}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
            </Pie>
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="20px">
                {data[0].value}%
            </text>
        </PieChart>
    );
};

export default PieChartComponent;
