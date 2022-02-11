import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../../action/index";
import style from './dogCreate.module.css'



function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Your breed must have a name';
    }
    else if (!input.breedGroup) {
        errors.breedGroup = 'Breed group is required!!';
    }
    else if (!input.heightMin) {
        errors.heightMin = 'Minimum height is required!!';
    }
    else if (!input.heightMax) {
        errors.heightMax = 'Maximum height is required!!';
    }
    else if (!input.weightMin) {
        errors.weightMin = 'Minimum weight is required!!';
    }
    else if (!input.weightMax) {
        errors.weightMax = 'Maximum weight is required!!';
    }
    else if (!input.life_span) {
        errors.life_span = 'Life span is required!!';
    }
    return errors;
};

export default function DogCreate() {
    const dispatch = useDispatch();
    const location = useLocation();
    const temperaments = useSelector((state) => state.temperaments);
    const breeds = useSelector((state) => state.breeds)
    
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        breedGroup: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        lifeSpan: '',
        image: '',
        temperaments: [],
    });

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
        console.log(input)
    };

    function handleSelectTemperaments(e) {
        if (!input.temperaments.includes(e.target.value)) {
            setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value]
        });
        console.log(input);
    }
    };

    function handleSelectBreeds(e) {
        if (!input.breeds.includes(e.target.value)) {
            setInput({
            ...input,
            breeds: [...input.breeds, e.target.value]
        });
        console.log(input);
    }
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log(errors);
        if (!Object.getOwnPropertyName(errors).length && input.name && input.heightMin && input.heightMax &&
        input.weightMin && input.weightMax && input.lifeSpan && input.temperaments.length) {
        dispatch(postDog(input));
        alert("Dog succesfully created 👏");
        setInput({
            id: '',
            name: '',
            breedGroup: '',
            heightMin: '',
            heightMax: '',
            weightMin: '',
            weightMax: '',
            lifeSpan: '',
            image: '',
            temperaments: [],
        });
        location("/home");
    } else {
        alert("Dog can´t be created with these data")
    }
};

    function handleDeleteTemperaments(el) {
        setInput({
            ...input,
            temperaments: input.temperaments.filter((temperament) => temperament !== el)
        });
    };

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
                    placeholder = "NAME"
                    type = "text"
                    value = {input.name}
                    name = "name"
                    onChange = {(e) => handleChange(e)}
                    required
                />
                {errors.name && (
                    <p className = {style.error}>
                        <strong>
                            {errors.name}
                        </strong>
                    </p>
                )}
            </div>
            
            <div className = {style.breedGroupDiv}>
                <input
                    className = {style.breedGroupInput}
                    placeholder = "BREED GROUP"
                    type = "text"
                    value = {input.breedGroup}
                    name = "breedGroup"
                    onChange = {(e) => handleChange(e)}
                    required
                />
                {errors.breedGroup && (
                    <p className = {style.error}>
                        <strong>
                            {errors.breedGroup}
                        </strong>
                    </p>
                )}
            </div>

            <div className = {style.heightDiv}>
                <input
                    className = {style.heightInput}
                    placeholder = "MINIMUM HEIGHT -cm- "
                    type = "number"
                    value = {input.height}
                    name = "min height"
                    onChange = {(e) => handleChange(e)}
                    required
                />
                {errors.heightMin && (
                    <p className = {style.error}>
                        <strong>
                            {errors.heightMin}
                        </strong>
                    </p>
                )}
            </div>

            <div className = {style.heightDiv}>
                <input
                    className = {style.heightInput}
                    required
                    placeholder = "MAXIMUM HEIGHT -cm- "
                    type = "Height"
                    value = {input.height}
                    name = "max height"
                    onChange = {(e) => handleChange(e)}
                />
                {errors.heightMax && (
                    <p className = {style.error}>
                        <strong>
                            {errors.heightMax}
                        </strong>
                    </p>
                )}
            </div>
            
            <div className = {style.weightDiv}>
                <input
                    className = {style.weightInput}
                    required
                    placeholder = "MINIMUM WEIGHT -kg- "
                    type = "Weight"
                    value = {input.weight}
                    name = "min weight"
                    onChange = {(e) => handleChange(e)}
                />
                {errors.weightMin && (
                    <p className = {style.error}>
                        <strong>
                            {errors.weightMin}
                        </strong>
                    </p>
                )}
            </div>

            <div className = {style.weightDiv}>
                <input
                    className = {style.weightInput}
                    required
                    placeholder = "MAXIMUM WEIGHT -kg- "
                    type = "Weight"
                    value = {input.weight}
                    name = "min weight"
                    onChange = {(e) => handleChange(e)}
                />
                {errors.weightMax && (
                    <p className = {style.error}>
                        <strong> 
                            {errors.weightMax}
                        </strong>
                    </p>
                )}
            </div>
            
            <div className = {style.lifeSpanDiv}>
                <input
                    className = {style.lifeSpanInput}
                    placeholder = "EXPECTED LIFE SPAN -years- "
                    title = "It must be between 1 & 25 years"
                    id = "lifeSpan"
                    type = ""
                    value = {input.lifeSpan}
                    min = "1"
                    max = "25"
                    name = "expected lifeSpan"
                    onChange = {(e) => handleChange(e)}
                    required
                />
                {errors.life_span && (
                    <p className = {style.error}>
                        <strong>
                            {errors.life_span}
                        </strong>
                    </p>
                )}
            </div>

            <div className = {style.imageDiv}>
                <input
                    className = {style.imageInput}
                    type = "file"
                    name = "file"
                    accept = "image/*"
                    multiple 
                />
                </div>
            
            <div>
            <label className={style.labelTemperaments}>
                TEMPERAMENTS:
            </label>
                <select
                    required
                    className = {style.selectTemperaments}
                    onChange = {(e) => handleSelectTemperaments(e)}
                >
                    {temperaments?.sort(function (a, b) {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                            return 0;
                    }).map(temperament => {
                            return (
                                <option value = {temperament.name} key = {temperament.id}>
                                    {temperament.name}
                                </option>
                            )
                        })}
                </select>
                {input.temperaments.map(el => {
                        return (
                            <ul className = {style.allTemps} key = {el}>
                                <li>
                                    <p className = {style.temp}>
                                        <strong>
                                            {el}
                                        </strong>
                                    </p>
                                    <button onClick = {() => handleDeleteTemperaments(el)} className = {style.x} >
                                        X
                                    </button>
                                </li>
                            </ul>
                        )
                    })}
            </div>
            
            <div>
            <label className={style.labelBreeds}>
                BREEDS:
            </label>
                <select
                    required
                    className = {style.selectBreeds}
                    onChange = {(e) => handleSelectBreeds(e)}
                >
                    {breeds?.sort(function (a, b) {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                            return 0;
                    }).map(breed => {
                            return (
                                <option value = {breed.name} key = {breed.id}>
                                    {breed.name}
                                </option>
                            )
                        })}
                </select>
            </div>
            
            <button className = {style.buttonDone} type = "submit">
                DONE
            </button>

            </form>
        </div>
    </div>
)
};