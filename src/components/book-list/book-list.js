import React, {Component} from 'react';
import {connect} from "react-redux";

import BookListItem from "../book-list-item";
import {withBookstoreService} from "../hoc";
import {booksLoaded, booksRequested} from "../../actions";
import {compose} from "../../utils";
import Spinner from "../spinner";

import "./book-list.css";

class BookList extends Component {

    componentDidMount() {
        // 1. receive data
        const {bookstoreService, booksLoaded, booksRequested} = this.props;
        booksRequested();
        bookstoreService.getBooks()
            // 2. dispatch actions to store
            .then((data) => booksLoaded(data));
    }

    render() {
        const {books, loading} = this.props;

        if (loading) {
            return <Spinner/>;
        }

        return (
            <ul className="book-list">
                {
                    books.map((book) => {
                        return (
                            <li key={book.id}><BookListItem book={book}/></li>
                        );
                    })
                }
            </ul>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books,
        loading: state.loading
    }
};

const mapDispatchToProps = {
    booksLoaded,
    booksRequested
};

// mapStateToProps - какие данные мы хотим получить из ReduxStore
// mapDispatchToProps - какие действия захочет выполнить компонент (actions которые передаются в ReduxStore)
export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList);
