const Controller = require('egg').Controller
const to = require('../utils/to')

class TimelineController extends Controller {
  async create() {
    const { ctx } = this
    const { bid, content, picUrl, date, type } = ctx.request.body

    const create = {
      bid,
      content,
      picUrl,
      userid: 1,
      date,
      type
    }

    const ret = await ctx.model.Timeline.create(create)
    ctx.body = { id: ret.id }
  }

  async delete() {
    const { ctx } = this
    const { id } = ctx.params

    await ctx.model.Timeline.destroy({
      where: {
        id
      }
    })
    ctx.body = { id }
  }

  async update() {
    const { ctx } = this
    const { id } = ctx.params
    const { bid, content, picUrl, date, type, isActive } = ctx.request.body

    const ret = await ctx.model.Timeline.update(
      {
        bid,
        content,
        picUrl,
        userid: 1,
        date,
        type,
        isActive
      },
      {
        where: { id }
      }
    )
    ctx.body = { id }
  }

  async list() {
    const { ctx } = this
    const where = {}
    const list = await ctx.model.Timeline.findAll({
      ...ctx.page,
      order: [['created_at', 'DESC']],
      include: [
        {
          model: ctx.model.User,
          attributes: ['id', 'name', 'avatar']
        },
        {
          model: ctx.model.Building,
          attributes: ['id', 'name']
        }
      ]
    })

    const total = await ctx.model.Timeline.count({ where })

    ctx.body = {
      code: 0,
      data: {
        ...ctx.page,
        total,
        list
      }
    }
  }
}

module.exports = TimelineController
