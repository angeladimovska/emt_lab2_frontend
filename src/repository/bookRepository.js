import axios from '../custom-axios/axios';

//ovde go importirav nasiot axios odnosno instancata sho ja kreiravme
//ovde mi se http povicite!
const BookShopService= {

    fetchBooks: () => {
        //ona shto od axios ke se dobie so get baranje
        return axios.get("/books");
    },

    fetchCategories: () => {
        return axios.get("/categories");
    },

    deleteBook : (id) => {
        return axios.delete(`/books/delete/${id}`)
    },

    //ke treba da mu pratime celosen objekt - REQUESTBODY objektot sho sakame da go doademe
    //ova sho e data kje se prati vo request body
    addBook: (name, category, author, availableCopies) => {
        return axios.post("/books/add", {
            "name" : name,
            "category" : category,
            "author" : author,
            "availableCopies" : availableCopies
        });
    },

    editBook: (id, name, category, author, availableCopies) => {
        return axios.put(`/books/edit/${id}`, {
            "name" : name,
            "category" : category,
            "author" : author,
            "availableCopies" : availableCopies
        });
    },

    getBook: (id) => {
        return axios.get(`/books/${id}`);
    }

}
export default BookShopService;
