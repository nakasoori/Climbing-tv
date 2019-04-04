//Instantiate with environment variables for development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//Express server
const express = require('express') //Express server
const app = express(); //Instantiate server
const path = require('path');

//Neo4j for GrapheneDB
const neo4j = require('neo4j-driver').v1;
const graphenedbURL = process.env.GRAPHENEDB_BOLT_URL
const graphenedbUser = process.env.GRAPHENEDB_BOLT_USER
const graphenedbPass = process.env.GRAPHENEDB_BOLT_PASSWORD
const driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass));
const Cypher = require('cypher-tagged-templates').default
const session = driver.session();
const cypher = new Cypher({driver}).query

//Cypher queries 
const getDB = 'MATCH (n) RETURN n'
const deleteDB = 'MATCH (n:Video {type: "recent"}) DETACH DELETE n'
const getTrending = 'MATCH (n:Video {type: "trending"}) RETURN n'
const getRecent = 'MATCH (n:Video {type: "recent"}) RETURN n'

//Youtube imports
const { YoutubeDataAPI } = require("youtube-v3-api")
const yt = new YoutubeDataAPI(process.env.YTKEY)
const searchYoutube = require('youtube-api-v3-search');


app.set('port', process.env.PORT);

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join(__dirname, 'assets')));

/* Return items[]
  { 
    kind: 'youtube#searchResult',
    etag: '"XpPGQXPnxQJhLgs6enD_n8JR4Qk/ZjXfRbbF1pM25jPFWjHGK0ETYnI"',
    id: { kind: 'youtube#video', videoId: 'wS9OGHe16R4' },
    snippet:
    { publishedAt: '2019-03-29T21:24:10.000Z',
       channelId: 'UC_gSotrFVZ_PiAxo3fTQVuQ',
       title: 'WORLDS HARDEST CLIMBING TEST | #153',
       description:
        'This is by far the hardest climbing test I have ever done! Check out www.crimpd.com for more info about Lattice. Tom Randall - @tompaulrandall Ollie Torr ...',
       thumbnails: { default: [Object], medium: [Object], high: [Object] },
       channelTitle: 'Magnus Midtbø',
       liveBroadcastContent: 'none' 
    } 
  }
*/
app.get('/featured', async(req, res) => {
  // console.log('request for featured video')
  // res.send('response')
  const getFeatured = `MATCH(n: Video {type: \'featured\'}) RETURN n`
  const query = cypher(getFeatured)
  const result = await query.run()
  res.send(result)
})

app.get('/trending', async (req, res) => {
  console.log('/trending')
  try {
    const query = cypher(getTrending)
    const result = await query.run()
    if(result.length !== 5)
      res.send('ERROR')

    res.send(result)
  }
  catch(err) {
    console.log(err)
  }
})

app.get('/recent', async (req, res) => {
  console.log('/recent')
  try {
    const query = cypher(getRecent)
    const result = await query.run()
    if(result.length !== 5)
      res.send('ERROR')

    res.send(result)
  }
  catch(err) {
    console.log(err)
  }
})


app.get('/videos', async (req, res) => {
  console.log('/videos')
  try {
    const data = await yt.searchAll("Bouldering", 5, {/*pageToken: 'CAEQAA'*/type: 'video'})
    const items = data.items
    for(let item of items) {
      const videoId = item.id.videoId
      const videoTitle = item.snippet.title
      const channelId = item.snippet.channelId
      const channelTitle = item.snippet.channelTitle
      const thumbnail = item.snippet.thumbnails.medium.url
      const query = cypher`CREATE (video:Video {videoId:${videoId}, videoTitle:${videoTitle}, channelId:${channelId}, channelTitle:${channelTitle}, thumbnail:${thumbnail}, type: "recent" }) RETURN video`
      const result = await query.run()

    }
    res.send('Done with videos')
  }
  catch(err) {
    console.log(Object.keys(err.response))
    console.log(err.response.status)
    console.log(err.response.statusText)
    console.log(err.response.data)
    res.send(err)
  }
})

app.get('/delete', async (req,res) => {
  const query = cypher(deleteDB)
  const result = await query.run()
  res.send(result)
})

app.get('/getDB', async (req,res) => {
  const query = cypher(getDB)
  const result = await query.run()
  console.log(result.length)
  res.send(result)
})

//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}
else {
  //build mode
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/public/index.html'));
  })
}


//tell express to listen for requests(start server)
//this sets up the server on localhost 3001
app.listen(process.env.PORT, function(){
    console.log(`server has started on port ${process.env.PORT}` );
});