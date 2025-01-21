import {useParams} from "react-router";

export default function ModifyBudgetComponent() {
    const {"id": splat} = useParams()
    console.log(splat)
    return <>
    </>
}