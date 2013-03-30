function ObjectParseJs(obj,indent,span){
	var str = "";
	switch(typeof(obj)){
	case "boolean":
		if(obj){
			str += "true";
		}else{
			str += "false";
		}
		break;
	case "number":
		str += obj;
		break;
	case "string":
		var s = obj;
		str += "\\"" + s + "\\"";
		break;
	case "object":
		if(!obj){
			str = "null";
		}else if(obj.constructor == Array){
			var num = obj.length;
			str += "[";
			var i;
			for(i=0;i<num;i++){
				str += ObjectParseJs(obj[i],indent,span);
				if(i < num  - 1){
					str += ",";
				}
			}
			str += "]";
		}else{
			var num = 0;
			for(var p in obj){
				num ++;
			}
			str += "{\\n";
			var i = 0;
			var indent_child = indent + span;
			for(var p in obj){
				str += indent_child + p + ":";
				str += ObjectParseJs(obj[p],indent_child,span);
				i ++;
				if(i < num){
					str += ",\\n";
				}
			}
			str += "\\n" + indent + "}";
		}
		break;
	}
	return str;
}
try{
	var element=document.getElementsByTagName("body").item(0);
	var data=element.firstChild.innerHTML;
	data=JSON.parse(data,null," ");
	data=ObjectParseJs(data,"","       ");
	console.log(data);
	var preNode=document.createElement('pre');
	var textNode=document.createTextNode(data);
	preNode.appendChild(textNode);
	element.appendChild(preNode);
}catch(err){
	alert(err);
}
