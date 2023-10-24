import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import { getAuth } from 'firebase/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { startNewPublication, startUploadingPublication, startUploadingBibtex, startsNewBibtex } from '../../../actions/publications';
import { db } from '../../../firebase/firebase-config'
import { collection, getDocs } from "firebase/firestore";
import { editPublication } from '../../../actions/edit';
import { FotosGalleryChoose } from '../../ui/FotosGalleryChoose';
import { ModalGalleryAddProjects } from '../Proyectos/ModalGalleryAddProjects';

export const FormAddRelease = () => {
	const auth = getAuth();
	const currentUser = auth.currentUser.displayName;
	// UseState para el select
	const [selectValue, setSelectValue] = useState('')
	// Variable para el archivo bibtex
	let bibtex_File;
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
	const [linkConsultDisabled, setLinkConsultDisabled]=useState(false)
	const [noteDisabled, setNoteDisabled] = useState(true)
	const [institutionDisabled, setInstitutionDisabled] = useState(true)
	const [keywordsDisabled, setKeywordsDisabled] = useState(true)
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
				setLinkConsultDisabled(false)
				setNoteDisabled(false)
				setInstitutionDisabled(true)
				setKeywordsDisabled(true)
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
				setLinkConsultDisabled(false)
				setNoteDisabled(true)
				setInstitutionDisabled(true)
				setKeywordsDisabled(false)
				break;

			case 'booklet':
				setAutorDisabled(false)
				setTitleDisabled(false)
				setJournalDisabled(true)
				setYearMonthDisabled(false)
				setVolumeDisabled(false)
				setNumberDisabled(false)
				setPagesDisabled(true)
				setPublisherDisabled(true)
				setAddressDisabled(false)
				setHowpublishedDisabled(false)
				setBooktitleDisabled(false)
				setEditorDisabled(false)
				setSeriesDisabled(false)
				setOrganizationDisabled(false)
				setSchoolDisabled(true)
				setLinkConsultDisabled(false)
				setNoteDisabled(false)
				setInstitutionDisabled(true)
				setKeywordsDisabled(false)
				break;
			case 'conference':
				setAutorDisabled(false)
				setTitleDisabled(false)
				setJournalDisabled(true)
				setYearMonthDisabled(false)
				setVolumeDisabled(false)
				setNumberDisabled(false)
				setPagesDisabled(false)
				setPublisherDisabled(false)
				setAddressDisabled(false)
				setHowpublishedDisabled(true)
				setBooktitleDisabled(false)
				setEditorDisabled(false)
				setSeriesDisabled(false)
				setOrganizationDisabled(false)
				setSchoolDisabled(true)
				setLinkConsultDisabled(false)
				setNoteDisabled(false)
				setInstitutionDisabled(true)
				setKeywordsDisabled(false)
				break;
			case 'inbook':
				setAutorDisabled(false)
				setTitleDisabled(false)
				setJournalDisabled(true)
				setYearMonthDisabled(false)
				setVolumeDisabled(false)
				setNumberDisabled(false)
				setPagesDisabled(false)
				setPublisherDisabled(false)
				setAddressDisabled(false)
				setHowpublishedDisabled(true)
				setBooktitleDisabled(false)
				setEditorDisabled(false)
				setSeriesDisabled(false)
				setOrganizationDisabled(true)
				setSchoolDisabled(true)
				setLinkConsultDisabled(false)
				setNoteDisabled(false)
				setInstitutionDisabled(true)
				setKeywordsDisabled(false)
				break;
			case 'incollection':
				setAutorDisabled(false)
				setTitleDisabled(false)
				setJournalDisabled(true)
				setYearMonthDisabled(false)
				setVolumeDisabled(false)
				setNumberDisabled(false)
				setPagesDisabled(false)
				setPublisherDisabled(false)
				setAddressDisabled(false)
				setHowpublishedDisabled(true)
				setBooktitleDisabled(false)
				setEditorDisabled(false)
				setSeriesDisabled(false)
				setOrganizationDisabled(true)
				setSchoolDisabled(true)
				setLinkConsultDisabled(false)
				setNoteDisabled(false)
				setInstitutionDisabled(true)
				setKeywordsDisabled(false)
				break;
			case 'inproceedings':
				setAutorDisabled(false)
				setTitleDisabled(false)
				setJournalDisabled(true)
				setYearMonthDisabled(false)
				setVolumeDisabled(false)
				setNumberDisabled(false)
				setPagesDisabled(false)
				setPublisherDisabled(false)
				setAddressDisabled(false)
				setHowpublishedDisabled(true)
				setBooktitleDisabled(false)
				setEditorDisabled(false)
				setSeriesDisabled(false)
				setOrganizationDisabled(false)
				setSchoolDisabled(true)
				setLinkConsultDisabled(false)
				setNoteDisabled(true)
				setInstitutionDisabled(true)
				setKeywordsDisabled(false)
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
				setLinkConsultDisabled(false)
				setNoteDisabled(false)
				setInstitutionDisabled(true)
				setKeywordsDisabled(false)
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
				setBooktitleDisabled(true)
				setEditorDisabled(true)
				setSeriesDisabled(true)
				setOrganizationDisabled(true)
				setSchoolDisabled(false)
				setLinkConsultDisabled(false)
				setNoteDisabled(false)
				setInstitutionDisabled(true)
				setKeywordsDisabled(false)
				break;
			case 'proceedings':
				setAutorDisabled(true)
				setTitleDisabled(false)
				setJournalDisabled(true)
				setYearMonthDisabled(false)
				setVolumeDisabled(false)
				setNumberDisabled(false)
				setPagesDisabled(true)
				setPublisherDisabled(false)
				setAddressDisabled(false)
				setHowpublishedDisabled(true)
				setBooktitleDisabled(true)
				setEditorDisabled(false)
				setSeriesDisabled(false)
				setOrganizationDisabled(true)
				setSchoolDisabled(true)
				setLinkConsultDisabled(false)
				setNoteDisabled(true)
				setInstitutionDisabled(true)
				setKeywordsDisabled(false)
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
				setAddressDisabled(true)
				setHowpublishedDisabled(true)
				setBooktitleDisabled(true)
				setEditorDisabled(true)
				setSeriesDisabled(true)
				setOrganizationDisabled(true)
				setSchoolDisabled(true)
				setLinkConsultDisabled(false)
				setNoteDisabled(true)
				setInstitutionDisabled(false)
				setKeywordsDisabled(false)
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
				setLinkConsultDisabled(false)
				setNoteDisabled(false)
				setInstitutionDisabled(true)
				setKeywordsDisabled(false)
				break;
			case 'unpublished':
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
				setLinkConsultDisabled(false)
				setNoteDisabled(false)
				setInstitutionDisabled(false)
				setKeywordsDisabled(false)
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
				setLinkConsultDisabled(false)
				setNoteDisabled(false)
				setInstitutionDisabled(true)
				setKeywordsDisabled(false)
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
		urlImg: '',
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
		linkConsult: '',
		note: '',
		institution: '',
		display: 'Yes',
		keywords: '',
		bibtexfile: '',
	}, publication);

	const { postType,urlImg, descr, tech, frontImg, modalMedia, link, autor, title,
		journal, yearMonth, volume, number, pages, publisher,
		address, howpublished, booktitle, editor, series,
		organization, school, linkConsult, note, institution, display, keywords, bibtexfile} = formValues;
	//Bibtex
	const [datosbibtex, setDatosBibtex] = useState('');
	//Galeria
	const [datos, setDatos] = useState('');
	const MgAFAP = (datosMg) => {
		setDatos(datosMg);
		formValues.urlImg=datosMg;
	}

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			dispatch(startUploadingPublication(file));
		}
	}
	/***************************/
	/*const [formValuesBibtex, handleInputBibtexChange, resetBibtex] = useForm({
		name: ''
	})*/
	const handleFileBibtexChange = (e) => {
		bibtex_File = e.target.files[0];
		setDatosBibtex(bibtex_File);
		if (bibtex_File!=null) {
			/*if (Bibtex_File.name == '') {
				dispatch(startUploadingBibtex(Bibtex_File));
			} else {
				const typeFile = Bibtex_File.name.split('.')[1]
				const fileName = Bibtex_File.name + '.' + typeFile
				const auxFile = new File([Bibtex_File], fileName)
				dispatch(startUploadingBibtex(auxFile));
			}*/
			const reader = new FileReader();
			reader.onload = function (e) {
                const content = e.target.result;
                //console.log(content); // Muestra el contenido en la consola
				get_data(content);
            };
			reader.readAsText(bibtex_File);
		}
	}
	/*const handleSave = () => {
		dispatch(startsNewBibtex(formValuesBibtex));
		resetBibtex();

	}*/
	const [funcionEjecutada, setFuncionEjecutada] = useState(false);
	function get_data(content){
		const text = content.split();
		let testStr = content;
		let info = ["title","author","journal","volume","number","pages","publisher","address","howpublished","booktitle","editor","series","organization","school","institution","note","year"]
		let types = ["article","book","booklet","conference","inbook","incollection","inproceedings","manual","masterthesis","misc","phdthesis","proceedings","techreport","unpublished"]
		let testRegexType;
		let testRegex;
		for(let i=0;i<types.length;i++){
			testRegexType = new RegExp("@"+types[i]+"{","i");
			if(testRegexType.test(testStr)){
				formValues.postType = types[i];
				setSelectValue(types[i]);
			}
		}
		for(let i=0;i<info.length;i++){
			testRegex = new RegExp(info[i],"i");
			if(testRegex.test(testStr)){
				const textRegexString = new RegExp(info[i]+"={(.*?)}","i");
				const information = content.match(textRegexString);
				//console.log(information[1]);
				if(i==0)formValues.title = information[1];
				if(i==1)formValues.autor = information[1];
				if(i==2)formValues.journal = information[1];
				if(i==3)formValues.volume = information[1];
				if(i==4)formValues.number = information[1];
				if(i==5)formValues.pages = information[1];
				if(i==6)formValues.publisher = information[1];
				if(i==7)formValues.address = information[1];
				if(i==8)formValues.howpublished = information[1];
				if(i==9)formValues.booktitle = information[1];
				if(i==10)formValues.editor = information[1];
				if(i==11)formValues.series = information[1];
				if(i==12)formValues.organization = information[1];
				if(i==13)formValues.school = information[1];
				if(i==14)formValues.institution = information[1];
				if(i==15)formValues.note = information[1];
				if(i==16)formValues.yearMonth = information[1]+"-01-01";
			}	
			//console.log(testRegex.test(testStr));
			//console.log(formValues);
		}
		setFuncionEjecutada(true);
		//console.log(text);
	}
	useEffect(() => {
		//console.log("File data accepted");
	  }, [funcionEjecutada]);
	/***************************/
	//envio a la api
	const fileSelector = document.getElementById('fileSelector');
	const navigate = useNavigate();
	const handleSubmit = () => {
		formValues.urlImg = datos;
		formValues.postType = selectValue;
		bibtex_File = datosbibtex;
		dispatch(startNewPublication(formValues,bibtex_File));
		reset();
		navigate('/admin/release');
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
		<div className="container mb-5">
			<div className="app-title">
				<h2>{publication ? 'Editar publicación' : 'Agregar publicación'}</h2>
				<hr />
			</div>
			<div className="form-group row">
				<div className="col-md-2 mb-3">
					<label for="fileSelector">Seleccionar archivo bibtex:</label>
					<input
						className='form-control'
						id="fileSelector"
						type="file"
						name="file"
						accept="text/txt"
						src='bibtexfile'
						onChange={handleFileBibtexChange}
					/>
				</div>
				<div className="col-md-2 mb-3">
					<label> Type </label>
					<select
						className="form-control"
						name='postType'
						onChange={handleSelectChange}
						value={selectValue}
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

				<div className="col-md-3 mb-3">
					<label> Imagen desde Galeria </label>
					<div className="card">
						<img className='foto' src={urlImg || datos} alt="Imagen" />
						<ModalGalleryAddProjects MgAFAP={MgAFAP} />
						<FotosGalleryChoose />
					</div>
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
			<div className="row">
				<div className="col mb-3">
					<label> KeyWords </label>
					<textarea
						className="form-control"
						rows='3' cols='40'
						name='keywords'
						placeholder=' KeyWords'
						value={keywords}
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
					<label> Link de Consulta </label>
					<textarea
						className="form-control"
						rows='1'
						name='linkConsult'
						placeholder=' Link de Consulta'
						value={linkConsult}
						onChange={handleInputChange}
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
				className="btn2 btn-primary btn-lg btn-block mt-3"
				onClick={publication ? handleUpdatePublication : handleSubmit}
			>
				{publication ? 'Guardar cambios' : 'Agregar'}
			</button>


		</div>
	)
}
