// 90% of this code is shamelessly stolen from Jake White's VGC calc, so huge shoutouts to him!

var showdownFormes = [["Kyurem-White", "Kyurem-W"],
["Kyurem-Black", "Kyurem-B"],
["Rotom-Wash", "Rotom-W"],
["Rotom-Heat", "Rotom-H"],
["Rotom-Frost", "Rotom-F"],
["Rotom-Mow", "Rotom-C"],
["Rotom-Fan", "Rotom-S"],
["Giratina-Origin", "Giratina-O"],
["Landorus-Therian", "Landorus-T"],
["Thundurus-Therian", "Thundurus-T"],
["Tornadus-Therian", "Tornadus-T"],
["Floette-Eternal", "Floette-E"],
["Pumpkaboo", "Pumpkaboo-Average"],
["Gourgeist", "Gourgeist-Average"],
["Wormadan-Sandy", "Wormadan-G"],
["Wormadan-Trash", "Wormadan-S"],
["Groudon-Primal", "Groudon"],
["Kyogre-Primal", "Kyogre"]];

var savecustom = function()
{

	var string = document.getElementById('customMon').value
	var lines = string.split('\n')
	var species = "";
	var item = "";
	var ability = ""
	var level = "50";
	var EVs = [0,0,0,0,0,0];
	var IVs = [31,31,31,31,31,31]
	var nature = "Serious"
	var moves = []
	var movarray = new Array()
 	var flags = ""
	var part1 = '{"species":'
	var part2 = '","gender":"'
	var part3 = '","item":"'
	var part4 = '","ability":"'
	var part5 = '","evs":{'
	var part6 = '},"nature":"'
	var part7 = '","moves":[["'
	var part8 = '"],["'
	var part9 = '"]]'
	var part11 = '}'
	
	
	
	if(lines[0].indexOf('(M)') != -1)
	{
	var gender = "M"
	}
	else if(lines[0].indexOf('(F)') != -1)
	{
	var gender = "F"
	}
	else var gender = ""
	
	if(lines[0].indexOf('(M)') != -1)
	{
		lines[0] = lines[0].substring(0, lines[0].indexOf('(M)') - 1) + 
		lines[0].substring(lines[0].indexOf('(M)') + 3, lines[0].length);
	}
	else if(lines[0].indexOf('(F)') != -1)
	{
		lines[0] = lines[0].substring(0, lines[0].indexOf('(F)')) + 
		lines[0].substring(lines[0].indexOf('(F)') + 3, lines[0].length);
	}
	if(lines[0].indexOf('(') != -1)
	{
		firstParenth = lines[0].lastIndexOf('(');
		lastParenth = lines[0].lastIndexOf(')');
		species = lines[0].substring(firstParenth + 1, lastParenth).trim();
	}
	else
		species = lines[0].split('@')[0].trim(); //species is always first
	for(var i = 0; i < showdownFormes.length; ++i)
	{
		if(species == showdownFormes[i][0])
			species = showdownFormes[i][1]
	}
	
	if(lines[0].indexOf('@') != -1)
		item = lines[0].substring(lines[0].indexOf('@')+1).trim(); //item is always after @
	ability = lines[1].substring(lines[1].indexOf(' ')+1).trim(); //ability is always second
	if(lines.length > 2){
		for(var i = 2; i < lines.length; ++i){
			if(lines[i].indexOf("Level") != -1){
				level = lines[2].split(' ')[1].trim(); //level is sometimes third but uh not always
			}
			if(lines[i].indexOf("EVs") != -1) //if EVs are in this line
			{
				evList = lines[i].split(':')[1].split('/'); //splitting it into a list of " # Stat "
				for(var j = 0; j < evList.length; ++j){
					evList[j] = evList[j].trim();
					evListElements = evList[j].split(' ');
					if(evListElements[1] == "HP")
						EVs[0] = parseInt(evListElements[0])
					else if(evListElements[1] == "Atk")
						EVs[1] = parseInt(evListElements[0])
					else if(evListElements[1] == "Def")
						EVs[2] = parseInt(evListElements[0])
					else if(evListElements[1] == "SpA")
						EVs[3] = parseInt(evListElements[0])
					else if(evListElements[1] == "SpD")
						EVs[4] = parseInt(evListElements[0])
					else if(evListElements[1] == "Spe")
						EVs[5] = parseInt(evListElements[0])
				}

			}
			if(lines[i].indexOf("IVs") != -1) //if IVs are in this line
			{
				ivList = lines[i].split(':')[1].split('/'); //splitting it into a list of " # Stat "
				for(var j = 0; j < ivList.length; ++j){
					ivList[j] = ivList[j].trim();
					ivListElements = ivList[j].split(' ');
					if(ivListElements[1] == "HP")
						IVs[0] = parseInt(ivListElements[0])
					else if(ivListElements[1] == "Atk")
						IVs[1] = parseInt(ivListElements[0])
					else if(ivListElements[1] == "Def")
						IVs[2] = parseInt(ivListElements[0])
					else if(ivListElements[1] == "SpA")
						IVs[3] = parseInt(ivListElements[0])
					else if(ivListElements[1] == "SpD")
						IVs[4] = parseInt(ivListElements[0])
					else if(ivListElements[1] == "Spe")
						IVs[5] = parseInt(ivListElements[0])
				}


			}    
			if(lines[i].indexOf("Nature") != -1) //if nature is in this line
			{
				nature = lines[i].split(' ')[0].trim()
			}
			if(lines[i].indexOf("- ") != -1){ //if there is a move in this line
				var nextMove = lines[i].substring(lines[i].indexOf(' ') + 1).trim()
				 nextMove = nextMove.replace('[', '')
				 nextMove = nextMove.replace(']', '')
				 movarray.push(nextMove)
			}
			var movlist = movarray.toString()
			var move1 = movlist.split(",")[0]
			var move2 = movlist.split(",")[1]
			var move3 = movlist.split(",")[2]
			var move4 = movlist.split(",")[3]
			
			if(item.indexOf("ium") != -1) //if item is Z move
			{
				flags = '"zmoveOnly":2'
			}
			if(item.indexOf("ite") != -1) //if item is a mega stone
			{
				if(item == "White Herb")
				   {
				   flags = ""
				   }
				 else if(item == "Eviolite")
				 {
					 flags = ""
				 }
				else flags = '"megaOnly":1'
			}
			

		var pivs = ""
    		if ((IVs[0] + IVs[1] + IVs[2] + IVs[3] + IVs[4] + IVs[5])<186)
		var pivs = '"ivs":{'
    
		if (document.getElementById('hcheck').checked) {
    		var p1 = '{"'
    		var p2 = '":{"flags":{'
    		var p3 = '},"sets":['
    		var hcheck = p1.concat(species.toLowerCase(), p2, flags, p3)
		}
    		else {
		var hcheck = "";
		}
		
		if (document.getElementById('fcheck').checked) {
        		var fcheck ="]},";
    			}
   			else {
       			var fcheck = "";
    			}		
			
		    if (lines[0].indexOf('(') != -1)
		    {
		    var ln2p2 = lines[0].substring(0, lines[0].indexOf('(')).trim()
		    }
		    else var ln2p2 = "set name"
		}
	}		
		
			var hpev = '"hp":'
			var atev = ',"atk":'
			var deev = ',"def":'
			var saev = ',"spa":'
			var sdev = ',"spd":'
			var spev = ',"spe":'
			var sumivs = IVs[0] + IVs[1] + IVs[2] + IVs[3] + IVs[4] + IVs [5]
			
			// 185 - 155, 154 - 124, 123 - 93, 92 - 62, 61 - 31, 30 - 0
			

			
			if(sumivs == 186)
			{
				var ivcomma1 = ""
				var ivcomma2 = ""
				var ivcomma3 = ""
				var ivcomma4 = ""
				var ivcomma5 = ""
				var part10 = ""
				var part102 = ""
				}
			else {if(IVs[1] != 31)
				var part10 = ',"ivs":{'
				var part102 = "}"
			{ if (IVs[5] != 31){
				var ivcomma3 = ", "
				}
			}
			     }
		
				
			if(sumivs < 186)
			{
				if(IVs[0] == 31)
				{ 
					var hpiv = ""
				}
				else var hpiv = '"hp":'.concat(IVs[0])
				
				if(IVs[1] == 31)
				{ 
					var ativ = ""
				}
				else var ativ = '"atk":'.concat(IVs[1])
				
				if(IVs[2] == 31)
				{ 
					var deiv = ""
				}
				else var deiv = '"def":'.concat(IVs[2])
				
				if(IVs[3] == 31)
				{ 
					var saiv = ""
				}
				else var saiv = '"spa":'.concat(IVs[3])
				
				if(IVs[4] == 31)
				{ 
					var sdiv = ""
				}
				else var sdiv = '"spd":'.concat(IVs[4])
				
				if(IVs[5] == 31)
				{ 
					var spiv = ""
				}
				else var spiv = '"spe":'.concat(IVs[5])
			}
	
		if (document.getElementById('bcheck').checked) {
			//        		var bcheck = part1.concat(species,part2,gender,part3,item,part4,ability,part5,hpev,EVs[0],atev,EVs[1],deev,EVs[2],saev,EVs[3],sdev,EVs[4],spev,EVs[5],part6,nature,part7,move1,part8,move2,part8,move3,part8,move4,part9,part10,IV shit,part11);
        		var bcheck = part1.concat(species,part2,gender,part3,item,part4,ability,part5,hpev,EVs[0],atev,EVs[1],deev,EVs[2],saev,EVs[3],sdev,EVs[4],spev,EVs[5],part6,nature,part7,move1,part8,move2,part8,move3,part8,move4,part9,part10,hpiv,ativ,deiv,ivcomma3,saiv,sdiv,spiv,part102,part11);
    			}
   			else {
       			var bcheck = "";
    			}
		
		
	//var res = ln1p1.concat(species, ln1p2, ln2p1, ln2p2, ln2p3, ln3, ln4, hpev, atev, deev, saev, sdev, spev, ln11, ln12p1, hpiv, ativ, deiv, saiv, sdiv, spiv, ln11v2, ln19p1, nature, lnen, ln20p1, ability, lnen, ln21p1, item, lnen, ln22, lnmv, move1, lnen, lnmv, move2, lnen, lnmv, move3, lnen, lnmv, move4, lnenl, ln3l, ln2l, lnl);
    document.getElementById("Output").innerHTML = hcheck.concat(bcheck, fcheck)


}
