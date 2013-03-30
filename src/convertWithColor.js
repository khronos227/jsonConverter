function ObjectParseJs(obj,document,node,indent){
	var childNode = document.createElement('span');
	switch(typeof(obj)){
	case "boolean":
		childNode.setAttribute("style","color:#BE81F7");
		node.appendChild(childNode);
		if(obj){
			childNode.innerHTML="true";
		}else{
			childNode.innerHTML="false";
		}
		break;
	case "number":
		childNode.setAttribute("style","color:#B40404");
		node.appendChild(childNode);
		childNode.innerHTML=obj;
		break;
	case "string":
		node.appendChild(childNode);
		childNode.innerHTML="\\"" + obj + "\\"";
		break;
	case "object":
		if(!obj){
			childNode.innerHTML="null";
			node.appendChild(childNode);
		}else if(obj.constructor == Array){
			var num = obj.length;
			node.innerHTML+="[";
			var i;
			for(i=0;i<num;i++){
				ObjectParseJs(obj[i],document,node,indent);
				if(i < num  - 1){
					node.innerHTML+=" , ";
				}
			}
			node.innerHTML+="]";
		}else{
			var num = 0;
			for(var p in obj){
				num ++;
			}
			var i = 0;
			node.innerHTML+="{";
			for(var p in obj){
				childNode=document.createElement('div');
				childNode.setAttribute("style","padding-left:"+indent+"em");
				var titleNode=document.createElement('b');
				titleNode.innerHTML=p;
				childNode.appendChild(titleNode);
				childNode.innerHTML+=" : ";
				node.appendChild(childNode);
				ObjectParseJs(obj[p],document,childNode,indent);
				i ++;
				if(i < num){
					childNode.innerHTML+=",";
				}
			}
			node.innerHTML+="}";
		}
		break;
	}
}

try{
	var data=document.getElementsByTagName("body").item(0).firstChild.innerHTML;
	data=JSON.parse(data,null," ");
	var divNode2=document.createElement('div');
	document.getElementsByTagName("body").item(0).appendChild(divNode2);
	divNode2.setAttribute("style","font-size:90%");
	data=ObjectParseJs(data,document,divNode2, 3);
console.log(divNode2);
}catch(err){
	alert(err);
}
