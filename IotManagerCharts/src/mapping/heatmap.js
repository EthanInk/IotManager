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
const { HeatMap } = require('nivo')
const common = require('./common')

module.exports = {
    component: HeatMap,
    schema: Joi.object().keys(
        Object.assign({}, common.dimensions, common.axes, {
            // data
            data: Joi.array().min(1).required(),
            indexBy: Joi.string().required(),
            keys: Joi.array().sparse(false).min(1).unique().required(),

            minValue: Joi.alternatives().try(Joi.any().valid('auto'), Joi.number()).required(),
            maxValue: Joi.alternatives().try(Joi.any().valid('auto'), Joi.number()).required(),

            forceSquare: Joi.boolean(),
            sizeVariation: Joi.number().min(0).max(1),
            padding: Joi.number(),

            // cells
            cellShape: Joi.any().valid(['rect', 'circle']),
            cellOpacity: Joi.number().min(0).max(1),
            cellBorderWidth: Joi.number().min(0),
            cellBorderColor: Joi.string(),

            // grid
            enableGridX: Joi.boolean(),
            enableGridY: Joi.boolean(),

            // labels
            enableLabels: Joi.boolean(),
            labelTextColor: Joi.string(),

            // theming
            colors: Joi.string(),
        })
    ),
    runtimeProps: ['width', 'height', 'colors'],
    defaults: {
        margin: { top: 60, right: 0, bottom: 0, left: 60 },
    },
}
