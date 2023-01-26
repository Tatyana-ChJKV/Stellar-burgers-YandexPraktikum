import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const AppHeader = () => {
    return <header className="header-bar">
        <div className="header">
        <div className="header-elements">
         <div className="header-element header-element-constructor pl-5 mt-4 mb-4">
            <BurgerIcon className="" type="primary" />
            <p className="text text_type_main-default ml-2">Конструктор</p>
         </div>

        <div className="header-element header-element-orders pl-5 ml-2 mt-4 mb-4">
            <ListIcon type="secondary" />
            <p className="text text_color_inactive text_type_main-default ml-2">Лента заказов</p>
        </div>
        </div>
            <Logo />
        <div className="header-element mt-4 mb-4">
            <ProfileIcon type="secondary" />
            <p className="text text_color_inactive text_type_main-default">Личный кабинет</p>
        </div>
            </div>
    </header>
}