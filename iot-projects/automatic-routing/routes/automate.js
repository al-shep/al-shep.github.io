const express = require('express')
const { link } = require('../resources/model')
const { router } = require('../servers/http')

function createRouter (resource) {
    let router = express.Router()
    generateRoute(router, resource)
    return router
}


function generateRoute(router, resource) {
    if (resource.link) {
        router.route(resource.link).get(function (req, res, next) {
            let links = populateLinks(resource)
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

function populateLinks(resource) {
    const links = {}

    for (key in resource) {
        if (typeof resource[key] === 'object') {
            links[resource[key].name] = resource[key].link
        }
    }

    return links
}

module.exports = createRouter