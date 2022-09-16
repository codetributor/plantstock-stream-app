import { userClient } from '../../sanity';

export default async function handler(req, res) {

    const query = '*[_type == "users" && email == $recipient] {uid}'
    const params = { recipient: req.body.email }

    await userClient.fetch(query, params)
    .then(doc => {
      res.send(JSON.stringify(doc));
    })
    
  }