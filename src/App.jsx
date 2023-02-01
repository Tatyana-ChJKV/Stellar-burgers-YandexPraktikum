import './App.css';
import {AppHeader} from "./components/app-header/AppHeader";
import {BurgerIngredients} from "./components/burger-ingredients/BurgerIngredients";
import {BurgerConstructor} from "./components/burger-constructor/BurgerConstructor";


function App() {
    return (
        <div className="App">
            <AppHeader/>
            <div className="ingredients-constructor">
                <BurgerIngredients/>
                <BurgerConstructor/>
            </div>
        </div>
    );
}

export default App;