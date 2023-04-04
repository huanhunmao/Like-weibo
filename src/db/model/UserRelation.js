/**
 * @description userrelation 数据建模
 * @author fhj
*/

const seq = require('../seq')
const {INTEGER} = require('../types')

const UserRelation = seq.define('userRelation',{
    userId:{
        type:INTEGER,
        allowNull:false,
        comment:'用户 id'
    },
    followId:{
        type:INTEGER,
        allowNull:false,
        comment:'被关注 id'
    },

})

module.exports = UserRelation