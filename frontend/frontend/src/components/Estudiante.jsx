
const Estudiante = (props) => {
    const {nombre, edad, url} = props;
    return(
        <div>
            <h1>
                {nombre}
            </h1>
            <h2>
                {edad}
            </h2>
            <a href={url}>Home page</a>
        </div>
    );
}

export default Estudiante;