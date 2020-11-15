import { environment } from "../environments/environment";
declare var $:any;

const {
	// _CONTEXT_API_ROOT: apiRoot,
	// _CONTEXT_URL_ROOT: urlRoot
} = environment;

window['context'] = {
	apiroot: 'http://139.196.147.194:8082',
	appId: 'wx04ad9813254366a7',
	shareUrl: 'http://circle.jinquntech.com',
	downloadUrl:'http://www.baidu.com',
	uid:""
};
window['stopDetailVideo'] = function(){
	$("#nas_video")[0].pause();
}
window['playDetailVideo'] = function(){
	$("#nas_video")[0].play();
}
// 5bea735b8c324eafbfd11b679eb758d01