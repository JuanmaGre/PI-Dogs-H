import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments, postDog } from "../../action/index";
import style from './dogCreate.module.css'



export default function DogCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector((state) => state.temperaments);
    const dogs = useSelector((state) => state.dogs);

    let breeds = [];
    if (dogs) {
        breeds = dogs.map((dog) => dog.breeds.find((breed) => breed)
        );
        breeds = Array.from(new Set(breeds.map((e) => e)));
    };


    const [input, setInput] = useState ({
        name: "",
        height: "",
        weight: "",
        lifeSpan: "",
        temperaments: [],
        breeds: []
    });


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
    };

    function handleSelectTemperaments(e) {
        setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value]
        });
    };

    function handleSelectTBreeds(e) {
        setInput({
            ...input,
            breeds: [...input.breeds, e.target.value]
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postDog(input));
        alert("Dog succesfully created");
        setInput({
            id: "",
            name: "",
            height: "",
            weight: "",
            lifeSpan: "",
            temperaments: [],
            breeds: []
        });
        history.push("/home");
        dispatch(getDogs());
    };

    function handleDeleteTemperaments(e) {
        setInput({
            ...input,
            temperaments: input.temperaments.filter((temperament) => temperament !== e)
        });
    };

    function handleDeleteBreeds(e) {
        setInput({
            ...input,
            breeds: input.breeds.filter((breed) => breed !== e)
        });
    }

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);
    return (
        <div className = {style.general}>
            
            <Link to = "/home" className = {style.backToHomeDiv}>
                <button className = {style.backToHomeButton}> Back To Home </button>
            </Link>
        
        <div className = {style.transparentForm}>
            <h1 className = {style.title}> Create your own dog! </h1>
            <form className = {style.formt} onSubmit = {(e) => handleSubmit(e)}>
            
            <div className = {style.nameDiv}>
                <input
                    className = {style.nameInput}
                    placeholder = "name"
                    type = "text"
                    value = {input.name}
                    name = "name"
                    onChange = {(e) => handleChange(e)}
                    required
                />
            </div>
            
            <div className = {style.heightDiv}>
                <input
                    className = {style.heightInput}
                    required
                    type = "Height"
                    value = {input.height}
                    name = "height"
                    onChange = {(e) => handleChange(e)}
                />
            </div>
            
            <div className = {style.weightDiv}>
                <input
                    className = {style.weightInput}
                    required
                    type = "Weight"
                    value = {input.weight}
                    name = "weight"
                    onChange = {(e) => handleChange(e)}
                />
            </div>
            
            <div className = {style.lifeSpanDiv}>
                <input
                    className = {style.lifeSpanInput}
                    placeholder = "LifeSpan"
                    title = "You must enter a number between 1 and 25"
                    id = "lifeSpan"
                    type = "number"
                    value = {input.lifeSpan}
                    min = "1"
                    max = "25"
                    name = "lifeSpan"
                    onChange = {(e) => handleChange(e)}
                    required
                />
            </div>
            
            <label className={style.labelTemperaments}> TEMPERAMENTS: </label>
                <select
                    required
                    className = {style.selectTemperaments}
                    onChange = {(e) => handleSelectTemperaments(e)}
                >
                    <option key = "empty1">
                    </option>
                    {temperaments.map((temperament) => (
                    <option key = {temperament.id} required value={temperament.name}>
                        {temperament.name}
                    </option>
                    ))}
                </select>
                
            <label className = {style.labelBreeds}> BREEDS: </label>
                <select
                    required
                    className = {style.selectBreeds}
                    onChange = {(e) => handleSelectTBreeds(e)}
                >
                    <option key = "empty2"> 
                    </option>
                    {breeds.map((breed, index) => (
                    <option key = {index} value = {breed} required>
                        {breed}
                    </option>
                    ))}
                </select>
            
            <button className = {style.buttonDone} type = "submit">
                DONE
            </button>

            </form>
            
            <div className = {style.divRenderTemperaments}>
                {input.temperaments.map((e) => (
                
                <div>
                {e + " "}
                    <button
                        key = "btnXTemperaments"
                        className = {style.buttonXTemperaments}
                        onClick = {() => handleDeleteTemperaments(e)}
                    >
                        x
                    </button>
                </div>
                ))}
            </div>

        <div className={style.divRenderBreeds}>
            {input.breeds.map((e) => (
            
            <div>
            {e + " "}
                <button
                    key = "btnXBreeds"
                    className={style.buttonXBreeds}
                    onClick={() => handleDeleteBreeds(e)}
                >
                    x
                </button>
            </div>

            ))}
        </div>
        </div>
    </div>
)
};