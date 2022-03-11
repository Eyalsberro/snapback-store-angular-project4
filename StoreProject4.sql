CREATE DATABASE storeProject;

USE storeProject;

create table users(
 userID int(10),
 firstName varchar(255),
 lastName VARCHAR(255),
 email VARCHAR(100),
 password VARCHAR(35),
 city VARCHAR(100),
 street VARCHAR(100),
 role VARCHAR(35),
 primary key(userID)
);

create table categories(
 categoryID int auto_increment,
 categoryName VARCHAR(100),
 primary key(categoryID)
);

create table product(
 productID int auto_increment,
 productName VARCHAR(100),
 category_id INT,
 price FLOAT,
 img VARCHAR(10000),
 PRIMARY KEY (productID),
 FOREIGN KEY ( category_id) REFERENCES categories(categoryID)
);

CREATE TABLE cart(
 cartID INT AUTO_INCREMENT,
 cartDate DATETIME DEFAULT NOW(),
 user_id INT,
 primary key(cartID),
 foreign key(user_id) references users(userID)
);

CREATE TABLE cartItems(
 cartItemsID INT AUTO_INCREMENT,
 qt INT,
 product_id INT,
 cart_id INT,
 primary key(cartItemsID),
 foreign key(product_id) references product(productID),
 foreign key(cart_id) references cart(cartID)
);

CREATE TABLE orders(
orderID int auto_increment,
user_id int,
cart_id int,
sendCity varchar(255),
sendStreet varchar(255),
sendDate date,
orderDate DATETIME DEFAULT NOW(),
payEnd INT(4),
primary key (orderID),
foreign key (user_id) references users(userID),
foreign key (cart_id) references cart(cartID)
); 


INSERT INTO users(userID,firstName,lastName,email,password,role)
VALUES (123456789,"Eyal","Sberro","eyalsberro@gmail.com","123","admin");

INSERT INTO users(userID,firstName,lastName,email,password,city,street,role)
VALUES (123456788,"Mel","Sberro","melsberro@gmail.com","123","Tel-Aviv","Ben-Gourion","customer"),(123456787,"Oren","Sberro","orensberro@gmail.com","123","Raanana","Brener","customer"),(123456799,"Steve","Che","steveche@gmail.com","123","Ramat-Gan","Oziel","customer");

INSERT INTO categories(categoryName)
VALUES ("Cities"),("Hip-Hop"),("Animated"),("Beach Vibe");

INSERT INTO product(productName, price, img ,category_id)
VALUES("West Coast",14.99,"https://i0.wp.com/snapback-hat.com/wp-content/uploads/2020/06/PANGKB-Brand-WESTCOAST-CAP-navy-Hip-Hop-parkour-sports-snapback-hat-for-men-women-adult-outdoor-e1591652465767.jpg?fit=800%2C644&ssl=1",1),
("Brooklyn", 16.99, "https://i0.wp.com/snapback-hat.com/wp-content/uploads/2020/07/IMG_2482-scaled.jpg?fit=2560%2C1707&ssl=1", 1),
("Brooklyn N86", 15.99, "https://i0.wp.com/snapback-hat.com/wp-content/uploads/2020/06/Fashion-Men-Women-BROOKLYN-Letters-cotton-adjustable-Baseball-Cap-Leather-label-N86-Hip-Hop-Caps-Sun-1.jpg?fit=800%2C800&ssl=1", 1),
("U.N.I.T.Y.", 14.99, "https://i0.wp.com/snapback-hat.com/wp-content/uploads/2021/05/image-removebg-preview.png?w=581&ssl=1", 2),
("Hipster", 20.99, "https://i0.wp.com/snapback-hat.com/wp-content/uploads/2021/05/image-removebg-preview-1.png?w=500&ssl=1", 2),
("Space Jam", 18.99, "https://i0.wp.com/snapback-hat.com/wp-content/uploads/2021/05/removal.ai_tmp-60a7ae95d9de5.png?w=512&ssl=1", 3),
("Packman", 14.99, "https://i0.wp.com/snapback-hat.com/wp-content/uploads/2021/05/removal.ai_tmp-60a7af5e3987c.png?w=640&ssl=1", 3),
("Beach Cork", 12.99, "https://i0.wp.com/snapback-hat.com/wp-content/uploads/2021/05/removal.ai_tmp-60a79fabc21a3.png?w=640&ssl=1", 4),
("Belle Vue", 13.99, "https://i0.wp.com/snapback-hat.com/wp-content/uploads/2021/05/image-removebg-preview-5.png?w=563&ssl=1", 4),
("Holidays", 15.99, "https://i0.wp.com/snapback-hat.com/wp-content/uploads/2021/05/PANGKB-Brand-ENDLESS-CAP-Pink-holiday-beach-coconut-sports-snapback-hat-for-men-women-adult-outdoor.jpg_640x640.jpg?w=640&ssl=1", 4);

INSERT INTO cart(user_id)
VALUES (123456788),(123456787);

INSERT INTO cartItems(qt,product_id ,cart_id)
VALUES (1,3,1),(1,5,1),(1,7,2),(1,2,2);

INSERT INTO orders(cart_id,user_id,sendCity,sendStreet,sendDate,payEnd)
VALUES (1,"123456788","Tel-Aviv","Ben-Gourion","2022-04-15",1234);