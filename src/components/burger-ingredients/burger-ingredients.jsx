import React from "react";
import {CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";

function TabIngredients() {
    const [current, setCurrent] = React.useState('one')
    return (
        <div style={{display: 'flex'}}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )
}

export const BurgerIngredients = () => {
    return <section className="main mr-10">
        <p className="text text-position text_type_main-large mt-10 mb-5">
            Соберите бургер
        </p>
        <TabIngredients/>
        <div className="ingredients-scroll">
            <div className='mt-10 mb-10'>
                <p className="text text-position text_type_main-medium">
                    Булки
                </p>
                <div className="buns mt-6 ml-4 mr-4">
                    <div>
                        <img src='https://avatarko.ru/img/kartinka/20/zhivotnye_igra_sobaka_19261.jpg' className="ingredient-image" alt='bun'/>
                        <div className="mt-1 mb-1 price-flex">
                            <p className="text text_type_digits-medium mr-2">
                                20
                            </p>
                            <CurrencyIcon type="primary"/>
                        </div>
                        <p className="text text_type_main-default">Краторная булка N-200i</p>
                    </div>
                    <div>
                        <img src='../../images/bun-02.png' className="ingredient-image" alt='bun'/>
                        <div className="mt-1 mb-1 price-flex">
                            <p className="text text_type_digits-medium mr-2">
                                20
                            </p>
                            <CurrencyIcon type="primary"/>
                        </div>
                        <p className="text text_type_main-default">Краторная булка N-200i</p>
                    </div>
                </div>
                <p className="text text-position text_type_main-medium mt-10">
                    Соусы
                </p>

                <div className="buns mt-6 ml-4 mr-4">
                    <div>
                        <img src='../../images/bun-02.png' className="ingredient-image" alt='bun'/>
                        <div className="mt-1 mb-1 price-flex">
                            <p className="text text_type_digits-medium mr-2">
                                20
                            </p>
                            <CurrencyIcon type="primary"/>
                        </div>
                        <p className="text text_type_main-default">Краторная булка N-200i</p>
                    </div>
                    <div>
                        <img src='../../images/bun-02.png' className="ingredient-image" alt='bun'/>
                        <div className="mt-1 mb-1 price-flex">
                            <p className="text text_type_digits-medium mr-2">
                                20
                            </p>
                            <CurrencyIcon type="primary"/>
                        </div>
                        <p className="text text_type_main-default">Краторная булка N-200i</p>
                    </div>
                    <div>
                        <img src='../../images/bun-02.png' className="ingredient-image" alt='bun'/>
                        <div className="mt-1 mb-1 price-flex">
                            <p className="text text_type_digits-medium mr-2">
                                20
                            </p>
                            <CurrencyIcon type="primary"/>
                        </div>
                        <p className="text text_type_main-default">Краторная булка N-200i</p>
                    </div>
                    <div>
                        <img src='../../images/bun-02.png' className="ingredient-image" alt='bun'/>
                        <div className="mt-1 mb-1 price-flex">
                            <p className="text text_type_digits-medium mr-2">
                                20
                            </p>
                            <CurrencyIcon type="primary"/>
                        </div>
                        <p className="text text_type_main-default">Краторная булка N-200i</p>
                    </div>
                    <div>
                        <img src='../../images/bun-02.png' className="ingredient-image" alt='bun'/>
                        <div className="mt-1 mb-1 price-flex">
                            <p className="text text_type_digits-medium mr-2">
                                20
                            </p>
                            <CurrencyIcon type="primary"/>
                        </div>
                        <p className="text text_type_main-default">Краторная булка N-200i</p>
                    </div>
                </div>

                <p className="text text-position text_type_main-medium mt-10">
                    Начинки
                </p>

                <div className="buns mt-6 ml-4 mr-4">
                    <div>
                        <img src='../../images/bun-02.png' className="ingredient-image" alt='bun'/>
                        <div className="mt-1 mb-1 price-flex">
                            <p className="text text_type_digits-medium mr-2">
                                20
                            </p>
                            <CurrencyIcon type="primary"/>
                        </div>
                        <p className="text text_type_main-default">Краторная булка N-200i</p>
                    </div>
                    <div>
                        <img src='../../images/bun-02.png' className="ingredient-image" alt='bun'/>
                        <div className="mt-1 mb-1 price-flex">
                            <p className="text text_type_digits-medium mr-2">
                                20
                            </p>
                            <CurrencyIcon type="primary"/>
                        </div>
                        <p className="text text_type_main-default">Краторная булка N-200i</p>
                    </div>
                    <div>
                        <img src='../../images/bun-02.png' className="ingredient-image" alt='bun'/>
                        <div className="mt-1 mb-1 price-flex">
                            <p className="text text_type_digits-medium mr-2">
                                20
                            </p>
                            <CurrencyIcon type="primary"/>
                        </div>
                        <p className="text text_type_main-default">Краторная булка N-200i</p>
                    </div>
                    <div>
                        <img src='../../images/bun-02.png' className="ingredient-image" alt='bun'/>
                        <div className="mt-1 mb-1 price-flex">
                            <p className="text text_type_digits-medium mr-2">
                                20
                            </p>
                            <CurrencyIcon type="primary"/>
                        </div>
                        <p className="text text_type_main-default">Краторная булка N-200i</p>
                    </div>
                    <div>
                        <img src='../../images/bun-02.png' className="ingredient-image" alt='bun'/>
                        <div className="mt-1 mb-1 price-flex">
                            <p className="text text_type_digits-medium mr-2">
                                20
                            </p>
                            <CurrencyIcon type="primary"/>
                        </div>
                        <p className="text text_type_main-default">Краторная булка N-200i</p>
                    </div>
                </div>
            </div>
        </div>

    </section>
}