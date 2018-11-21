'use strict';

module.exports = function (Product) {
    Product.getStock = function (cb) {
        Product.find({}, function (err, instance) {
            var response = instance.map(function(product) {
                return  {
                           id: product.id,
                           name: product.name, 
                           stock: product.stock,
                           img: product.img,
                           price: product.price,
                           description: product.description
                        };
            });
            cb(null, response);
        });
    }
    
    Product.reduceInventory = function (productId, amount, cb) {
        Product.findById(productId, function (err, instance) {
            var response = "false";
            if (amount <= instance.stock) {
                instance.stock = Number(instance.stock) - Number(amount);
                instance.save();
                response = "true";
            }
            cb(null, response);
        });
    }
    
    Product.updateQuantitySelled = function (productId, amount, cb) {
        Product.findById(productId, function (err, instance) {
            var response = "false";
            instance.quantitySelled = Number(instance.quantitySelled) + Number(amount);
            instance.save();
            response = "true";
            cb(null, response);
        });
    }

    Product.updateTotalSelled = function (productId, amount, cb) {
        Product.findById(productId, function (err, instance) {
            var response = "false";
            instance.totalSelled = Number(instance.totalSelled) + Number(amount);
            instance.save();
            response = "true";
            cb(null, response);
        });
    }

    Product.addToInventory = function (productId, amount, cb) {
        Product.findById(productId, function (err, instance) {
            var response = "false";
            instance.stock = Number(instance.stock) + Number(amount);
            instance.save();
            response = "true";
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
        'reduceInventory',
        {
            http: { path: '/reduceInventory', verb: 'get' },
            accepts: [
                { arg: 'id', type: 'string', http: { source: 'query' } },
                { arg: 'amount', type: 'string', http: { source: 'query' } },
            ],
            returns: { arg: 'success', type: 'string' }
        }
    );
    
    Product.remoteMethod(
        'addToInventory',
        {
            http: { path: '/addToInventory', verb: 'get' },
            accepts: [
                { arg: 'id', type: 'string', http: { source: 'query' } },
                { arg: 'amount', type: 'string', http: { source: 'query' } },
            ],
            returns: { arg: 'success', type: 'string' }
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
        'updateQuantitySelled',
        {
            http: { path: '/updateQuantitySelled', verb: 'get' },
            accepts: [
                { arg: 'id', type: 'string', http: { source: 'query' } },
                { arg: 'amount', type: 'string', http: { source: 'query' } },
            ],
            returns: { arg: 'success', type: 'string' }
        }
    );
    
    Product.remoteMethod(
        'updateTotalSelled',
        {
            http: { path: '/updateTotalSelled', verb: 'get' },
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
