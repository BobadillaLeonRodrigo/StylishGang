import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { FirebaseContext } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import FileUploader from 'react-firebase-file-uploader';

const NuevoArticulo  = () => {

//State para las imagenes
const [subiendo, guardarSubiendo] = useState(false);
const [progreso, guardadProgreso] = useState(0);
const [urlimagen, guardadUrlimagen] = useState('');

//Context con las operaciones de firebase
const { firebase } = useContext(FirebaseContext)
/* 
    console.log(firebase); para visualizar si se hizo correctamente en la consola del navegador
*/

//Hook para redireccionar
const navigate = useNavigate();

//Validación y leer datos del formulario
const formik = useFormik ({
    initialValues:{
        nombre: '',
        precio: '',
        categoria: '',
        imagen: '',
        descripcion: '',
    },
    validationSchema: Yup.object({
        nombre: Yup.string()
            .min(3,'Los Articulos deben de tener al menos 3 caracteres')
            .required('Agrega un Nombre al Articulo'),
        precio: Yup.number()
            .min(1,'Agrega al menos un número')
            .required('Agrege un precio al Articulo'),
        categoria: Yup.string()
            .required('Agregar un Categoria del Articulo'),
        descripcion: Yup.string()
            .min(10,'La descripcion debe ser mas larga')
            .required('La descripción es obligatoria'),
    }),
    onSubmit: articulos => {
        try {
            articulos.existencia = true;
            //Agregar url como parte del articulo
            articulos.imagen = urlimagen;

            firebase.db.collection('Articulos').add(articulos);
            // en caso de que agregue correctamente vamos a redireccionar
            navigate('/Tienda')
        } catch (error) {
            console.log(error);
        }
    }
});

//Todo sobre las imagenes (Para subir img)
const handleUploadStart = () => {
    guardadProgreso(0);
    guardarSubiendo(true);
}       
const handleUploadError = error => {
    guardarSubiendo(false);
    console.log(error)
}
const handleUploadSuccess = async nombre => {
    guardadProgreso(100);
    setTimeout(() => {
        guardarSubiendo(false);
    }, 1000)
    //Almacenar la url de destino
    const url = await firebase
            .storage
            .ref("Productos-Imagenes")
            .child(nombre)
            .getDownloadURL();

        console.log(url);
        guardadUrlimagen(url);
}
const handleProgress = progreso => {
    guardadProgreso(progreso);
    console.log(progreso);
}


    return(
        <>
        <h1 className="text-3xl font-light mb-4">Agregar Articulo</h1>
        <div className="flex justify-center mt-10"> 
            <div className="w-full max-w-3xl">
                <form
                    onSubmit={formik.handleSubmit}
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre</label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="nombre"
                                type="text"
                                placeholder="Nombre del Articulo"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                    </div>
                    { formik.touched.nombre && formik.errors.nombre ? (
                        <div className="bg-red-100 border-l-4-border-red-500 text-red-700 p-4 mb-5" role="alert">
                            <p className="font-bold">Hubo un Error:</p>
                            <p>{formik.errors.nombre}</p>
                        </div>
                    ) : null }


                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">Precio del Articulo</label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="precio"
                                type="number"
                                placeholder="$2500"
                                min="0"
                                value={formik.values.precio}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                    </div>
                    { formik.touched.precio && formik.errors.precio ? (
                        <div className="bg-red-100 border-l-4-border-red-500 text-red-700 p-4 mb-5" role="alert">
                            <p className="font-bold">Hubo un Error:</p>
                            <p>{formik.errors.precio}</p>
                        </div>
                    ) : null }


                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">Categoria</label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="categoria"
                                name="categoria"
                                value={formik.values.categoria}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">--Seleccione--</option>
                                <option value="Teclados">--Teclados--</option>
                                <option value="Monitores">--Monitores--</option>
                                <option value="Mouse">--Mouse--</option>
                                <option value="Targeta-Graficas">--Targeta Grafica--</option>
                                <option value="Memoria-Ram">--Memoria RAM--</option>
                                <option value="Discos Duros">--Discos Duros--</option>
                                <option value="Audifonos">--Audifonos--</option>
                                <option value="Videojuegos">--VideoJuegos--</option>
                            </select>
                    </div>
                    { formik.touched.categoria && formik.errors.categoria ? (
                        <div className="bg-red-100 border-l-4-border-red-500 text-red-700 p-4 mb-5" role="alert">
                            <p className="font-bold">Hubo un Error:</p>
                            <p>{formik.errors.categoria}</p>
                        </div>
                    ) : null }


                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">Imagen</label>
                            <FileUploader 
                                accept="image/*"
                                id="imagen"
                                name="imagen"
                                randomizeFilename
                                storageRef={firebase.storage.ref("Productos-Imagenes")}
                                onUploadStart={handleUploadStart}
                                onUploadError={handleUploadError}
                                onUploadSuccess={handleUploadSuccess}
                                onProgress={handleProgress}
                            />
                    </div>

                            { subiendo && (
                                <div className="h-12 relative w-full border">
                                    <div className="absolute left-0 top-0 text-black px-2 text-sm h-12 flex items-center" style={{width: `${progreso}%` }}>
                                        {progreso} %
                                    </div>
                                </div>
                            ) }
                            { urlimagen && (
                                <p className="text-black p-3 text-center my-5">
                                    La Imagen se subió correctamente
                                </p>
                            ) }

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">Descripción del Articulo</label>
                            <textarea 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                                id="descripcion"
                                placeholder="Describir el Articulo a Publicar"
                                value={formik.values.descripcion}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            ></textarea>
                    </div>
                    { formik.touched.descripcion && formik.errors.descripcion ? (
                        <div className="bg-red-100 border-l-4-border-red-500 text-red-700 p-4 mb-5" role="alert">
                            <p className="font-bold">Hubo un Error:</p>
                            <p>{formik.errors.descripcion}</p>
                        </div>
                    ) : null }


                    <input
                        type="submit"
                        className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
                        value="Agregar Articulo"
                    />
                </form>
            </div>
        </div>
        </>
    );
}
export default NuevoArticulo;