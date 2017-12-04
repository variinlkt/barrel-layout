class Barrel{
	constructor(ele,baseH=100,baseN=9.5){
		this.ct=ele;
		this.baseNum=baseN;
		this.baseHeight=this.ct.offsetWidth/this.baseNum||baseH;
		this.maxWidth=ele.offsetWidth;
		this.lastRowWidth=0;
		this.imgList=[];
		this.data=[];
		this.bind();
		this.imgArr=[];
	}
	createImg(arr){
		let num=0;
		if(this.data.length==0){
			this.data=arr.map((val)=>{
				return val;
			})
		}
		this.data.forEach((val,i)=>{
			let img={};
			new Promise((resolve,reject)=>{
				img[i]=new Image();
				img[i].onload=() => resolve();
				img[i].onerror = ()=>reject();
				img[i].src=val;
			}).then(()=>{
				let imgHeight=img[i].height;
				let imgWidth=img[i].width;
				let proportion=imgWidth/imgHeight;
				let imgInfo={
					self:img[i],
					width:this.baseHeight*proportion,
					height:this.baseHeight
				}
				this.render(imgInfo,num);
				num++;
			}).catch(err => console.log(err));
		})
			
			
	}
	render(imgInfo,num){
		let rowHeight=this.baseHeight,
		rowWidth=0,
		lastImg=imgInfo,
		tempArr=[];
		this.imgList.push(imgInfo);
		this.imgList.forEach((val,i)=>{
			rowWidth+=val.width;
			if(this.maxWidth<rowWidth){
				this.imgList.pop();
				rowWidth-=lastImg.width;
				rowHeight=this.maxWidth*this.baseHeight/rowWidth;
				this.createRow(rowHeight);//生成一行
				this.imgList=[];
				this.imgList.push(lastImg);//加入下一行豪华午餐
			}
		});
			
		if(num===this.data.length-1 && this.imgList.length != 0){
		//已经载入最后一张图片了且还有最后一行
			tempArr=this.imgList;
			tempArr.forEach((val)=>{
				rowWidth+=val.width;
				rowHeight=this.maxWidth*this.baseHeight/rowWidth;

			});
			this.createRow(rowHeight);//生成最后一行
			this.lastRowWidth=rowWidth;//最后一行的长度
		}
	}
	createRow(rowHeight){
		let row=document.createElement('li'),
		div=document.createElement('div');
		div.style.height=rowHeight+'px';
		this.imgList.forEach((val)=>{
			let img=val.self;
			img.style.height=rowHeight+'px';
			div.appendChild(img);
			row.appendChild(div);
		})
		this.ct.appendChild(row);
	}
	bind(){
		window.addEventListener('resize',()=>{
			this.ct.innerHTML='';
			this.maxWidth=this.ct.offsetWidth;
			this.lastRowWidth=0;
			this.imgList=[];
			this.baseHeight=this.ct.offsetWidth/this.baseNum;
			this.createImg(this.data);

		})
	}
}