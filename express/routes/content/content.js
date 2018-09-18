const express = require('express');
const router = express.Router();
const valid = require('validator');
const Content = require('../../models/content');
const { check, validationResult } = require('express-validator/check');

router.get('/content', function(req, res, next) 
{
    const q = req.query;

    Content.getAllPaginated(req, function(err, content)
    {
        if (err) return next(err);
        res.send(content);
    });
});

let validate = [check('title').isLength({min:1, max: 160}), check('description').isLength({ max: 1000 })];
router.post('/content/create', validate, function(req, res, next) 
{
    const errors = validationResult(req);
    if ( ! errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    Content.createContent(req.body, function(err, content)
    {
        if (err) return next(err);
        res.send(content);
    });
});

router.get('/content/display/:contentId', function(req, res, next) 
{
    const p = req.params;
    Content.getContentById(p.contentId, function(err, content)
    {
        if (err) return next(err);
        res.send(content);
    });
});

validate = [check('title').isLength({max: 160}), check('description').isLength({ max: 1000 })];
router.put('/content/update/:contentId', validate, function(req, res, next) 
{
    const errors = validationResult(req);
    if ( ! errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const id = req.params.contentId;
    const body = req.body;
    Content.updateContentById({'id': id, 'body': body}, function(err, content)
    {
        if (err) return next(err);
        res.send(content);
    });
});

router.delete('/content/delete/:contentId', function(req, res, next) 
{
    const p = req.params;
    Content.deleteContentById(p.contentId, function(err, content)
    {
        if (err) return next(err);
        res.send(content);
    });
});

module.exports = router;
