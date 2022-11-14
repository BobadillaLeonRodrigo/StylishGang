import React, {useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import Articulo from "../ui/Articulo";


const Tienda  = () => {

    // definis el state para  los articulos
    const [ articulo, guardarArticulo ] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    //consultar la base de datos la cargar
    useEffect(() => {
        const obtenerArticulos = () => {
            firebase.db.collection('Articulos').onSnapshot(manejarSnapshot);
        }
        obtenerArticulos();
    }, []);

    //Snapshot nos permite utilizar la base de datos en tiempo rela de firestore // ... hace una copia del doc actual
    function manejarSnapshot(snapshot) {
        const Articulos = snapshot.docs.map(doc => {
            return{
                id: doc.id,
                ...doc.data()
            }
        });
        //alamacenar los resultado en el state
        guardarArticulo(Articulos);
    }

    return(
        <>
        <h1 className="text-3xl font-light mb-4">Tienda</h1>
        <Link to="/nuevo-articulo" className=" bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold">
        Agregar Periferico
        </Link>

        {articulo.map(articulo => (
            <Articulo 
                key={Articulo.id}
                articulo={articulo}

            />
        ) )}

        </>
    );
}
export default Tienda;