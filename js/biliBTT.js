class biliBTT{
	constructor(top=0,target=0,callback=null) {
	    this.btt = document.querySelector('#biliBTT');
		this.top = top;
		this.init();
		this.show = false;
		this.target = target;
		this.callback = this.callback;
	}
	init(){
		document.addEventListener('scroll',this.throttleDate(this.bttShow.bind(document,this),100));
		this.btt.addEventListener('transitionend',this.bttAfterShow.bind(this.btt,this));
		this.btt.addEventListener('click',this.bttFunction.bind(this.btt,this));
	}
	bttShow(that){
		if(window.pageYOffset >= that.top){
			that.btt.style.display = 'block';
			that.show = true;
			setTimeout(()=>{
				that.btt.style.opacity = 1;
			},0)
		}else{
			that.btt.style.opacity = 0;
			that.show = false;
		} 
	}
	bttAfterShow(that){
		if(!that.show){
			that.btt.style.display = 'none';
		}
	}
	bttFunction(that){
		clearInterval(window.bitimer);
		window.bitimer = setInterval(function() {
			console.log(that)
		    let step = (that.target - window.pageYOffset) / 5;
		    step = step > 0 ? Math.ceil(step) : Math.floor(step);
		    if (window.pageYOffset === that.target) {
		        clearInterval(window.bitimer);
				
		        that.callback && that.callback();
			}
			window.scroll(0, window.pageYOffset + step);
		}, 10);
	}
	throttleDate(fn,wait){
		let previous = 0 ;
		return function(){
			let now = +new Date();
			let context = this;
			let args = arguments;
			
			if(now - previous > wait){
				fn.apply(context,args);
				previous = now;
			}
		}
	}
}
