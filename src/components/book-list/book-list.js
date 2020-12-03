import React, {Component} from 'react';
import {connect} from "react-redux";

import BookListItem from "../book-list-item";
import {withBookstoreService} from "../hoc";
import {booksLoaded, booksRequested, booksError, bookAddedToCart, fetchBooks} from "../../actions";
import {compose} from "../../utils";
import Spinner from "../spinner";

import "./book-list.css";
import ErrorIndicator from "../error-indicator";

const BookList = ({books, onAddedToCart}) => {
    return (
        <ul className="book-list">
            {
                books.map((book) => {
                    return (
                        <li key={book.id}>
                            <BookListItem
                                onAddedToCart={() => onAddedToCart(book.id)}
                                book={book}/>
                        </li>
                    );
                })
            }
        </ul>
    );
};

class BookListContainer extends Component {

    componentDidMount() {
        this.props.fetchBooks();
    }

    render() {
        const {books, loading, error, onAddedToCart} = this.props;

        if (loading) {
            return <Spinner/>;
        }

        if (error) {
            return <ErrorIndicator/>;
        }

        return <BookList books={books} onAddedToCart={onAddedToCart}/>;
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books,
        loading: state.loading,
        error: state.error
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const {bookstoreService} = ownProps;

    return {
        fetchBooks: fetchBooks(bookstoreService, dispatch),
        onAddedToCart: (id) => dispatch(bookAddedToCart(id))
    };
};

// mapStateToProps - какие данные мы хотим получить из ReduxStore
// mapDispatchToProps - какие действия захочет выполнить компонент (actions которые передаются в ReduxStore)
export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);
