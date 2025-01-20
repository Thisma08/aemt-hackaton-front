import {ComponentType, lazy, Suspense} from "react";

interface Props {
    importFn: () => Promise<{default: ComponentType<any>}>;
}

export function SuspenseWrapper({importFn}: Props){
    const LazyComponent = lazy(() => importFn());

    return <Suspense>
        <LazyComponent/>
    </Suspense>
}