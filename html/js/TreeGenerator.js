function GenerateTree() {
	t = new ECOTree('t','sample2');						
	t.config.iRootOrientation = ECOTree.RO_LEFT;
	t.config.defaultNodeWidth = 50*2.414;
	t.config.defaultNodeHeight = 50;
	t.config.iSubtreeSeparation = 50;
	t.config.iSiblingSeparation = 20;										
	t.config.linkType = 'M';
	t.config.useTarget = false;
	t.config.nodeFill = ECOTree.NF_GRADIENT;
	t.config.colorStyle = ECOTree.CS_LEVEL;
	t.config.levelColors = ["#FFDDDD","#FFDDDD","#DDDDFF","#DDDDFF"];
	t.config.levelBorderColors = ["#FFD700","#D9B100","#BC9400","#966E00"];
	//t.config.nodeColor = "#DDDDDD";
	t.config.nodeBorderColor = "#FFD700";
	t.config.linkColor = "#FFD700";
	t.config.iNodeJustification = 2;
    
    t.config.topXAdjustment = 100;
    t.config.topYAdjustment = 100;
    
	t.render = "CANVAS";
	t.add(1,-1,'species',1,1,"#F08080");
	t.add(2,1,'plants',500,500);
	t.add(3,1,'fungi',2.414*100,100);
	t.add(4,1,'lichens',2.414*90,90);
	t.add(5,1,'animals',2.414*150,150);
	t.add(6,2,'mosses',2.414*90,90);
	t.add(7,2,'ferns',2.414*100,100);
	t.add(8,2,'gymnosperms');
	t.add(9,2,'dicotyledons',2.414*150,150);
	t.add(10,2,'monocotyledons');
	t.add(11,5,'invertebrates',2.414*150,150);
	t.add(12,5,'vertebrates',2.414*100,100);
	t.add(13,11,'insects',2.414*100,100);
	t.add(14,11,'molluscs',2.414*80,80);
	t.add(15,11,'crustaceans',2.414*60,60);		
	t.add(16,11,'others',2.414*40,40);								
	t.add(17,12,'fish');
	t.add(18,12,'amphibians');
	t.add(19,12,'reptiles');		
	t.add(20,12,'birds');								
	t.add(21,7,'mammals',2.414*70,70);
	t.add(22,21,'mammals',2.414*50,50);
	t.add(23,22,'mammals',2.414*30,30);
	
	t._positionTree();										

}