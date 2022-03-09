import React, {useState} from "react";
import Select from "react-select";
import AsyncSelect from 'react-select/async';
import {Ingredient} from "./models/ingredient";


const RecipeDetails = ({recipe, close, deleteRecipe, glasses, cancel}) => {

    const [newQ, setNewQ] = useState(1)
    // const [glass, setGlass] = useState(glasses[0].name)
    const [selectedOption, setSelectedOption] = useState({label:'select glass type', value:0});
    const sum = recipe.ingredients.reduce((total, amount) =>
        total + parseInt(amount.quantity), 0);
    // const volume = glass.match(/\d/g);

    const glassesSelector = glasses.map(glass => ({ label: glass.name, value: glass.volume }));
    console.log(selectedOption)
    console.log(glassesSelector[0])



    // const options = [
    //     { name: 'blues', label: 'Blues' },
    //     { name: 'rock', label: 'Rock' },
    //     { name: 'jazz', label: 'Jazz' },
    //     { name: 'orchestra', label: 'Orchestra' }
    // ];

    // console.log(sum)
    const handleDelete =()=>{
        deleteRecipe(recipe.id)
        close()
    }
    // const updateSum = (newQuantity) =>{
    //     newQuantity.map
    // }
    const drinksQuantity = (newQuantity) =>{
        const drinksQuantity = [newQuantity];
        setNewQ(drinksQuantity);
    }
    // console.log(selectedOption)
    // console.log(newQ)

    return(
        <>
            <div className={"container"}>
                <h2 className={"recipe--title"}>{recipe.name}</h2>
                <h5>How Many Drinks You want to do?</h5>

                <form key={recipe.id} className={"form"} onSubmit={close}>
                    <input type="number" className={"new-recipe-ing"} placeholder='set Value'onChange={e => drinksQuantity(e.target.value)}/>
                    <h5>What type of Glass You Have?</h5>
                    {/*<select className={"button"}>*/}
                    {/*    {glasses.map((glass,index) => (*/}
                    {/*        <option>{glass.name} {glass.volume}.ml</option>*/}
                    {/*    ))}*/}
                    {/*</select>*/}
                    <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={glassesSelector}
                    />
                    <h5>Glass size: {selectedOption.value}.ml</h5>
                    <h4>You Need</h4>
                    <div className={"list"}>
                    <ul className={"process"}>
                        {recipe.ingredients.map((ingredient,index) => (
                            <li>{ingredient.name}</li>
                        ))}
                    </ul>
                        <ul className={"process"}>
                            {recipe.ingredients.map((ingredient,index) => (
                                <li>{Math.round(ingredient.quantity*newQ*selectedOption.value/sum)}.ml</li>
                            ))}
                        </ul>
                    </div>
                    <h4>Process</h4>
                    <p className={"process"}>{recipe.process}</p>
                    <button className={"button"} onClick={cancel}>CLOSE</button>
                    <button className={"cancel--btn"} key={recipe.id} onClick={handleDelete}>DELETE RECIPE</button>
                </form>


            </div>

        </>
    )
}

export {RecipeDetails}