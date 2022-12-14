import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Login from './login';
import Loading from '../components/Loading';
import { useEffect, useState } from 'react';
import {chatClient } from '../stream';
import { userClient } from '../sanity';

function MyApp({ Component, pageProps }) {

  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    async function init() {

      if(user) {

        const doc = {
          _id: user.uid,
          email: user.email,
          uid: user.uid,
          _type: 'users'
        }

        await chatClient.connectUser({
          id: user.uid,
          name: user.email
        },
        chatClient.devToken(user.uid)
        )

        const sort = [0]

        const filter = { type: 'messaging', members: { $in: ['waZdAAjZvNaFbB4Focyoblp78P12'] && [user.uid]}}
        const setUp = await chatClient.queryChannels(filter, sort, {
          watch: true
        })
        
        if(setUp.length == 0) {
            const channel = await chatClient.channel('messaging', {
              members: [user.uid, "waZdAAjZvNaFbB4Focyoblp78P12"]
          })
  
          await channel.watch()
        }
            
        
        userClient.createIfNotExists(doc).then((res) => {
          console.log(`User was create, document ID  is ${res.id}`)
        })

      }
    }
    init();
  
  }, [user])

  if(!user) return <Login />

  if(loading) return <Loading />

  return <Component {...pageProps} />
}

export default MyApp
