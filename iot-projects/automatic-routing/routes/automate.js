const express = require('express')
const { router } = require('../servers/http')

function createRouter (resource) {
    let router = express.Router()
    generateRoute(router, resource)
    return router
}


function generateRoute(router, resource) {
    if (resource.link) {
        router.route(resource.link).get(function (req, res, next) {
            let links = {}
            res.links(links)
            req.link = links
            req.result = resource
            next()
        })
    }

    for (key in resource) {
        if (typeof resource[key] === 'object') {
            generateRoute(router, resource[key])
        }
    }   
}


module.exports = createRouter