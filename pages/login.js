import styled from 'styled-components';
import Head from 'next/head';
import GoogleButton from 'react-google-button'
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const Login = () => {

    const signIn = () => {
        signInWithPopup(auth, provider)
        .catch(alert)
    }

    return(
        <Container>
            <Head>Login</Head>
            <LoginContainer>
                <Logo src="/cactus-1.png" />
                <Description>When you chat with each other, your plant stays healthy.</Description> 
                <Description>When you stop chatting, the plant wilts and slowly dies.</Description>
                <Description>Only when you message again does the plant become healthy again...</Description>
                <GoogleButton 
                style={{
                    marginTop: "20px",
                }}
                onClick={signIn}
                />
            </LoginContainer>
        </Container>
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