/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

const Joi = require('joi')
const { TreeMap } = require('nivo')
const common = require('./common')

module.exports = {
    component: TreeMap,
    schema: Joi.object().keys(
        Object.assign({}, common.dimensions, {
            root: Joi.object().required(),
            value: Joi.string().required(),
            identity: Joi.string().required(),
            leavesOnly: Joi.boolean(),
            tile: Joi.string(),
            enableLabels: Joi.boolean(),
            orientLabels: Joi.boolean(),
            label: Joi.string(),
            labelFormat: Joi.string(),
            labelSkipSize: Joi.number(),
            labelTextColor: Joi.string(),
            innerPadding: Joi.number(),
            outerPadding: Joi.number(),
            colors: Joi.string(),
            colorBy: Joi.string(),
            borderWidth: Joi.number(),
            borderColor: Joi.string(),
        })
    ),
    runtimeProps: [
        'width',
        'height',
        'colors',
        'leavesOnly',
        'tile',
        'enableLabels',
        'orientLabels',
        'label',
        'labelFormat',
        'labelSkipSize',
        'labelTextColor',
        'innerPadding',
        'outerPadding',
        'colors',
        'borderWidth',
        'borderColor',
    ],
    defaults: {
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
    },
}
