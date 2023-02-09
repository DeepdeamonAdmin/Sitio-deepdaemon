import React from 'react'
import { useDispatch } from 'react-redux';
import { registerRelease } from '../../../actions/register';
import { useForm } from '../../../hooks/useForm';
import { useGet } from '../../../hooks/useGet';
import { getTech } from '../../../selectors/get/getTech';
import { useNavigate } from 'react-router-dom';
import { startNewPublication, startUploadingPublication } from '../../../actions/publications';

export const FormAddRelease = () => {

	const a0 = document.getElementById("autor");
	const a1 = document.getElementById("title");
	const a2 = document.getElementById("journal");
	const a3 = document.getElementById("yearMonth");
	const a4 = document.getElementById("volume");
	const a5 = document.getElementById("number");
	const a6 = document.getElementById("pages");
	const a7 = document.getElementById("publisher");
	const a8 = document.getElementById("address");
	const a9 = document.getElementById("howpublished");
	const a10 = document.getElementById("booktitle");
	const a11 = document.getElementById("editor");
	const a12 = document.getElementById("series");
	const a13 = document.getElementById("organization");
	const a14 = document.getElementById("school");
	const a15 = document.getElementById("note");
	const a16 = document.getElementById("institution");

	//funcion que recibe el valor del input
	const cambio = (e) => {
		
		//Guardar el valor en una variable
		let valor = e.target.value;
		if(valor === "article"){
			a0.disabled = false;
			a1.disabled = false;
			a2.disabled = false;
			a3.disabled = false;
			a4.disabled = false;
			a5.disabled = false;
			a6.disabled = false;
			a7.disabled = true;
			a8.disabled = true;
			a9.disabled = true;
			a10.disabled = true;
			a11.disabled = true;
			a12.disabled = true;
			a13.disabled = true;
			a14.disabled = true;
			a15.disabled = true;
			a16.disabled = true;
		}
		else if(valor === "book"){
			a0.disabled = false;
			a1.disabled = false;
			a2.disabled = true;
			a3.disabled = false;
			a4.disabled = true;
			a5.disabled = true;
			a6.disabled = true;
			a7.disabled = false;
			a8.disabled = false;
			a9.disabled = true;
			a10.disabled = true;
			a11.disabled = true;
			a12.disabled = true;
			a13.disabled = true;
			a14.disabled = true;
			a15.disabled = true;
			a16.disabled = true;
		}
		else if(valor === "booklet"){
			a0.disabled = false;
			a1.disabled = false;
			a2.disabled = true;
			a3.disabled = false;
			a4.disabled = true;
			a5.disabled = true;
			a6.disabled = true;
			a7.disabled = true;
			a8.disabled = true;
			a9.disabled = false;
			a10.disabled = false;
			a11.disabled = true;
			a12.disabled = true;
			a13.disabled = true;
			a14.disabled = true;
			a15.disabled = true;
			a16.disabled = true;
		}
		else if(valor === "conference"){
			a0.disabled = false;
			a1.disabled = false;
			a2.disabled = false;
			a3.disabled = false;
			a4.disabled = false;
			a5.disabled = false;
			a6.disabled = false;
			a7.disabled = true;
			a8.disabled = true;
			a9.disabled = true;
			a10.disabled = true;
			a11.disabled = true;
			a12.disabled = true;
			a13.disabled = true;
			a14.disabled = true;
			a15.disabled = true;
			a16.disabled = true;
		}
		else if(valor === "inbook"){
			a0.disabled = false;
			a1.disabled = false;
			a2.disabled = true;
			a3.disabled = false;
			a4.disabled = true; 
			a5.disabled = true;
			a6.disabled = false;
			a7.disabled = false;
			a8.disabled = false;
			a9.disabled = true;
			a10.disabled = true;
			a11.disabled = false;
			a12.disabled = true;
			a13.disabled = true;
			a14.disabled = true;
			a15.disabled = true;
			a16.disabled = true;
		}
		else if(valor === "incollection"){
			a0.disabled = false;
			a1.disabled = false;
			a2.disabled = true;
			a3.disabled = false;
			a4.disabled = true;
			a5.disabled = true;
			a6.disabled = false;
			a7.disabled = false;
			a8.disabled = false;
			a9.disabled = true;
			a10.disabled = true;
			a11.disabled = false;
			a12.disabled = false;
			a13.disabled = true;
			a14.disabled = true;
			a15.disabled = true;
			a16.disabled = true;
		}
		else if(valor === "inproceedings"){
			a0.disabled = true;
			a1.disabled = true;
			a2.disabled = true;
			a3.disabled = true;
			a4.disabled = true;
			a5.disabled = true;
			a6.disabled = true;
			a7.disabled = true;
			a8.disabled = true;
			a9.disabled = true;
			a10.disabled = true;
			a11.disabled = true;
			a12.disabled = true;
			a13.disabled = true;
			a14.disabled = true;
			a15.disabled = true;
			a16.disabled = true;
		}
		else if(valor === "manual"){
			a0.disabled = false;
			a1.disabled = false;
			a2.disabled = true;
			a3.disabled = false;
			a4.disabled = true;
			a5.disabled = true;
			a6.disabled = true;
			a7.disabled = true;
			a8.disabled = false;
			a9.disabled = true;
			a10.disabled = true;
			a11.disabled = true;
			a12.disabled = true;
			a13.disabled = false;
			a14.disabled = true;
			a15.disabled = true;
			a16.disabled = true;
		}
		else if(valor === "mastersthesis" || valor === "phdthesis"){
			a0.disabled = false;
			a1.disabled = false;
			a2.disabled = true;
			a3.disabled = false;
			a4.disabled = true;
			a5.disabled = true;
			a6.disabled = true;
			a7.disabled = true;
			a8.disabled = false;
			a9.disabled = true;
			a10.disabled = false;
			a11.disabled = true;
			a12.disabled = true;
			a13.disabled = true;
			a14.disabled = false;
			a15.disabled = true;
			a16.disabled = true;
		}
		else if(valor === "proceedings"){
			a0.disabled = true;
			a1.disabled = false;
			a2.disabled = true;
			a3.disabled = false;
			a4.disabled = false;
			a5.disabled = true;
			a6.disabled = true;
			a7.disabled = false;
			a8.disabled = false;
			a9.disabled = true;
			a10.disabled = true;
			a11.disabled = true;
			a12.disabled = false;
			a13.disabled = false;
			a14.disabled = true;
			a15.disabled = true;
			a16.disabled = true;
		}
		else if(valor === "techreport"){
			a0.disabled = false;
			a1.disabled = false;
			a2.disabled = true;
			a3.disabled = false;
			a4.disabled = true;
			a5.disabled = false;
			a6.disabled = true;
			a7.disabled = true;
			a8.disabled = false;
			a9.disabled = true;
			a10.disabled = false;
			a11.disabled = true;
			a12.disabled = true;
			a13.disabled = true;
			a14.disabled = true;
			a15.disabled = true;
			a16.disabled = false;
		}
		else if(valor === "misc"){
			a0.disabled = false;
			a1.disabled = false;
			a2.disabled = true;
			a3.disabled = false;
			a4.disabled = true;
			a5.disabled = true;
			a6.disabled = true;
			a7.disabled = true;
			a8.disabled = true;
			a9.disabled = false;
			a10.disabled = true;
			a11.disabled = true;
			a12.disabled = true;
			a13.disabled = true;
			a14.disabled = true;
			a15.disabled = false;
			a16.disabled = true;
		}
		else{
			a0.disabled = false;
			a1.disabled = false;
			a2.disabled = true;
			a3.disabled = false;
			a4.disabled = true;
			a5.disabled = true;
			a6.disabled = true;
			a7.disabled = true;
			a8.disabled = true;
			a9.disabled = true;
			a10.disabled = true;
			a11.disabled = true;
			a12.disabled = true;
			a13.disabled = true;
			a14.disabled = true;
			a15.disabled = true;
			a16.disabled = true;
			
		}
	}
	
	
    const dispatch = useDispatch();
    const [ formValues, handleInputChange , reset] = useForm({
		postType: '',
        descr: '',
        frontImg: '',
        modalMedia: '',
        modalType: '',
        link: '',
        autor: '',
        title: '',
        journal: '',
        yearMonth: '',
        volume: '',
        number: '',
        pages: '',
        publisher: '',
        address: '',
        howpublished: '',
        booktitle: '',
        editor: '',
        series: '',
        organization: '',
        school: '',
        note: '',
        institution: '',
		display : 'Yes'
	});

    const { descr, frontImg, modalMedia, link, autor, title, postType,
            journal, yearMonth, volume, number, pages, publisher,
            address, howpublished, booktitle, editor, series, 
            organization, school, note, institution, display } = formValues;

	const handleFileChange = (e) => {
	const file = e.target.files[0];
		if ( file ) {
		  dispatch( startUploadingPublication( file ) );
		}
	}		
    //envio a la api
	const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
		dispatch( startNewPublication(formValues));
		reset();
		navigate('/admin/publications');
    }

	//Traemos la información de tech
	const { data } = useGet(getTech);



    return (
        <div className="container">
					<h2>Agregar Publicacion </h2>
				<hr/>
			
				<div className="row">
					<div className="col-md-2 mb-3">
						<label> Type </label>
						<select
							className="form-control"
							name='postType'
							onChange={(e) => cambio(e)  }
						>
							<option value = 'article' > article </option>
							<option value = 'book' > book </option>
							<option value = 'booklet' > booklet </option>
							<option value = 'conference' > conference </option>
							<option value = 'inbook' > inbook </option>
							<option value = 'incollection' > incollection </option>
							<option value = 'inproceedings' > inproceedings </option>
							<option value = 'manual' > manual </option>
							<option value = 'mastersthesis' > mastersthesis </option>
							<option value = 'misc' > misc </option>
							<option value = 'phdthesis' > phdthesis </option>
							<option value = 'proceedings' > proceedings </option>
							<option value = 'techreport' > techreport </option>
							<option value = 'unpublished' > unpublished </option>
						</select>
					</div>

					<div className="col mb-3">
					<label>Front Image </label>
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
					<div className="col-md-2 mb-3">
						<label> Type </label>
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
				</div>
				<div className="row">
					<div className="col mb-3">
						<label> Description </label>
						<textarea
							className="form-control"
							rows='3' cols='40'
							name='descr'
							placeholder=' Desciption'
							value = { descr }
							onChange={ handleInputChange }
						/>
					</div>
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



				<div className="row">
					<div className="col mb-3">
						<label> Autor </label>
						<input  							
							className="form-control"
							type='text'
							name='autor'
							id = 'autor'
							placeholder='Autor'
							value = { autor }
							onChange={ handleInputChange }
							disabled = {true}
						/>
					</div>
					<div className="col mb-3">
						<label> Title </label>
						<input  
							className="form-control"
							type='text'
							name='title'
							id = 'title'
							placeholder='Title'
							value = { title }
							onChange={ handleInputChange }
							disabled = {true}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col mb-3">
						<label> Link </label>
						<input  
							className="form-control"
							type='url'
							name='link'
							id = 'link'
							placeholder='Enlace'
							value = { link }
							onChange={ handleInputChange }
							disabled = {true}
						/>
					</div>
					
					<div className="col mb-3">
						<label>Journal</label>
						<input className="form-control" 
							type='text'
							name='journal'
							id = 'journal'
							placeholder='Journal'
							value = { journal }
							onChange={ handleInputChange }
							disabled = {true}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col mb-3">
							<label> Date </label>
							<input className="form-control" 
								type='date'
								min ='1900-01-01'
								name='yearMonth'
								id = 'yearMonth'
								value = { yearMonth }
								onChange={ handleInputChange }
								disabled = {true}
							/>
					</div>
					<div className="col mb-3">
						<label> Volume </label>
						<input className="form-control" 
							type='text'
							name='volume'
							id = 'volume'
							placeholder='Volume'
							value = { volume }
							onChange={ handleInputChange }
							disabled = {true}
						/>
					</div>
					<div className="col mb-3">
						<label>Number</label>
						<input className="form-control" 
							type='text'
							name='number'
							id = 'number'
							placeholder='Number'
							value = { number }
							onChange={ handleInputChange }
							disabled = {true}
						/>
					</div>
					<div className="col mb-3">
						<label>Pages</label>
						<input className="form-control" 
							type='text'
							name='pages'
							id = 'pages'
							placeholder='Pages'
							value = { pages }
							onChange={ handleInputChange }
							disabled = {true}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col mb-3">
						<label>Publisher</label>
						<input 
							className="form-control" 
							type='text'
							name='publisher'
							id = 'publisher'
							placeholder='Publisher'
							value = { publisher }
							onChange={ handleInputChange }
							disabled = {true}
						/>
					</div>
					<div className="col mb-3">
						<label> Address </label>
						<input className="form-control" 
							type='text'
							name='address'
							id = 'address'
							placeholder='Address'
							value = { address }
							onChange={ handleInputChange }
							disabled = {true}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col mb-3">
						<label> Howpublished </label>
						<input className="form-control" 
							type='text'
							name='howpublished'
							id = 'howpublished'
							placeholder='Howpublished'
							value = { howpublished }
							onChange={ handleInputChange }
							disabled = {true}
						/>
					</div>
					<div className="col mb-3">
						<label>Booktitle</label>
						<input className="form-control" 
							type='text'
							name='booktitle'
							id = 'booktitle'
							placeholder='Booktitle'
							value = { booktitle }
							onChange={ handleInputChange }
							disabled = {true}
						/>
					</div>

				</div>
				<div className="row">
					<div className="col mb-3">
						<label> Editor </label>
						<input className="form-control" 
							type='text'
							name='editor'
							id = 'editor'
							placeholder='Editor'
							value = { editor }
							onChange={ handleInputChange }
							disabled = {true}
						/>
					</div>
					<div className="col mb-3">
						<label> Series </label>
						<input className="form-control" 
							type='text'
							name='series'
							id = 'series'
							placeholder='Series'
							value = { series }
							onChange={ handleInputChange }
							disabled = {true}
						/>
					</div>
					
				</div>
				<div className="row">
					<div className="col mb-3">
						<label> Organization</label>
						<input className="form-control" 
							type='text'
							name='organization'
							id = 'organization'
							placeholder='Organization'
							value = { organization }
							onChange={ handleInputChange }
							disabled = {true}
						/>
					</div>
					<div className="col mb-3">
						<label> School </label>
						<input className="form-control" 
							type='text'
							name='school'
							id = 'school'
							placeholder='School'
							value = { school }
							onChange={ handleInputChange }
							disabled = {true}
						/>
				</div>
				</div>
				<div className="row">
					<div className="col mb-3">
						<label> Note </label>
						<input className="form-control" 
							type='text'
							name='note'
							id = 'note'
							placeholder='Note'
							value = { note }
							onChange={ handleInputChange }
							disabled = {true}
						/>
					</div>
					
					<div className="col mb-3">
						<label> Institution </label>
						<input className="form-control" 
							type='text'
							name='institution'
							id = 'institution'
							placeholder='Institution'
							value = { institution }
							onChange={ handleInputChange }
							disabled = {true}
						/>
					</div>
					<div className="col mb-3">
					<label>Mostrar en página principal</label>
					<select
						className="form-control"
						name='display'
						value={display}
						onChange={handleInputChange}
						required = 'true'
					>
						<option value='Si' > Si </option>
						<option value='No' > No </option>
					</select>
				</div>
				</div>
				<button
					className="btn2 btn-primary btn-large btn-block"
					onClick={handleSubmit}					
				>
					Agregar
				</button>
				
			
		</div>
    )
}
