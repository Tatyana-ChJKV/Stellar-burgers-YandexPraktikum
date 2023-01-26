import {ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const BurgerConstructor = () => {
    return <section className="main">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <ConstructorElement
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={200}
                // thumbnail={img}
            />
            <div className="ingredients-scroll constructor-scroll">
            <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={50}
                // thumbnail={img}
            />
                <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    // thumbnail={img}
                />
                <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    // thumbnail={img}
                />
                <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    // thumbnail={img}
                />
            </div>
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text="Краторная булка N-200i (низ)"
                price={200}
                // thumbnail={img}
            />
        </div>
    </section>
}