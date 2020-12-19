const express = require('express');
const bodyParser = require('body-parser');
const User = require('../../models/user');
const { required } = require('@hapi/joi');
const Admin = require('../../models/admin');
const Super_Admin = require('../../models/superAdmin');
const Books = require('../../models/book');
const { adminValidation } = require('../../validation');
const bcrypt = require('bcrypt');

var superAdmin = express.Router();
superAdmin.use(bodyParser.json());

//GET AND POST ALL ADMIN LIST
superAdmin.route('/admin')
.get((req, res, next) => {
    Admin.find({})
    .then((admin) => {
        res.status(200);
        res.setHeader('Content-Type','application/json');
        res.json(admin);
    })
    .catch((err) => {
        res.status(500).json({error: err.message})
    });
})
.post(async (req, res) => {
    const { error } = adminValidation(req.body);

    if(error) return res.status(400).json({error: error.details[0].message});

    const isEmailExist = await Admin.findOne({email: req.body.email});

    if(isEmailExist) return res.status(400).json({error: "Email already Exists"});

    const adminPassword = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(adminPassword, salt);

     const admin = new Admin({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password,
        adminPassword
    });

    try {
        const savedAdmin = await admin.save();
        res.json({
            status: 'Successfully added admin',
            data: {
                adminId: savedAdmin._id
            }
        });
    }catch (err){
        res.status(400).json(err);
    }
})
.put((req, res, next) => {
    res.status(404).json('PUT method not supported');
})
.delete((req, res, next) => {
    res.status(404).json('DELETE method not supported');
});

//UPDATE SUPER ADMIN PROFILE
superAdmin.route('/:Id')
.put(async (req, res, next) => {
    Super_Admin.findByIdAndUpdate(req.params.userId,
      {$set: req.body},
              {new: true})
      .then((resp) => {
        console.log('Profile updated', resp);
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
      })
  });
//Update SUPER AMDIN PASSWORD ONLY
superAdmin.route('/password/:Id')
.put(async(req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    Super_Admin.findByIdAndUpdate(req.params.userId,
      {password: hashedPassword},
      {new: true})
      .then((resp) => {
        console.log('Password updated', resp);
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
      })
});

//GET ALL USERS
superAdmin.route('/users')
.get((req, res, next) => {
    User.find({})
    .then((user) => {
        res.status(200);
        res.setHeader('Content-Type','application/json');
        res.json(user);
    })
    .catch((err) => {
        res.status(500).json({error: err.message})
    });
})
.put((req, res, next) => {
    res.status(404).json('PUT method not supported');
})
.delete((req, res, next) => {
    res.status(404).json('DELETE method not supported');
});

superAdmin.route('/admin/password/:adminId')
.put(async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    Admin.findByIdAndUpdate(req.params.userId,
      {password: hashedPassword},
      {new: true})
      .then((admin) => {
        console.log('Password updated', admin);
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
      })
      .catch((err) => {
        res.status(500).json({error: err.message})
    });
  });

superAdmin.route('/admin/:adminId')
.get((req, res, next) => {
    Admin.findById(req.params.adminId)
    .then((admin) => {
        console.log('Profile updated', admin);
        res.status(200);
        res.setHeader('Content-Type','application/json');
        res.json(admin);
    })
    .catch((err) => {
        res.status(500).json({error: err.message})
    });
})
.post((req, res, next) => {
    res.status(404).json('POST method not supported')
})
.put((req, res, next) => {
    Admin.findByIdAndUpdate(req.params.adminId,
        {$set: req.body},
        {new: true})
        .then((admin) => {
            res.status(200);
            res.setHeader('/Content-Type','application/json');
            res.json(admin);
        })
        .catch((err) => {
            res.status(500).json({error: err.message})
        });
})
.delete((req, res, next) => {
    Admin.findByIdAndDelete(req.params.adminId)
    .then((admin) => {
        res.status(200);
        res.setHeader('Content-Type','application/json');
        res.json(admin);
    })
    .catch((err) => {
        res.status(500).json({error: err.message})
    });
});

superAdmin.route('/user/:userId')
.get((req, res, next) => {
    User.findById(req.params.userId)
    .then((user) => {
        res.status(200);
        res.setHeader('Content-Type','application/json');
        res.json(user);
    })
    .catch((err) => {
        res.status(500).json({error: err.message})
    });
})
.post((req, res, next) => {
    res.status(404).json('POST method not supported')
})
.put((req, res, next) => {
    User.findByIdAndUpdate(req.params.userId,
        {$set: req.body},
        {new: true})
        .then((user) => {
            res.status(200);
            res.setHeader('/Content-Type','application/json');
            res.json(user);
        })
        .catch((err) => {
            res.status(500).json({error: err.message})
        });
})
.delete((req, res, next) => {
    User.findByIdAndDelete(req.params.adminId)
    .then((user) => {
        res.status(200);
        res.setHeader('Content-Type','application/json');
        res.json(user);
    })
    .catch((err) => {
        res.status(500).json({error: err.message})
    });
});

//GET AND POST BOOKS
superAdmin.route('/ books')
.get((req, res, next) => {
    Books.find({})
    .then((books) => {
        res.status(200);
        res.setHeader('Content-Type','application/json');
        res.json(boks);
    })
    .catch((err) => {
        res.status(500).json({error: err.message})
    });
})
.post((req, res, next) => {
    Books.create(req.body)
    .then((books) => {
        res.status(200);
        res.setHeader('Content-Type','application/json');
        res.json(books)
    })
    .catch((err) => {
        res.status(500).json({error: err.message})
    });
})
.put((req, res, next) => {
    res.status(404).json('PUT method not supported');
})
.delete((req, res, next) => {
    res.status(404).json('DELETE method not supported');
});

//PUT AND DELETE BOOKS
superAdmin.route('/books/:bookId')
.get((req, res, next) => {
    Books.findById(req.params.userId)
    .then((books) => {
        res.status(200);
        res.setHeader('Content-Type','application/json');
        res.json(books);
    })
    .catch((err) => {
        res.status(500).json({error: err.message})
    });
})
.post((req, res, next) => {
    res.status(404).json('POST method not supported')
})
.put((req, res, next) => {
    Books.findByIdAndUpdate(req.params.userId,
        {$set: req.body},
        {new: true})
        .then((books) => {
            res.status(200);
            res.setHeader('/Content-Type','application/json');
            res.json(books);
        })
        .catch((err) => {
            res.status(500).json({error: err.message})
        });
})
.delete((req, res, next) => {
    Books.findByIdAndDelete(req.params.adminId)
    .then((books) => {
        res.status(200);
        res.setHeader('Content-Type','application/json');
        res.json(books);
    })
    .catch((err) => {
        res.status(500).json({error: err.message})
    });
});

module.exports = superAdmin;