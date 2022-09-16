import { chatClient } from '../../stream';

export default async function handler(req, res) {
    res.send({
        user: req.body.user,
        otherUser: req.body.otherUser
    })
  }