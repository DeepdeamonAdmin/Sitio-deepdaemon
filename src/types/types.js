

export const types = {

	//Para el inicio de sesión
	login: '[Auth] Login',
	logout: '[Auth] Logout',

	//Para la muestra de errores
	uiSetError: '[UI] Set Error',
	uiRemoveError: '[UI] Remove Error',

	//Para la carga del sitio
	uiStartLoading: '[UI] Start loading',
	uiFinishLoading: '[UI] Finish loading',

	//Para el estado de los modales
	uiOpenModal: '[UI] Open modal',
	uiCloseModal: '[UI] Close modal',

	accesoRol: '[Acceso] Dato Obtenido',

	editMember: '[EDIT] Edit member',
	editProject: '[EDIT] Edit project',
	editPublication: '[EDIT] Edit publication',


	delMember: '[DEL] Delete member',
	delPublication: '[DEL] Delete publication',




	//para los datos de perfil actualizar y obtener
	dataActive: '[User] Datos',
	userGet: '[User] Get',
	userRolGet: '[User] GetRol', //para el rol
	userUpdate: '[User] Update',
	//para la carga de imaganes del perfil
	userFileLoad: '[User] Load File User url ',
	usersLoad: '[Users] Load Users',
	usersUpdate: '[Users] Update User',
	usersDelete: '[Users] Delete User',
	usersLogutCleaning: '[Users] Logout Cleanind',


	//Para los proyectos
	//Solo enviar projecto nuevo y cargar los proyectos
	projectGet:'[Project] Get',
	projectAddNew: '[Project] New Project',
	projectActive: '[Project] Set Project active',
	projectsLoad: '[Project] Load Projects',

		//Para las tesis
	//Solo enviar tesis nuevo y cargar las tesis
	tesisAddNew: '[Tesis] New Tesis',
	tesisActive: '[Tesis] Set Tesis active',
	tesisLoad: '[Tesis] Load Tesis',

	//Para las publicaciones
	//solo enviar publicaion nueva y cargas las publicaciones
	publicationAddNew: '[Publication] New Publication',
	publicationActive: '[Publication] Set Publication active',
	publicationsLoad: '[Publication] Load Publications',
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
	institucionLoad: '[instituciones] Load Institution',

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