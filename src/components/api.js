function getIngredientsInfo() {
    fetch('https://norma.nomoreparties.space/api/ingredients')
        .then(res => res.json())
        .then(res => {
            console.log(res);
        })
}

getIngredientsInfo();