const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { sortBy } = require("lodash");

exports.getProductbyId = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtentions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "There is a problem with image",
      });
    }

    // Destructure the fields
    const { name, description, price, category, stock } = fields;

    // Restrictions on file / Validations
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let product = new Product(fields);

    // Handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!",
        });
      }
      //   product.photo.data = fs.readFileSync(file.photo.filepath);
      //   product.photo.contentType = file.photo.mimetype;
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // Save to DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving T-shirt failed!",
        });
      }
      res.json(product);
    });
  });
};

// Read
exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

// Delete
exports.removeProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product",
      });
    }
    res.json({
      message: "Deletion was successful!",
      deletedProduct,
    });
  });
};

// Update
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtentions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "There is a problem with image",
      });
    }

    // Updation code
    let product = req.product;
    product = _.extend(product, fields);

    // Handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!",
        });
      }
      //   product.photo.data = fs.readFileSync(file.photo.filepath);
      //   product.photo.contentType = file.photo.mimetype;
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // Save to DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Updation failed!",
        });
      }
      res.json(product);
    });
  });
};

// Product Listing
exports.getAllProducts = (req, res) => {
  // Setting a limit on number of products retrieved
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;

  // Soring products based on it's id
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No products were found!",
        });
      }
      res.json(products);
    });
};

// Middleware to optimize binary data of images
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

// Middleware to update inventory
exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operations failed!",
      });
    }
    next();
  });
};
