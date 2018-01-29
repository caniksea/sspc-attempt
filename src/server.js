const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');

var app = express();
var fs = require('fs');

const FILE_BASE = __dirname + '/app/db/';
const API_BASE = '/api/';


app.use(bodyParser.json());
app.use(cors());

var server = app.listen(8000, function () {
    console.log('Server started!');
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server running", host, port);
});

app.post(API_BASE + 'addUser', function (req, res) {
    fs.readFile(FILE_BASE + "logins.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        const user = req.body;
        console.log(data, user);
        data[data.length] = user;
        res.end(JSON.stringify(user));
        save('logins.json', data);
    });
});

app.post(API_BASE + 'addRole', function (req, res) {
    fs.readFile(FILE_BASE + 'user_roles.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        const role = req.body;
        data[data.length] = role;
        res.end(JSON.stringify(role));
        save('user_roles.json', data);
    });
});

function save(s, data) {
    jsonfile.writeFile(FILE_BASE + s, data, function (err) {
        console.log(err);
    })
}

app.post(API_BASE + 'addUserDetails', function (req, res) {
    fs.readFile(FILE_BASE + 'user_details.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        const details = req.body;
        data[data.length] = details;
        res.end(JSON.stringify(details));
        save('user_details.json', data);
    });
});

app.post(API_BASE + 'updateUserDetails', function (req, res) {
    fs.readFile(FILE_BASE + 'user_details.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        const details = req.body;
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            if (obj.email === details.email) {
                data.splice(i, 1);
            }
        }
        data[data.length] = details;
        res.end(JSON.stringify(details));
        save('user_details.json', data);
    });
});

app.post(API_BASE + 'addProduct', function (req, res) {
    fs.readFile(FILE_BASE + 'products.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        const details = req.body;
        const r = Math.floor(Math.random() * 100000000) + 1000;
        const pID = 'P' + r;
        details.productID = pID;
        data[data.length] = details;
        res.end(JSON.stringify(details));
        save('products.json', data);
    });
});

function buildItemToAdd(details) {
    return {
        'productID': details.productID,
        'product': details.product,
        'noOfProduct': details.noOfProduct,
        'price': details.price,
        'totalPrice': details.price
    };
}

app.post(API_BASE + 'addToCart', function (req, res) {
    fs.readFile(FILE_BASE + 'cart.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        const details = req.body;
        var cCart; //customer cart object
        var ccis; // customer cart items
        var itemToAdd; // customer (new) item to add to cart.
        //loop through the cart to get customer cartObject (cCart), then delete cCart from the cart.
        for (var i = 0; i < data.length; i++) {
            var cc = data[i];
            if (cc.email === details.customer) {
                cCart = cc;
                data.splice(i, 1);
                break;
            }
        }
        //if customer cartObject is found enter here...
        if (cCart) {
            ccis = cCart.cart; //get old customer cart items (ccis)
            for (var i = 0; i < ccis.length; i++) { //loop through ccis to find product to add
                var cci = ccis[i];
                if (cci.productID === details.productID) { //if product is found, get it and delete copy from ccis.
                    cci.noOfProduct += details.noOfProduct;
                    cci.totalPrice += cci.price;
                    itemToAdd = cci;
                    ccis.splice(i, 1);
                    break;
                }
            }
            if (!itemToAdd) { //if old item not found, create new one.
                itemToAdd = buildItemToAdd(details);
            }
            ccis[ccis.length] = itemToAdd; //add new copy of item to cart.
            cCart.cart = ccis; //add new customer cart items to customer cart object.
        } else { //customer cartObject is not found, thus create new one...
            ccis = [];
            ccis[ccis.length] = buildItemToAdd(details);
            cCart = {
                'email': details.customer,
                'cart': ccis
            }
        }
        data[data.length] = cCart; //add customer cart object to cart object.

        res.end(JSON.stringify(cCart));
        save('cart.json', data);
    });
});

app.post(API_BASE + 'removeOne', function (req, res) {
    fs.readFile(FILE_BASE + 'cart.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        const details = req.body;
        var cCart; //customer cart object
        var ccis; // customer cart items
        var itemToAdd; // customer (new) item to add to cart.
        //loop through the cart to get customer cartObject (cCart), then delete cCart from the cart.
        for (var i = 0; i < data.length; i++) {
            var cc = data[i];
            if (cc.email === details.customer) {
                cCart = cc;
                data.splice(i, 1);
                break;
            }
        }
        //if customer cartObject is found enter here...
        if (cCart) {
            ccis = cCart.cart; //get old customer cart items (ccis)
            for (var i = 0; i < ccis.length; i++) { //loop through ccis to find product to add
                var cci = ccis[i];
                if (cci.productID === details.productID) { //if product is found, get it and delete copy from ccis.
                    cci.noOfProduct -= 1;
                    cci.totalPrice -= cci.price;
                    itemToAdd = cci;
                    ccis.splice(i, 1);
                    break;
                }
            }
            ccis[ccis.length] = itemToAdd; //add new copy of item to cart.
            cCart.cart = ccis; //add new customer cart items to customer cart object.
        }
        data[data.length] = cCart; //add customer cart object to cart object.

        res.end(JSON.stringify(cCart));
        save('cart.json', data);
    });
});

app.post(API_BASE + 'removeAll', function (req, res) {
    fs.readFile(FILE_BASE + 'cart.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        const details = req.body;
        var cCart; //customer cart object
        var ccis; // customer cart items
        //loop through the cart to get customer cartObject (cCart), then delete cCart from the cart.
        for (var i = 0; i < data.length; i++) {
            var cc = data[i];
            if (cc.email === details.customer) {
                cCart = cc;
                data.splice(i, 1);
                break;
            }
        }
        //if customer cartObject is found enter here...
        if (cCart) {
            ccis = cCart.cart; //get old customer cart items (ccis)
            for (var i = 0; i < ccis.length; i++) { //loop through ccis to find product to add
                var cci = ccis[i];
                if (cci.productID === details.productID) { //if product is found, get it and delete copy from ccis.
                    ccis.splice(i, 1);
                    break;
                }
            }
            cCart.cart = ccis; //add new customer cart items to customer cart object.
        }
        data[data.length] = cCart; //add customer cart object to cart object.

        res.end(JSON.stringify(cCart));
        save('cart.json', data);
    });
});
