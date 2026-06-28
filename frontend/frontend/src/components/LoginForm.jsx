import { useState } from "react";
const LoginForm = (props) =>{

const {onLogin} = props;
const [login, setLogin] = useState({
    email: "",
    password: "",
})

const handlerSubmit = async (e) => {
    e.preventDefault();
    onLogin(login.email, login.password)
}

const handlerChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };


    return(
        <div>
            <h1>LOGIN</h1>
            <form onSubmit={handlerSubmit}>
                <div>
                <label htmlFor="loginEmail">Email:</label>
                <input type="email" name="email" id="loginEmail" value={login.email} onChange={handlerChange}/>
            </div>
            <div>
                <label htmlFor="loginPassword">Contraseña:</label>
                <input type="password" name="password" id="loginPassword" value={login.password} onChange={handlerChange}/>
            </div>
            <div>
                <input
                
                type="submit" 
                value="Ingresar" />
            </div>
            </form>
        </div>
    )
}

export default LoginForm;