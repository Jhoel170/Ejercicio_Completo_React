const Usuario = (props) => {
    const { nombre, email } = props;

    return(
        <div>
            <h1>{nombre}</h1>
            <h2>{email}</h2>
        </div>
    );
}

export default Usuario;