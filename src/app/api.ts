import { environment } from "../environments/environment";
declare var $:any;

const {
	// _CONTEXT_API_ROOT: apiRoot,
	// _CONTEXT_URL_ROOT: urlRoot
} = environment;

window['context'] = {
	// apiroot: 'http://139.196.147.194:8082',
	apiroot: 'http://139.196.147.194:8084',
	// userAgreement: 'http://139.196.147.194:8082/jqkj/fileupload/help/userAgreement.html',
	userAgreement: 'http://139.196.147.194:8084/jqkj/fileupload/help/userAgreement.html',
	appId: 'wx04ad9813254366a7',
	shareUrl: 'http://circle_test.jinquntech.com',
	downloadUrl:'http://www.baidu.com',
	uid:""
};
window['stopDetailVideo'] = function(){
	$("#nas_video")[0].pause();
}
window['playDetailVideo'] = function(){
	$("#nas_video")[0].play();
}
window["__commentcpt"] = "";
window["__commentcallback"] = "";
window["sendCommentMsg"] = function(msg,scope,callback){
	if(scope){
		window["__commentcpt"] = scope;
	}
	if(callback){
		window["__commentcallback"] = callback;
	}
	if(msg){
		window["__commentcallback"].call(window["__commentcpt"],msg);
	}
}

// 5bea735b8c324eafbfd11b679eb758d01