import { apiDir } from "../../helpers/api";

export const memberDelete = async(id) => {
    const urlMember =`${apiDir}/api/member`;
    const configMember = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    }
    const respMember = await fetch( urlMember, configMember );
    const resulMember= await respMember.json();
    console.log(resulMember);
}
