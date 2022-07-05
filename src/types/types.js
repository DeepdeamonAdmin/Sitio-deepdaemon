

export const types = {

	login: '[Auth] Login',
	logout: '[Auth] Logout',

	uiSetError: '[UI] Set Error',
	uiRemoveError: '[UI] Remove Error',

	uiStartLoading: '[UI] Start loading',
	uiFinishLoading: '[UI] Finish loading',

	uiOpenModal: '[UI] Open modal',
	uiCloseModal: '[UI] Close modal',

	accesoRol: '[Acceso] Dato Obtenido',

	regMember: '[REG] Register member',
	regProject: '[REG] Register Project',
	regRelease: '[REG] Register publication',
	regInstitution: '[REG] Register Institution',
	regCareer: '[REG] Register Career',
	regTeach: '[REG] Register Teach',


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
	projectImgAddNew: '[Project] New Img Project',
	projectAddNew: '[Project] New Project',
	projectActive: '[Project] Set Project active',
	projectsLoad: '[Project] Load Projects',
	projectsAllLoad: '[Projects] All Load Projects',


	//Para las publicaciones
	//solo enviar publicaion nueva y cargas las publicaciones
	publicationImgAddNew: '[Publication] New Img Publication',
	publicationAddNew: '[Publication] New Publication',
	publicationActive: '[Publication] Set Publication active',
	publicationsLoad: '[Publication] Load Publications',

	// Para la galería
	galleryAddNew: '[Images] New Image',
	galleryLoad: '[Images] Load Image',
	galleryDelete: '[Images] Delete Image',
	galleryGet: '[Images] Get Image',
	galleryUpdate: '[Images] Update Image',
}