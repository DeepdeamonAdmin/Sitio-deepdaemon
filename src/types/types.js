

export const types = {

	login: '[Auth] Login',
	logout: '[Auth] Logout',

	uiSetError: '[UI] Set Error',
	uiRemoveError: '[UI] Remove Error',

	uiStartLoading: '[UI] Start loading',
	uiFinishLoading: '[UI] Finish loading',

	uiOpenModal: '[UI] Open modal',
	uiCloseModal: '[UI] Close modal',
//-----------
	uiOpenModalInfo: '[UI] Open modal info',
	uiCloseModalInfo: '[UI] Close modal info',
//-----------
	uiOpenModalEdit: '[UI] Open modal edit',
	uiCloseModalEdit: '[UI] Close modal edit',

	accesoRol: '[Acceso] Dato Obtenido',

	regMember: '[REG] Register member',
	regProject: '[REG] Register Project',
	regRelease: '[REG] Register publication',
	regInstitution: '[REG] Register Institution',
	regCareer: '[REG] Register Career',
	regTeach: '[REG] Register Teach',
	regComment: '[REG] Register Comment',


	editMember: '[EDIT] Edit member',
	editProject: '[EDIT] Edit project',
	editPublication: '[EDIT] Edit publication',


	delMember: '[DEL] Delete member',
	delProject: '[DEL] Delete project',
	delPublication: '[DEL] Delete publication',




	//para los datos de perfil actualizar y obtener
	dataActive: '[User] Datos',
	userGet: '[User] Get',
	userRolGet: '[User] GetRol', //para el rol
	userUpdate: '[User] Update',
	//para la carga de imaganes del perfil
	userFileLoad: '[User] Load File User url ',
	userAddNew: '[Users] New User',
	usersLoad: '[Users] Load Users',
	usersUpdate: '[Users] Update User',
	usersDelete: '[Users] Delete User',
	usersLogutCleaning: '[Users] Logout Cleanind',


	//Para los proyectos
	//Solo enviar projecto nuevo y cargar los proyectos
	projectGet:'[Project] Get',
	projectImgAddNew: '[Project] New Img Project',
	projectAddNew: '[Project] New Project',
	projectActive: '[Project] Set Project active',
	projectsLoad: '[Project] Load Projects',
	projectsAllLoad: '[Projects] All Load Projects',

		//Para las tesis
	//Solo enviar tesis nuevo y cargar las tesis
	tesisGet:'[Tesis] Get',
	tesisImgAddNew: '[Tesis] New Img Tesis',
	tesisAddNew: '[Tesis] New Tesis',
	tesisActive: '[Tesis] Set Tesis active',
	tesisLoad: '[Tesis] Load Tesis',
	tesisAllLoad: '[Tesis] All Load Tesis',

	//Para las publicaciones
	//solo enviar publicaion nueva y cargas las publicaciones
	publicationImgAddNew: '[Publication] New Img Publication',
	publicationAddNew: '[Publication] New Publication',
	publicationActive: '[Publication] Set Publication active',
	publicationsLoad: '[Publication] Load Publications',
	publicationsAllLoad: '[Publications] All Load Publications',
	//publicationsBibtexAddNewBibtex: '[Publication] New Bibtex Publication',
	publicationsBibtexAddNew: '[Publication] New Bibtex Publication',
	loadBibtex: '[Publication] Loading Bibtex',

	// Para la galería
	galleryAddNew: '[Images] New Image', //Agregando imagen con nombre
	galleryAddNewPhoto: '[Images] New Photo', //Solamente imagen
	galleryLoad: '[Images] Load Images', 
	galleryDelete: '[Images] Delete Image',
	galleryUpdate: '[Images] Update Image',


	// Para las instituciones
	institucionAddNew: '[instituciones] new institution',
	institucionAllLoad: '[instituciones] All Load Institution',
	institucionLoad: '[instituciones] Load Institution',
	institucionDelete: '[instituciones] Delete institution',
	institucionUpdate: '[instituciones] Update institution',

	// Para las carreras
	careerAddNew: '[Carreras] New Career',
	careerLoad: '[Carreras] Load Career',

	// Para las tecnologias
	techAddNew: '[Carreras] New Tech',
	techAllLoad: '[Carreras] All Load Tech',
	techLoad: '[Carreras] Load Tech',
	techDelete: '[Carreras] Delete Tech',
	techUpdate: '[Carreras] Update Tech',

	//Para los videos de YouTube
	youtubeAddNew: '[YouTube] New Video YouTube',
	youtubeLoad: '[YouTube] Load Videos Youtube',

	// Para los avisos
	avisoAddNew: '[Sign] New Sign', //Agregando aviso
	avisoLoad: '[Sign] Load Signs', //Cargar Avisos
}