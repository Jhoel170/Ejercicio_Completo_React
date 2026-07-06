const Usuario = require('../models/usuario.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const contraseña = "123";

const generarToken = (id, rol) => {
    return jwt.sign({ id, rol }, contraseña, { expiresIn: '1d' });
};

module.exports.getAllUsuarios = (req, res) => {
    Usuario.findAll()
        .then(usuarios => {
            res.status(200).json({
                success: true,
                data: usuarios
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Error al obtener usuarios',
                error: err.message
            });
        });
};

module.exports.getUsuarioById = (req, res) => {
    const { id } = req.params;
    
    Usuario.findByPk(id)
        .then(usuario => {
            if (!usuario) {
                return res.status(404).json({
                    success: false,
                    message: `Usuario con ID ${id} no encontrado`
                });
            }
            res.status(200).json({
                success: true,
                data: usuario
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Error al obtener el usuario',
                error: err.message
            });
        });
};

module.exports.createUsuario = async (req, res) => {
    const { nombre, password, email, rol } = req.body;

    if (!nombre || !password || !email) {
        return res.status(400).json({
            success: false,
            message: 'Campos vacios, son mandatorios!'
        });
    }

    try {
        const emailEncontrado = await Usuario.findOne({ where: { email } });

        if (emailEncontrado) {
            return res.status(400).json({
                success: false,
                message: 'Email ya usado'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        Usuario.create({ nombre, email, password: hashedPass, rol })
            .then(usuario => {
                res.status(201).json({
                    success: true,
                    message: 'Usuario creado exitosamente',
                    data: {
                        id: usuario.id,
                        nombre: usuario.nombre,
                        email: usuario.email,
                        rol: usuario.rol
                    }
                });
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    message: 'Error al crear el usuario',
                    error: err.message
                });
            });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el usuario',
            error: err.message
        });
    }
};

module.exports.updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body;

    try {
        const usuarioExistente = await Usuario.findByPk(id);

        if (!usuarioExistente) {
            return res.status(404).json({
                success: false,
                message: `Usuario con ID ${id} no encontrado`
            });
        }

        if (email && email !== usuarioExistente.email) {
            const emailEncontrado = await Usuario.findOne({ where: { email } });
            if (emailEncontrado) {
                return res.status(400).json({
                    success: false,
                    message: 'Email ya usado'
                });
            }
        }

        Usuario.update(
            { nombre, email },
            { where: { id } }
        )
            .then(() => Usuario.findByPk(id))
            .then(usuarioNuevo => {
                res.status(200).json({
                    success: true,
                    message: 'Usuario actualizado exitosamente',
                    data: {
                        id: usuarioNuevo.id,
                        nombre: usuarioNuevo.nombre,
                        email: usuarioNuevo.email,
                        rol: usuarioNuevo.rol
                    }
                });
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    message: 'Error al actualizar el usuario',
                    error: err.message
                });
            });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el usuario',
            error: err.message
        });
    }
};

module.exports.deleteUsuario = (req, res) => {
    const { id } = req.params;

    Usuario.findByPk(id)
        .then(usuario => {
            if (!usuario) {
                return res.status(404).json({
                    success: false,
                    message: `Usuario con ID ${id} no encontrado`
                });
            }
            return Usuario.destroy({ where: { id } });
        })
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'Usuario eliminado exitosamente'
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar el usuario',
                error: err.message
            });
        });
};

module.exports.loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email y password son obligatorios'
        });
    }

    try {
        const emailEncontrado = await Usuario.findOne({ where: { email } });

        if (!emailEncontrado) {
            return res.status(400).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        const passwordValida = await bcrypt.compare(password, emailEncontrado.password);

        if (!passwordValida) {
            return res.status(400).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        const token = generarToken(emailEncontrado.id, emailEncontrado.rol);

        res.status(200).json({
            success: true,
            message: 'Login exitoso',
            data: {
                id: emailEncontrado.id,
                email: emailEncontrado.email,
                rol: emailEncontrado.rol,
                token: token
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al iniciar sesión',
            error: err.message
        });
    }
};