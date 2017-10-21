'use strict';

module.exports = function (Product) {
    Product.getStock = function (cb) {
        Product.find({}, function (err, instance) {
            var response = instance.map(function(product) {
                return  {
                           name: product.name, 
                           inStock: product.stock,
                           icon: product.img,
                           price: product.price,
                           description: product.description
                        };
            });
            cb(null, response);
        });
    }
    Product.updateStock = function (productId, amount, cb) {
        Product.findById(productId, function (err, instance) {
            var response = "false";
            if (amount <= instance.stock) {
                instance.stock = instance.stock - amount;
                instance.save();
                response = "true";
            }
            cb(null, response);
        });
    }
    Product.checkStockToUpdate = function (productId, amount, cb) {
        Product.findById(productId, function (err, instance) {
            var response = "false";
            if (amount <= instance.stock) {
                response = "true";
            }
            cb(null, response);
        });
    }
    Product.remoteMethod(
        'getStock',
        {
            http: { path: '/getstock', verb: 'get' },
            returns: { arg: 'stocks', type: 'string' }
        }
    );
    Product.remoteMethod(
        'updateStock',
        {
            http: { path: '/updateStock', verb: 'get' },
            accepts: [
                { arg: 'id', type: 'string', http: { source: 'query' } },
                { arg: 'amount', type: 'string', http: { source: 'query' } },
            ],
            returns: { arg: 'success', type: 'string' }
        }
    );
    Product.remoteMethod(
        'checkStockToUpdate',
        {
            http: { path: '/checkStock', verb: 'get' },
            accepts: [
                { arg: 'id', type: 'string', http: { source: 'query' } },
                { arg: 'amount', type: 'string', http: { source: 'query' } },
            ],
            returns: { arg: 'success', type: 'string' }
        }
    );
};
