import { apiDir } from "../../helpers/api";

export const getSchool = async() => {
    
    const url = `${apiDir}/api/school`;
    const resp = await fetch( url );
    const data = await resp.json();

return data;   
}
