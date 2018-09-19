const db = require('../config/db');

module.exports = {
  
    getAllPaginated: function(req, callback) 
    {
        let q = 'SELECT * FROM `content` WHERE deleted_at IS NULL LIMIT ?, ?';
        db.query(q, [req.skip, req.query.limit], function (err, results, fields) {
            return callback(err, results);
        });
    },
    getContentById: function(id, callback) 
    {
        let q = 'SELECT * FROM `content` WHERE content_id = ? AND deleted_at IS NULL';
        db.query(q, [id], function (err, results, fields) {
            return callback(err, results[0]);
        });
    },
    createContent: function(body, callback) 
    {
        const desc = body['description'] || '';
        const title = body['title'] || '';

        let q = 'INSERT INTO `content` SET title = ?, description = ?, created_at = NOW(), updated_at = NOW()';
        db.query(q, [title, desc], function (err, results, fields) {
            return callback(err, {'created': results.affectedRows});
        });
    },
    updateContentById: function(input, callback) 
    {
        const desc = input.body['description'] || '';
        const title = input.body['title'] || '';
        
        let set = [];
        let q = 'UPDATE `content` SET ';
        if (title.length) {
            q += 'title = ?';
            set.push(title);
        }
        if (desc.length) {
            q += (set.length ? ', ' : '')+'description = ?';
            set.push(desc);
        }
        if (set.length == 0) {
            return callback(null, {'updated': 0});
        }
        q += (set.length ? ', ' : '')+'updated_at = NOW()';
        set.push(input.id);
        q += ' WHERE content_id = ? AND deleted_at IS NULL';
        db.query(q, set, function (err, results, fields) {
            return callback(err, {'updated': results.affectedRows});
        });
    },
    deleteContentById: function(id, callback) 
    {
        let q = 'UPDATE `content` SET deleted_at = NOW() WHERE content_id = ? AND deleted_at IS NULL';
        db.query(q, [id], function (err, results, fields) {
            return callback(err, {'deleted': results.affectedRows});
        });
    }

};