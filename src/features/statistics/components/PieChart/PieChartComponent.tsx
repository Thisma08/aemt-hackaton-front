import { Chart } from "react-google-charts";

export function PieChartComponent() {
    const data = [
        ["Category", "Sum"],
        ["Loisirs", 100],
        ["Sorties", 200],
        ["Sports", 100]
    ];

    const options = {
        title: "Somme dépensée par catégorie",
    };
    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
        />
    );
}