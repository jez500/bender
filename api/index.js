const express = require('express')
const app = express()
app.use(express.urlencoded({extended: true}));
app.use(express.json())
const fs = require('fs');
const fsPromises = fs.promises;
import { CONFIG_FILEPATH } from "./config"
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { _ } from 'lodash'

// Save
app.post('/save', (req, res) => {
  fs.writeFile(CONFIG_FILEPATH, JSON.stringify(req.body), (err) => {
     if (err) {
       console.error(err);
       return res.status(500).send();
     }
  });
  return res.status(200).send();
})

// Icon lookup
app.get('/icon', (req, res) => {
  const icons = Object.values(fas)
    .concat(Object.values(fab))

  const keyword = req.query?.search || null
  let results = []

  if (keyword) {
    results = _.filter(icons, icon => {
      const searchString = icon.iconName + ' ' + icon.icon[2].join(' ')
      return searchString.includes(keyword)
    })

    results = _.map(_.uniqBy(results, 'iconName'), icon => {
      return {
        icon: icon.iconName,
        code: icon.prefix + ' fa-' + icon.iconName,
        name: icon.iconName.split('-').join(' '),
      }
    })
  }

  return res.status(200).send(_.sortBy(results, 'name'));
})

// Image lookup
app.get('/image', async (req, res) => {
  const keyword = req.query?.search || null
  let results = []

  if (keyword) {
    const files = await fsPromises.readdir('static/images')
    results = _.filter(files, file => file.includes(keyword))
  }

  return res.status(200).send(results);
})

module.exports = app
