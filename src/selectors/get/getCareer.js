import { apiDir } from "../../helpers/api";

export const getCareer = async() => {
    
    const url = `${apiDir}/api/career`;
    const resp = await fetch( url );
    const data = await resp.json();

return data;   
}

/*const [escuela, listEscuela] = React.useState([])
React.useEffect(() => {
    const obtenerDatos = async () => {
        try {
            const Data = await getDocs(collection(db, "Escuela"));
            const arrayData = Data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            listEscuela(arrayData)
        } catch (error) {
            console.log(error)
        }
    }
    obtenerDatos()
}, [])

export{
    escuela
}*/