const mysql = require("mysql2/promise.js");
const { getInvertKey, getKey, stringToSlug } = require("./utils.js");
const bluebird = require("bluebird");

let newDatabaseConnectionPromise = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bookstore",
    port: 3306,
    Promise: bluebird,
});

// old table: book, image
// id;
// name;
// title;
// alias;
// author;
// bookCoverType;
// price;
// language;
// description;
// episode;
// stock;
// discount;
// createdAt;
// updatedAt;
// deletedAt;
// imageCover;
// providerId;
// publisherId;
// seriesId;
// categoryId;
// Attributes;
// new table: book, BookImage, BookAttribute
// 	Id	Title	Name	Slug	AuthorId	ProviderId	PublisherId	ThumbnailUrl	Price	PublishDate	Language	Description	SeriesId	Episode	Stock	CategoryId	CreatedAt	DeletedAt
//
//   const query = `SELECT book.id, book.name, book.title, book.alias, book.author, book.price, book.language, book.description, book.episode, book.stock, book.createdAt, book.updatedAt, book.deletedAt, book.imageCover, provider.name AS providerName, publisher.name as publisherName, series.name as seriesName, category.name as categoryName, book.Attributes FROM book JOIN provider ON book.providerId = provider.id LEFT  JOIN publisher ON book.publisherId = publisher.id LEFT JOIN series ON book.seriesId = series.id LEFT JOIN category ON book.categoryId = category.id WHERE categoryId = 2`;
//
const fs = require("fs");
async function main() {
    const [newDatabaseConnection] = await Promise.all([newDatabaseConnectionPromise]);
    const query = `SELECT * from books limit 100`;
    const [rows] = await newDatabaseConnection.query(query);
    const rs = [];
    for await (const row of rows) {
        const attributes = {};
        const book = {
            title: row.Name.replace(/`|"|'/g, ""),
            description: row.Description.replace(/`|"|'/g, ""),
            price: Math.round(row.Price / 1000),
            stock: row.Stock % 100,
            shopId: "0",
            image: row.ThumbnailUrl,
        };
        if (row.Episode) {
            attributes["Tập"] = row.Episode;
        }

        attributes["Ngôn ngữ"] = row.Language;
        const query2 = `SELECT * FROM bookattributes WHERE bookId = ?`;
        const [rows2] = await newDatabaseConnection.query(query2, [row.Id]);
        for (const row2 of rows2) {
            attributes[row2.AttributeName] = row2.AttributeValue;
        }
        book.attributes = attributes;
        rs.push(book);
    }
    fs.writeFileSync("temp.json", JSON.stringify(rs));
}
main();
