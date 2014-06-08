/** 
 * Ramifip JS GUI CheckBoxGrid
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License
 * for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program as the file LICENSE.txt; if not, please see
 * http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 * 
 * @version 1.0
 * @link http://ramifip.com
 */

ramifip.gui.checkBoxGrid = function(p){
	
	if (typeof p.render == "undefined") {
        if (typeof p.cmp == "undefined") 
            return false;
        p.render = p.cmp;
    }
    else 
        if (typeof p.cmp == "undefined") 
            p.cmp = p.render;
			
	p = cop(p,{
		grid: [[false]],
		rows: 1,
		cols: 1
	});
	
	if (p.rows < p.grid.legnth) 
		p.rows = p.grid.length;
	
	for(var i = 0; i< p.rows; i++){
		if (!isset(p.grid[i]))
			p.grid[i] = [];
			
		if (p.cols < p.grid[i].length)
			p.cols = p.grid[i].length;
		
		for (var j = 0; j< p.grid[i].length; j++){
			if (!isset(p.grid[i][j]))
				p.grid[i][j] = false;
		}			
	}
		
	var fcheck = function(x,y){
			this.grid[x][y].checked = !grid[x][y].checked; 
			this.grid[x][y].onClick(this.grid[x][y].checked);
		};
	
	eval("window." + p.cmp + " = {grid: p.grid, rows: p.rows, cols: p.cols, check: fcheck};");

	html = '<table>';
	
	for(var i = 0; i< p.rows; i++){
		html = html + '<tr>';
		for (var j = 0; j < p.cols; j++){
			html = html + '<td><input id = "' + p.cmp + '_chk'+i+'_'+j+'" type = "checkbox" ' + (p.grid[i][j] == true?"checked":"") + '"></td>';
		}
		html = html + '</tr>';
	}
		
	$("#" + p.render).append(html);
};

// End of file