const { Hash } = require('../db/mongo/init');
const { errors, success } = require('./status-codes');
const btoa = require('btoa');
const atob = require('atob');

function shorten(url, res) {
    if (!url) throw errors.BadRequest();
    else {
        Hash.findOne({ url })
            .then(doc => {
                if (!doc) throw new Error('Document not found');
                console.log("Already there");
                res.send(success.Success('Retrieved', {
                    url,
                    hash: btoa(doc._id)
                }));
            })
            .catch(_err => {
                console.log("Create and store new");
                let hashes = new Hash({ url });
                console.log(hashes);

                hashes.save()
                    .then(doc => {
                        res.send(success.Success('Retrieved', {
                            url,
                            hash: btoa(doc._id)
                        }));
                    })
                    .catch(err => {
                        console.log(err);
                        res.send(errors.InternalServerError());
                    });
            })
    }
}

function unshorten(hash, res) {
    if (!hash) throw errors.BadRequest();
    else {
        let id = atob(hash);
        Hash.findOne({ _id: id })
            .then(doc => {
                if (!doc) throw new Error('Document Not Found');
                res.redirect(doc.url);
            })
            .catch(err => {
                console.log(err);
                res.send(errors.InternalServerError());
            });
    }
}

module.exports = {
    shorten,
    unshorten
}