import postCareer from "../selectors/post/postCareer";
import postMember from "../selectors/post/postMember";
import postProject from "../selectors/post/postProject";
import { postPublication } from "../selectors/post/postPublication";
import postSchool from "../selectors/post/postSchool";
import { types } from "../types/types";


export const registerMember = (formValues) => {
     //Datos Member
    const {name, lastname, password, linkedin, email, 
            shortDesc, longDesc, status, photo, ss,
            nivel, start, end, idSchool, idCareer } = formValues;
    const dataMember = {
        id: 0,
        name: name,
        lastname: lastname, 
        password: password, 
        token: "",
        linkedin: linkedin, 
        email: email,
        short_desc: shortDesc, 
        long_desc: longDesc, 
        status: status || 'current', 
        photo_filename: photo, 
        ss: ss,
        //datos relacion member grade 
        idGrade: 0,
        idSchool: idSchool || 2,
        idCareer: idCareer || 1,
        type: nivel || 'bachelor',
        start: start || null,
        end: end || null
    }; 
    return async(dispatch) => {
        postMember(dataMember);
        dispatch(valMember(name, email));
    }
}

export const registerCareer = (formValues) => {
   //Datos Carrer
   const {shortName, name} = formValues;
   const dataCareer = {
       id: 0,
       short_name: shortName,
       name: name
   };

   return async(dispatch) => {
        //Enviar datos a career
        postCareer(dataCareer);
        dispatch(valCareer(name));
   }

}

export const registerInstitution = (formValues) => {

    //Datos School
    const {shortName, name} = formValues;
    const dataSchool = {
        id: 0,
        short_name: shortName,
        name: name
    };

    return async(dispatch) => {
        //Enviar datos a school
        postSchool(dataSchool);
        dispatch(valInstitution(name));
    }
}

export const registerProject = (formValues) => {
    //Datos project
    const {name, desc, status, impact, frontImg, modalMedia, modalType, link, idTech } = formValues;
    //datos tabla project y relacion tech_project
    const dataProject = {
        id: 0,
        name: name,
        descr: desc,
        status: status || 'indevelop',
        impact: impact,
        front_img: frontImg || 'project_front.jpg',
        modal_media: modalMedia ||'project_modal.jpg',
        modal_type: modalType || 'image',
        link: link,
        idTech: idTech || '1',
    }
    return (dispatch) => {
        //Enviar datos a project
        postProject(dataProject);
        dispatch(valProject(name));
    }

}

export const registerRelease = (formValues) => {
    //datos Publicacion
    const { postType, descr, idTech, frontImg, modalMedia, modalType, link, autor,
            title, journal, yearMonth, volume, number, pages, publisher, address,
            howpublished, booktitle, editor, series, organization, school, note,
            institution} = formValues;

    const dataRelease = {
        id: 0,
        postType: postType || 'article',
        descr: descr,
        idTech: idTech || 1,
        frontImg: frontImg,
        modalMedia: modalMedia,
        modalType: modalType || 'image',
        link: link,
        autor: autor,
        title: title,
        journal: journal,
        yearMonth: yearMonth || null,
        volume: volume,
        numbert: number,
        pages: pages,
        publisher: publisher,
        address: address,
        howpublished: howpublished,
        booktitle: booktitle,
        editor: editor,
        series: series,
        organization: organization,
        school: school,
        note: note,
        institution: institution
    }
    return async(dispatch) => {

        //Enviar datos a publication
        postPublication(dataRelease);        
        dispatch(valRelease(postType))
    }
}

const valMember = (name, email) => ({
    type: types.regMember,
    payload: {
        name,
        email
    }
});

const valProject = (name) => ({
    type: types.regProject,
    payload: {
        name
    }
});

const valRelease = (name) => ({
    type: types.regRelease,
    payload: {
        name
    }
});

const valCareer = (name) => ({
    type: types.regCareer,
    payload:{
        name
    }
});

const valInstitution = (name) => ({
    type: types.regInstitution,
    payload:{
        name
    }
})

const valTeach = (name) => ({
    type: types.regTeach,
    payload:{
        name
    }
})


