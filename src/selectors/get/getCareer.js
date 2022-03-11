import { apiDir } from "../../helpers/api";

export const getCareer = async() => {
    
    const url = `${apiDir}/api/career`;
    const resp = await fetch( url );
    const data = await resp.json();

return data;   
}
