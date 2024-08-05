require('dotenv').config() 
const express = require('express')
const app = express()
const port = 3000

const githubData = {
  "login": "anish-k-mishra",
  "id": 107322619,
  "node_id": "U_kgDOBmWc-w",
  "avatar_url": "https://avatars.githubusercontent.com/u/107322619?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/anish-k-mishra",
  "html_url": "https://github.com/anish-k-mishra",
  "followers_url": "https://api.github.com/users/anish-k-mishra/followers",
  "following_url": "https://api.github.com/users/anish-k-mishra/following{/other_user}",
  "gists_url": "https://api.github.com/users/anish-k-mishra/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/anish-k-mishra/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/anish-k-mishra/subscriptions",
  "organizations_url": "https://api.github.com/users/anish-k-mishra/orgs",
  "repos_url": "https://api.github.com/users/anish-k-mishra/repos",
  "events_url": "https://api.github.com/users/anish-k-mishra/events{/privacy}",
  "received_events_url": "https://api.github.com/users/anish-k-mishra/received_events",
  "type": "User",
  "site_admin": false,
  "name": "Anish Mishra",
  "company": null,
  "blog": "",
  "location": null,
  "email": null,
  "hireable": null,
  "bio": "Senior in BIT Mesra, Ranchi, currently persuing B.Tech in EEE. My interests are in programming and development, and have created several projects in the same.",
  "twitter_username": null,
  "public_repos": 17,
  "public_gists": 0,
  "followers": 1,
  "following": 0,
  "created_at": "2022-06-11T19:12:35Z",
  "updated_at": "2024-08-05T18:44:53Z"
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/linkedin', (req, res)=>{
    res.send('Aniah Mishra')
})

app.get('/login', (req, res) => {
    res.send('<h2>Please Login</h2>')
})

app.get('/github', (req, res) => {
  res.json(githubData);
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
