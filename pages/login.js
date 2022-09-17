import styled from 'styled-components';
import Head from 'next/head';
import GoogleButton from 'react-google-button'
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import Image from 'next/image';

const Login = () => {

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

    const signIn = () => {
        signInWithPopup(auth, provider)
        .catch(alert)
    }

    return(
        <div>
             <Container>
            <Head>Login</Head>
            <LoginContainer>
                <Logo src="/cactus/cactus-white.png" />
                <Description>When you chat with each other, your plant stays healthy.</Description> 
                <Description>When you stop chatting, the plant wilts and slowly dies.</Description>
                <Description>Only when you message again does the plant become healthy again...</Description>
                <Description><strong>Visualize Relationships</strong></Description>
                <GoogleButton 
                style={{
                    marginTop: "20px",
                }}
                onClick={signIn}
                />
            </LoginContainer>
        </Container>
         <PlantHero className="relative" alt="bg-login" src="/hero.jpg" 
         layout="fill"
         objectFit="cover"
         quality={100}
         />
         <HeroContainer>
         <CatchLineContainer>
         <CatchLine>A Chat App that Visualizes Relationships</CatchLine>
         <GoogleButton 
                style={{
                  position: "fixed",
                  top: "200px",
                  left: "550px"
                }}
                onClick={signIn}
                />
        </CatchLineContainer>
         
         </HeroContainer>
        </div> 
    )
}

export default Login
 
const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;

`;

const LoginContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    jusify-align: center;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
    width: 70%;
`;

const Logo = styled.img`
 height: 100px;
 width: 100px;
 margin-bottom: 20px;
`;

const Description = styled.p`
    color: grey;
    text-align: center;
    margin-bottom: 5px;
    margin-top: 5px;
    padding: 0px
`;
 
const PlantHero = styled(Image)`
    visibility: hidden;

    @media only screen and (min-width: 900px) {
      visibility: visible;
      zIndex: -1
    }
`;

const HeroContainer = styled.div`
  display: none;

  @media only screen and (min-width: 900px) {
  display: flex;
} 
`;

const CatchLine = styled.h1`
  display: none;

@media only screen and (min-width: 900px) {
  display: block;
  position: fixed;
  wrap: wrap;
  color: #77B871;
  width: 600px;;
  left: 550px;
  top: 30px;
}
  
`;

const CatchLineContainer = styled.div`
display: none;

@media only screen and (min-width: 900px) {
  display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 25px;
}

`;


