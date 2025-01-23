import "./HomeComponent.css"

export function HomeComponent(){
    return <>
        <div className={"titleContainer"}>
            <img src={"tibiscuit.png"} alt={"tibiscuit"}/>
            <h1>Bienvenue sur Christmas Wallet!</h1>
            <img src={"tibiscuit.png"} alt={"tibiscuit"}/>
        </div>

        <div className={"walletImageContainer"}>
            <img className={"walletImage"} src={"wallet.png"} alt={"wallet"}/>
        </div>

        <div className={"descContainer"}>
            <div className={"desc"}>
                Dans cette application de gestion de budget mensuel, vous pouvez fixer vous-même vos propres budgets
                mensuels et garder un oeil sur les transactions que vous faites, ainsi que consulter des statistiques sur
                chaque budget!
            </div>
            <br/>
            <span className={"merryChristmas"}>Joyeux Noël!</span>
        </div>
    </>
}