import { Chart } from "react-google-charts";
import "./PieChartComponent.css";

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
        <div className={"pieChartContainer"}>
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
            />
        </div>

    );
}