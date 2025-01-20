import {useParams} from "react-router";

export function NotFoundComponent() {
    const {"*": splat} = useParams()
    console.log(splat)
    return <section>
        Not found...
    </section>
}