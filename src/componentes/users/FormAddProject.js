import React from 'react'
import { useGet } from '../../../src/hooks/useGet'
import { getProject } from '../../../src/selectors/get/getProject';
import ProjectCardUser from '../../../src/componentes/users/ProjectCardUser';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {db} from '../../../src/firebase/firebase-config'
import { collection, getDocs, where, get, query } from "firebase/firestore";
import {
	getAuth,
} from 'firebase/auth';

export const FormAddProject = () => {

    //const dispatch = useDispatch();

    //const { projects } = useSelector( state => state.projects );
    
    //const { data:project, loading } = useGet(getProject);
    const auth = getAuth();
    const dN = auth.currentUser.displayName;
	
    const [projects, setProjects] = React.useState([])
	React.useEffect(() => {
		const getProjects = async () => {
			try {
                const ref = collection(db, "Proyectos")
				const q = query(ref)
                const Data = await getDocs(q);
				const arrayData = Data.docs.map(doc => ({id: doc.id, ...doc.data()}))
				setProjects(arrayData)
				
			} catch (error) {
				console.log(error)
			}
		}
		getProjects()
	}, [])
    
    return (
        <>
            {/* { loading && <p className="animate__animated animate__flash">Loading</p> } */}
        
            <div className="card-columns animate__animated animate__fadeIn">
                {
                    projects.map(item => (
                        <ProjectCardUser
                            key={item.id}
                            {...item}
                        />
                    ))
                }
            </div>
        </>
    )
}

/*
import React from 'react'
import { useDispatch } from 'react-redux';
import { startNewProject, startUploadingProject } from '../../actions/projects';
import { useForm } from '../../hooks/useForm';

export const FormAddProject = () => {


	const dispatch = useDispatch();

	const [formValues, handleInputChange, reset] = useForm({
		name: '',
		descripcion: '',
		impact: '',
		link: '',
		nameTech: '',
		estado: 'indevelop'
	});

	const { name, descripcion, impact, nameTech, link, estado } = formValues;

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			dispatch(startUploadingProject(file));
		}
	}

	const handleEnvProyect = () => {
		dispatch(startNewProject(formValues));
		reset();
	}

	return (
		<div className="container">
			<div className="app-title">
				<h2>Agregar Proyecto </h2>
				<hr />
			</div>

			<div className="row">
				<div className="col mb-3">
					<label> Name </label>
					<input
						className="form-control"
						type='text'
						name='name'
						placeholder='Nombre: '
						value={name}
						onChange={handleInputChange}
					/>
				</div>
				<div className="col mb-3">
					<label> Enlace </label>
					<input
						className="form-control"
						type='url'
						name='link'
						placeholder='Enlace'
						value={link}
						onChange={handleInputChange}
					/>
				</div>
			</div>

			<div className="col mb-3">
				<label>Description</label>
				<textarea
					className="form-control"
					rows='3' cols='40'
					name='descripcion'
					placeholder=' Desciption'
					value={descripcion}
					onChange={handleInputChange}
				/>
			</div>
			<div className="col mb-3">
				<label> Tech </label>
				<input
					className="form-control"
					type='text'
					name='nameTech'
					placeholder='Nombre Téncologia: '
					value={nameTech}
					onChange={handleInputChange}
				/>
			</div>
			<div className="col mb-3">
				<label> Impacto </label>
				<textarea
					className="form-control"
					rows='6'
					name='impact'
					placeholder='Impacto: '
					value={impact}
					onChange={handleInputChange}
				/>
			</div>
			<div className="row">
				<div className="col mb-6">
					<input
						className='form-control'
						type="file"
						name="file"
						onChange={handleFileChange}
					/>
				</div>
				<div className="col mb-3">
					<label>Status </label>
					<select
						className="form-control"
						name='estado'
						value={estado}
						onChange={handleInputChange}
					>
						<option value='indevelop' > Indevelop </option>
						<option value='completed' > Completed </option>
					</select>
				</div>

			</div>
			<button
				className="btn2 btn-primary btn-large btn-block"
				onClick={handleEnvProyect}
			>
				Agregar
			</button>

		</div>
	)
}*/
