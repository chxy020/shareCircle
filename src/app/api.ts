import { environment } from "../environments/environment";
declare var $:any;

const {
	// _CONTEXT_API_ROOT: apiRoot,
	// _CONTEXT_URL_ROOT: urlRoot
} = environment;

window['context'] = {
	apiroot: 'http://39.107.249.187:8082',
	uid:""
};
window['stopDetailVideo'] = function(){
	$("#nas_video")[0].pause();
}
window['playDetailVideo'] = function(){
	$("#nas_video")[0].play();
}
// 5bea735b8c324eafbfd11b679eb758d01