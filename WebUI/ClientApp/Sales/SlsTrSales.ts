﻿
$(document).ready(() => {

    SlsTrSales.InitalizeComponent();
})
namespace SlsTrSales {

    ////system varables
    var SysSession: SystemSession = GetSystemSession();

    var sys: SystemTools = new SystemTools();
    var FamilyDetails: Array<PRODUCT> = new Array<PRODUCT>();
    var Det_Single_Cust: CUSTOMER = new CUSTOMER();
    var Details_Updata_Cust: Array<CUSTOMER> = new Array<CUSTOMER>();
    var SearchDetails: Array<CUSTOMER> = new Array<CUSTOMER>();
    var CustomerDetails: Array<CUSTOMER> = new Array<CUSTOMER>();
    var CategoryDetails: Array<CATEGRES> = new Array<CATEGRES>();
    var Category: Array<CATEGRES> = new Array<CATEGRES>();
    var familly_CatDetails: Array<familly_Cat> = new Array<familly_Cat>();
    var MasterDetailModel: SlsInvoiceMasterDetails = new SlsInvoiceMasterDetails();
    var InvoiceModel: ORDER_Master = new ORDER_Master();
    var List: Array<Stok_ORDER_DELIVERY> = new Array<Stok_ORDER_DELIVERY>();
    var List_MinUnitPrice: Array<Stok_ORDER_DELIVERY> = new Array<Stok_ORDER_DELIVERY>();
    var Model: Stok_ORDER_DELIVERY = new Stok_ORDER_DELIVERY();

    var div_menu = document.getElementById('thing');
    var theThing = document.querySelector("#thing");
    var container: HTMLDivElement = document.querySelector("#contentContainer") as HTMLDivElement;
    var txtPrice: HTMLInputElement;
    var txtTotal_Price: HTMLInputElement;
    var txtTotAfterTax_Popu: HTMLInputElement;
    var txtQuantity: HTMLInputElement;
    var CChat: HTMLSpanElement;
    var Total_Basket: HTMLSpanElement;
    var Basket: HTMLSpanElement;
    var ID_input = null;
    var btn_cancel_Popu: HTMLButtonElement;
    var btnminus_Quantity: HTMLButtonElement;
    var btnplus_Quantity: HTMLButtonElement;
    var btnminus_price: HTMLButtonElement;
    var btnplus_price: HTMLButtonElement;
    var All_item: HTMLButtonElement;
    var Finsh_Order: HTMLButtonElement;
    var Finsh_Order_Print: HTMLButtonElement;
    var txt_ApprovePass: HTMLInputElement;
    var btn_Add_Basket: HTMLButtonElement;
    var btn_Edit_Basket: HTMLButtonElement;
    var btn_Approveprice: HTMLButtonElement;
    var btn_Exit_Approveprice: HTMLButtonElement;

    var Num_Qty = 0;
    var P = 0;
    var ItemID;
    var PRODUCT_price;
    var PRODUCT_NAME = "Null";
    var Qty = 0;
    var PRICE = 0;
    var ItemFamilyID;
    var IDPlus = 0;
    var zoom_select = 2.4;
    var scro = 0;
    var Num_Item;
    var x;
    var chat: HTMLDivElement;
    var Qet_X = 0;
    var fouse;
    var Qet_Product = 0;
    var Name_Product;
    var OnhandQty;
    var MinUnitPrice;
    var ValidationMinUnitPrice = 0;
    var Validation_Insert = 0;
    var price_Product = 0;
    var price_One_Product = 0;
    var Num_paragraph;
    var New_ItemFamilyID;
    var storeCode;
    var Num_Add_List = 0;
    var num_item_IN_Menu = 0;
    var CatPlus = 0;
    var famillyPlus = 0;
    var famillyID;
    var familly_NAME;
    var CatID;
    var Category_NAME;
    var class_input;
    var ItemFamilyID;
    var IDPlus = 0;
    //-------------------------------------------------------Customr-----------------------
    var ID_Customer;
    var Insert_But_Cust;
    var CUST_NAME: HTMLInputElement;
    var CUST_ADDRES;
    var CUST_ADDRES_2;
    var CUST_Phone;
    var But_Cutomr;
    var div_cutomr;
    var hid_div_Customr;
    var update_div_cust;
    var Remove_cust: HTMLButtonElement;
    var cust_search_phone: HTMLInputElement;
    var idCust: HTMLInputElement;
    var txt_search: HTMLInputElement;
    var fouse;
    var Num_Order;
    var Success;
    var flag_Cust = false;
    var id_Family;
    var id_Category;
    var type_Save_Print = false;
    var res: any;
    export function InitalizeComponent() {
        debugger
        $('#cont').toggleClass('colapsdivcont');

        $('#sidebar').toggleClass('active');
        $('#sidebarCollapse').addClass('display_none');

        InitalizeControls();
        InitializeEvents();
        Display_familly_Cate();
        Display_Category();
        Display_But();
        GetAllCustomer();
        var Ul_Div = document.createElement('ul');
        Ul_Div.setAttribute('id', 'Ul_Div');
        document.getElementById("mCSB_3_container").appendChild(Ul_Div);
        txt_search.focus();
    }
    function InitalizeControls() {
        if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
            document.getElementById('Screen_name').innerHTML = "فواتير المبيعات";

        }
        else {
            document.getElementById('Screen_name').innerHTML = "Sales Invoices";
        }

        All_item = document.getElementById("All_item") as HTMLButtonElement;

        btn_Add_Basket = document.getElementById("btn_Add_Basket") as HTMLButtonElement;
        btn_Edit_Basket = document.getElementById("btn_Edit_Basket") as HTMLButtonElement;
        btn_cancel_Popu = document.getElementById("btn_cancel_Popu") as HTMLButtonElement;
        Finsh_Order = document.getElementById("Finsh_Order") as HTMLButtonElement;
        Finsh_Order_Print = document.getElementById("Finsh_Order_Print") as HTMLButtonElement;
        btn_Exit_Approveprice = document.getElementById("btn_Exit_Approveprice") as HTMLButtonElement;

        btnminus_Quantity = document.getElementById("btnminus_Quantity") as HTMLButtonElement;
        btnplus_Quantity = document.getElementById("btnplus_Quantity") as HTMLButtonElement;
        btnminus_price = document.getElementById("btnminus_price") as HTMLButtonElement;
        btnplus_price = document.getElementById("btnplus_price") as HTMLButtonElement;
        btn_Approveprice = document.getElementById("btn_Approveprice") as HTMLButtonElement;
        Remove_cust = document.getElementById("Remove_cust") as HTMLButtonElement;


        CChat = document.getElementById("CChat") as HTMLSpanElement;
        Total_Basket = document.getElementById("Total_Basket") as HTMLSpanElement;
        Basket = document.getElementById("Basket") as HTMLSpanElement;
        Num_Item = document.getElementById('Num_Item');
        x = document.getElementById("x");
        chat = document.getElementById("chat") as HTMLDivElement;
        fouse = document.getElementById("fouse");
        txtPrice = document.getElementById('txtPrice') as HTMLInputElement;
        txtQuantity = document.getElementById('txtQuantity') as HTMLInputElement;
        txtTotal_Price = document.getElementById('txtTotal_Popu') as HTMLInputElement;
        txtTotAfterTax_Popu = document.getElementById('txtTotAfterTax_Popu') as HTMLInputElement;
        txt_ApprovePass = document.getElementById('txt_ApprovePass') as HTMLInputElement;
        //txt_search = document.getElementById('txt_search') as HTMLInputElement;
        //-------------------------------------------------------Customr-----------------------

        Insert_But_Cust = document.getElementById("Insert_But_Cust");
        CUST_NAME = document.getElementById("CUST_NAME") as HTMLInputElement;
        CUST_ADDRES = document.getElementById("CUST_ADDRES");
        CUST_ADDRES_2 = document.getElementById("CUST_ADDRES_2");
        CUST_Phone = document.getElementById("CUST_Phone");
        But_Cutomr = document.getElementById("But_Cutomr");
        div_cutomr = document.getElementById("div_cutomr");
        hid_div_Customr = document.getElementById("hid_div_Customr");
        update_div_cust = document.getElementById("update_div_cust");
        cust_search_phone = document.getElementById("cust_search_phone") as HTMLInputElement;
        idCust = document.getElementById("idCust") as HTMLInputElement;
        fouse = document.getElementById("fouse");

    }
    function InitializeEvents() {
        Basket.onclick = Basket_onclick;

        All_item.onclick = GetAll_item_onclick;

        btn_cancel_Popu.onclick = cancel_Popu_onclick;
        Finsh_Order.onclick = Finsh_Order_onclick;
        Finsh_Order_Print.onclick = Finsh_Order_Print_onclick;

        btn_Approveprice.onclick = btn_Approveprice_onclick;
        btn_Exit_Approveprice.onclick = btn_Exit_Approveprice_onclick;

        btnminus_Quantity.onclick = btnminus_Quantity_onclick;
        btnplus_Quantity.onclick = btnminus_Quantity_onclick;
        btnminus_price.onclick = btnminus_price_onclick;
        btnplus_price.onclick = btnminus_price_onclick;

        txtPrice.onkeyup = Total;
        txtQuantity.onkeyup = Total;
        btn_Add_Basket.onclick = But_Add_Popu;
        btn_Edit_Basket.onclick = Edit_ROW_IN_Basket;
        $('.compose-discard-bt').click(Remove_Item_in_Basket);


        //-------------------------------------------------------Customr-----------------------
        Insert_But_Cust.onclick = add_cust;
        cust_search_phone.onkeyup = get_cust;

        But_Cutomr.onclick = show_Cutomr;

        hid_div_Customr.onclick = hide_Custm;

        update_div_cust.onclick = update_cust;
        Remove_cust.onclick = Remove_cust_onclick;

        //txt_search.onchange = searcdisplay;

    }
    function timer() {
        debugger
        var date: Date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? (0 + minutes) : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;

    }
    function searcdisplay() {
        debugger
        var itembar = FamilyDetails.filter(x => x.serial == txt_search.value);

        if (itembar.length > 0) {

            $("#txtPrice").val(itembar[0].PRODUCT_PRICE);
            $("#txtTotal_Popu").val(itembar[0].PRODUCT_PRICE);
            txtQuantity.value = "1";



            Name_Product = itembar[0].PRODUCT_NAME;
            OnhandQty = itembar[0].PRODUCT_QET;
            MinUnitPrice = itembar[0].MinUnitPrice;
            ItemID = itembar[0].PRODUCT_ID;

            price_One_Product = parseFloat($("#txtPrice").val());
            price_Product = parseFloat($("#txtPrice").val());
            PRODUCT_price = parseFloat($("#txtPrice").val());
            Qet_Product = Number(txtQuantity.value);


            for (var i = 0; i < Num_Add_List + 1; i++) {
                var prgraph = document.getElementById("ppp" + i);
                if (prgraph != null) {
                    let Name_Item = prgraph.getAttribute("data_name_p");
                    let Qty = Number(prgraph.getAttribute("data_qet_p"));

                    if (Name_Item == Name_Product) {
                        OnhandQty = OnhandQty - Qty;
                    }
                }
            }

            if (OnhandQty <= 0) {
                alert('Finish');
            } else {

                Add_ROW_IN_Basket();


                Total();

                $("#PopupDialog").modal("hide");

                $('#Men_popu').attr('class', 'popu animated zoomOutRight');

                $("#txt_search").val("");


            }


        }



    }
    //--------------------------------------------------Display_familly_Cate--------------------------------
    function Display_familly_Cate() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("familly_Cat", "GetAll"),
            data: { CompCode: 1 },
            success: (d) => {
                ////////debugger;
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    familly_CatDetails = result.Response as Array<familly_Cat>;
                    for (var i = 0; i < familly_CatDetails.length; i++) {

                        familly_NAME = familly_CatDetails[i].Name_familly_Cat;
                        famillyID = familly_CatDetails[i].ID_familly_Cat;
                        famillyPlus = i;
                        Create_familly_Cate()
                    }

                }
            }
        });
    }
    function Create_familly_Cate() {


        var button_Category = document.createElement('button');
        button_Category.setAttribute('id', 'id_familly' + famillyPlus);
        button_Category.setAttribute('type', 'button');
        button_Category.setAttribute('data-famillyID', famillyID);
        button_Category.setAttribute('class', 'btn btn-info Style_familly');
        button_Category.setAttribute('value', familly_NAME);
        document.getElementById("div_familly").appendChild(button_Category);
        document.getElementById('id_familly' + famillyPlus + '').innerHTML = familly_NAME;
        $('#id_familly' + famillyPlus + '').click(Selecte_familly_Cate);




    }
    function Selecte_familly_Cate() {



        try {
            id_Family.attr('style', '');

        } catch (e) {

        }
        Category = new Array<CATEGRES>();



        famillyID = $(this).attr('data-famillyID');
        Category = CategoryDetails.filter(x => x.ID_familly_Cat == Number(famillyID));
        document.getElementById("div_Category").innerHTML = "";
        document.getElementById("uul").innerHTML = '';

        for (var i = 0; i < Category.length; i++) {

            Category_NAME = Category[i].Name_CAT;
            CatID = Category[i].ID_CAT;
            CatPlus = i;
            Create_Category();

            var Family = FamilyDetails.filter(x => x.ID_CAT == Number(Category[i].ID_CAT));
            DisplayItems(Family);

        }
        //document.getElementById("uul").innerHTML = '';

        $(this).attr('style', 'background: #e58828;');

        id_Family = $(this);

    }
    //--------------------------------------------------Display_Category--------------------------------
    function Display_Category() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Category", "GetAll"),
            data: { CompCode: 1 },
            success: (d) => {
                ////////debugger;
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    CategoryDetails = result.Response as Array<CATEGRES>;


                }
            }
        });
    }
    function Create_Category() {
        debugger
        var test_Category = document.getElementById("button_Category" + CatPlus);
        if (test_Category == null) {
            var button_Category = document.createElement('button');
            button_Category.setAttribute('id', 'id' + CatPlus);
            button_Category.setAttribute('type', 'button');
            button_Category.setAttribute('data-CatID', CatID);
            button_Category.setAttribute('class', 'btn btn-info Style_Category');
            button_Category.setAttribute('value', Category_NAME);
            document.getElementById("div_Category").appendChild(button_Category);
            document.getElementById('id' + CatPlus + '').innerHTML = Category_NAME;
            $('#id' + CatPlus + '').click(Selecte_Category);

        }


    }
    function GetAll_item_onclick() {
        debugger
        try {
            id_Category.attr('style', '');

        } catch (e) {

        }

        document.getElementById("uul").innerHTML = '';



        //DisplayItems(FamilyDetails);


        for (var i = 0; i < Category.length; i++) {

            var Family = FamilyDetails.filter(x => x.ID_CAT == Number(Category[i].ID_CAT));
            DisplayItems(Family);

        }

    }
    function Selecte_Category() {

        try {
            id_Category.attr('style', '');

        } catch (e) {

        }

        CatID = $(this).attr('data-CatID');
        var Category = FamilyDetails.filter(x => x.ID_CAT == Number(CatID));
        document.getElementById("uul").innerHTML = '';

        DisplayItems(Category);

        $(this).attr('style', 'background: #e58828;');

        id_Category = $(this);

    }
    //--------------------------------------------------Display_But--------------------------------
    function Display_But() {
        debugger


        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("Items", "GetAll"),
            data: { CompCode: 1 },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    FamilyDetails = result.Response as Array<PRODUCT>;

                    Category = CategoryDetails.filter(x => x.ID_familly_Cat == Number(12));
                    document.getElementById("div_Category").innerHTML = "";
                    document.getElementById("uul").innerHTML = '';

                    for (var i = 0; i < Category.length; i++) {

                        Category_NAME = Category[i].Name_CAT;
                        CatID = Category[i].ID_CAT;
                        CatPlus = i;
                        Create_Category();

                        var Family = FamilyDetails.filter(x => x.ID_CAT == Number(Category[i].ID_CAT));
                        DisplayItems(Family);

                    }

                }
            }
        });


    }
    function DisplayItems(ItemList: Array<PRODUCT>) {
        debugger
        for (var i = 0; i < ItemList.length; i++) {

            if (ItemList[i].ID_CAT == 1283) {
                class_input = "input_etisalat";
            } else if (ItemList[i].ID_CAT == 1285) {

                class_input = "input_vodafone";
            }
            else if (ItemList[i].ID_CAT == 1284) {

                class_input = "input_orange";
            }
            else if (ItemList[i].ID_CAT == 1286) {

                class_input = "input_we";
            } else {

                class_input = "input_blue";
            }
            PRODUCT_NAME = ItemList[i].PRODUCT_NAME;
            ItemFamilyID = ItemList[i].PRODUCT_ID;
            Qty = ItemList[i].PRODUCT_QET;
            PRICE = ItemList[i].PRODUCT_PRICE;
            MinUnitPrice = ItemList[i].MinUnitPrice;
            ItemID = ItemList[i].PRODUCT_ID;
            IDPlus = ItemID;
            AddBut();
        }
    }
    function AddBut() {
        debugger
        var test_input = document.getElementById("input" + IDPlus);
        if (test_input == null) {
            var ppp = document.createElement('li');
            ppp.setAttribute('id', 'li' + IDPlus);
            document.getElementById("uul").appendChild(ppp);

            var ul_ul = document.createElement('ul');
            ul_ul.setAttribute('id', 'ul_ul' + IDPlus);
            document.getElementById("li" + IDPlus + "").appendChild(ul_ul);

            var li_input = document.createElement('li');
            li_input.setAttribute('id', 'li_input' + IDPlus);
            document.getElementById("ul_ul" + IDPlus + "").appendChild(li_input);

            //var li_X = document.createElement('li');
            //li_X.setAttribute('id', 'li_div' + IDPlus);
            //document.getElementById("ul_ul" + IDPlus + "").appendChild(li_X);

            //var div_menu = document.createElement('div');
            //div_menu.setAttribute('id', 'div_menu' + IDPlus);
            //div_menu.setAttribute('style', 'display:none;');
            //div_menu.setAttribute('class', 'animated zoomin krkr');
            //document.getElementById("li_div" + IDPlus + "").appendChild(div_menu);

            //var ul_menu = document.createElement('ul');
            //ul_menu.setAttribute('id', 'ul_menu' + IDPlus);
            //document.getElementById("div_menu" + IDPlus + "").appendChild(ul_menu);

            var div = document.createElement('input');
            div.setAttribute('id', 'input' + IDPlus);
            div.setAttribute('id_QET', 'QET_' + IDPlus);
            div.setAttribute('type', 'button');
            div.setAttribute('value', PRODUCT_NAME);
            div.setAttribute('data-ItemFamilyID', ItemFamilyID);
            div.setAttribute('data-itemid', ItemID);
            div.setAttribute('data-id_Menu', 'li_menu' + IDPlus);
            div.setAttribute('data-ul_menu', 'ul_menu' + IDPlus);
            div.setAttribute('data-div_menu', 'div_menu' + IDPlus);
            div.setAttribute('data-Name', PRODUCT_NAME);
            div.setAttribute('data-Qty', Qty.toString());
            div.setAttribute('title', 'الكمية (' + Qty.toString() + ')');
            div.setAttribute('data-pirce', PRICE.toString());
            div.setAttribute('data-MinUnitPrice', MinUnitPrice);

            div.setAttribute('style', 'zoom:2.4;font-size: 8px;font-weight: bold;');

            div.setAttribute('class', 'Css_but chat-box-wrap shadow-reset ' + class_input + '');

            document.getElementById("li_input" + IDPlus + "").appendChild(div);
        }

        $('#input' + IDPlus).click(click_but);


        $('#input' + IDPlus).keyup(mousemove_but);
        $('#input' + IDPlus).mousemove(mousemove_but);
        $('#input' + IDPlus).mouseleave(mouseleave_but);

    }

    function mousemove_but() {

        this.setAttribute('value', '( ' + this.getAttribute('data-pirce') + ' )' + 'ج');


        //if (this.getAttribute('data-Qty') > 0) {
                                                                                              
        //    this.setAttribute('value', '( ' + this.getAttribute('data-pirce') + ' )' + 'ج');
        //}
        //else {
                                                                                                     
        //    this.setAttribute('value', 'Finish');                                                      
        //}

                        

    }
    function mouseleave_but() {

        this.setAttribute('value', this.getAttribute('data-Name'));


    }
    function click_but() {

        btn_Add_Basket.setAttribute('style', 'display:block;');
        btn_Edit_Basket.setAttribute('style', 'display:none;');

        Name_Product = $(this).attr('data-Name');
        //OnhandQty = $(this).attr('data-Qty');
        OnhandQty = 1;
        MinUnitPrice = $(this).attr('data-MinUnitPrice');

        //for (var i = 0; i < Num_Add_List + 1; i++) {
        //    var prgraph = document.getElementById("ppp" + i);
        //    if (prgraph != null) {
        //        let Name_Item = prgraph.getAttribute("data_name_p");
        //        let Qty = Number(prgraph.getAttribute("data_qet_p"));

        //        if (Name_Item == Name_Product) {
        //            OnhandQty = OnhandQty - Qty;
        //        }
        //    }
        //}

        //if (OnhandQty <= 0) {
        //    $(this).val('Finish');
        //} else {

            $('#id_Labol').html('' + Name_Product + '');
            $('#Men_popu').attr('style', 'display:block;');
            $('#Men_popu').attr('class', 'popu animated zoomIn');
            $('#txtQuantity').val('1');
            $('#txtPrice').val($(this).attr('data-pirce'));

            ItemID = $(this).attr('data-itemid')
            PRODUCT_price = $(this).attr('data-pirce')



            $("#PopupDialog").modal("show");


            Total();
        //}


    }
    //--------------------------------------------------Create_Menu--------------------------------    

    //--------------------------------------------------Open_Popu--------------------------------
    function btnminus_Quantity_onclick() {
        //debugger
        var type = $(this).attr('data-type');
        var input = $("#txtQuantity");
        var currentVal = parseFloat(input.val());
        if (!isNaN(currentVal)) {
            if (type == 'minus') {

                if (currentVal > Number(input.attr('min'))) {
                    input.val((currentVal - 1)).change();
                }
                if (parseFloat(input.val()) == Number(input.attr('min'))) {
                    $(this).val(input.attr('min'));
                }

            }
            else if (type == 'plus') {
                //if (currentVal < Number(OnhandQty)) {

                    if (currentVal < Number(input.attr('max'))) {
                        input.val((currentVal + 1)).change();
                    }
                    if (parseFloat(input.val()) == parseFloat(input.attr('max'))) {
                        $(this).val(input.attr('max'));
                    }

                //}
                //else {
                //    MessageBox.Show("خطأ الكميه المتاحه (" + OnhandQty + ")", "خطأ");
                //}


            }
        } else {
            input.val(1);
        }

        Total();
    }
    function btnminus_price_onclick() {

        var type = $(this).attr('data-type');
        var input = $("#txtPrice");
        var currentVal = parseFloat(input.val());
        if (!isNaN(currentVal)) {
            if (type == 'minus') {


                if (currentVal > Number(input.attr('min'))) {
                    input.val((currentVal - 0.5)).change();
                }
                if (parseFloat(input.val()) == Number(input.attr('min'))) {
                    $(this).val(input.attr('min'));
                }





            }
            else if (type == 'plus') {

                if (currentVal < Number(input.attr('max'))) {
                    input.val((currentVal + 0.5)).change();
                }
                if (parseFloat(input.val()) == parseFloat(input.attr('max'))) {
                    $(this).val(input.attr('max'));
                }

            }
        } else {
            input.val(1);
        }

        Total();
    }
    function cancel_Popu_onclick() {
        $("#PopupDialog").modal("hide");

        $('#Men_popu').attr('class', 'popu animated zoomOutUp');
    }
    function Total() {

        //if (Number($("#txtQuantity").val()) <= OnhandQty) {
            var total = Number($("#txtPrice").val()) * Number($("#txtQuantity").val());
            $("#txtTotal_Popu").val(total);


        //}
        //else {
        //    $("#txtQuantity").val(OnhandQty);

        //    MessageBox.Show("خطأ الكميه المتاحه (" + OnhandQty + ")", "خطأ");
        //    Total();
        //}


    }
    function But_Add_Popu() {
        debugger
        price_One_Product = parseFloat($("#txtPrice").val());
        price_Product = parseFloat($("#txtPrice").val());
        PRODUCT_price = parseFloat($("#txtPrice").val());
        Qet_Product = Number(txtQuantity.value);
        Add_ROW_IN_Basket();
        $("#PopupDialog").modal("hide");

        $('#Men_popu').attr('class', 'popu animated zoomOutRight');


    }
    ////--------------------------------------------------Basket--------------------------------
    function Edit_ROW_IN_Basket() {
        //debugger
        price_One_Product = parseFloat($("#txtPrice").val());
        price_Product = parseFloat($("#txtTotal_Popu").val());
        Qet_Product = Number(txtQuantity.value);

        var paragraph = document.getElementById('ppp' + Num_paragraph);
        var New_QET = Qet_Product;
        var New_price = price_Product;

        paragraph.setAttribute('data_QET_P', New_QET.toString());
        paragraph.setAttribute('data_total_price', New_price.toString());
        paragraph.innerHTML = '( ' + New_QET + ' )   ' + Name_Product + '  = ' + New_price + ' <a id="oioo' + Num_paragraph + '"  data-ID-Paragraph="' + Num_paragraph + '" href="#"  data-exit_id="exit' + Num_paragraph + '"  data-ip_div="comnt' + Num_paragraph + '" data-MinUnitPrice="' + MinUnitPrice + '" data-OnhandQty="' + OnhandQty + '" data-Name="' + Name_Product + '" data-price_One="' + price_One_Product + '"  data-Qet_Product="' + New_QET + '" class="chat-box-wrap shadow-reset animated zoomInLeft fa big-icon fa-edit"         style="font-size: 13px;padding: 4px;border-radius: 20px;color: #fdff61;margin: 0px 10px 0px 0px;"           ></a> ';
        $('#Ul_Div li a').click(click_Remove_Item_in_Basket);
        $('#Men_popu').attr('class', 'popu animated zoomOutRight');
        $("#PopupDialog").modal("hide");
        Total_Price();
    }
    function Add_ROW_IN_Basket() {
        debugger

        price_One_Product = parseFloat($("#txtPrice").val());
        price_Product = parseFloat($("#txtTotal_Popu").val());
        Qet_Product = Number(txtQuantity.value);
        var tttt = 1;
        if (P > -1) {
            for (var i = 1; i < P + 1; i++) {
                debugger
                var paragraph = document.getElementById('ppp' + i);
                if (paragraph == null) { } else {


                    var Saerch = paragraph.getAttribute('data_Name_P');
                    if (Saerch == Name_Product) {
                        debugger
                        var New_P = paragraph.getAttribute('data-New_P');
                        var QET_P = paragraph.getAttribute('data_QET_P');
                        var New_QET = Number(paragraph.getAttribute('data_QET_P')) + Qet_Product;
                        var price_P = paragraph.getAttribute('data_total_price');
                        var New_price = Number(price_Product) + parseFloat(price_P);

                        paragraph.setAttribute('data_QET_P', New_QET.toString());
                        paragraph.setAttribute('data_total_price', New_price.toString());
                        paragraph.innerHTML = '( ' + New_QET + ' )   ' + Name_Product + '  = ' + New_price + ' <a id="oioo' + New_P + '" href="#" data-ID-Paragraph="' + New_P + '"  data-exit_id="exit' + New_P + '"  data-ip_div="comnt' + New_P + '" data-MinUnitPrice="' + MinUnitPrice + '" data-OnhandQty="' + OnhandQty + '" data-Name="' + Name_Product + '" data-price_One="' + price_One_Product + '"  data-Qet_Product="' + New_QET + '" class="chat-box-wrap shadow-reset animated zoomInLeft fa big-icon fa-edit"         style="font-size: 13px;padding: 4px;border-radius: 20px;color: #fdff61;margin: 0px 10px 0px 0px;"           ></a> ';

                        $('#Ul_Div li a').click(click_Remove_Item_in_Basket);

                        tttt = 2;
                        break;

                    }

                }
            }

        }
        if (tttt == 1) {
            debugger

            P += 1
            scro += 80;
            var Qet = 1;

            //if (CChat.getAttribute('style') != "display: block") {

            //    if (document.getElementById("mCSB_3_container").innerHTML != '') {
            //        var Ul_Div = document.createElement('ul');
            //        Ul_Div.setAttribute('id', 'Ul_Div');
            //        document.getElementById("mCSB_3_container").appendChild(Ul_Div);
            //    }


            //}

            var Li_Ul_Div = document.createElement('ul');
            Li_Ul_Div.setAttribute('id', 'Li_Ul_Div' + P);
            Li_Ul_Div.setAttribute('style', 'margin: 14px 0px 0px 0px;');
            document.getElementById("Ul_Div").appendChild(Li_Ul_Div);

            var li1_Div = document.createElement('li');
            li1_Div.setAttribute('id', 'li1_Div' + P);
            document.getElementById("Li_Ul_Div" + P).appendChild(li1_Div);

            var li2_Div = document.createElement('li');
            li2_Div.setAttribute('id', 'li2_Div' + P);
            document.getElementById("Li_Ul_Div" + P).appendChild(li2_Div);

            var divv = document.createElement('div');
            divv.setAttribute('class', 'author-chat');
            divv.setAttribute('id', 'div' + P);
            document.getElementById("li2_Div" + P).appendChild(divv);

            var ppp = document.createElement('p');
            ppp.setAttribute('id', 'ppp' + P);
            ppp.setAttribute('class', 'chat-box-wrap shadow-reset ');
            ppp.setAttribute('style', 'width: 96%;');
            ppp.setAttribute('data_Name_P', Name_Product);
            ppp.setAttribute('data_price_P', PRODUCT_price.toString());
            ppp.setAttribute('data_ItemId', ItemID.toString());          
            //ppp.setAttribute('data_ItemFamilyID', New_ItemFamilyID.toString());
            ppp.setAttribute('data_QET_P', Qet_Product.toString());
            ppp.setAttribute('data_total_price', price_Product.toString());
            ppp.setAttribute('data-New_P', P.toString());
            ppp.setAttribute('data-MinUnitPrice', MinUnitPrice);
            document.getElementById("div" + P).appendChild(ppp);

            var divvv = document.createElement('input');
            divvv.setAttribute('type', 'text');
            divvv.setAttribute('id', 'comnt' + P);
            divvv.setAttribute('class', 'author-chat alert alert-warning alert-st-three alert-st-bg2');
            divvv.setAttribute('style', 'display: none; margin: -43px 0px -25px 12px;float: left;height: 0px;width: 231px;font-size: 14px;padding: 14px;border-radius: 37px; position: relative;background-color: #a3a3a3;color: white;');
            document.getElementById("div" + P).appendChild(divvv);

            var exit_i = document.createElement('a');
            exit_i.setAttribute('id', 'exit' + P);
            exit_i.setAttribute('class', 'adminpro-icon adminpro-check-icon');
            exit_i.setAttribute('href', '#');
            exit_i.setAttribute('data-id_Nots', 'comnt' + P);
            exit_i.setAttribute('data-id_But_Nots', 'oioo' + P);
            exit_i.setAttribute('data-id_Pragraph', 'ppp' + P);
            exit_i.setAttribute('style', 'display:none;margin: -38px -39px 0px -192px;float: left;height: 0px;width: 231px;font-size: 21px;border-radius: 37px;position: relative;color: #2e617f; padding: 0px;');
            document.getElementById("div" + P).appendChild(exit_i);

            var li2_a = document.createElement('a');
            li2_a.setAttribute('id', 'a');
            li2_a.setAttribute('href', '#');
            li2_a.setAttribute('class', 'chat-box-wrap shadow-reset animated zoomInUp fa fa-remove class_ex_liest_chate');
            li2_a.setAttribute('data_Id_Ul', 'Li_Ul_Div' + P);
            li2_a.setAttribute('data_id_Pragraph', 'ppp' + P);
            li2_a.setAttribute('data-x_totel', $(this).attr('data-price'));
            li2_a.setAttribute('data-id_ppp', 'ppp' + P);
            document.getElementById("li1_Div" + P).appendChild(li2_a);

            document.getElementById('ppp' + P).innerHTML = '' + '( ' + Qet_Product + ' )   ' + Name_Product + '  = ' + price_Product + ' <a id="oioo' + P + '"  data-ID-Paragraph="' + P + '" href="#"  data-exit_id="exit' + P + '"  data-ip_div="comnt' + P + '"  data-MinUnitPrice="' + MinUnitPrice + '"  data-OnhandQty="' + OnhandQty + '"   data-Name="' + Name_Product + '" data-price_One="' + price_One_Product + '" data-Qet_Product="' + Qet_Product + '" class="chat-box-wrap shadow-reset animated zoomInLeft fa big-icon fa-edit"         style="font-size: 13px;padding: 4px;border-radius: 20px;color: #fdff61;margin: 0px 10px 0px 0px;"           ></a> ';
            var mCSB_3_container = document.getElementById("mCSB_3_container");

            //mCSB_3_container.setAttribute('style', 'position: relative; top: -' + scro + 'px; left: 0px;');

            CChat.setAttribute('style', 'display: block');

            $('#Ul_Div li a').click(click_Remove_Item_in_Basket);

            //Num_Item.innerHTML = "عدد الاصناف ( " + P + " )";
            Num_Item.setAttribute('data_New_QET', P);
            New_QET = P;
            Num_Qty += 1
        }


        Total_Price();

        Qet_X = P;



        CChat.setAttribute('style', 'display: block;');
        Total_Basket.setAttribute('style', 'display: block;');

        var boll = chat.getAttribute('class');
        var hide = ("chat-box-wrap shadow-reset animated zoomInLeft collapse");
        if (hide == boll) { x.innerHTML = '<i id="remo" class="fa" style="margin-top: 0px;font-size: 21px;">' + Num_Qty + '</i>'; }
        else { x.innerHTML = '<i id="remo" class="fa" style="margin-top: 0px;font-size: 21px;">' + Num_Qty + '</i>'; }

        Num_Add_List += 1;
    }

    function Remove_Item_in_Basket() {

        $('#Ul_Div').html('');


        P = 0;
        Num_Qty = 0;
        //Num_Item.innerHTML = "عدد الاصناف ( " + P + " )";
        Num_Item.setAttribute('data_New_QET', P);
        x.innerHTML = '<i id="remo" class="fa" style="margin-top: 0px;font-size: 21px;">' + P + '</i>';
        if (P == 0) { CChat.setAttribute('style', 'display: none;'); Total_Basket.setAttribute('style', 'display: none;'); }

        var totalPirs = document.getElementById('All_Total_Basket');
        totalPirs.innerHTML = '0';
        totalPirs.setAttribute('All_Total', '0');
        Num_Add_List = 0;


        ValidationMinUnitPrice = 0;
        Validation_Insert = 0;


        //FamilyDetails = new Array<PRODUCT>();

        ID_Customer = null;
        idCust.value = "";
        hide_Custm();
        flag_Cust = false;

    }
    function click_Remove_Item_in_Basket() {



        var Edit_Id = $('#' + $(this).attr('id') + '').attr('class');

        //debugger
        if (Edit_Id == "chat-box-wrap shadow-reset animated zoomInLeft fa big-icon fa-edit") {
            //debugger
            Num_paragraph = $(this).attr('data-ID-Paragraph');


            click_Edit($(this).attr('data-name'), Number($(this).attr('data-price_one')), Number($(this).attr('data-qet_product')), Number($(this).attr('data-onhandqty')), Number($(this).attr('data-minunitprice')));

        }

        else {

            var id_Pragraph = document.getElementById($(this).attr('data_id_Pragraph'));

            if (id_Pragraph == null) {

            }
            else {

                Num_Qty -= 1;

                //Num_Item.innerHTML = "عدد الاصناف ( " + P + " )";
                Num_Item.setAttribute('data_New_QET', Num_Qty);
                x.innerHTML = '<i id="remo" class="fa" style="margin-top: 0px;font-size: 21px;">' + Num_Qty + '</i>';
                if (Num_Qty == 0) { CChat.setAttribute('style', 'display: none;'); Total_Basket.setAttribute('style', 'display: none;'); }


                var id_ul = document.getElementById($(this).attr('data_Id_Ul'));
                document.getElementById("Ul_Div").removeChild(id_ul);

                Total_Price();


            }

        }

    }
    function Total_Price() {
        debugger
        var New_Total = 0;
        for (var i = 1; i <= P + 1; i++) {
            ////debugger
            var par = document.getElementById('ppp' + i);
            if (par != null) {

                var P_total = par.getAttribute('data_total_price');
                New_Total += parseFloat(P_total);
                Total_Basket.setAttribute('style', 'display: block;');

                document.getElementById('All_Total_Basket').innerHTML = "( " + Number(New_Total).toFixed(2).toString() + " )";
                document.getElementById('All_Total_Basket').setAttribute('All_Total', Number(New_Total).toFixed(2).toString());


            }

        }

    }
    function Basket_onclick() {
        //debugger
        if (chat.getAttribute('class') == 'chat-box-wrap shadow-reset animated zoomInLeft collapse in') {

            Hide_Basket();
        }
        else {
            Show_Basket();
        }

    }
    function Show_Basket() {

        //var CChat = document.getElementById("CChat");
        //x.setAttribute('class', '');
        //CChat.setAttribute('class', 'Basket');
        //CChat.setAttribute('aria-expanded', 'true');
        chat.setAttribute('class', 'chat-box-wrap shadow-reset animated zoomInLeft collapse in');
        chat.setAttribute('aria-expanded', 'true');
        chat.setAttribute('style', 'width: 28%; border-radius: 16px;');

    }
    function Hide_Basket() {

        //var CChat = document.getElementById("CChat");
        //x.setAttribute('class', '');
        //CChat.setAttribute('class', 'Basket');
        //CChat.setAttribute('aria-expanded', 'true');
        chat.setAttribute('class', 'chat-box-wrap shadow-reset animated zoomOutRight collapse');
        //chat.setAttribute('style', 'width: 28%; border-radius: 16px; height: 0px;');
        chat.setAttribute('aria-expanded', 'false');

    }
    ////------------------------------------------------------Edit-----------------------------------
    function click_Edit(New_Name: string, New_Pirce: number, new_Qet: number, New_OnhandQty: number, New_MinUnitPrice: number) {
        //debugger
        btn_Add_Basket.setAttribute('style', 'display:none;');
        btn_Edit_Basket.setAttribute('style', 'display:block;');
        Name_Product = New_Name;
        OnhandQty = New_OnhandQty;
        MinUnitPrice = New_MinUnitPrice;



        //OnhandQty = New_OnhandQty;


        for (var i = 0; i < Num_Add_List + 1; i++) {
            var prgraph = document.getElementById("ppp" + i);
            if (prgraph != null) {
                let Name_Item = prgraph.getAttribute("data_name_p");
                let Qty = Number(prgraph.getAttribute("data_qet_p"));

                if (Name_Item == Name_Product) {
                    New_OnhandQty -= Qty;
                }
            }
        }

        if (New_OnhandQty <= 0) {
            //$(this).val('Finish');
            $('#id_Labol').html('متاح (' + New_OnhandQty + ') من  ' + New_Name + '');
            $('#Men_popu').attr('style', 'display:block;');
            $('#Men_popu').attr('class', 'popu animated zoomIn');
            $('#txtQuantity').val(new_Qet);
            $('#txtPrice').val(New_Pirce);

            $("#PopupDialog").modal("show");
        } else {




            //$('#id_Labol').html('متاح (' + OnhandQty + ') من  ' + Name_Product + '');
            $('#id_Labol').html('متاح (' + New_OnhandQty + ') من  ' + New_Name + '');
            $('#Men_popu').attr('style', 'display:block;');
            $('#Men_popu').attr('class', 'popu animated zoomIn');
            $('#txtQuantity').val(new_Qet);
            $('#txtPrice').val(New_Pirce);

            $("#PopupDialog").modal("show");
            Total();
        }




    }
    ////------------------------------------------------------Assign_Get_Data------------------------      
    function Assign_Get_Data() {



        List = new Array<Stok_ORDER_DELIVERY>();
        List_MinUnitPrice = new Array<Stok_ORDER_DELIVERY>();


        InvoiceModel.UserName = SysSession.CurrentEnvironment.UserCode;
        InvoiceModel.Namber_Order_Delivery = 1;
        InvoiceModel.Total_All = Number($('#All_Total_Basket').attr('All_Total'));
        InvoiceModel.Date_Order_Delivery = timer();
        InvoiceModel.Tax = 0;
        InvoiceModel.CUSTOMER_ID = Number(idCust.value) == 0 ? null : Number(idCust.value);
        InvoiceModel.type_order = Number(idCust.value) == 0 ? 'Takeaway' : 'Delivery' ;
        InvoiceModel.Confirmation = Number(idCust.value) == 0 ? true : false;

        for (var i = 1; i < Num_Add_List + 1; i++) {

            var prgraph = document.getElementById("ppp" + i);
            if (prgraph != null) {
                Model = new Stok_ORDER_DELIVERY();



                let Name_Item = prgraph.getAttribute("data_name_p");
                let Item_ID = Number(prgraph.getAttribute("data_itemid"));
                let ItemFamily_ID = Number(prgraph.getAttribute("data_itemfamilyid"));
                let Qty = Number(prgraph.getAttribute("data_qet_p"));
                let Price_Item = Number(prgraph.getAttribute("data_price_p"));
                let Total_Price = Number(prgraph.getAttribute("data_total_price"));

                let MinPrice = prgraph.getAttribute("data-minunitprice");
                let get_Price_on_seller = document.getElementById("oioo" + prgraph.getAttribute("data-new_p"));
                let Price_on_seller = get_Price_on_seller.getAttribute("data-price_one");

                Model.ID_DELIVERY = 0;
                Model.PRODUCT_ID = Item_ID;
                Model.Name_Product_sell = Name_Item;
                Model.Quantity_sell = Number(Qty);
                Model.price_One_part = Number(Price_Item);
                Model.Total_Price_One_Part = Number(Total_Price);
                Model.Notes_Order = MinPrice;
                Model.FK_ORDER_Delivery = 0;
                Model.Remarks = "حار";



                List.push(Model);
                MasterDetailModel.I_Sls_TR_Invoice = InvoiceModel;
                MasterDetailModel.I_Sls_TR_InvoiceItems = List;



                if (ValidationMinUnitPrice == 1) {

                    if (Number(Price_on_seller) < Number(MinPrice)) {
                        List_MinUnitPrice.push(Model);
                        Validation_Insert = 1;
                    }

                }



            }
        }


    }
    function Finsh_Order_onclick() {



        if (P != 0) { 
            //if (flag_Cust == false) {
            //    show_Cutomr();
            //    flag_Cust = true;
            //    return;
            //}
            ValidationMinUnitPrice = 1;
            Assign_Get_Data();

            if (Validation_Insert != 1) {

                Insert_Basket();
                if (Success == true) {
                    Remove_Item_in_Basket();

                    $('#uul').html('');
                    Display_But();

                }


            }
            else {
                type_Save_Print = false;
                Open_poup_Pass();

            }




        }
        else {

            MessageBox.Show(" برجاء اختيار الاصناف", "خطأ");
        }



    }

    function Finsh_Order_Print_onclick() {



        if (P != 0) {
            debugger
            //if (!SysSession.CurrentPrivileges.AddNew) return;
            //if (!ValidationHeader_On_Chanege()) return;
            if (flag_Cust == false) {
                show_Cutomr();
                flag_Cust = true;
                return;
            }
            ValidationMinUnitPrice = 1;
            Assign_Get_Data();

            if (Validation_Insert != 1) {

                Insert_Basket();
                if (Success == true) {
                    Remove_Item_in_Basket();

                    $('#uul').html('');
                    Display_But();
                    printreport();

                }


            }
            else {
                type_Save_Print = true;
                Open_poup_Pass();

            }




        }
        else {

            MessageBox.Show(" برجاء اختيار الاصناف", "خطأ");
        }



    }

    function printreport() {
        debugger;
        let _StockList: Array<Settings_Report> = new Array<Settings_Report>();
        let _Stock: Settings_Report = new Settings_Report();
        _Stock.Type_Print = 4;
        _Stock.ID_Button_Print = 'saless';
        _Stock.Parameter_1 = res;
        //_Stock.Parameter_2 = "";
        //_Stock.Parameter_3 = "";
        //_Stock.Parameter_4 = "";
        //_Stock.Parameter_5 = "";
        //_Stock.Parameter_6 = "";
        //_Stock.Parameter_7 = "";
        //_Stock.Parameter_8 = "";
        //_Stock.Parameter_9 = "";


        _StockList.push(_Stock);

        let rp: ReportParameters = new ReportParameters();

        rp.Data_Report = JSON.stringify(_StockList);//output report as View

        debugger
        Ajax.Callsync({
            url: Url.Action("Data_Report_Open", "GeneralReports"),
            data: rp,
            success: (d) => {
                debugger
                let result = d.result as string;


                window.open(result, "_blank");
            }
        })








    }

    function Insert_Basket() {
        if (InvoiceModel.CUSTOMER_ID == null || InvoiceModel.CUSTOMER_ID == 0) {
            InvoiceModel.CUSTOMER_ID = 24;
        }
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("SlsTrSales", "InsertInvoiceMasterDetail"),
            data: JSON.stringify(MasterDetailModel),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    res = result.Response
                    MessageBox.Show(" تم اصدار  فاتورة رقم  " + res + " ", "تم");

                    Success = true;
                    Hide_Basket();
                } else {
                    Success = false;
                    MessageBox.Show("هناك خطـأ ", "خطاء");
                }
            }
        });

    }
    ////------------------------------------------------------Poup_Pass------------------------
    function Open_poup_Pass() {

        $('#popu_Passowrd').attr('style', 'display:block;');
        $('#popu_Passowrd').attr('class', 'popu animated zoomInLeft');
        txt_ApprovePass.value = "";
        $("#Popup_Passowrd").modal("show");



        var Ul_List = document.getElementById('Ul_List_MinUnitPrice');

        Ul_List.innerHTML = '';

        for (var i = 0; i < List_MinUnitPrice.length; i++) {

            var li_List_MinUnitPrice = document.createElement('li');
            li_List_MinUnitPrice.setAttribute('id', 'li_List_MinUnitPrice' + i);
            li_List_MinUnitPrice.setAttribute('class', 'st_border_li_List_MinUnitPrice');
            Ul_List.appendChild(li_List_MinUnitPrice);

            var id_List = document.getElementById('li_List_MinUnitPrice' + i);
            id_List.innerHTML = '-( ' + List_MinUnitPrice[i].Name_Product_sell + ' ) السعر (' + List_MinUnitPrice[i].price_One_part + ') الحد ( ' + List_MinUnitPrice[i].Notes_Order + ' )';


        }


    }
    function btn_Approveprice_onclick() {
        //debugger;
        if (txt_ApprovePass.value == '1234') {

            Insert_Basket();
            if (Success == true) {
                Remove_Item_in_Basket();
                ValidationMinUnitPrice = 0;
                Validation_Insert = 0;
                FamilyDetails = new Array<PRODUCT>();
                $('#uul').html('');
                Display_But();
                $('#popu_Passowrd').attr('style', 'display:none;');
                $('#popu_Passowrd').attr('class', 'popu animated zoomOut');
                txt_ApprovePass.value = "";
                $("#Popup_Passowrd").modal("hide");
                ID_Customer = null;
                idCust.value = "";
                hide_Custm();
                flag_Cust = false;
                if (type_Save_Print == true) {
                    printreport();
                }
            }

        }
        else {
            MessageBox.Show("لايمكن اعتماد الفاتورة", "خطأ");
            txt_ApprovePass.value = "";

        }
    }
    function btn_Exit_Approveprice_onclick() {

        $('#popu_Passowrd').attr('style', 'display:none;');
        $('#popu_Passowrd').attr('class', 'popu animated zoomOut');
        txt_ApprovePass.value = "";
        $("#Popup_Passowrd").modal("hide");
        Validation_Insert = 0;


    }
    //-------------------------------------------------------Customr-----------------------
    function GetAllCustomer() {
        debugger
        CustomerDetails = new Array<CUSTOMER>();
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Customer", "GetAll"),
            data: { CompCode: 1 },
            success: (d) => {
                debugger;
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    CustomerDetails = result.Response as Array<CUSTOMER>;


                }
            }
        });

    }
    function show_Cutomr() {



        $("#Popup_Custmor").modal("show");


        debugger
        document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset animated zoomIn collapse in castmr animated shake');
        document.getElementById("div_cutomr").setAttribute('aria-expanded', 'true');
        document.getElementById("div_cutomr").setAttribute('style', 'position: fixed;height: 414px;width: 689px;background: linear - gradient(to right, rgb(22, 58, 71) 0%, #457198 100%);bottom: 90px;right: -59px;top: 91px;transition: all .4s ease 0s;z - index: 999;border: 23px solid #4386da; border - radius: 50px;');

        cust_search_phone.focus();

    }
    function hide_Custm() {

        //ElWassem.Reservation_CUSTOMER();
        if (idCust.value == "0" || idCust.value == "") {


            $("#Popup_Custmor").modal("hide");

            document.getElementById("div_cutomr").setAttribute('style', 'position: fixed;height: 414px;width: 689px;background: linear - gradient(to right, rgb(22, 58, 71) 0%, #457198 100%);bottom: 90px;right: -59px;top: 91px;transition: all .4s ease 0s;z - index: 999;border: 23px solid #4386da; border - radius: 50px;');
            document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset collapse in castmr');

            CUST_NAME.value = "";
            CUST_ADDRES.value = "";
            CUST_ADDRES_2.value = "";
            CUST_Phone.value = "";
            cust_search_phone.value = "";
            idCust.value = "";
            document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset animated zoomOut collapse  castmr ');
            document.getElementById("div_cutomr").setAttribute('aria-expanded', 'true');


            document.getElementById("But_Cutomr").setAttribute('style', 'bottom: 40px;right: 25px;height: 40px;width: 40px;background:-moz-linear-gradient(left,rgba(255, 127, 77, 1)0%,rgba(255, 80, 10, 1) 100%);background:-webkit-gradient(left top,right top,color-stop(0%,rgba(255,127,77,1)),color-stop(100 %, rgba(255, 80, 10, 1)));background:-o-linear-gradient(left, rgba(255, 127, 77, 1)0%,rgba(255, 80, 10, 1)100%);background:linear-gradient(to right, #03a9f412 0%, #337ab7 100%);z-index: 999;line-height: 40px;text-align:center;border-radius:50%;cursor:pointer;color: #fff;font-size: 30px; ');
        }
        else {
            debugger


            $("#Popup_Custmor").modal("hide");

            document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset animated zoomOut collapse  castmr ');
            document.getElementById("div_cutomr").setAttribute('aria-expanded', 'true');



            document.getElementById("But_Cutomr").setAttribute('style', 'bottom: 40px;right: 25px;height: 40px;width: 40px;background:-moz-linear-gradient(left,rgba(255, 127, 77, 1)0%,rgba(255, 80, 10, 1) 100%);background:-webkit-gradient(left top,right top,color-stop(0%,rgba(255,127,77,1)),color-stop(100 %, rgba(255, 80, 10, 1)));background:-o-linear-gradient(left, rgba(255, 127, 77, 1)0%,rgba(255, 80, 10, 1)100%);background:linear-gradient(to right, #03a9f412 0%, #22e000 100%);z-index: 999;line-height: 40px;text-align:center;border-radius:50%;cursor:pointer;color: #fff;font-size: 30px; ');










        }

        flag_Cust = true;
        //fouse.focus();


    }
    function add_cust() {

        debugger

        if (CUST_NAME.value == "" || CUST_Phone.value == "") {
            document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset collapse in castmr ');
            document.getElementById("div_cutomr").setAttribute('style', 'position: fixed;height: 414px;width: 689px;background: linear - gradient(to right, rgb(22, 58, 71) 0%, #457198 100%);bottom: 90px;right: -59px;top: 91px;transition: all .4s ease 0s;z - index: 999;border: 23px solid #c12a2a; border - radius: 50px;');
            document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset collapse in castmr animated shake');
            idCust.value = "";
        }

        else {


            SearchDetails = CustomerDetails.filter(x => x.PHONE == CUST_Phone.value);

            if (SearchDetails.length > 0) {
                MessageBox.Show('رقم التليفون موجود بالفعل', "خطأ");
                document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset collapse in castmr ');
                document.getElementById("div_cutomr").setAttribute('style', 'position: fixed;height: 414px;width: 689px;background: linear - gradient(to right, rgb(22, 58, 71) 0%, #457198 100%);bottom: 90px;right: -59px;top: 91px;transition: all .4s ease 0s;z - index: 999;border: 23px solid #c12a2a; border - radius: 50px;');
                document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset collapse in castmr animated shake');
                idCust.value = "";
                CUST_NAME.value = "";
                CUST_ADDRES.value = "";
                CUST_ADDRES_2.value = "";
                CUST_Phone.value = "";

            }
            else {

                Details_Updata_Cust = new Array<CUSTOMER>();
                Det_Single_Cust = new CUSTOMER();
                Det_Single_Cust.CUSTOMER_ID = 24;
                Det_Single_Cust.CUSTOMER_NAME = CUST_NAME.value;
                Det_Single_Cust.PHONE = CUST_Phone.value;
                Det_Single_Cust.CUSTOMER_ADDRES = CUST_ADDRES.value;
                Det_Single_Cust.CUSTOMER_ADDRES_2 = CUST_ADDRES_2.value;
                Det_Single_Cust.StatusFlag = "i";

                Details_Updata_Cust.push(Det_Single_Cust);
                updateList_Customer();

                if (Success == true) {

                    document.getElementById("div_cutomr").setAttribute('style', 'position: fixed;height: 414px;width: 689px;background: linear - gradient(to right, rgb(22, 58, 71) 0%, #457198 100%);bottom: 90px;right: -59px;top: 91px;transition: all .4s ease 0s;z - index: 999;border: 23px solid #499449; border - radius: 50px;');
                    document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset collapse in castmr');
                    Success = false
                }
            }


        }
        flag_Cust = true;
    }
    function update_cust() {

        debugger


        if (CUST_NAME.value == "" || CUST_Phone.value == "") {
            document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset collapse in castmr ');
            document.getElementById("div_cutomr").setAttribute('style', 'position: fixed;height: 414px;width: 689px;background: linear - gradient(to right, rgb(22, 58, 71) 0%, #457198 100%);bottom: 90px;right: -59px;top: 91px;transition: all .4s ease 0s;z - index: 999;border: 23px solid #c12a2a; border - radius: 50px;');
            document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset collapse in castmr animated shake');
            idCust.value = "";
        }
        else {

            Details_Updata_Cust = new Array<CUSTOMER>();
            Det_Single_Cust = new CUSTOMER();
            Det_Single_Cust.CUSTOMER_ID = Number(idCust.value);
            Det_Single_Cust.CUSTOMER_NAME = CUST_NAME.value;
            Det_Single_Cust.PHONE = CUST_Phone.value;
            Det_Single_Cust.CUSTOMER_ADDRES = CUST_ADDRES.value;
            Det_Single_Cust.CUSTOMER_ADDRES_2 = CUST_ADDRES_2.value;
            Det_Single_Cust.StatusFlag = "u";

            Details_Updata_Cust.push(Det_Single_Cust);
            updateList_Customer();
            if (Success == true) {

                document.getElementById("div_cutomr").setAttribute('style', 'position: fixed;height: 414px;width: 689px;background: linear - gradient(to right, rgb(22, 58, 71) 0%, #457198 100%);bottom: 90px;right: -59px;top: 91px;transition: all .4s ease 0s;z - index: 999;border: 23px solid #acac01; border - radius: 50px;');
                document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset collapse in castmr');
                Success = false
            }


        }
        flag_Cust = true;

    }
    function get_cust() {

        debugger


        if (cust_search_phone.value == "") {

            CUST_NAME.value = "";
            CUST_ADDRES.value = "";
            CUST_ADDRES_2.value = "";
            CUST_Phone.value = "";
            idCust.value = "";
            document.getElementById("div_cutomr").setAttribute('style', 'position: fixed;height: 414px;width: 689px;background: linear - gradient(to right, rgb(22, 58, 71) 0%, #457198 100%);bottom: 90px;right: -59px;top: 91px;transition: all .4s ease 0s;z - index: 999;border: 23px solid #4386da; border - radius: 50px;');
            document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset collapse in castmr');

        }
        else {
            let search: string = cust_search_phone.value.toLowerCase();
            SearchDetails = CustomerDetails.filter(x => x.PHONE.toString().search(search) >= 0 || x.CUSTOMER_NAME.toLowerCase().search(search) >= 0); /*|| x.MOBILE.toLowerCase().search(search) >= 0*/
            //    || x.CustomerCODE.toString().search(search) >= 0 /* || x.CreditLimit.toString().search(search) >= 0 || x.Emp_NameA.toString().search(search) >= 0
            //    || x.ContactMobile.toString().search(search) >= 0 /*|| x.DueAmount.toString().search(search) >= 0 *//*|| x.DaysDiff.toString().search(search) >= 0*/);

            if (SearchDetails[0] != null) {
                CUST_NAME.value = SearchDetails[0].CUSTOMER_NAME;
                CUST_ADDRES.value = SearchDetails[0].CUSTOMER_NAME;
                //CUST_ADDRES_2.value = SearchDetails[0].CUSTOMER_NAME;
                CUST_Phone.value = SearchDetails[0].PHONE;
                idCust.value = SearchDetails[0].CUSTOMER_ID.toString();
                document.getElementById("div_cutomr").setAttribute('style', 'position: fixed;height: 414px;width: 689px;background: linear - gradient(to right, rgb(22, 58, 71) 0%, #457198 100%);bottom: 90px;right: -59px;top: 91px;transition: all .4s ease 0s;z - index: 999;border: 23px solid #499449; border - radius: 50px;');
                document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset collapse in castmr');
            }
            else {


                document.getElementById("div_cutomr").setAttribute('style', 'position: fixed;height: 414px;width: 689px;background: linear - gradient(to right, rgb(22, 58, 71) 0%, #457198 100%);bottom: 90px;right: -59px;top: 91px;transition: all .4s ease 0s;z - index: 999;border: 23px solid #c12a2a; border - radius: 50px;');
                document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset collapse in castmr animated shake');
                CUST_NAME.value = "";
                CUST_ADDRES.value = "";
                CUST_ADDRES_2.value = "";
                CUST_Phone.value = "";
                idCust.value = "";

            }


        }



    }
    function updateList_Customer() {
        debugger;
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Customer", "UpdateCustlist"),
            data: JSON.stringify(Details_Updata_Cust),
            success: (d) => {
                debugger
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    ID_Customer = result.Response;
                    MessageBox.Show("تم الحفظ", "الحفظ");
                    idCust.value = ID_Customer;
                    Success = true;

                    GetAllCustomer();
                }
                else {
                    debugger;
                    Success = false;
                    document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset collapse in castmr ');
                    document.getElementById("div_cutomr").setAttribute('style', 'position: fixed;height: 414px;width: 689px;background: linear - gradient(to right, rgb(22, 58, 71) 0%, #457198 100%);bottom: 90px;right: -59px;top: 91px;transition: all .4s ease 0s;z - index: 999;border: 23px solid #c12a2a; border - radius: 50px;');
                    document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset collapse in castmr animated shake');
                    MessageBox.Show(result.ErrorMessage, "خطأ");
                }
            }
        });

    }
    function Remove_cust_onclick() {
        CUST_NAME.value = "";
        CUST_ADDRES.value = "";
        CUST_ADDRES_2.value = "";
        CUST_Phone.value = "";
        idCust.value = "";
        cust_search_phone.value = "";
        document.getElementById("div_cutomr").setAttribute('style', 'position: fixed;height: 414px;width: 689px;background: linear - gradient(to right, rgb(22, 58, 71) 0%, #457198 100%);bottom: 90px;right: -59px;top: 91px;transition: all .4s ease 0s;z - index: 999;border: 23px solid #4386da; border - radius: 50px;');
        document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset collapse in castmr');
    }



}