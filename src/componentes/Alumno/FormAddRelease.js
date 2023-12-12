import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { getAuth } from 'firebase/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { startNewPublication, startUploadingPublication } from '../../actions/publications';
import { db } from '../../firebase/firebase-config'
import { collection, getDocs } from "firebase/firestore";
import { editPublication } from '../../actions/edit';

export const FormAddRelease = () => {
	const auth = getAuth();
	const currentUser = auth.currentUser.displayName;
	// UseState para el select
	const [selectValue, setSelectValue] = useState('')
	// UseState para cada input
	const [autorDisabled, setAutorDisabled] = useState(false)
	const [titleDisabled, setTitleDisabled] = useState(false)
	const [journalDisabled, setJournalDisabled] = useState(true)
	const [yearMonthDisabled, setYearMonthDisabled] = useState(false)
	const [volumeDisabled, setVolumeDisabled] = useState(true)
	const [numberDisabled, setNumberDisabled] = useState(true)
	const [pagesDisabled, setPagesDisabled] = useState(true)
	const [publisherDisabled, setPublisherDisabled] = useState(true)
	const [addressDisabled, setAddressDisabled] = useState(true)
	const [howpublishedDisabled, setHowpublishedDisabled] = useState(true)
	const [booktitleDisabled, setBooktitleDisabled] = useState(true)
	const [editorDisabled, setEditorDisabled] = useState(true)
	const [seriesDisabled, setSeriesDisabled] = useState(true)
	const [organizationDisabled, setOrganizationDisabled] = useState(true)
	const [schoolDisabled, setSchoolDisabled] = useState(true)
	const [noteDisabled, setNoteDisabled] = useState(true)
	const [institutionDisabled, setInstitutionDisabled] = useState(true)
	useEffect(() => {
		switch (selectValue) {
			case 'article':
				setAutorDisabled(false)
				setTitleDisabled(false)
				setJournalDisabled(false)
				setYearMonthDisabled(false)
				setVolumeDisabled(false)
				setNumberDisabled(false)
				setPagesDisabled(false)
				setPublisherDisabled(true)
				setAddressDisabled(true)
				setHowpublishedDisabled(true)
				setBooktitleDisabled(true)
				setEditorDisabled(true)
				setSeriesDisabled(true)
				setOrganizationDisabled(true)
				setSchoolDisabled(true)
				setNoteDisabled(true)
				setInstitutionDisabled(true)
				break;
			case 'book':
				setAutorDisabled(false)
				setTitleDisabled(false)
				setJournalDisabled(true)
				setYearMonthDisabled(false)
				setVolumeDisabled(true)
				setNumberDisabled(true)
				setPagesDisabled(true)
				setPublisherDisabled(false)
				setAddressDisabled(false)
				setHowpublishedDisabled(true)
				setBooktitleDisabled(true)
				setEditorDisabled(true)
				setSeriesDisabled(true)
				setOrganizationDisabled(true)
				setSchoolDisabled(true)
				setNoteDisabled(true)
				setInstitutionDisabled(true)
				break;

			case 'booklet':
				setAutorDisabled(false)
				setTitleDisabled(false)
				setJournalDisabled(true)
				setYearMonthDisabled(false)
				setVolumeDisabled(true)
				setNumberDisabled(true)
				setPagesDisabled(true)
				setPublisherDisabled(true)
				setAddressDisabled(true)
				setHowpublishedDisabled(false)
				setBooktitleDisabled(false)
				setEditorDisabled(true)
				setSeriesDisabled(true)
				setOrganizationDisabled(true)
				setSchoolDisabled(true)
				setNoteDisabled(true)
				setInstitutionDisabled(true)
				break;
			case 'conference':
				setAutorDisabled(false)
				setTitleDisabled(false)
				setJournalDisabled(false)
				setYearMonthDisabled(false)
				setVolumeDisabled(false)
				setNumberDisabled(false)
				setPagesDisabled(false)
				setPublisherDisabled(true)
				setAddressDisabled(true)
				setHowpublishedDisabled(false)
				setBooktitleDisabled(false)
				setEditorDisabled(true)
				setSeriesDisabled(true)
				setOrganizationDisabled(true)
				setSchoolDisabled(true)
				setNoteDisabled(true)
				setInstitutionDisabled(true)
				break;
			case 'inbook':
				setAutorDisabled(false)
				setTitleDisabled(false)
				setJournalDisabled(true)
				setYearMonthDisabled(false)
				setVolumeDisabled(true)
				setNumberDisabled(true)
				setPagesDisabled(false)
				setPublisherDisabled(false)
				setAddressDisabled(false)
				setHowpublishedDisabled(true)
				setBooktitleDisabled(true)
				setEditorDisabled(false)
				setSeriesDisabled(true)
				setOrganizationDisabled(true)
				setSchoolDisabled(true)
				setNoteDisabled(true)
				setInstitutionDisabled(true)
				break;
			case 'incollection':
				setAutorDisabled(false)
				setTitleDisabled(false)
				setJournalDisabled(true)
				setYearMonthDisabled(false)
				setVolumeDisabled(true)
				setNumberDisabled(true)
				setPagesDisabled(false)
				setPublisherDisabled(false)
				setAddressDisabled(false)
				setHowpublishedDisabled(true)
				setBooktitleDisabled(true)
				setEditorDisabled(false)
				setSeriesDisabled(false)
				setOrganizationDisabled(true)
				setSchoolDisabled(true)
				setNoteDisabled(true)
				setInstitutionDisabled(true)
				break;
			case 'inproceedings':
				setAutorDisabled(true)
				setTitleDisabled(true)
				setJournalDisabled(true)
				setYearMonthDisabled(true)
				setVolumeDisabled(true)
				setNumberDisabled(true)
				setPagesDisabled(true)
				setPublisherDisabled(true)
				setAddressDisabled(true)
				setHowpublishedDisabled(true)
				setBooktitleDisabled(true)
				setEditorDisabled(true)
				setSeriesDisabled(true)
				setOrganizationDisabled(true)
				setSchoolDisabled(true)
				setNoteDisabled(true)
				setInstitutionDisabled(true)
				break;
			case 'manual':
				setAutorDisabled(false)
				setTitleDisabled(false)
				setJournalDisabled(true)
				setYearMonthDisabled(false)
				setVolumeDisabled(true)
				setNumberDisabled(true)
				setPagesDisabled(true)
				setPublisherDisabled(true)
				setAddressDisabled(false)
				setHowpublishedDisabled(true)
				setBooktitleDisabled(true)
				setEditorDisabled(true)
				setSeriesDisabled(true)
				setOrganizationDisabled(false)
				setSchoolDisabled(true)
				setNoteDisabled(true)
				setInstitutionDisabled(true)
				break;
			case 'mastersthesis' || 'phdthesis':
				setAutorDisabled(false)
				setTitleDisabled(false)
				setJournalDisabled(true)
				setYearMonthDisabled(false)
				setVolumeDisabled(true)
				setNumberDisabled(true)
				setPagesDisabled(true)
				setPublisherDisabled(true)
				setAddressDisabled(false)
				setHowpublishedDisabled(true)
				setBooktitleDisabled(false)
				setEditorDisabled(true)
				setSeriesDisabled(true)
				setOrganizationDisabled(true)
				setSchoolDisabled(false)
				setNoteDisabled(true)
				setInstitutionDisabled(true)
				break;
			case 'proceedings':
				setAutorDisabled(true)
				setTitleDisabled(false)
				setJournalDisabled(true)
				setYearMonthDisabled(false)
				setVolumeDisabled(false)
				setNumberDisabled(true)
				setPagesDisabled(true)
				setPublisherDisabled(false)
				setAddressDisabled(false)
				setHowpublishedDisabled(true)
				setBooktitleDisabled(true)
				setEditorDisabled(true)
				setSeriesDisabled(false)
				setOrganizationDisabled(false)
				setSchoolDisabled(true)
				setNoteDisabled(true)
				setInstitutionDisabled(true)
				break;
			case 'techreport':
				setAutorDisabled(false)
				setTitleDisabled(false)
				setJournalDisabled(true)
				setYearMonthDisabled(false)
				setVolumeDisabled(true)
				setNumberDisabled(false)
				setPagesDisabled(true)
				setPublisherDisabled(true)
				setAddressDisabled(false)
				setHowpublishedDisabled(true)
				setBooktitleDisabled(false)
				setEditorDisabled(true)
				setSeriesDisabled(true)
				setOrganizationDisabled(true)
				setSchoolDisabled(true)
				setNoteDisabled(true)
				setInstitutionDisabled(false)
				break;
			case 'misc':
				setAutorDisabled(false)
				setTitleDisabled(false)
				setJournalDisabled(true)
				setYearMonthDisabled(false)
				setVolumeDisabled(true)
				setNumberDisabled(true)
				setPagesDisabled(true)
				setPublisherDisabled(true)
				setAddressDisabled(true)
				setHowpublishedDisabled(false)
				setBooktitleDisabled(true)
				setEditorDisabled(true)
				setSeriesDisabled(true)
				setOrganizationDisabled(true)
				setSchoolDisabled(true)
				setNoteDisabled(false)
				setInstitutionDisabled(true)
				break;
			default:
				setAutorDisabled(false)
				setTitleDisabled(false)
				setJournalDisabled(true)
				setYearMonthDisabled(false)
				setVolumeDisabled(true)
				setNumberDisabled(true)
				setPagesDisabled(true)
				setPublisherDisabled(true)
				setAddressDisabled(true)
				setHowpublishedDisabled(true)
				setBooktitleDisabled(true)
				setEditorDisabled(true)
				setSeriesDisabled(true)
				setOrganizationDisabled(true)
				setSchoolDisabled(true)
				setNoteDisabled(true)
				setInstitutionDisabled(true)
				break;
		}
	}, [selectValue])

	// * Aquí obtenemos el ID de la publicación para usar este formulario para editarla
	const {idRelease} = useParams()
	const publications = useSelector(state => state.publications)
	const publication = publications["publications"].find(p => p.id === idRelease)

	// Esta función maneja el cambio en el select y obtiene su valor para que el useEffect trabaje
	const handleSelectChange = ({target}) => {
		setSelectValue(target.value)
	}

	const dispatch = useDispatch();
	const [formValues, handleInputChange, reset] = useForm({
		postType: '',
		descr: '',
		tech: '',
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
		publisher: currentUser,
		address: '',
		howpublished: '',
		booktitle: '',
		editor: '',
		series: '',
		organization: '',
		school: '',
		note: '',
		institution: '',
		display: 'Yes'
	}, publication);

	const { postType, descr, tech, frontImg, modalMedia, link, autor, title,
		journal, yearMonth, volume, number, pages, publisher,
		address, howpublished, booktitle, editor, series,
		organization, school, note, institution, display } = formValues;

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			dispatch(startUploadingPublication(file));
		}
	}
	//envio a la api
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(startNewPublication(formValues));
		reset();
		navigate('/admin/publications');
	}

	/**
	 * Esta función se encarga de manejar la actualización de una publicación
	 * recibe como parámetro el evento para prevenir la acción por default
	 * @param {event} e 
	 */
	const handleUpdatePublication = e => {
		e.preventDefault()
		dispatch(editPublication(publication.id, formValues))
	}

	//tech infor firebase
	const [techOption, setTech] = useState([])
	React.useEffect(() => {
		const obtenerTech = async () => {
			try {
				const Data = await getDocs(collection(db, "Tecnologias"));
				const arrayData = Data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
				setTech(arrayData)

			} catch (error) {
				console.log(error)
			}
		}
		obtenerTech()
	}, [])

	return (
		<div className="container">
			<h2>{publication ? 'Editar publicación' : 'Agregar publicación'}</h2>
			<hr />

			<div className="row">
				<div className="col-md-2 mb-3">
					<label> Type </label>
					<select
						value={selectValue}
						className="form-control"
						name='postType'
						onChange={handleSelectChange}
					>
						<option value=''>Selecciona una opción</option>
						<option value='article' > article </option>
						<option value='book' > book </option>
						<option value='booklet' > booklet </option>
						<option value='conference' > conference </option>
						<option value='inbook' > inbook </option>
						<option value='incollection' > incollection </option>
						<option value='inproceedings' > inproceedings </option>
						<option value='manual' > manual </option>
						<option value='mastersthesis' > mastersthesis </option>
						<option value='misc' > misc </option>
						<option value='phdthesis' > phdthesis </option>
						<option value='proceedings' > proceedings </option>
						<option value='techreport' > techreport </option>
						<option value='unpublished' > unpublished </option>
					</select>
				</div>

				<div className="col mb-3">
					<label>Front Image </label>
					<input
						className="form-control"
						type='file'
						name='frontImg'
						files={frontImg}
						onChange={handleInputChange}
					/>
				</div>
				<div className="col mb-3">
					<label>Modal Media </label>
					<input
						className="form-control"
						type='file'
						name='modalMedia'
						files={modalMedia}
						onChange={handleInputChange}
					/>
				</div>
				<div className="col-md-2 mb-3">
					<label> Type </label>
					<select
						className="form-control"
						name='modalType'
						onChange={handleInputChange}
					>
						<option value='image' > image </option>
						<option value='video' > video </option>
						<option value='embed' > embed </option>
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
						value={descr}
						onChange={handleInputChange}
					/>
				</div>
			</div>
			<div className="col mb-3">
				<label> Tech </label>
				<select
					className="form-control"
					name='tech'
					onChange={handleInputChange}
					value={tech}
				>
					<option value={''}>Selecciona una opción</option>
					{
						techOption.map(item => (
							<option key={item.id} value={item.id}> {item.nombre} </option>
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
						id='autor'
						placeholder='Autor'
						value={autor}
						onChange={handleInputChange}
						disabled={autorDisabled}
					/>
				</div>
				<div className="col mb-3">
					<label> Title </label>
					<input
						className="form-control"
						type='text'
						name='title'
						id='title'
						placeholder='Title'
						value={title}
						onChange={handleInputChange}
						disabled={titleDisabled}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col mb-3">
					<label> DOI </label>
					<input
						className="form-control"
						type='url'
						name='link'
						id='link'
						placeholder='DOI'
						value={link}
						onChange={handleInputChange}
					/>
				</div>

				<div className="col mb-3">
					<label>Journal</label>
					<input className="form-control"
						type='text'
						name='journal'
						id='journal'
						placeholder='Journal'
						value={journal}
						onChange={handleInputChange}
						disabled={journalDisabled}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col mb-3">
					<label> Date </label>
					<input className="form-control"
						type='date'
						min='1900-01-01'
						name='yearMonth'
						id='yearMonth'
						value={yearMonth}
						onChange={handleInputChange}
						disabled={yearMonthDisabled}
					/>
				</div>
				<div className="col mb-3">
					<label> Volume </label>
					<input className="form-control"
						type='text'
						name='volume'
						id='volume'
						placeholder='Volume'
						value={volume}
						onChange={handleInputChange}
						disabled={volumeDisabled}
					/>
				</div>
				<div className="col mb-3">
					<label>Number</label>
					<input className="form-control"
						type='text'
						name='number'
						id='number'
						placeholder='Number'
						value={number}
						onChange={handleInputChange}
						disabled={numberDisabled}
					/>
				</div>
				<div className="col mb-3">
					<label>Pages</label>
					<input className="form-control"
						type='text'
						name='pages'
						id='pages'
						placeholder='Pages'
						value={pages}
						onChange={handleInputChange}
						disabled={pagesDisabled}
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
						id='publisher'
						placeholder='Publisher'
						value={publisher}
						onChange={handleInputChange}
						disabled={publisherDisabled}
					/>
				</div>
				<div className="col mb-3">
					<label> Address </label>
					<input className="form-control"
						type='text'
						name='address'
						id='address'
						placeholder='Address'
						value={address}
						onChange={handleInputChange}
						disabled={addressDisabled}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col mb-3">
					<label> Howpublished </label>
					<input className="form-control"
						type='text'
						name='howpublished'
						id='howpublished'
						placeholder='Howpublished'
						value={howpublished}
						onChange={handleInputChange}
						disabled={howpublishedDisabled}
					/>
				</div>
				<div className="col mb-3">
					<label>Booktitle</label>
					<input className="form-control"
						type='text'
						name='booktitle'
						id='booktitle'
						placeholder='Booktitle'
						value={booktitle}
						onChange={handleInputChange}
						disabled={booktitleDisabled}
					/>
				</div>

			</div>
			<div className="row">
				<div className="col mb-3">
					<label> Editor </label>
					<input className="form-control"
						type='text'
						name='editor'
						id='editor'
						placeholder='Editor'
						value={editor}
						onChange={handleInputChange}
						disabled={editorDisabled}
					/>
				</div>
				<div className="col mb-3">
					<label> Series </label>
					<input className="form-control"
						type='text'
						name='series'
						id='series'
						placeholder='Series'
						value={series}
						onChange={handleInputChange}
						disabled={seriesDisabled}
					/>
				</div>

			</div>
			<div className="row">
				<div className="col mb-3">
					<label> Organization</label>
					<input className="form-control"
						type='text'
						name='organization'
						id='organization'
						placeholder='Organization'
						value={organization}
						onChange={handleInputChange}
						disabled={organizationDisabled}
					/>
				</div>
				<div className="col mb-3">
					<label> School </label>
					<input className="form-control"
						type='text'
						name='school'
						id='school'
						placeholder='School'
						value={school}
						onChange={handleInputChange}
						disabled={schoolDisabled}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col mb-3">
					<label> Note </label>
					<input className="form-control"
						type='text'
						name='note'
						id='note'
						placeholder='Note'
						value={note}
						onChange={handleInputChange}
						disabled={noteDisabled}
					/>
				</div>

				<div className="col mb-3">
					<label> Institution </label>
					<input className="form-control"
						type='text'
						name='institution'
						id='institution'
						placeholder='Institution'
						value={institution}
						onChange={handleInputChange}
						disabled={institutionDisabled}
					/>
				</div>
				<div className="col mb-3">
					<label>Mostrar en página principal</label>
					<select
						className="form-control"
						name='display'
						value={display}
						onChange={handleInputChange}
						required={true}
					>
						<option value='Si' > Si </option>
						<option value='No' > No </option>
					</select>
				</div>
			</div>
			<button
				className="btn2 btn-primary btn-large btn-block"
				onClick={publication ? handleUpdatePublication : handleSubmit}
			>
				{publication ? 'Guardar cambios' : 'Agregar'}
			</button>


		</div>
	)
}
