import { apiDir } from "../../helpers/api";

export const deleteHProject = async(id) => {
    const urlProject =`${apiDir}/api/project`;
    const configProject = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    }
    const respProject = await fetch( urlProject, configProject );
    const resulProject = await respProject.json();
    console.log(resulProject);
}




