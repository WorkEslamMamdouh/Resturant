$(document).ready(function () {
    Items.InitalizeComponent();
});
var Items;
(function (Items) {
    var AccountType = 1;
    var MSG_ID;
    var Details = new Array();
    var Display_Type = new Array();
    var Display_Filtr = new Array();
    var Detailsfamilly = new Array();
    //var Display_STORE: Array<G_STORE> = new Array<G_STORE>();
    //var Display_D_UOM: Array<I_D_UOM> = new Array<I_D_UOM>();
    //var Display_ItemFamily: Array<CATEGRES> = new Array<CATEGRES>();
    //var BilldItemFamily: Array<CATEGRES> = new Array<CATEGRES>();
    var BilldDetail = new Array();
    //var Details: Array<CATEGRES> = new Array<CATEGRES>();
    var btnNew_sub_Add_service;
    var btnsave;
    var btnAddDetails;
    var btnEdit;
    var btnShow;
    //var btnView: HTMLButtonElement;
    var sys = new SystemTools();
    //var sys: _shared = new _shared();
    var SysSession = GetSystemSession();
    var Model = new PRODUCT();
    var CountGrid = 0;
    var compcode; //SharedSession.CurrentEnvironment.CompCode;
    var btnback;
    var catId;
    var catId_type_change;
    var ItemFamilyID_change;
    var flag_Assign = 0;
    var ItemFamilyID;
    var storeCode = 1;
    var Itm_DescA;
    var flag_Display = 0;
    var StocK = "All";
    var ID_CAT;
    function InitalizeComponent() {
        debugger;
        if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
            document.getElementById('Screen_name').innerHTML = "الاصناف";
        }
        else {
            document.getElementById('Screen_name').innerHTML = "Items";
        }
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        InitalizeControls();
        InitalizeEvents();
        Display_DrpPaymentType();
        Displayfamilly();
        //Display_All();
    }
    Items.InitalizeComponent = InitalizeComponent;
    $('#btnedite').on('click', function () {
        if ($('#drpPaymentType').val() == 'null' || $('#drpPaymentType').val() == 'Null') {
            MessageBox.Show('يبجب اختيار الفئة اوالاً', '');
            return;
        }
        $('#btnsave').toggleClass("display_none");
        $('#btnback').toggleClass("display_none");
        $("#div_ContentData :input").removeAttr("disabled");
        $("#btnedite").toggleClass("display_none");
        $(".SelectDIS").attr("disabled", "disabled");
        if ($('#drpitem_family :selected').text() == "النوع") {
            $("#drpitem_family").attr("disabled", "disabled");
        }
        else {
            $("#drpitem_family").removeAttr("disabled");
        }
        $("#drp_G_Store").attr("disabled", "disabled");
        $("#drpPaymentType").attr("disabled", "disabled");
        $("#drpitem_family").attr("disabled", "disabled");
        $("#drp_StocK").attr("disabled", "disabled");
        $(".btnAddDetails").removeAttr("disabled");
        $('#btnAddDetails').attr('class', 'glyphicon glyphicon-plus-sign');
        $(".fa-minus-circle").removeClass("display_none");
        $("#drbfamilly_cat").attr("disabled", "disabled");
    });
    function InitalizeControls() {
        //                               يث
        btnAddDetails = document.getElementById("btnAddDetails");
        btnEdit = document.getElementById("btnedite");
        btnsave = document.getElementById("btnsave");
        btnback = document.getElementById("btnback");
        //btnShow = document.getElementById("btnShow") as HTMLButtonElement;
    }
    function InitalizeEvents() {
        btnAddDetails.onclick = AddNewRow;
        btnsave.onclick = btnsave_onClick;
        btnback.onclick = btnback_onclick;
        //btnShow.onclick = btnShow_onclick;
    }
    function btnShow_onclick() {
        btnback_onclick();
    }
    function AddNewRow() {
        if (!SysSession.CurrentPrivileges.AddNew)
            return;
        var CanAdd = true;
        if (CountGrid > 0) {
            var LastRowNo = CountGrid - 1;
            CanAdd = Validation_Grid(LastRowNo);
        }
        if (CanAdd) {
            BuildControls(CountGrid);
            $("#txtDescA" + CountGrid).removeAttr("disabled");
            $("#txtOnhandQty" + CountGrid).removeAttr("disabled");
            $("#select_Type_Item" + CountGrid).removeAttr("disabled");
            $("#txtPurchasing_price" + CountGrid).removeAttr("disabled");
            $("#txtUnitPrice" + CountGrid).removeAttr("disabled");
            $("#txtMinUnitPrice" + CountGrid).removeAttr("disabled");
            $("#Serial" + CountGrid).removeAttr("disabled");
            $("#txtCode" + CountGrid).val(CountGrid + 1);
            $("#select_Type_Item" + CountGrid).prop('value', $("#drpPaymentType").val() == 'Null' ? '10101' : Number($("#drpPaymentType").val()));
            $("#txt_StatusFlag" + CountGrid).val("i"); //In Insert mode
            $("#btn_minus" + CountGrid).removeClass("display_none");
            $("#btn_minus" + CountGrid).removeAttr("disabled");
            CountGrid++;
        }
        $("#btnedite").addClass("display_none");
    }
    function BuildControls(cnt) {
        var html;
        // 
        html = '<div id="No_Row' + cnt + '" class="container-fluid ">' +
            '<div class="row">' +
            '<div class="col-lg-12">' +
            '<span id = "btn_minus' + cnt + '" class="fa fa-minus-circle fontitm3 display_none" disabled = "disabled"> </span>' +
            '<div class=" "><input id="txtID' + cnt + '" type="text" class="form-control right2 display_none" disabled=""></div>' +
            '<div class="col-lg-1"><input id="txtCode' + cnt + '" type="text" class="form-control right2 SelectDIS" disabled=""></div>' +
            '<div class="col-lg-3"><input id="txtDescA' + cnt + '" type="text" class="form-control right2" disabled=""></div> ' +
            '<div class="col-lg-2"><select id="select_Type_Item' + cnt + '" class="form-control" disabled=""></select></div> ' +
            '<div class="col-lg-1"><input id="txtOnhandQty' + cnt + '" type="number" disabled="" class="form-control right2 "></div> ' +
            '<div class="col-lg-1"><input id="txtPurchasing_price' + cnt + '" type="number" disabled="" class="form-control right2"></div> ' +
            '<div class="col-lg-1"><input id="txtUnitPrice' + cnt + '" type="number" disabled="" class="form-control right2"></div> ' +
            '<div class="col-lg-1"><input id="txtMinUnitPrice' + cnt + '" type="number" disabled="" class="form-control right2"></div> ' +
            '<div class="col-lg-2"><input id="Serial' + cnt + '" type="number" disabled="" class="form-control right2"></div> ' +
            '</div>' +
            '</div> ' +
            '<input id="txt_StatusFlag' + cnt + '" name=" " type="hidden" class="form-control" value=""> ' +
            '<input id="txtID' + cnt + '" name=" " type="hidden" class="form-control" value=""> ' +
            '</div> ';
        $("#div_Data").append(html);
        //Display_Type = Display_Filtr;
        $('#select_Type_Item' + cnt).append('<option value="10101">أختر الفئه</option>');
        for (var i = 0; i < Display_Type.length; i++) {
            $('#select_Type_Item' + cnt).append('<option value="' + Display_Type[i].ID_CAT + '">' + Display_Type[i].Name_CAT + '</option>');
        }
        $("#btn_minus" + cnt).on('click', function () {
            DeleteRow(cnt);
        });
        $("#txtCode" + cnt).on('change', function () {
        });
        $("#txtDescA" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
            Validate_code(cnt);
        });
        $("#select_Type_Item" + cnt).on('change', function () {
            catId_type_change = $("#select_Type_Item" + cnt).val();
            $("#select_ItemFamily" + cnt).removeAttr("disabled");
            $('#select_ItemFamily' + cnt).html("");
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#txtPurchasing_price" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#txtOnhandQty" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#txtUnitPrice" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#txtMinUnitPrice" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
            //debugger
            if ($("#txtUnitPrice" + cnt).val() == "" || $("#txtUnitPrice" + cnt).val() == 0) {
                MessageBox.Show('يجب أدخال سعر الصنف اوالاً', 'خطأ');
                $("#txtMinUnitPrice" + cnt).val(0);
            }
            else if (Number($("#txtMinUnitPrice" + cnt).val()) > Number($("#txtUnitPrice" + cnt).val())) {
                MessageBox.Show('يجب ان يكون أقل سعر اصغر من سعر الصنف', 'خطأ');
                $("#txtMinUnitPrice" + cnt).val($("#txtUnitPrice" + cnt).val() - 1);
            }
        });
        $("#Serial" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        if (SysSession.CurrentPrivileges.Remove) {
            //$("#btn_minus" + cnt).removeClass("display_none");
            //$("#btn_minus" + cnt).removeAttr("disabled");
            $("#btn_minus" + cnt).addClass("display_none");
            $("#btn_minus" + cnt).attr("disabled", "disabled");
        }
        else {
            $("#btn_minus" + cnt).addClass("display_none");
            $("#btn_minus" + cnt).attr("disabled", "disabled");
        }
        return;
    }
    function btnsave_onClick() {
        if (Validation_Grid(CountGrid - 1))
            Update();
        flag_Assign = 0;
    }
    $('#drbfamilly_cat').on('change', function () {
        if ($('#drbfamilly_cat').val() == "Null") {
            $('#drpPaymentType').attr('disabled', 'disabled');
            $('#drpPaymentType').html('');
            $('#drpPaymentType').append('<option   value="null">اختر الفئه</option>');
            $("#div_Data").html('');
        }
        else {
            Display_Type = Display_Filtr.filter(function (x) { return x.ID_familly_Cat == Number($('#drbfamilly_cat').val()); });
            DisplayStkDefCategory();
            $('#drpPaymentType').removeAttr('disabled');
        }
    });
    $('#drpPaymentType').on('change', function () {
        if ($('#drpPaymentType').val() == 'null') {
            $("#div_Data").html('');
        }
        else {
            Display();
        }
    });
    function Display_DrpPaymentType() {
        debugger;
        //var StkDefCategory: Array<CATEGRES> = new Array<CATEGRES>();
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Category", "GetAll"),
            data: { CompCode: compcode },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Display_Filtr = result.Response;
                }
            }
        });
    }
    function DisplayStkDefCategory() {
        debugger;
        $('#drpPaymentType').html('');
        $('#drpPaymentType').append('<option   value="null">اختر الفئه</option>');
        for (var i = 0; i < Display_Type.length; i++) {
            $('#drpPaymentType').append('<option data-ItemID="' + Display_Type[i].Name_CAT + '" value="' + Display_Type[i].ID_CAT + '">' + Display_Type[i].Name_CAT + '</option>');
        }
    }
    function Displayfamilly() {
        debugger;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("familly_Cat", "GetAll"),
            data: { CompCode: compcode },
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess) {
                    Detailsfamilly = result.Response;
                    DisplayStkDefCategoryfamilly();
                }
            }
        });
    }
    function DisplayStkDefCategoryfamilly() {
        debugger;
        for (var i = 0; i < Detailsfamilly.length; i++) {
            $('#drbfamilly_cat').append('<option value="' + Detailsfamilly[i].ID_familly_Cat + '">' + Detailsfamilly[i].Name_familly_Cat + '</option>');
        }
    }
    function refresh() {
        $('#div_Data').html("");
        CountGrid = 0;
        ItemFamilyID = $('#drpitem_family').val();
        Display();
        flag_Assign = 0;
    }
    function Update() {
        Assign();
        console.log(BilldDetail);
        if (BilldDetail.filter(function (x) { return x.PRODUCT_NAME == "" || x.PRODUCT_NAME == " " || x.PRODUCT_NAME == "  " || x.PRODUCT_NAME == "   " || x.PRODUCT_NAME == "    "; }).length > 0) {
            MessageBox.Show(" يجب ادخال الوصف باعربي", "خطأ");
            return;
        }
        if (BilldDetail.filter(function (x) { return x.ID_CAT == 10101; }).length > 0) {
            MessageBox.Show(" يجب ادخال الفئه", "خطأ");
            return;
        }
        if (BilldDetail.filter(function (x) { return x.PRODUCT_QET == Number(""); }).length > 0) {
            MessageBox.Show(" يجب ادخال الكميه", "خطأ");
            return;
        }
        if (BilldDetail.filter(function (x) { return x.PRODUCT_Purchasing_price == Number(""); }).length > 0) {
            MessageBox.Show(" يجب ادخال السعر الشراء", "خطأ");
            return;
        }
        if (BilldDetail.filter(function (x) { return x.PRODUCT_PRICE == Number(""); }).length > 0) {
            MessageBox.Show(" يجب ادخال السعر", "خطأ");
            return;
        }
        if (BilldDetail.filter(function (x) { return x.MinUnitPrice == Number(""); }).length > 0) {
            MessageBox.Show(" يجب ادخال اقل سعر", "خطأ");
            return;
        }
        //BilldDetail[0].Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
        //BilldDetail[0].UserCode = SysSession.CurrentEnvironment.UserCode;
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Items", "UpdateLst"),
            data: JSON.stringify(BilldDetail),
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    MessageBox.Show("تم الحفظ", "الحفظ");
                    btnback_onclick();
                    //refresh();
                    flag_Assign = 0;
                }
                else {
                    MessageBox.Show(result.ErrorMessage, "خطأ");
                }
            }
        });
    }
    function Assign() {
        debugger;
        BilldDetail = new Array();
        var StatusFlag;
        for (var i = 0; i < CountGrid; i++) {
            Model = new PRODUCT();
            StatusFlag = $("#txt_StatusFlag" + i).val();
            //$("#txt_StatusFlag" + i).val("");
            //debugger
            if (StatusFlag == "i") {
                //debugger
                Model.StatusFlag = StatusFlag.toString();
                Model.PRODUCT_ID = 0;
                Model.ID_CAT = $('#select_Type_Item' + i).val();
                Model.PRODUCT_NAME = $("#txtDescA" + i).val();
                Model.PRODUCT_QET = Number($("#txtOnhandQty" + i).val());
                Model.PRODUCT_PRICE = Number($('#txtUnitPrice' + i).val());
                Model.MinUnitPrice = Number($('#txtMinUnitPrice' + i).val());
                Model.PRODUCT_Purchasing_price = Number($("#txtPurchasing_price" + i).val());
                Model.serial = $("#Serial" + i).val();
                BilldDetail.push(Model);
                flag_Assign = 1;
            }
            if (StatusFlag == "u") {
                debugger;
                Model.StatusFlag = StatusFlag.toString();
                Model.PRODUCT_ID = $("#txtID" + i).val();
                Model.ID_CAT = $('#select_Type_Item' + i).val();
                Model.PRODUCT_NAME = $("#txtDescA" + i).val();
                Model.PRODUCT_QET = Number($("#txtOnhandQty" + i).val());
                Model.PRODUCT_PRICE = Number($('#txtUnitPrice' + i).val());
                Model.MinUnitPrice = Number($('#txtMinUnitPrice' + i).val());
                Model.PRODUCT_Purchasing_price = Number($("#txtPurchasing_price" + i).val());
                Model.serial = $("#Serial" + i).val();
                BilldDetail.push(Model);
                flag_Assign = 1;
            }
            if (StatusFlag == "d") {
                //debugger
                if ($("#txtID" + i).val() != "") {
                    Model.StatusFlag = StatusFlag.toString();
                    Model.PRODUCT_ID = $("#txtID" + i).val();
                    BilldDetail.push(Model);
                    flag_Assign = 1;
                }
            }
        }
    }
    function Display_All() {
        ItemFamilyID = 0;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Items", "GetAll"),
            data: { CompCode: 1 },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    //debugger
                    Details = result.Response;
                    Details_All();
                }
            }
        });
    }
    function Details_All() {
        CountGrid = 0;
        $("#div_Data").html('');
        for (var i = 0; i < Details.length; i++) {
            ID_CAT = Details[i].ID_CAT;
            BuildControls(CountGrid);
            $("#txtID" + i).val(Details[i].PRODUCT_ID);
            $("#txtCode" + i).val(i + 1);
            $("#txtDescA" + i).val(Details[i].PRODUCT_NAME);
            $("#txtOnhandQty" + i).val(Details[i].PRODUCT_QET);
            $("#txtPurchasing_price" + i).val(Details[i].PRODUCT_Purchasing_price);
            $("#txtUnitPrice" + i).val(Details[i].PRODUCT_PRICE);
            $("#txtMinUnitPrice" + i).val(Details[i].MinUnitPrice);
            $("#Serial" + i).val(Details[i].serial);
            $('#select_Type_Item' + i).prop("value", Details[i].ID_CAT);
            $("#txt_StatusFlag" + i).val("");
            CountGrid++;
        }
    }
    function Display() {
        //debugger
        var cate = $("#drpPaymentType").val();
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Items", "GetAll_Item_by_Cat"),
            data: {
                cat: cate
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Details = result.Response;
                    DisplayGetItemStore();
                }
            }
        });
    }
    function DisplayGetItemStore() {
        CountGrid = 0;
        $("#div_Data").html('');
        for (var i = 0; i < Details.length; i++) {
            BuildControls(CountGrid);
            $("#txtID" + i).val(Details[i].PRODUCT_ID);
            $("#txtCode" + i).val(i + 1);
            $("#txtDescA" + i).val(Details[i].PRODUCT_NAME);
            $("#txtOnhandQty" + i).val(Details[i].PRODUCT_QET);
            $("#txtPurchasing_price" + i).val(Details[i].PRODUCT_Purchasing_price);
            $("#txtUnitPrice" + i).val(Details[i].PRODUCT_PRICE);
            $("#txtMinUnitPrice" + i).val(Details[i].MinUnitPrice);
            $("#Serial" + i).val(Details[i].serial);
            $('#select_Type_Item' + i).prop("value", Details[i].ID_CAT);
            $("#txt_StatusFlag" + i).val("");
            CountGrid++;
        }
    }
    function DeleteRow(RecNo) {
        if (!SysSession.CurrentPrivileges.Remove)
            return;
        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", function () {
            if ($("#txtCode" + RecNo).val() == "") {
                Null_Fild(RecNo);
                $("#No_Row" + RecNo).attr("hidden", "true");
            }
            else {
                $("#No_Row" + RecNo).attr("hidden", "true");
            }
            if ($("#txt_StatusFlag" + RecNo).val() == 'i') {
                $("#txt_StatusFlag" + RecNo).val("m");
            }
            else {
                $("#txt_StatusFlag" + RecNo).val("d");
            }
            //$("#txtCode" + RecNo).val("");
            $("#txtCode" + RecNo).val("000");
            $("#txtDescA" + RecNo).val("000");
            $("#txtOnhandQty" + RecNo).val("000");
            $("#txtPurchasing_price" + RecNo).val("000");
            $("#txtUnitPrice" + RecNo).val("000");
            $("#txtMinUnitPrice" + RecNo).val("000");
        });
    }
    function Null_Fild(RecNo) {
        $("#txtID" + RecNo).val("");
        $("#txtCode" + RecNo).val("0");
        $("#txtDescA" + RecNo).val(0);
        // $("#txtDescL" + RecNo).val(0);
        $("#txtRefItemCode" + RecNo).val(0);
        $("#txtOnhandQty" + RecNo).val(0);
        $("#txtLastBarCodeSeq" + RecNo).val(0);
        $("#txtLastBarCodeSeq" + RecNo).val(0);
        $('#select_Type_Item' + RecNo).prop("selectedIndex", 0);
        $('#select_ItemFamily' + RecNo).prop("selectedIndex", 0);
        //$("#txt_StatusFlag" + RecNo).val("");
    }
    function btnback_onclick() {
        if ($('#btnback').attr('class') != "btn btn-warning display_none") {
            $('#btnback').toggleClass("display_none");
        }
        if ($('#btnsave').attr('class') != "btn btn-success display_none") {
            $('#btnsave').toggleClass("display_none");
        }
        $('#btnAddDetails').attr('class', 'glyphicon glyphicon-plus-sign  display_none');
        $(".fa-minus-circle").addClass("display_none");
        $("#btnedite").removeClass("display_none");
        $("#btnedite").removeAttr("disabled");
        $("#btnback").removeAttr("disabled");
        $("#btnsave").removeAttr("disabled");
        CountGrid = 0;
        $("#div_Data").html("");
        if ($("#drpPaymentType").val() == "Null") {
            Display_All();
        }
        else {
            Display();
        }
        $("#drpPaymentType").removeAttr("disabled");
        $("#drpitem_family").removeAttr("disabled");
        $("#drp_StocK").removeAttr("disabled");
        $("#drbfamilly_cat").removeAttr("disabled");
    }
    function Validation_Grid(rowcount) {
        if ($("#txt_StatusFlag" + rowcount).val() == "d" || $("#txt_StatusFlag" + rowcount).val() == "m") {
            return true;
        }
        else {
            if (($("#txtDescA" + rowcount).val() == "") && $("#txt_StatusFlag" + rowcount).val() != "d") {
                MessageBox.Show("  برجاء ادخل الوصف العربي ", "خطأ");
                Errorinput($("#txtDescA" + rowcount));
                return false;
            }
            if (($("#select_Type_Item" + rowcount).val() == "10101") && $("#txt_StatusFlag" + rowcount).val() != "d") {
                MessageBox.Show("برجاء اختار الفئة  ", "خطأ");
                Errorinput($("#select_Type_Item" + rowcount));
                return false;
            }
            if ($("#txtOnhandQty" + rowcount).val() == "") {
                MessageBox.Show("برجاء ادخل الكميه المتاحه", "خطأ");
                Errorinput($("#txtOnhandQty" + rowcount));
                return false;
            }
            if ($("#txtPurchasing_price" + rowcount).val() == "") {
                MessageBox.Show("برجاء ادخل سعر الشراء", "خطأ");
                Errorinput($("#txtPurchasing_price" + rowcount));
                return false;
            }
            if ($("#txtUnitPrice" + rowcount).val() == "") {
                MessageBox.Show(" برجاء ادخل السعر البيع", "خطأ");
                Errorinput($("#txtUnitPrice" + rowcount));
                return false;
            }
            if ($("#txtMinUnitPrice" + rowcount).val() == "") {
                MessageBox.Show("برجاء ادخل اقل سعر", "خطأ");
                Errorinput($("#txtMinUnitPrice" + rowcount));
                return false;
            }
        }
        return true;
    }
    function Validate_code(rowno) {
        for (var i = 0; i < CountGrid; i++) {
            if (i != rowno) {
                if ($("#txt_StatusFlag" + i).val() == "d" || $("#txt_StatusFlag" + i).val() == "d") {
                    return true;
                }
                else {
                    if ($("#txtDescA" + rowno).val() == $("#txtDescA" + i).val()) {
                        var Code = $("#txtDescA" + rowno).val();
                        $("#txtDescA" + rowno).val("");
                        WorningMessage("لا يمكن تكرار الصنف " + Code, "code cannot br repeated?", "تحذير", "worning", function () {
                            $("#txtDescA" + rowno).val("");
                            return false;
                        });
                    }
                }
            }
        }
        if ($("#txt_StatusFlag" + rowno).val() != "i")
            $("#txt_StatusFlag" + rowno).val("u");
        return true;
    }
})(Items || (Items = {}));
//# sourceMappingURL=Items.js.map