import {useParams} from "react-router";
import "./NotFoundComponent.css"

export function NotFoundComponent() {
    const {"*": splat} = useParams()
    console.log(splat)
    return <section>
        <h1>404</h1>
        <p>La page {splat} n'a pas été trouvée...</p>
    </section>
}