import React, { useState } from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
/* animations */
import Lottie from 'react-lottie'
import LogoDoctors from '../../assets/register-doctors.json'
import Logo from '../../assets/favicon.png'
/* icons */
import { FiUser, FiPhone, FiMapPin } from 'react-icons/fi'
import { MdPayment } from 'react-icons/md'
import { RiToolsLine, RiLockPasswordLine } from 'react-icons/ri'
import api from '../../services/api'
/* notifications */
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register(){
    const [name, setName] = useState('')
    const [crm, setCrm] = useState('')
    const [speciality, setSpeciality] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [password, setPassword] = useState('')

    async function handleRegister(e){
        e.preventDefault()

        const data = { name, crm, speciality, phone, city, password }

        try {
            await api.post('/doctor', data)
            toast.success('👏 Cadastrado com sucesso')
        } catch (err) {
            toast.error('❌ Erro cadastrar')
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

    async function handleOnlyLetters(event){
        var charCode = event || window.event
        var regex = /[a-zA-Z\u00C0-\u00FF\s]|\./;
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

        const defaultOptions = {
                loop: true,
                autoplay: true,
                animationData: LogoDoctors,
                rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
            },
        };

    return(
        <div className="register-container">
            <div class="logos">
                <img src={Logo} alt=""/>
                <Lottie options={defaultOptions}/>
            </div>

            <section className="form">
                <form onSubmit={handleRegister}>
                    <h1>Cadastre-se agora, é gratuito.</h1>

                    <div id="divName">
                        <FiUser className="icon"/>
                        <input
                            type="text" 
                            placeholder="Nome completo"
                            value={name}
                            onKeyPress={handleOnlyLetters}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    
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
                    
                    <div id="divSpeciality">
                        <RiToolsLine className="icon"/>
                        <input 
                            type="text" 
                            placeholder="Especialidade"
                            value={speciality}
                            onChange={e => setSpeciality(e.target.value)}
                            onKeyPress={handleOnlyLetters}
                            required
                        />
                    </div>
                    
                    <div id="divPhone">
                        <FiPhone className="icon"/>
                        <input 
                            type="text" 
                            placeholder="DDD + Telefone/WhatsApp"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            onKeyPress={handleOnlyNumbers}
                            maxLength={12}
                            required
                        />
                    </div>

                    <div id="divCity">
                        <FiMapPin className="icon"/>
                        <input 
                            type="text" 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            onKeyPress={handleOnlyLetters}
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
                        Cadastrar
                    </button>

                    <Link id="link-home" className="link" to="/">
                        <p>Já tem registro? <span>Clique aqui.</span></p>
                    </Link>
                </form>
            </section>

            <ToastContainer 
                transition={Slide}  
            />
        </div>
    )
}