TreeDrawer = function(id,t){
	this.zoom = 1;
    this.t = t;
    this.id = id;
    this.framesize = 2000;
	this.draw   = SVG(id).size(this.framesize,this.framesize);
    this.bg     = this.draw.rect(this.framesize,this.framesize).attr({fill:'#EEFFEE'});
    this.group  = this.draw.group();

}   
TreeDrawer.prototype._zoom = function(){
    
    //this.draw.move(document.getElementById('sampleform').onmouseX.value, document.getElementById('sampleform').onmouseY.value)
    
    var factor = this.zoom/30+1;
    this.group.scale(factor);//パス、箱の拡縮
    this.draw.size(this.framesize*factor,this.framesize*factor);//描画領域サイズ
    this.bg.size(this.framesize*factor,this.framesize*factor);//背景サイズ
}
TreeDrawer.prototype._draw = function(){

    var nodeDB = this.t.nDatabaseNodes;
	var zoom = this.zoom;


    var midx = 10000;
	for(var k = 1; k<nodeDB[0].nodeChildren.length;k++){
		var buf = (nodeDB[0].nodeChildren[0].XPosition + nodeDB[0].nodeChildren[k].XPosition)/2;
		if(buf<midx)
			midx=buf;
	}

	for(var j = 0; j<nodeDB[0].nodeChildren.length;j++){	
		var xa = 0;
		var ya = 0;
		var xb = xa;
		var yb = (-nodeDB[0].nodeChildren[0].YPosition+nodeDB[0].nodeChildren[j].YPosition + nodeDB[0].nodeChildren[j].h/2);
		var xc = (-midx+nodeDB[0].nodeChildren[j].XPosition);
		var yc = yb;
        
		this.group.add(this.draw.polyline([[xa,ya], [xb,yb], [xc,yc]]).fill('none').stroke({ width: 2 }).move( midx, (nodeDB[0].nodeChildren[0].YPosition)));
	}


	//root
	for (var i = 1; i < nodeDB.length; i++)
	{ 
		var n = nodeDB[i];
		var midx = 10000;
		for(var k = 0; k<n.nodeChildren.length;k++){
			var buf = -(n.XPosition + n.w/2)+(n.XPosition + n.w + n.nodeChildren[k].XPosition)/2;
			if(buf<midx)
				midx=buf;
		}

		for(var j = 0; j<n.nodeChildren.length;j++){	
			var xa = 0;
			var ya = 0;
			var xb = midx;
			var yb = ya;
			var xc = xb;
			var yc = (-(n.YPosition + n.h/2)+n.nodeChildren[j].YPosition + n.nodeChildren[j].h/2);
			var xd = (-(n.XPosition + n.w/2)+n.nodeChildren[j].XPosition);
			var yd = yc;
			
			this.group.add(this.draw.polyline([[xa,ya], [xb,yb], [xc,yc], [xd,yd]]).fill('none').stroke({ width: 2 }).move((n.XPosition + n.w/2),(n.YPosition + n.h/2)));
		}
		
		var rect1 = this.draw.rect(n.w,n.h).attr({stroke:'#000000',x:n.XPosition,y:n.YPosition,rx:n.h/6,ry:n.h/6});
		//coloring
		if(i==1){
			rect1.attr({ fill:'#EEEEEE'});
		}else if(n._getLevel() % 2){
			rect1.attr({ fill:'#FFDDDD'});
		}else{
			rect1.attr({ fill:'#DDDDFF'});
		}
        var rect2 = this.draw.rect(n.w*(20/21),n.h*(7/12)).attr({fill:'#FFFFFF',opacity:0.5,x:n.XPosition+(n.w/42),y:n.YPosition+n.h*2.5/12});
		this.group.add(rect1);
    	this.group.add(rect2);
    	
        var fontSize = n.w/18;
		var title   = this.draw.text('#'+n.id+' : '+n.dsc   ).move(n.XPosition+n.w/2,n.YPosition+fontSize).font({anchor:'middle',size:fontSize+'px'});
        
        if(i==1){
        var content1 = this.draw.text("　ルートノードには議題を書きます。").move(n.XPosition+n.w/2,n.YPosition+fontSize*5).font({family:"MS-Gothic",anchor:'middle',size:fontSize*0.9+'px'});
        var content2 = this.draw.text("A派とB派が立論、反駁を行います。各").move(n.XPosition+n.w/2,n.YPosition+fontSize*6.5).font({family: "MS-Gothic",anchor:'middle',size:fontSize*0.9+'px'});
        var content3 = this.draw.text("論点の点で結論としてA：Bの比を算出").move(n.XPosition+n.w/2,n.YPosition+fontSize*8).font({family: "MS-Gothic",anchor:'middle',size:fontSize*0.9+'px'});
        var point = this.draw.text("A. 54% / B. 46%").move(n.XPosition+n.w/2,n.YPosition+fontSize*10).font({anchor:'middle',size:fontSize+'px'});
        }else{
        var content1 = this.draw.text("　ここにノードの主張文を書きます。").move(n.XPosition+n.w/2,n.YPosition+fontSize*2.5).font({family:"MS-Gothic",anchor:'middle',size:fontSize*0.9+'px'});
        var content2 = this.draw.text("上はノード番号、下はノードの得点で").move(n.XPosition+n.w/2,n.YPosition+fontSize*4.0).font({family: "MS-Gothic",anchor:'middle',size:fontSize*0.9+'px'});
        var content3 = this.draw.text("す。この文章はちょうど５０文字です").move(n.XPosition+n.w/2,n.YPosition+fontSize*5.5).font({family: "MS-Gothic",anchor:'middle',size:fontSize*0.9+'px'});
        var point = this.draw.text("実効点190pt. / 基礎点230pt. ＋☑　").move(n.XPosition+n.w/2,n.YPosition+fontSize*7).font({anchor:'middle',size:fontSize+'px'});
        }
        this.group.add(title);
        this.group.add(content1);
        this.group.add(content2);
        this.group.add(content3);
        this.group.add(point);
	}	
}

