/*
 * This file is part of the nivo project.
 *
 * (c) 2016-today Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

const Joi = require('joi')

exports.dimensions = {
    width: Joi.number().integer().required(),
    height: Joi.number().integer().required(),
    margin: Joi.object().keys({
        top: Joi.number().integer(),
        right: Joi.number().integer(),
        bottom: Joi.number().integer(),
        left: Joi.number().integer(),
    }),
}

exports.axis = Joi.object()
    .keys({
        orient: Joi.any().valid('top', 'right', 'bottom', 'left'),

        tickSize: Joi.number().min(0),
        tickPadding: Joi.number(),
        tickRotation: Joi.number(),

        legend: Joi.string().empty(''),
        legendPosition: Joi.any().valid('start', 'center', 'end'),
        legendOffset: Joi.number(),
    })
    .allow(null)

exports.axes = {
    axisTop: exports.axis,
    axisRight: exports.axis,
    axisBottom: exports.axis,
    axisLeft: exports.axis,
}
