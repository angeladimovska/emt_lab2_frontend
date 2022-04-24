import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const BookAdd = (props) => {

    //useHistory-MI PRAvI PROBLEM - NAMESTO TOA USENAVIGATE e za da mozam da redirektiram
    const navigate = useNavigate();

    //ni treba temporary state za pravenje post request-idealno e da iskoristis hook
    //ovoj state ke se predade kon app komponentata koja ke go pravi ponatamu baranjeto preku eshopservisot
    const [formData, updateFormData] = useState({
        name: "",
        category: 1,
        author: 1,
        availableCopies:1

    })

    //ova "e" e nekoj EVENT koj ke se kreira i treba da go ishendlame
    const handleChange = (e) => {
        updateFormData({
            ...formData,//vrz ona shto go ima sega da se sluci slednoto

            //od eventot go zemame targetot i imeto na toj target toa ni e key i value e
            [e.target.name] : e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        //na ovoj event popreci mu go defaultnoto odnesuvanje- nemoj da gi prakjas vednas podatocite tuku zastani
        //i nie ke odlucime shto ke se prati sledno
        e.preventDefault();
        const name = formData.name;
        const category = formData.category;
        const author = formData.author;
        const availableCopies=formData.availableCopies;

        //ovaa komponenta treba da gi prati do app komponentata kade shto imas metod add-product
        //i toj ke go povika metodot od servisot shto pravi axios post request!
        // ovde category i brand se ids
        props.onAddBook(name, category, author, availableCopies);

        //ova e redirect!
        navigate("/books");
    }

    return(
        <div className="row mt-5">
            <div className="col-md-5">
                {/*shto da se sluci na submit*/}
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Book name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               required
                               placeholder="Enter book name"
                            //nesto sho ke se slucuva na promena na mojot input
                               onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="availableCopies">Available copies</label>
                        <input type="text"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               placeholder="Quantity"
                               required
                               onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className="form-control" onChange={handleChange}>
                            {props.categories.map((term) =>
                                <option value={term.id}> {term.name} </option>
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Author</label>
                        <select name="author" className="form-control" onChange={handleChange}>
                            {props.authors.map((term) =>
                                <option value={term.id}> {term.name} </option>
                            )}
                        </select>
                    </div>

                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default BookAdd;
