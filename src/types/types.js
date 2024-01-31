//Definición de los tipos de acciones en el estado
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

	//Para los datos de perfil (actualizar y obtener)
	dataActive: '[User] Datos',
	userGet: '[User] Get',
	userRolGet: '[User] GetRol', //para el rol
	userUpdate: '[User] Update',

	//Para la carga de los usuarios
	usersLoad: '[Users] Load Users',


	//Para los proyectos
	projectAddNew: '[Project] New Project',
	projectActive: '[Project] Set Project active',
	projectsLoad: '[Project] Load Projects',

	//Para las tesis
	tesisAddNew: '[Tesis] New Tesis',
	tesisActive: '[Tesis] Set Tesis active',
	tesisLoad: '[Tesis] Load Tesis',

	//Para las publicaciones
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

	// Para las instituciones
	institucionAddNew: '[instituciones] new institution',
	institucionLoad: '[instituciones] Load Institution',

	// Para las carreras
	careerAddNew: '[Carreras] New Career',
	careerLoad: '[Carreras] Load Career',

	// Para las tecnologias
	techAddNew: '[Carreras] New Tech',

	//Para los videos de YouTube
	youtubeAddNew: '[YouTube] New Video YouTube',
	youtubeLoad: '[YouTube] Load Videos Youtube',

	// Para los avisos
	avisoAddNew: '[Sign] New Sign', //Agregando aviso
	avisoLoad: '[Sign] Load Signs', //Cargar Avisos
}