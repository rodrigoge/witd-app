import React, { useState } from 'react'
import './styles.css'
import { Link, useHistory } from 'react-router-dom'
import { MdPayment } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import Lottie from 'react-lottie'
import LogoDoctors from '../../assets/home-doctors.json'
import Logo from '../../assets/favicon.png'
import api from '../../services/api'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login(){
    const [crm, setCrm] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault()

        const data = { crm, password }

        try {
            await api.post('/', data)

            localStorage.setItem('crm', crm);
            localStorage.setItem('password', password);
            history.push('/register');
        } catch (err) {
            toast.error('❌ Erro ao fazer login')
        }
    }

    async function handleOnlyNumbers(event){
        var charCode = event || window.event
        var regex = /[0-9]|\./;
        var key = charCode.keyCode || charCode.which;

        key = String.fromCharCode(key);

        if(!regex.test(key)) {
            charCode.returnValue = false;
            if(charCode.preventDefault) charCode.preventDefault();
        }
    }

    async function handleWithoutSpace(event){
        var charCode = event || window.event
        var regex = /[a-zA-Z0-9\u00C0-\u00FF]|\./;
        var key = charCode.keyCode || charCode.which;

        key = String.fromCharCode(key);

        if(!regex.test(key)) {
            charCode.returnValue = false;
            if(charCode.preventDefault) charCode.preventDefault();
        }
    }

    async function handleShowHidePassword(){
        var span = document.getElementById('spanId')
        var pwd = document.getElementById('password')

        if(pwd.type === 'password'){
            pwd.type = "text";
            span.innerHTML = 'Ocultar';
        } else { 
            pwd.type = "password"
            span.innerHTML = 'Mostrar';
        }
    }

    const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: LogoDoctors,
            rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return(
        <div className="login-container">
            <div class="logos">
                <img src={Logo} alt=""/>
                <Lottie options={defaultOptions}/>
            </div>

            <section className="form">
                <form onSubmit={handleLogin}>
                    <h1>Olá, seja bem vindo Doutor(a).</h1>
                    
                    <div id="divCrm">
                        <MdPayment className="icon"/>
                        <input 
                            type="text" 
                            placeholder="CRM"
                            value={crm}
                            onChange={e => setCrm(e.target.value)}
                            onKeyPress={handleOnlyNumbers}
                            maxLength={7}
                            required    
                        />
                    </div>

                    <div id="divPassword">
                        <RiLockPasswordLine className="icon"/>
                        <input 
                            id="password" 
                            type="password" 
                            placeholder="Senha"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            onKeyPress={handleWithoutSpace}
                            maxLength={6}
                            required
                        />
                        
                        <span id="spanId" className="showHide" onClick={handleShowHidePassword}>Mostrar</span>
                    </div>

                    <button type="submit" id="btnRegister" className="button">
                        Entrar
                    </button>

                    <Link id="link-home" className="link" to="/register">
                        <p>Não tem cadastro? <span>Clique aqui.</span></p>
                    </Link>
                </form>
            </section>

            <ToastContainer 
                transition={Slide}  
            />
        </div>
    )
}