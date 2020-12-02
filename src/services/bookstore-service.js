export default class BookstoreService {
    data = [
        {
            id: 1,
            title: "Java: The Complete Reference",
            author: "Herbert Schildt",
            price: 28,
            coverImage: "https://images-na.ssl-images-amazon.com/images/I/510SEck1hNL.jpg"
        },
        {
            id: 2,
            title: "Thinking In Java",
            author: "Bruce Eckel",
            price: 54,
            coverImage: "https://images-na.ssl-images-amazon.com/images/I/51S8VRHA2FL._SX357_BO1,204,203,200_.jpg"
        }
    ];

    getBooks() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data)
            }, 700);
        });
    }
}