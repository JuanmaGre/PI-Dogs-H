import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../../action/index";
import style from './dogCreate.module.css'



function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Your breed must have a name';
    }
    else if (!input.breed_group) {
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
    const navigate = useNavigate();
    const temperaments = useSelector((state) => state.temperaments);
    
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        breed_group: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        life_span: '',
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
        setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value]
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log(errors);
        dispatch(postDog(input));
        alert("Dog succesfully created 👏");
        setInput({
            id: '',
            name: '',
            breed_group: '',
            heightMin: '',
            heightMax: '',
            weightMin: '',
            weightMax: '',
            life_span: '',
            image: '',
            temperaments: [],
        });
        navigate("../home", { replace: true });
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
            <h1 className = {style.title}> Create your dog! </h1>
            <form className = {style.form} onSubmit = {(e) => handleSubmit(e)}>
            
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
                    value = {input.breed_group}
                    name = "breed_group"
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
                    required
                    placeholder = "MINIMUM HEIGHT -cm- "
                    type = "text"
                    value = {input.heightMin}
                    name = "heightMin"
                    onChange = {(e) => handleChange(e)}
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
                    type = "text"
                    value = {input.heightMax}
                    name = "heightMax"
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
                    type = "text"
                    value = {input.weight}
                    name = "weightMin"
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
                    type = "text"
                    value = {input.weight}
                    name = "weightMax"
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
                    required
                    placeholder = "EXPECTED LIFE SPAN -years- "
                    type = "text"
                    value = {input.life_span}
                    name = "life_span"
                    onChange = {(e) => handleChange(e)}
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
                    name = "image"
                    alt = "newDoggie"
                    accept = "image/*"
                    multiple 
                />
                </div>
            
            <div>
                <select 
                    required
                    className = {style.selectTemperaments}
                    onChange = {(e) => handleSelectTemperaments(e)}
                >
                    <option value = 'selected'>
                        All
                    </option>
                    {temperaments?.sort(function (a, b) {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                    }).map (temperament => {
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
                                    <button onClick={() => handleDeleteTemperaments(el)} className='x' >X</button>
                            </li>
                        </ul>
                    )
                })}
            </div>

            <label className = {style.labelTemperaments}>
                TEMPERAMENTS:
            </label>
                
            <button className = {style.buttonDone} type = "submit">
                DONE
            </button>

            </form>
        </div>
    </div>
)
};