// Modules
const request = require('request')
const cheerio = require('cheerio')

// 1337x.to base URL
let tpbURL = 'https://thepiratebay.org'

module.exports = {
  search: function(keyword, cb) {
    let torrents = []
    var reqURL = tpbURL + '/search/' + keyword + '/0/99/0'
    request(reqURL, function(err, res, body) {
      var $ = cheerio.load(body)
      $('table#searchResult tr').each(function(index, el) {
        var torrent = {}
        torrent.name = $(this).find('a.detLink').text()
        torrent.seeders = $(this).find('td:nth-child(3)').text()
        torrent.leechers = $(this).find('td:nth-child(4)').text()
        torrent.url = tpbURL + $(this).find('a.detLink').attr('href')
        torrent.magnet = $(this).find('td:nth-child(2)').find('a:nth-child(1)').attr('href')
        if (torrent.name !== '') {
          torrents.push(torrent)
        }
      })
      return cb(null, torrents)
    })
  }
}
