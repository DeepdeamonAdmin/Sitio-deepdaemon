import React from 'react'
import { useDispatch } from 'react-redux';
import { registerProject } from '../../../actions/register';
import { useForm } from '../../../hooks/useForm';
import { useGet } from '../../../hooks/useGet';
import { getTech } from '../../../selectors/get/getTech';

export const FormAddProject = () => {


    const dispatch = useDispatch();
    const [ formValues, handleInputChange ] = useForm({
		name: '',
        desc: '',
		status: '',
        impact: '',
        frontImg:'',
        modalMedia:'',
        modalType:'',
        link:'',
		idTech: ''
	});

    const {name, desc, impact, frontImg, modalMedia, link } = formValues;

	
	// const [file, setFile] = useState(null);

	// const selectedHandler = e => {
	// 	setFile(e.target.files[0])
	// };
	
	// const sendHandler = () => {
	// 	if(!file){
	// 		alert('you must upload file')
	// 		return
	// 	}

	// 	const formdata = new FormData()
	// 	formdata.append('image', file)
	// 	document.getElementById('fileinput').value = null

	// 	setFile(null)
	// };
	

    //envio a la api
    const handleSubmit = (e) => {
        e.preventDefault();
		dispatch( registerProject(formValues) );
		console.log(formValues);
    }

	//Traemos la información de tech
	const { data } = useGet(getTech);

    return (
        <div className="container">
			<div className="app-title">
            		<h2>Agregar Proyecto </h2>
				<hr/>
			</div>
			<form onSubmit={ handleSubmit }>
				<div className="row">
					<div className="col mb-3">
						<label> Name </label>
						<input
							className="form-control" 
							type='text'
							name='name'
							placeholder='Name'
							value = { name }
							onChange={ handleInputChange }
						/>
					</div>
					<div className="col mb-3">
						<label> Enlace </label>
						<input 
							className="form-control"
							type='url'
							name='link'
							placeholder='Enlace'
							value = { link }
							onChange={ handleInputChange }
						/>
					</div>
				</div>
				
				<div className="col mb-3">
					<label>Description</label>
					<textarea
						className="form-control"
						rows='3' cols='40'
						name='desc'
						placeholder=' Desciption'
						value = { desc }
						onChange={ handleInputChange }
					/>
				</div>
				<div className="col mb-3">
					<label> Tech </label>
					<select
							className="form-control"
							name='idTech'
							onChange={ handleInputChange }
						>
							{
								data.map(item =>(
									<option key={item.id} value={item.id}> {item.descr} </option>
								))
							}
						</select>
				</div>
				<div className="col mb-3">
					<label> Impact </label>
					<textarea
						className="form-control"
						rows='6' 
						name='impact'
						placeholder='Impact'
						value = { impact }
						onChange={ handleInputChange }
					/>
				</div>
				<div className="row">
					<div className="col mb-3">
						<label>Front Img</label>
							<input 
								className="form-control"
								type='file'
								name='frontImg'
								value = { frontImg }
								onChange={ handleInputChange }
							/>
					</div>

					<div className="col mb-3">
						<label>Modal Media </label>
							<input 
								className="form-control"
								type='file'
								name='modalMedia'
								value = { modalMedia }
								onChange={ handleInputChange }
							/>
					</div>
					<div className="col mb-3">
						<label>Tipe </label>
						<select
							className="form-control"
							name='modalType'
							onChange={ handleInputChange }
						>
							<option value = 'image' > image </option>
							<option value = 'video' > video </option>
							<option value = 'embed' > embed </option>
						</select>
					</div>

					<div className="col mb-3">
						<label>Status </label>
						<select
							className="form-control"
							name='status'
							onChange={ handleInputChange }
						>
							<option value = 'indevelop' > Indevelop </option>
							<option value = 'completed' > Completed </option>
						</select>
					</div>

				</div>                
				<button
					className="btn2 btn-primary btn-large btn-block"
					type="submit"					
				>
					Agregar
				</button>
				
			</form>
		</div>
    )
}
