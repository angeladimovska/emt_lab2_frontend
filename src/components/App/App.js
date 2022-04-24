import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Categories from "../Categories/categories";
import Header from "../Header/header"
import BookAdd from "../Books/BookAdd/BookAdd";
import BookEdit from "../Books/BookEdit/BookEdit";
import BookShopService from "../../repository/bookRepository";
import Books from "../Books/BookList/bookList";


class App extends Component {

    constructor(props) {
        super(props);
        //App komponentata cuva state i toa e ovoj objekt state i nie pravime nekoja promena vrz nego podole so set state
        this.state = { //sostojbata e sekogas nekakov objekt i ke davame key-value parovi za properties shto ke gi cuvam
            books: [],
            authors:[],
            categories:[],
            selectedBook: {}
        }
    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className="container">
                        <Routes>

                            {/*ovde ni treba i callback od productAdd kon app - od child kon parent*/}
                            {/*a ovie categories i brands se odozgora nadole- od app kon productadd*/}
                            <Route path={"/books/add"} element={
                                <BookAdd categories={this.state.categories}
                                            onAddBook={this.addBook}/>} exact render/>
                            {/*rutite od pospecificna kon pogeneralna*/}
                            <Route path={"/books/edit/:id"} element={
                                <BookEdit categories={this.state.categories}
                                             onEditBook={this.editBook}
                                             book={this.state.selectedBook}/>} exact render/>

                            <Route path={"/books"} element={<Books books={this.state.books}
                                                                         onDelete={this.deleteBook}
                                                                         onEdit={this.getBook}/>} exact render/>
                        </Routes>
                    </div>
                </main>
            </Router>

        );
    }

    loadCategories = () => {
        BookShopService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                })
            });
    }

    loadBooks = () => {
        BookShopService.fetchBooks()
            .then((data) => {
                this.setState({
                   books: data.data
                })
            });
    }

    deleteBook = (id) => {
        BookShopService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            })
    }
    addBook = (name, category, author, availableCopies) => {
        BookShopService.addBook(name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    getBook = (id) => {
        BookShopService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }

    editBook = (id, name, category, author, availableCopies) => {
        BookShopService.editBook(id, name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    componentDidMount() {
        this.loadCategories();
        this.loadBooks();
    }
}

export default App;
