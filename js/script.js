window.onload=function(){
	waterfall('main','pin');

	window.onscroll=function(){
		var oParent=document.getElementById('main');
		var items=getByClass(oParent,'pin');
		var lastItems=items[items.length-1];
		var clientH=document.documentElement.clientHeight||document.body.clientHeight;
		console.log('clientH='+clientH)
		var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
		var height=lastItems.offsetTop+lastItems.offsetHeight/2-scrollT;
        
        if(height<clientH){
        	var newPin=document.createElement('div');
        	newPin.className='pin';
        	oParent.appendChild(newPin);
        	var newBox=document.createElement('div');
        	newBox.className='box';
        	newPin.appendChild(newBox);
        	var newImg=document.createElement('img');
        	newImg.src='images/92.jpg';
        	newBox.appendChild(newImg);
        	waterfall('main','pin');
        }
	}
}

function waterfall(parent,clsName){
	var oParent=document.getElementById(parent);
	var items=getByClass(oParent,clsName);
	var width=items[0].offsetWidth;
	var col=Math.floor(oParent.offsetWidth/width);
	var arr=[],
		minTop=0,
		index=0;
	for(var i=0;i<items.length;i++){
		if(i<col){
           arr.push(items[i].offsetHeight);
		}else{
			minTop=Math.min.apply('',arr);
			index=getDataInArr(minTop,arr);
			items[i].style.position='absolute';
			items[i].style.top=minTop+'px';
			items[i].style.left=index*width+'px';
			arr[index]+=items[i].offsetHeight;
		}
	}
}

function getByClass(parent,clsName){
	var childs=parent.getElementsByTagName('*');
	var oChilds=[];
	for(var i=0;i<childs.length;i++){
		if(childs[i].className==clsName){
			oChilds.push(childs[i]);
		}
	}
	return oChilds;
}

function getDataInArr(data,arr){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==data){
			return i;
		}
	}
}