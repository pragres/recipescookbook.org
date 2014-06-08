/**
 * Ramifip JS GUI Grids
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

ramifip.gui.GridWithRemoteData = function(p){
    p = cop(p, {
        id: "datagrid_" + date("Ymdhis"),
        xclass: "",
        columns: [],
        render: "body",
        showItem: function(i){
        },
        remoteData: function(){
        },
        remoteParams: {},
        translate: {
            label_groupby: "Group by",
            label_orderby: "Order by"
        }
    });
    
    var grid = {
        draw: function(){
            var html = '';
            
            html = html + this.translate.label_orderby + ": <select id = \"cbo-" + this.id + "-orderby\">";
            for (var i in this.columns) {
                var c = this.columns[i];
                var ss = '';
                if (isset(this.remoteParams.orderby)) 
                    if (this.remoteParams.orderby == c.field) 
                        ss = 'selected';
                html = html + '<option value = "' + c.field + '" ' + ss + '>' + c.title + '</option>';
            }
            html = html + "</select>";
            
            html = html + '<br><table class = "rp-table-grid ' + this.xclass + '"><tr>';
            
            for (var i in this.columns) {
                var c = this.columns[i];
                html = html + '<th id = "rp-table-grid-header">' + c.title + '</th>';
            }
            
            html = html + '</tr>';
            
            for (var i in this.data.table) {
                var rec = this.data.table[i];
                html = html + '<tr class = "rp-table-grid-row" onclick = "' + this.id + '.showItem(' + i + ');">';
                for (var j in this.columns) {
                    var value = rec[this.columns[j].field];
                    if (isset(this.columns[j].getValue)) 
                        value = this.columns[j].getValue(value);
                    
                    if (value == null) 
                        value = "";
                    
                    html = html + '<td class = "rp-table-grid-cell">' + value + '</td>';
                }
                html = html + '</tr>';
            }
            html = html + '</table>';
            if (this.data.pages > 1) {
                html = html + '<table><tr>';
                if (this.data.page > 1) 
                    html = html + '<td><div class = "rp-mini-button" onclick = "' + this.id + '.prevPage();"> << </div></td>';
                html = html + '<td>pag. ' + this.data.page + '/' + this.data.pages + '</td>';
                if (this.data.page < this.data.pages) 
                    html = html + '<td><div class = "rp-mini-button" onclick = "' + this.id + '.nextPage();"> >> </div></td>';
                html = html + '</tr></table>';
            }
            $(this.render).html(html);
            
            eval('$("#cbo-' + this.id + '-orderby").change(function(){' + this.id + '.remoteParams.orderby = $("#cbo-' + this.id + '-orderby").val(); ' + this.id + '.load(); ' + this.id + '.draw()});');
            
        },
        load: function(){
            var data = this.remoteData(this.remoteParams);
            data.pages = data.total / data.limit;
            if (data.total < data.limit) 
                data.pages = 1;
            if (data.pages * data.limit < data.total) 
                data.pages++;
            data.page = data.offset / data.limit + 1;
            data.last_page = 1;
            if (data.page > 1) 
                data.last_page = data.page - 1;
            data.next_page = 2;
            if (data.page < data.pages) 
                data.next_page = this.page + 1;
            data.last_offset = (data.last_page - 1) * data.limit;
            data.next_offset = (data.next_page - 1) * data.limit;
            this.data = data;
        },
        nextPage: function(){
            this.remoteParams.offset = this.remoteParams.offset + this.data.limit;
            this.load();
            this.draw();
        },
        prevPage: function(){
            this.remoteParams.offset = this.remoteParams.offset - this.data.limit;
            this.load();
            this.draw();
        }
    };
    
    grid = cop(grid, p);
    grid.load();
    grid.draw();
    eval("window." + p.id + " = grid;");
};
