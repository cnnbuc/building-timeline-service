module.exports = app => {
  const { STRING, TEXT, INTEGER, BOOLEAN, DATE, FLOAT } = app.Sequelize

  const Building = app.model.define(
    'buildings',
    {
      code: {
        type: STRING(255),
        allowNull: false
      },
      name: {
        type: STRING(255),
        allowNull: false
      },
      city: {
        type: STRING(255),
        allowNull: false
      },
      picUrl: {
        type: STRING(255)
      },
      height: {
        type: FLOAT,
        allowNull: false
      },
      width: {
        type: FLOAT,
        allowNull: false
      },
      layers: {
        type: INTEGER,
        allowNull: false
      },
      address: {
        type: STRING(255),
        defaultValue: ''
      },
      isShow: {
        type: Boolean,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      indexes: [
        {
          fields: ['name']
        },
        {
          fields: ['city']
        }
      ]
    }
  )

  Building.associate = function() {
    app.model.Building.hasMany(app.model.Process, {
      foreignKey: 'bid'
    })
    app.model.Building.hasMany(app.model.Svgfile, {
      foreignKey: 'bid'
    })
  }

  return Building
}
