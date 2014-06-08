function validate(){
    return ramifip.gui.validateFields([
        {
            id: "edtSecret",
            check: function(v){
                if (trim($("#editor-edtSecret").html())=="")
                    return false;
				if (trim($("#edtHeader").val())=="")
                    return false;
                return true;
            }
        }
    ]);
}